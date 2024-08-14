import * as Input from '@/components/Input'
import { Goal } from '@/context/models/goals'
import { BanknoteIcon } from 'lucide-react'

interface NewCustomersTargetSectionProps {
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

export default function NewCustomersTargetSection({
  formState,
  handleNestedInputChange,
}: NewCustomersTargetSectionProps) {
  return (
    <div className="flex flex-col gap-3 pt-5 lg:grid lg:grid-cols-form">
      <label
        htmlFor="newCustomersTarget"
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300 justify-center content-center"
      >
        Vender para Clientes Novos
      </label>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div>
          <label
            htmlFor="salesTarget"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Quantidade de Clientes
          </label>
          <Input.Root>
            <Input.Control
              id="newCustomersTarget.quantinty"
              placeholder="Quantidade de Clientes"
              type="number"
              value={formState.newCustomersTarget?.quantity}
              onChange={(e) =>
                handleNestedInputChange(
                  'newCustomersTarget',
                  'quantity',
                  Number(e.target.value),
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
            Valor Mínimo (R$)
          </label>
          <Input.Root>
            <Input.Prefix>
              <BanknoteIcon className="w-4 h-4" />
            </Input.Prefix>
            <Input.Control
              id="newCustomersTarget.minAmount"
              placeholder="Valor Mínimo (R$)"
              type="currency"
              value={formState.newCustomersTarget?.minAmount}
              onChange={(e) =>
                handleNestedInputChange(
                  'newCustomersTarget',
                  'minAmount',
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
              id="newCustomersTarget.bonus"
              placeholder="Bônus (R$)"
              type="currency"
              value={formState.newCustomersTarget?.bonus}
              onChange={(e) =>
                handleNestedInputChange(
                  'newCustomersTarget',
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
