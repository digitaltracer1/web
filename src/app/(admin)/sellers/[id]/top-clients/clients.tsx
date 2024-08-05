'use client'

import { Button } from '@/components/Button'
import * as Input from '@/components/Input'
import { Avatar } from '@/components/Sidebar/Avatar'
import ToggleButton from '@/components/ToggleButton'
import { capitalizeFirstLetter } from '@/components/info-list-seller'
import { Skeleton } from '@/components/ui/skeleton'
import { useSeller } from '@/context/seller-context'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { BanknoteIcon, Hash, SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

function formatNumber(value: number): string {
  if (value >= 1e6) {
    return (value / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (value >= 1e3) {
    return (value / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return value.toFixed(2).replace(/\.?0+$/, '')
}

export default function Clients({ id }: { id: string }) {
  const { loading, clients, fetchSalesByClients, findClientById, dateRange } =
    useSeller()

  const [sortBy, setSortBy] = useState<'value' | 'count'>('value')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchSalesByClients(dateRange.dateFrom, dateRange.dateTo, id)
  }, [dateRange.dateFrom, dateRange.dateTo, id])

  const handleToggle = (selected: string) => {
    setSortBy(selected === 'Valor' ? 'value' : 'count')
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const filteredClients = clients.filter((client) =>
    client.clientName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedClients = filteredClients.sort((a, b) => {
    if (sortBy === 'value') {
      return b.valueBought - a.valueBought
    }
    return b.amountBought - a.amountBought
  })

  return (
    <div className="flex flex-col w-full h-full">
      <div className="m-2 ">
        <Input.Root>
          <Input.Prefix>
            <SearchIcon className="h-5 w-5 text-zinc-500" />
          </Input.Prefix>
          <Input.Control
            id="clientName"
            type="search"
            placeholder="Digite o nome do seu cliente"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Input.Root>
        <div className="p-4">
          <ToggleButton
            options={['Valor', 'Quantidade']}
            onToggle={handleToggle}
          />
        </div>
      </div>

      <ScrollArea.Root
        className="w-full h-[38rem] overflow-hidden"
        type="scroll"
      >
        <ScrollArea.Viewport className="w-full h-full rounded overflow-y-scroll">
          {loading && sortedClients.length > 0 ? (
            <div className="flex flex-col">
              {sortedClients.map((client) => (
                <Button
                  variant="ghost"
                  key={client.clientId}
                  className="w-full"
                  onClick={() => findClientById(client.clientId)}
                >
                  <div className="flex items-center p-2 border-b cursor-pointer dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-orange-300 dark:hover:ring-orange-500/20 hover:border-orange-300 hover:ring-4 hover:ring-orange-100 border border-zinc-300 shadow-sm rounded-lg w-full">
                    <Avatar
                      user={{
                        name: client.clientName.replace(/\s*\([^)]*\)\s*/g, ''),
                        email: `${client.businessName}@gmail.com`,
                      }}
                    />
                    <div className="ml-4 text-left flex-grow overflow-hidden">
                      <div className="font-medium w-44 truncate">
                        {capitalizeFirstLetter(client.clientName.toLowerCase())}
                      </div>
                      <div className="text-sm text-gray-600 w-44 truncate">
                        {client.address}
                      </div>
                      <div className="text-xs text-gray-500 w-44 truncate">
                        {client.businessName ? (
                          client.businessName
                        ) : (
                          <>&nbsp;</>
                        )}
                      </div>
                    </div>
                    <div className="ml-auto text-sm flex flex-col justify-center items-end space-y-2">
                      <div className="flex items-center">
                        <BanknoteIcon size={15} />
                        <p className="px-2 font-extrabold">
                          {formatNumber(client.valueBought)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Hash size={15} />
                        <p className="px-2 font-extrabold">
                          {client.amountBought}
                        </p>
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          ) : (
            <div className="py-4 space-y-4 flex flex-col mx-4">
              {Array.from({ length: 10 }, (_, index) => (
                <Skeleton
                  key={index}
                  className="flex items-center p-4 border-b shadow-sm rounded-lg border dark:border-zinc-700 dark:bg-zinc-800 w-full"
                >
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="ml-4 space-y-2 flex-grow">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                  <div className="ml-auto space-y-2 items-end">
                    <Skeleton className="h-4 w-[50px]" />
                    <Skeleton className="h-4 w-[50px]" />
                  </div>
                </Skeleton>
              ))}
            </div>
          )}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex h-0.5 touch-none select-none flex-col bg-zinc-100"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  )
}
