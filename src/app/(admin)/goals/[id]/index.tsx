'use client'

import { Button } from '@/components/Button'
import { Goal, GoalStartValue } from '@/context/models/goals'
import { useSeller } from '@/context/seller-context'
import { useEffect, useState } from 'react'
import SalesTargetSection from './sales-target'
import AverageTicketSection from './average-ticket'
import CancellationRateSection from './cancellation-rate'
import InactiveClientsSection from './inactive-clients'
import NewCustomersTargetSection from './new-customers-target'
import SpecificClientTargetSection from './specific-client-target'
import BrandTargetSection from './brand-target'
import { SellerProps } from './page'

export default function GoalsForm({ params }: SellerProps) {
  const { fetchGoalsBySeller, goals, dateRange } = useSeller()
  const [formState, setFormState] = useState<Goal>(GoalStartValue)

  useEffect(() => {
    const month = new Date(dateRange.dateFrom).getMonth() + 1
    const year = new Date(dateRange.dateFrom).getFullYear()
    const sellerId = params.id

    fetchGoalsBySeller(month, year, sellerId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange.dateFrom, dateRange.dateTo, params.id])

  useEffect(() => {
    if (goals) {
      setFormState(goals)
    } else {
      setFormState(GoalStartValue)
    }
  }, [goals])

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
      id: formState.id,
      year: formState.year,
      month: formState.month,
      sellerId: formState.sellerId,
      salesTarget: formState.salesTarget,
      cancellationRate: formState.cancellationRate,
      averageTicketTarget: formState.averageTicketTarget,
      inactiveClientsTarget: formState.inactiveClientsTarget,
      newCustomersTarget: formState.newCustomersTarget,
      specificClientTarget: formState.specificClientTarget,
      brandTargets: formState.brandTargets,
    }

    try {
      const response = await fetch(`http://localhost:5000/v1/goals/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar as metas')
      }

      const result = await response.json()
      console.log(result)
      alert('Metas atualizadas com sucesso!')
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao atualizar as metas.')
    }
  }

  return (
    <div className="px-4 py-2">
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
              Atualize as metas do vendedor.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit" form="settings">
              Save
            </Button>
          </div>
        </div>

        <form
          id="settings"
          className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-200 dark:divide-zinc-700"
          onSubmit={handleSubmit}
        >
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
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
