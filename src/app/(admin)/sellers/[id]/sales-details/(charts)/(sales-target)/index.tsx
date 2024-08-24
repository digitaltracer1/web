'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSeller } from '@/context/seller-context'
import { CalendarIcon } from '@radix-ui/react-icons'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { SellerProps } from '../../../page'
import { SalesData } from './sales-target-chart'

const SalesTargetChart = dynamic(() => import('./sales-target-chart'), {
  ssr: false,
})
const urlBaseApi = process.env.NEXT_PUBLIC_API_URL

const fetchSalesData = async (
  sellerId: string,
  dateFrom: Date,
  dateTo: Date,
) => {
  // Mock API call to fetch sales data
  const response = await fetch(`${urlBaseApi}/v1/siac/sales-by-seller`, {
    method: 'POST',
    body: JSON.stringify({
      sellerId,
      dateFrom: dateFrom ? new Date(dateFrom) : new Date(),
      dateTo: dateTo ? new Date(dateTo) : new Date(),
      filter: 'amount',
    }),
    headers: { 'Content-Type': 'application/json' },
    cache: 'force-cache',
    next: { revalidate: 1800 },
  })

  const data = await response.json()
  return data
}

export default function ChartSalesTarget({ params }: SellerProps) {
  const { dateRange } = useSeller()
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [period, setPeriod] = useState('day')

  useEffect(() => {
    const getData = async () => {
      const data = await fetchSalesData(
        params.id,
        dateRange.dateFrom,
        dateRange.dateTo,
      )
      setSalesData(data)
    }
    getData()
  }, [dateRange.dateFrom, dateRange.dateTo, params.id])

  const totalSold = salesData
    .reduce((acc, item) => acc + item.totalValue, 0)
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

  return (
    <div className="w-full h-full p-2">
      <div className="flex justify-between space-x-2 pr-2">
        <div>{`Total vendido no periodo ${totalSold}`}</div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CalendarIcon className="w-6 h-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setPeriod('day')}>
              Dia
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPeriod('week')}>
              Semana
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="h-full">
        <SalesTargetChart data={salesData} period={period} />
      </div>
    </div>
  )
}
