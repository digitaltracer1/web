'use client'

import { Button } from '@/components/Button'
import { Goal, GoalStartValue } from '@/context/models/goals'
import { useSeller } from '@/context/seller-context'
import { useEffect, useState } from 'react'
import { Select } from '../Form/Select'
import { SelectItem } from '../Form/Select/SelectItem'
import AverageTicketSection from './average-ticket'
import BrandTargetSection from './brand-target'
import CancellationRateSection from './cancellation-rate'
import InactiveClientsSection from './inactive-clients'
import NewCustomersTargetSection from './new-customers-target'
import SalesTargetSection from './sales-target'
import SpecificClientTargetSection from './specific-client-target'
import { env } from 'process'

export interface GoalProps {
  params: {
    id: string
    goalId: string
  }
}

type GoalsFormProps = {
  params: GoalProps['params']
  mode: 'create' | 'update'
}

const months = [
  { value: 1, label: 'Janeiro' },
  { value: 2, label: 'Fevereiro' },
  { value: 3, label: 'Março' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Maio' },
  { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' },
]

const years = Array.from({ length: 10 }, (_, i) => {
  const year = new Date().getFullYear() - i
  return { value: year, label: String(year) }
})

export default function GoalsForm({ params, mode }: GoalsFormProps) {
  const { fetchGoalsBySeller, goals } = useSeller()
  const [formState, setFormState] = useState<Goal>(GoalStartValue)

  useEffect(() => {
    if (mode === 'update') {
      fetchGoalsBySeller(params.goalId)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [params.goalId])

  useEffect(() => {
    if (goals && mode === 'update') {
      setFormState(goals)
    } else {
      setFormState(GoalStartValue)
    }
  }, [goals, mode])

  const handleInputChange = <K extends keyof Goal>(
    field: K,
    value: Goal[K],
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const handleNestedInputChange = <
    K extends keyof Goal,
    S extends keyof NonNullable<Goal[K]>,
  >(
    field: K,
    subField: S,
    value: NonNullable<Goal[K]>[S],
  ) => {
    setFormState((prevState) => {
      const nestedField = prevState[field]

      if (nestedField && typeof nestedField === 'object') {
        return {
          ...prevState,
          [field]: {
            ...nestedField,
            [subField]: value,
          },
        }
      }

      return prevState
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const payload = {
      id: formState.id === '' ? undefined : formState.id,
      year: formState.year,
      month: formState.month,
      sellerId: formState.sellerId === '' ? params.id : formState.sellerId,
      salesTarget: formState.salesTarget,
      cancellationRate: formState.cancellationRate,
      averageTicketTarget: formState.averageTicketTarget,
      inactiveClientsTarget: formState.inactiveClientsTarget,
      newCustomersTarget: formState.newCustomersTarget,
      specificClientTarget: formState.specificClientTarget,
      brandTargets: formState.brandTargets,
    }

    try {
      const url =
        mode === 'update'
          ? `${env.NEXT_PUBLIC_API_BASE_URL}/v1/goals/update`
          : `${env.NEXT_PUBLIC_API_BASE_URL}/v1/goals/create`

      const method = mode === 'update' ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(
          `Erro ao ${mode === 'update' ? 'atualizar' : 'criar'} as metas`,
        )
      }

      const result = await response.json()
      console.log(result)
      alert(
        `Metas ${mode === 'update' ? 'atualizadas' : 'criadas'} com sucesso!`,
      )
    } catch (error) {
      console.error('Erro:', error)
      alert(`Erro ao ${mode === 'update' ? 'atualizar' : 'criar'} as metas.`)
    }
  }

  return (
    <div className="px-4 py-2 pb-28">
      <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
        Metas
      </h1>

      <div className="mt-6 flex flex-col">
        <div className="flex flex-col justify-between gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-700 lg:flex-row lg:items-center">
          <div className="space-y-1">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              Informações de metas
            </h2>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {mode === 'update'
                ? 'Atualize as metas do vendedor.'
                : 'Defina as metas do vendedor.'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit" form="settings">
              {mode === 'update' ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </div>

        <form
          id="settings"
          className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-200 dark:divide-zinc-700"
          onSubmit={handleSubmit}
        >
          {/* Month and Year Inputs */}
          {/* Month and Year Selects */}
          <div className="flex gap-3 pt-5">
            <div className="flex flex-col gap-2 w-40">
              <label
                htmlFor="month"
                className="text-zinc-900 dark:text-zinc-100"
              >
                Mês
              </label>
              <Select
                placeholder="Selecione o mês"
                value={String(formState.month)}
                onValueChange={(value) =>
                  handleInputChange('month', Number(value))
                }
                disabled={mode === 'update'} // Desabilita no modo de atualização
              >
                {months.map((month) => (
                  <SelectItem
                    key={month.value}
                    value={String(month.value)}
                    text={month.label}
                  />
                ))}
              </Select>
            </div>
            <div className="flex flex-col gap-2 w-40">
              <label
                htmlFor="year"
                className="text-zinc-900 dark:text-zinc-100"
              >
                Ano
              </label>
              <Select
                placeholder="Selecione o ano"
                value={String(formState.year)}
                onValueChange={(value) =>
                  handleInputChange('year', Number(value))
                }
                disabled={mode === 'update'} // Desabilita no modo de atualização
              >
                {years.map((year) => (
                  <SelectItem
                    key={year.value}
                    value={String(year.value)}
                    text={year.label}
                  />
                ))}
              </Select>
            </div>
          </div>

          {/* Sales, Average Ticket, and Cancellation Targets */}
          <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-3 lg:gap-5">
            <SalesTargetSection
              formState={formState}
              handleNestedInputChange={handleNestedInputChange}
            />
            <AverageTicketSection
              formState={formState}
              handleNestedInputChange={handleNestedInputChange}
            />
            <CancellationRateSection
              formState={formState}
              handleNestedInputChange={handleNestedInputChange}
            />
          </div>

          {/* Inactive Clients Target */}
          <InactiveClientsSection
            formState={formState}
            handleNestedInputChange={handleNestedInputChange}
          />

          {/* New Customers Target */}
          <NewCustomersTargetSection
            formState={formState}
            handleNestedInputChange={handleNestedInputChange}
          />

          {/* Specific Client Target */}
          <SpecificClientTargetSection
            formState={formState}
            setFormState={setFormState}
            handleNestedInputChange={handleNestedInputChange}
          />

          {/* Brand Targets */}
          <BrandTargetSection
            formState={formState}
            setFormState={setFormState}
            handleInputChange={handleInputChange}
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-5">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit" form="settings">
              {mode === 'update' ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
