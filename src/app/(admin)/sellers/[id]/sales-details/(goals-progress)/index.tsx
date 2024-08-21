'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSeller } from '@/context/seller-context'
import GoalsProgressComponent from './goals-progress'
import { useTheme } from 'next-themes'

export default function GoalsProgress() {
  const { goals: goalsData } = useSeller()
  const { theme } = useTheme()

  const isDarkTheme = theme === 'dark'

  const goals = [
    {
      name: 'Meta Valor',
      bonus: goalsData?.salesTarget?.bonus || 0,
      target: goalsData?.salesTarget?.target || 0,
      achieved: goalsData?.salesTarget?.achieved || 0,
      progress: parseFloat(
        (
          ((goalsData?.salesTarget?.achieved || 0) /
            (goalsData?.salesTarget?.target || 1)) *
          100
        ).toFixed(2),
      ),
      isInverted: false,
      type: 'value',
    },
    {
      name: 'Meta Canc / Dev',
      bonus: goalsData?.cancellationRate?.bonus || 0,
      target: goalsData?.cancellationRate?.target || 0,
      achieved: goalsData?.cancellationRate?.rate || 0,
      progress: parseFloat((goalsData?.cancellationRate?.rate || 0).toFixed(2)),
      isInverted: true,
      type: 'percentage',
    },
    {
      name: 'Meta resgate cliente',
      bonus: goalsData?.inactiveClientsTarget?.bonus || 0,
      target: goalsData?.inactiveClientsTarget?.quantity || 0,
      achieved: goalsData?.inactiveClientsTarget?.quantity || 0,
      progress: parseFloat(
        (
          ((goalsData?.inactiveClientsTarget?.rescued || 0) /
            (goalsData?.inactiveClientsTarget?.quantity || 1)) *
          100
        ).toFixed(2),
      ),
      isInverted: false,
      type: 'quantity',
    },
    {
      name: 'Meta ticket médio',
      bonus: goalsData?.averageTicketTarget?.bonus || 0,
      target: goalsData?.averageTicketTarget?.target || 0,
      achieved: goalsData?.averageTicketTarget?.achieved || 0,
      progress: parseFloat(
        (
          ((goalsData?.averageTicketTarget?.achieved || 0) /
            (goalsData?.averageTicketTarget?.target || 1)) *
          100
        ).toFixed(2),
      ),
      isInverted: false,
      type: 'average',
    },
  ]

  if (!goalsData) {
    return (
      <div className="flex h-1/2 justify-center items-center">
        Sem metas cadastradas
      </div>
    )
  }

  return (
    <div className="space-y-4 p-2">
      <TooltipProvider>
        {goals.map((goal) => (
          <Tooltip key={goal.name}>
            <TooltipTrigger className="w-full">
              <GoalsProgressComponent
                name={goal.name}
                target={goal.target}
                bonus={goal.bonus}
                isInverted={goal.isInverted}
                progress={goal.progress}
              />
            </TooltipTrigger>
            <TooltipContent
              className={`p-2 rounded-lg shadow-lg ${
                isDarkTheme
                  ? 'bg-zinc-800 text-white'
                  : 'bg-white text-zinc-800'
              }`}
            >
              <p className="text-sm font-semibold">{goal.name}</p>
              <p className="text-xs">
                {goal.type === 'value'
                  ? `Total: ${goal.achieved.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}`
                  : goal.type === 'percentage'
                    ? `Taxa: ${goal.achieved}%`
                    : goal.type === 'average'
                      ? `Ticket Médio: ${goal.achieved.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}`
                      : ''}
              </p>
              <p className="text-xs">
                Meta:{' '}
                {goal.type === 'value'
                  ? goal.target.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  : goal.type === 'percentage'
                    ? `${goal.target}%`
                    : goal.type === 'average'
                      ? goal.target.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })
                      : goal.target.toLocaleString('pt-BR')}
              </p>
              <p className="text-xs">
                Bônus:{' '}
                {goal.bonus.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              {goal.isInverted ? (
                <p className="text-xs text-red-500">
                  Esta meta deve ser mantida abaixo da meta alvo.
                </p>
              ) : (
                <p className="text-xs text-green-500">
                  Esta meta deve ser atingida ou superada.
                </p>
              )}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  )
}
