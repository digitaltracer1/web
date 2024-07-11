'use client'

import { useSeller } from '@/context/seller-context'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const LineChart = dynamic(
  () => import('@/components/charts/apexchart/linechart'),
  { ssr: false },
)

interface DataPoint {
  x: number // Unix timestamp (data em milissegundos)
  y: number // Valor do ticket médio
  orderId: string
}

export function AverageTicketChart() {
  const { client } = useSeller()

  const averageTicketSales: DataPoint[] =
    client?.sales
      .filter((item) => item.totalOrderValue !== undefined)
      .map((item) => {
        return {
          x: new Date(item.date).getTime(),
          y: item.totalOrderValue as number,
          orderId: item.orderId as string,
        }
      }) || []

  const averageTicket = client?.averageTicket ?? 0

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LineChart
        name={`${client?.clientName}`}
        data={averageTicketSales}
        averageTicket={averageTicket}
      />
    </Suspense>
  )
}
