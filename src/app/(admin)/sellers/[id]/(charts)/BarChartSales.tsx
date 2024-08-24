'use client'
import { useSeller } from '@/context/seller-context'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { SellerProps } from '../page'

const BarChartDataSales = dynamic(
  () => import('@/components/charts/apexchart/barchartsales/groups'),
  { ssr: false },
)

export default function BarChartSales({ params }: SellerProps) {
  const { fetchSalesByGroup, salesByGroup, dateRange } = useSeller()

  useEffect(() => {
    fetchSalesByGroup(dateRange.dateFrom, dateRange.dateTo, params.id)
  }, [dateRange.dateFrom, dateRange.dateTo, params.id])

  // Ordena os grupos por totalValueSold e pega os 10 primeiros
  const topSalesByGroup = salesByGroup
    .sort((a, b) => b.totalValueSold - a.totalValueSold)
    .slice(0, 10)

  return <BarChartDataSales dataSales={topSalesByGroup} />
}
