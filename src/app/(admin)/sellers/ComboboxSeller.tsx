'use client'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { PopoverContent } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { Popover, PopoverTrigger } from '@radix-ui/react-popover'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'

export interface ICombobox {
  value: string
  label: string
  sellerId?: string
}

export interface ISellers {
  id: string
  name: string
  birthdate: string
}

interface ComboBoxSellerProps {
  selectSeller: (seller: ICombobox | null) => void // Ou ajuste o tipo conforme necessário
}

function capitalizeFirstLetter(str: string) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function ComboBoxSeller({ selectSeller }: ComboBoxSellerProps) {
  const [open, setOpen] = useState(false)
  const [sellers, setSellers] = useState<ICombobox[]>([])
  const sellerCookie = getCookie('sellerId') || '' // Fornecer uma opção padrão
  const initialSellerValue =
    sellers.find((seller) => seller.sellerId === sellerCookie)?.value || ''

  const [value, setValue] = useState(initialSellerValue)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/siac/sellers`,
      )
      const data = await response.json()
      const sellersData = data.sellers as ISellers[]

      const combobox: ICombobox[] = sellersData.map((seller) => ({
        value: seller.name.toLowerCase(),
        label: capitalizeFirstLetter(seller.name.toLowerCase()),
        sellerId: seller.id,
      }))

      if (isMounted) {
        setSellers(combobox)
        if (!value && initialSellerValue) {
          setValue(initialSellerValue)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [value, initialSellerValue])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-56 justify-between"
        >
          {value
            ? sellers.find((seller) => seller.value === value)?.label
            : 'Selecione um vendedor...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" sideOffset={5}>
        <Command>
          <CommandInput placeholder="Pesquise um vendedor..." className="h-9" />
          <CommandEmpty>Nenhum vendedor encontrado.</CommandEmpty>
          <ScrollArea className="h-48">
            <CommandGroup>
              {sellers.map((seller) => (
                <CommandItem
                  key={seller.value}
                  value={seller.value}
                  onSelect={(currentValue) => {
                    const selectedSeller = sellers.find(
                      (s) => s.value === currentValue,
                    )
                    selectSeller(selectedSeller || null)
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  {seller.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === seller.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
