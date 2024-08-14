'use client'

import { Button } from '@/components/Button'
import { Goal } from '@/context/models/goals'
import {
  ChevronsDownIcon,
  ChevronsUpIcon,
  FileSlidersIcon,
  TrashIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { env } from 'process'

interface GoalsListProps {
  sellerId: string
}

export default function GoalsList({ sellerId }: GoalsListProps) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({})
  const router = useRouter()

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch(
          `${env.NEXT_PUBLIC_API_BASE_URL}/v1/goals/seller/${sellerId}`,
        )

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const data: Goal[] = await response.json()
        setGoals(data)

        // Initialize collapsed state after goals are fetched
        const initialCollapsedState: { [key: string]: boolean } = {}
        data.forEach((goal) => {
          initialCollapsedState[goal.id] = true // Start with all goals collapsed
        })
        setCollapsed(initialCollapsedState)
      } catch (error) {
        console.error('Error fetching goals:', error)
        setError('Failed to fetch goals.')
      } finally {
        setLoading(false)
      }
    }

    fetchGoals()
  }, [sellerId])

  const handleEditClick = (goalId: string) => {
    router.push(`/goals/update/${sellerId}/${goalId}`)
  }

  const handleCreateClick = () => {
    router.push(`/goals/create/${sellerId}`)
  }

  const toggleCollapse = (goalId: string) => {
    setCollapsed((prevState) => ({
      ...prevState,
      [goalId]: !prevState[goalId],
    }))
  }

  const formatMonthYear = (month: number, year: number) => {
    const date = new Date(year, month - 1)
    return date
      .toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
  }

  const handleDeleteClick = async (goalId: string) => {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/v1/goals/${goalId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erro ao deletar a meta')
      }

      // Remove the deleted goal from the state
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId))
    } catch (error) {
      console.error('Erro ao deletar a meta:', error)
      alert('Erro ao deletar a meta.')
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div className="px-4 py-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Metas definidas
        </h2>
        <Button variant="primary" onClick={handleCreateClick}>
          Adicionar Meta
        </Button>
      </div>

      {goals.length > 0 ? (
        <div className="space-y-6">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="p-6 border rounded-lg dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
                  {formatMonthYear(goal.month, goal.year)}
                </h3>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => toggleCollapse(goal.id)}
                  >
                    {collapsed[goal.id] ? (
                      <ChevronsDownIcon className="w-5 h-5" />
                    ) : (
                      <ChevronsUpIcon className="w-5 h-5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleEditClick(goal.id)}
                  >
                    <FileSlidersIcon className="w-5 h-5" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost">
                        <TrashIcon className="w-5 h-5 hover:text-destructive " />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Tem certeza de que deseja deletar esta meta?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita e removerá
                          permanentemente esta meta.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteClick(goal.id)}
                        >
                          Deletar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              {!collapsed[goal.id] && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      Meta de Vendas
                    </p>
                    <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {goal.salesTarget?.target.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      Ticket Médio
                    </p>
                    <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {goal.averageTicketTarget?.target.toLocaleString(
                        'pt-BR',
                        {
                          style: 'currency',
                          currency: 'BRL',
                        },
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      Taxa de Cancelamento
                    </p>
                    <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {goal.cancellationRate?.target}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      Clientes Inativos
                    </p>
                    <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {goal.inactiveClientsTarget?.quantity} clientes
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      Clientes Novos
                    </p>
                    <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {goal.newCustomersTarget?.quantity} clientes
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      Cliente Específico
                    </p>
                    <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {goal.specificClientTarget?.clientName ||
                        'Não especificado'}
                    </p>
                  </div>
                  {goal.brandTargets && goal.brandTargets.length > 0 && (
                    <div className="col-span-full">
                      <h4 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        Metas por Marca
                      </h4>
                      <ul className="list-disc list-inside text-sm text-zinc-900 dark:text-zinc-100 mt-1">
                        {goal.brandTargets.map((brand) => (
                          <li key={brand.brandId}>
                            {brand.brandName}:{' '}
                            {brand.target.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">
          Nenhuma meta encontrada para este vendedor.
        </p>
      )}
    </div>
  )
}
