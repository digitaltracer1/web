'use client'
// import { ApexDoughnutChart } from '@/components/charts/ApexDoughnutChart'
// import { ApexRadialChartProps } from '@/components/charts/ApexRadialBarChart'
import DonutChart from '@/components/charts/rechart/sales-goal-chart'
import { useSeller } from '@/context/seller-context'
import { SellerProps } from '../page'
import { Hash, BanknoteIcon, BadgeInfo } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function ChartSeller({ params }: SellerProps) {
  const { fetchSalesSeller, dateRange, summarySeller } = useSeller()

  useEffect(() => {
    fetchSalesSeller(dateRange.dateFrom, dateRange.dateTo, params.id)
  }, [dateRange.dateFrom, dateRange.dateTo, params.id])

  let resultSold = 0
  let resultAmmount = 0

  if (summarySeller) {
    const totalDevoCanc =
      (summarySeller.valueCanceled ?? 0) + (summarySeller.valueDevolution ?? 0)
    resultSold = (summarySeller.valueSold ?? 0) - totalDevoCanc
    const totalDevoCancAmmount =
      (summarySeller.canceledAmount ?? 0) +
      (summarySeller.devolutionAmount ?? 0)
    resultAmmount = (summarySeller.soldAmount ?? 0) - totalDevoCancAmmount
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex text-sm w-full justify-center items-center gap-4 pt-1 ">
        {/* Container para quantidade */}
        <div className="flex items-center">
          <Hash size={15} className="text-gray-800 dark:text-gray-500" />
          <p className="px-2 text-gray-800 dark:text-gray-500 font-extrabold">
            {resultAmmount}
          </p>
        </div>

        {/* Container para valor */}
        <div className="flex items-center">
          <BanknoteIcon
            size={15}
            className="text-gray-800 dark:text-gray-500"
          />
          <p className="px-2 text-gray-800 dark:text-gray-500 font-extrabold ">
            {summarySeller
              ? resultSold.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              : 0}
          </p>
        </div>

        {/* Details */}
        <Link href={`${params.id}/sales-details`}>
          <div className="flex items-center group">
            <BadgeInfo
              size={15}
              className="text-gray-800 dark:text-gray-500 group-hover:text-orange-500"
            />
            <p className="px-2 text-gray-800 dark:text-gray-500 font-extrabold group-hover:text-orange-500">
              Detalhado
            </p>
          </div>
        </Link>
      </div>
      <div className="flex-grow w-full">
        <DonutChart
          name={'Meta'}
          data={{
            total: 210000,
            value: resultSold,
          }}
        />
      </div>
    </div>
  )
}
