import * as Input from '@/components/Input'
import { BanknoteIcon } from 'lucide-react'
import { Goal } from '@/context/models/goals'

interface SalesTargetSectionProps {
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

export default function SalesTargetSection({
  formState,
  handleNestedInputChange,
}: SalesTargetSectionProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
      <div className="flex flex-col flex-grow">
        <span
          // htmlFor="salesTarget"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Meta de Vendas (R$)
        </span>
        <Input.Root>
          <Input.Prefix>
            <BanknoteIcon className="w-4 h-4" />
          </Input.Prefix>
          <Input.Control
            id="salesTarget.target"
            placeholder="Ex: 210000"
            type="currency"
            value={formState.salesTarget?.target}
            onChange={(e) =>
              handleNestedInputChange(
                'salesTarget',
                'target',
                Number(e.target.value.replace(/\D/g, '')),
              )
            }
          />
        </Input.Root>
      </div>
      <div className="flex flex-col w-28">
        <span
          // htmlFor="salesBonus"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Bônus (R$)
        </span>
        <Input.Root>
          <Input.Control
            id="salesTarget.bonus"
            type="currency"
            placeholder="Ex: 200"
            value={formState.salesTarget?.bonus}
            onChange={(e) =>
              handleNestedInputChange(
                'salesTarget',
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
