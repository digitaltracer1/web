import * as Input from '@/components/Input'
import { Goal } from '@/context/models/goals'
import { BanknoteIcon } from 'lucide-react'

interface InactiveClientsSectionProps {
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

export default function InactiveClientsSection({
  formState,
  handleNestedInputChange,
}: InactiveClientsSectionProps) {
  return (
    <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
      <span
        // htmlFor="inactiveClients"
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300 justify-center content-center"
      >
        Resgate de Clientes Inativos
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div>
          <span
            // htmlFor="salesTarget"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Quantidade de Clientes
          </span>
          <Input.Root>
            <Input.Control
              id="inactiveClientsTarget.quantity"
              placeholder="Quantidade de Clientes"
              type="number"
              value={formState.inactiveClientsTarget?.quantity}
              onChange={(e) =>
                handleNestedInputChange(
                  'inactiveClientsTarget',
                  'quantity',
                  Number(e.target.value),
                )
              }
            />
          </Input.Root>
        </div>
        <div>
          <span
            // htmlFor="salesTarget"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Valor Mínimo (R$)
          </span>
          <Input.Root>
            <Input.Prefix>
              <BanknoteIcon className="w-4 h-4" />
            </Input.Prefix>
            <Input.Control
              id="inactiveClientsTarget.minAmount"
              placeholder="Valor Mínimo (R$)"
              type="currency"
              value={formState.inactiveClientsTarget?.minAmount}
              onChange={(e) =>
                handleNestedInputChange(
                  'inactiveClientsTarget',
                  'minAmount',
                  Number(e.target.value.replace(/\D/g, '')),
                )
              }
            />
          </Input.Root>
        </div>
        <div>
          <span
            // htmlFor="salesTarget"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Bônus (R$)
          </span>
          <Input.Root>
            <Input.Prefix>
              <BanknoteIcon className="w-4 h-4" />
            </Input.Prefix>
            <Input.Control
              id="inactiveClientsTarget.bonus"
              placeholder="Bônus (R$)"
              type="currency"
              value={formState.inactiveClientsTarget?.bonus}
              onChange={(e) =>
                handleNestedInputChange(
                  'inactiveClientsTarget',
                  'bonus',
                  Number(e.target.value.replace(/\D/g, '')),
                )
              }
            />
          </Input.Root>
        </div>
      </div>
    </div>
  )
}
