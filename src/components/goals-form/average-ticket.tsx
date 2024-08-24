import * as Input from '@/components/Input'
import { BanknoteIcon } from 'lucide-react'
import { Goal } from '@/context/models/goals'

interface AverageTicketSectionProps {
  formState: Goal
  handleNestedInputChange: <
    K extends keyof Goal,
    S extends keyof NonNullable<Goal[K]>,
  >(
    field: K,
    subField: S,
    value: NonNullable<Goal[K]>[S],
  ) => void
}

export default function AverageTicketSection({
  formState,
  handleNestedInputChange,
}: AverageTicketSectionProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
      <div className="flex flex-col flex-grow">
        <span
          // htmlFor="averageTicket"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Meta de Ticket Médio (R$)
        </span>
        <Input.Root>
          <Input.Prefix>
            <BanknoteIcon className="w-4 h-4" />
          </Input.Prefix>
          <Input.Control
            id="averageTicketTarget.target"
            placeholder="Ex: 140"
            type="currency"
            value={formState.averageTicketTarget?.target}
            onChange={(e) =>
              handleNestedInputChange(
                'averageTicketTarget',
                'target',
                Number(e.target.value.replace(/\D/g, '')),
              )
            }
          />
        </Input.Root>
      </div>
      <div className="flex flex-col w-28">
        <span
          // htmlFor="averageTicketBonus"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Bônus (R$)
        </span>
        <Input.Root>
          <Input.Control
            id="averageTicketTarget.bonus"
            placeholder="Ex: 140"
            type="currency"
            value={formState.averageTicketTarget?.bonus}
            onChange={(e) =>
              handleNestedInputChange(
                'averageTicketTarget',
                'bonus',
                Number(e.target.value.replace(/\D/g, '')),
              )
            }
          />
        </Input.Root>
      </div>
    </div>
  )
}
