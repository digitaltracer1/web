'use client'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import SaleBySeller from './SaleBySeller'

interface ICombobox {
  value: string
  label: string
}

interface ISellers {
  id: string
  name: string
  birthdate: string
}

function capitalizeFirstLetter(str: string) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function Sellers() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [sellers, setSellers] = useState<ICombobox[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://digitaltracer.ddns.com.br/v1/siac/sellers',
        )
        const data = await response.json()
        const sellers = data.sellers as ISellers[]
        const combobox: ICombobox[] = sellers.map((seller) => ({
          value: seller.name.toLowerCase(),
          label: capitalizeFirstLetter(seller.name.toLowerCase()),
        }))
        setSellers(combobox)
      } catch (error) {
        console.error('Error fetching sellers:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="sticky lg:top-0  bg-white dark:bg-zinc-900 z-10 ">
        <div className="flex items-center gap-10 lg:gap-20 pb-4">
          <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
            Vendedores
          </h1>
        </div>

        {/* combobox */}
        <div className="py-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-56 lg:w-72 lg:h-14 lg:text-base justify-between"
              >
                {value
                  ? sellers.find((seller) => seller.value === value)?.label
                  : 'Selecione um vendedor...'}
                <CaretSortIcon className="ml-2 h-4 w-4 lg:h-6 lg:w-6 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 lg:w-72 p-0 " sideOffset={5}>
              <Command>
                <CommandInput
                  placeholder="Pesquise um vendedor..."
                  className="h-9 lg:h-14 lg:text-base "
                />
                <CommandEmpty>Nenhum vendedor encontrado.</CommandEmpty>
                <ScrollArea className="h-48 lg:h-56 ">
                  <CommandGroup>
                    {sellers.map((seller) => (
                      <CommandItem
                        className="lg:text-base"
                        key={seller.value}
                        value={seller.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? '' : currentValue)
                          setOpen(false)
                        }}
                      >
                        {seller.label}
                        <CheckIcon
                          className={cn(
                            'ml-auto h-4 w-4 lg:h-6 lg:w-6',
                            value === seller.value
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </ScrollArea>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="w-1/2">
        <SaleBySeller />
      </div>
    </>
  )
}
