'use client'

import * as Input from '@/components/Input'
import { Goal } from '@/context/models/goals'
import { BanknoteIcon } from 'lucide-react'
import { useState } from 'react'

interface SpecificClientTargetSectionProps {
  formState: Goal
  setFormState: React.Dispatch<React.SetStateAction<Goal>>
  handleNestedInputChange: <
    K extends keyof Goal,
    S extends keyof NonNullable<Goal[K]>,
  >(
    field: K,
    subField: S,
    value: NonNullable<Goal[K]>[S],
  ) => void
}

interface Client {
  clientId: string
  clientName: string
  businessName: string
}

export default function SpecificClientTargetSection({
  formState,
  setFormState,
  handleNestedInputChange,
}: SpecificClientTargetSectionProps) {
  const [clientSearchResults, setClientSearchResults] = useState<Client[]>([])

  const fetchClients = async (filter: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/siac/clients`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            typeFilter: 'name',
            filter,
          }),
        },
      )
      const data = await response.json()
      setClientSearchResults(data || [])
    } catch (error) {
      console.error('Error fetching clients:', error)
      setClientSearchResults([])
    }
  }

  const handleSelectClient = (client: Client) => {
    setFormState((prevState) => ({
      ...prevState,
      specificClientTarget: {
        ...prevState.specificClientTarget,
        clientId: client.clientId,
        clientName: client.clientName,
        amount: prevState.specificClientTarget?.amount ?? 0,
        bonus: prevState.specificClientTarget?.bonus ?? 0,
      },
    }))
    setClientSearchResults([])
  }

  return (
    <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
      <label
        htmlFor="specificCustomer"
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        Escolher 1 Cliente para Vender
      </label>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div>
          <label
            htmlFor="salesTarget"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Selecione um cliente
          </label>
          <Input.Root>
            <Input.Control
              id="specificClientTarget.clientName"
              placeholder="Buscar Cliente por Nome"
              value={formState.specificClientTarget?.clientName}
              onChange={(e) => {
                const value = e.target.value
                handleNestedInputChange(
                  'specificClientTarget',
                  'clientName',
                  value,
                )
                if (value.length > 2) {
                  fetchClients(value)
                } else {
                  setClientSearchResults([])
                }
              }}
            />
          </Input.Root>
        </div>
        <div>
          <label
            htmlFor="salesTarget"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Valor a ser vendido (R$)
          </label>
          <Input.Root>
            <Input.Prefix>
              <BanknoteIcon className="w-4 h-4" />
            </Input.Prefix>
            <Input.Control
              id="specificClientTarget.amount"
              placeholder="Valor Vendido (R$)"
              type="currency"
              value={formState.specificClientTarget?.amount}
              onChange={(e) =>
                handleNestedInputChange(
                  'specificClientTarget',
                  'amount',
                  Number(e.target.value.replace(/\D/g, '')),
                )
              }
            />
          </Input.Root>
        </div>
        <div>
          <label
            htmlFor="salesTarget"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Bônus (R$)
          </label>
          <Input.Root>
            <Input.Prefix>
              <BanknoteIcon className="w-4 h-4" />
            </Input.Prefix>
            <Input.Control
              id="specificClientTarget.bonus"
              placeholder="Bônus (R$)"
              type="currency"
              value={formState.specificClientTarget?.bonus}
              onChange={(e) =>
                handleNestedInputChange(
                  'specificClientTarget',
                  'bonus',
                  Number(e.target.value.replace(/\D/g, '')),
                )
              }
            />
          </Input.Root>
        </div>

        {/* Adicione o contêiner para a lista de resultados aqui, dentro da grid */}
        <div className="relative col-span-1">
          {clientSearchResults.length > 0 && (
            <div className="absolute w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg z-20 max-h-48 overflow-y-auto">
              {clientSearchResults.map((client) => (
                <div
                  key={client.clientId}
                  className="p-3 border-b last:border-b-0 dark:border-zinc-700 cursor-pointer"
                  onClick={() => handleSelectClient(client)}
                >
                  <div className="flex flex-col">
                    <span>{client.clientName}</span>
                    <span>codigo: {client.clientId}</span>
                    {client.businessName && (
                      <div className="text-xs text-zinc-500">
                        {client.businessName}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
