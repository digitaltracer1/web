'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/Button'
import * as Input from '@/components/Input'
import { BanknoteIcon, PlusIcon } from 'lucide-react'
import { BrandTarget, Goal } from '@/context/models/goals'
import { env } from 'process'

interface BrandTargetSectionProps {
  formState: Goal
  setFormState: React.Dispatch<React.SetStateAction<Goal>>
  handleInputChange: <K extends keyof Goal>(field: K, value: Goal[K]) => void
}

export default function BrandTargetSection({
  formState,
  setFormState,
  handleInputChange,
}: BrandTargetSectionProps) {
  const [newBrand, setNewBrand] = useState<BrandTarget | null>(null)
  const [searchResults, setSearchResults] = useState<
    { brandId: string; brandName: string }[]
  >([])

  const handleAddBrand = () => {
    if (newBrand && newBrand.target !== 0 && newBrand.target !== undefined) {
      // Aplicar parseFloat ao valor de target

      console.log(newBrand.target.toString().replace(/\D/g, ''))

      const updatedBrand = {
        ...newBrand,
        target: parseFloat(newBrand.target.toString().replace(/\D/g, '')) / 100,
      }

      const isDuplicate = formState.brandTargets?.some(
        (brand) => brand.brandId === updatedBrand.brandId,
      )

      if (!isDuplicate) {
        setFormState((prevState) => ({
          ...prevState,
          brandTargets: [...(prevState.brandTargets ?? []), updatedBrand],
        }))
        setNewBrand(null)
        setSearchResults([])
      } else {
        alert('Esta marca já foi adicionada.')
      }
    }
  }

  const handleSelectBrand = (brandId: string, brandName: string) => {
    setNewBrand(
      (prev) =>
        ({
          ...prev,
          brandId,
          brandName,
        }) as BrandTarget,
    )
    setSearchResults([])
  }

  const handleRemoveBrand = (id: string) => {
    setFormState((prevState) => ({
      ...prevState,
      brandTargets: prevState.brandTargets?.filter(
        (brand) => brand.brandId !== id,
      ),
    }))
  }

  const fetchBrands = async (filter: string) => {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/v1/siac/brands`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          typeFilter: 'name',
          filter,
        }),
      })
      const data = await response.json()
      setSearchResults(data || [])
    } catch (error) {
      console.error('Error fetching brands:', error)
      setSearchResults([])
    }
  }

  useEffect(() => {
    if (newBrand && newBrand.brandName.length > 2 && !newBrand.brandId) {
      fetchBrands(newBrand.brandName)
    } else {
      setSearchResults([])
    }
  }, [newBrand?.brandName])

  return (
    <div className="pt-5">
      <div className="flex gap-4 justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Metas de Vendas por Marca
          </h3>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Insira as metas de vendas para as marcas específicas.
          </span>
        </div>
        <div>
          <Input.Root>
            <Input.Prefix>
              <BanknoteIcon className="w-4 h-4" />
            </Input.Prefix>
            <Input.Control
              id="bonusGoalBrand"
              placeholder="Bônus (R$)"
              type="currency"
              value={formState.bonusGoalBrand || 0}
              onChange={(e) =>
                handleInputChange(
                  'bonusGoalBrand',
                  Number(e.target.value.replace(/\D/g, '')),
                )
              }
            />
          </Input.Root>
        </div>
      </div>

      {/* Campo de Nome da Marca com Pesquisa */}
      <div className="flex gap-3 pt-5">
        <Input.Root>
          <Input.Control
            id="brandTargetsName"
            placeholder="Nome da Marca"
            value={newBrand?.brandName || ''}
            onChange={(e) =>
              setNewBrand(
                (prev) =>
                  ({
                    ...prev,
                    brandName: e.target.value,
                  }) as BrandTarget,
              )
            }
          />
        </Input.Root>
        <Input.Root>
          <Input.Prefix>
            <BanknoteIcon className="w-4 h-4" />
          </Input.Prefix>
          <Input.Control
            placeholder="Meta de Vendas (R$)"
            id="brandTargetsValue"
            type="currency"
            value={newBrand?.target || 0}
            onChange={(e) => {
              setNewBrand(
                (prev) =>
                  ({
                    ...prev,
                    target: e.target.value,
                  }) as unknown as BrandTarget,
              )
            }}
          />
        </Input.Root>
        <Button variant="primary" type="button" onClick={handleAddBrand}>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Resultados da Pesquisa */}
      {searchResults.length > 0 && (
        <div className="pt-3 space-y-3 max-h-48 overflow-y-auto">
          {searchResults.map((brand) => (
            <div
              key={brand.brandId}
              className="flex items-center justify-between p-3 border rounded-md dark:border-zinc-700 cursor-pointer"
              onClick={() => handleSelectBrand(brand.brandId, brand.brandName)}
            >
              <span>
                {brand.brandName} - codigo: {brand.brandId}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Listagem das Marcas Selecionadas */}
      <div className="pt-5 space-y-3">
        {formState.brandTargets?.map((brand: BrandTarget) => (
          <div
            key={brand.brandId}
            className="flex items-center justify-between p-3 border rounded-md dark:border-zinc-700"
          >
            <span>
              {brand.brandName} - {brand.brandId}
            </span>
            <span>
              {brand.target.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <Button
              variant="outline"
              type="button"
              onClick={() => handleRemoveBrand(brand.brandId)}
            >
              Remover
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
