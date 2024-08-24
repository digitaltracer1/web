import * as Input from '@/components/Input'
import { Goal } from '@/context/models/goals'
import { PercentIcon } from 'lucide-react'

interface CancellationRateSectionProps {
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

export default function CancellationRateSection({
  formState,
  handleNestedInputChange,
}: CancellationRateSectionProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
      <div className="flex flex-col flex-grow">
        <span
          // htmlFor="cancellationRate"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Taxa de Can/Dev Máxima (%)
        </span>
        <Input.Root>
          <Input.Prefix>
            <PercentIcon className="w-4 h-4" />
          </Input.Prefix>
          <Input.Control
            id="cancellationRate.target"
            type="number"
            placeholder="Ex: 4"
            value={formState.cancellationRate?.target}
            onChange={(e) =>
              handleNestedInputChange(
                'cancellationRate',
                'target',
                Number(e.target.value),
              )
            }
          />
        </Input.Root>
      </div>
      <div className="flex flex-col w-28">
        <span
          // htmlFor="cancellationBonus"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Bônus (R$)
        </span>
        <Input.Root>
          <Input.Control
            id="cancellationRate.bonus"
            placeholder="Ex: 100"
            type="currency"
            value={formState.cancellationRate?.bonus}
            onChange={(e) =>
              handleNestedInputChange(
                'cancellationRate',
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
