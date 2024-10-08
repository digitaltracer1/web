'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useSeller } from '@/context/seller-context'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { BadgeInfo, BanknoteIcon, Hash } from 'lucide-react'
import Link from 'next/link'
import { SellerProps } from './page'
import { useEffect } from 'react'

export function formatNumber(value: number): string {
  if (value >= 1e6) {
    return (value / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (value >= 1e3) {
    return (value / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return value.toFixed(2).replace(/\.?0+$/, '')
}

export default function TopClientsList({ params }: SellerProps) {
  const { loading, clients, fetchSalesByClients, dateRange } = useSeller()

  useEffect(() => {
    fetchSalesByClients(dateRange.dateFrom, dateRange.dateTo, params.id)
  }, [dateRange.dateFrom, dateRange.dateTo, params.id])

  const sortedClients = clients.sort((a, b) => {
    return b.valueBought - a.valueBought
  })

  return (
    <div className="h-full flex flex-col">
      <div className="relative w-full p-2 mb-2 h-8 flex items-center justify-between">
        <div className="absolute text-sm font-bold font-sans left-1/2 transform -translate-x-1/2">
          <h1>Top Clientes</h1>
        </div>
        <div className="flex pr-2 ml-auto">
          <Link href={`${params.id}/top-clients`}>
            <div className="flex items-center group">
              <BadgeInfo
                size={15}
                className="text-gray-800 dark:text-gray-500 group-hover:text-orange-500"
              />
              <p className="px-2 text-xs text-gray-800 dark:text-gray-500 font-extrabold group-hover:text-orange-500">
                Detalhado
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex-grow w-full">
        {loading.fetchClients ? (
          <div className="px-2 h-full ">
            <ScrollArea.Root className="w-full" type="scroll">
              <ScrollArea.Viewport className="w-full overflow-y-scroll">
                <ul className="p-2 h-80 space-y-2">
                  {[...Array(10)].map((_, index) => (
                    <li
                      key={index}
                      className="h-10 px-2 border rounded-md flex items-center shadow-md border-zinc-200 dark:border-zinc-600 dark:bg-zinc-700 justify-between"
                    >
                      <Skeleton className="h-4 w-36" />
                      <div className="flex text-xs justify-end items-center gap-2">
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className="flex h-0.5 touch-none select-none flex-col bg-zinc-100"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </div>
        ) : (
          <div className="px-2 h-full ">
            <ScrollArea.Root className="w-full" type="scroll">
              <ScrollArea.Viewport className="w-full overflow-y-scroll">
                <ul className="p-2 h-80 space-y-2">
                  {sortedClients.map((client, index) => (
                    <li
                      key={index}
                      className="h-10 px-2 border rounded-md flex items-center shadow-md border-zinc-200 dark:border-zinc-600 dark:bg-zinc-700 justify-between"
                    >
                      <span className="truncate w-36 text-xs font-normal">
                        {client.clientName}
                      </span>
                      <div className="flex text-xs justify-end items-center gap-2">
                        {/* Container para quantidade */}
                        <div className="flex items-center">
                          <Hash size={15} />
                          <p className="px-2 font-extrabold">
                            {client.amountBought}
                          </p>
                        </div>

                        {/* Container para valor */}
                        <div className="flex items-center">
                          <BanknoteIcon size={15} />
                          <p className="px-2 font-extrabold">
                            {formatNumber(client.valueBought)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className="flex h-0.5 touch-none select-none flex-col bg-zinc-100"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </div>
        )}
      </div>
    </div>
  )
}
