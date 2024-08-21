'use client'

import dynamic from 'next/dynamic'
import { BarChartBrandsProps } from './barchart-goals-brands'
import { useSeller } from '@/context/seller-context'
import { useEffect } from 'react'
import { SellerProps } from '../../../page'
import SkeletonBarChartHorizontal from '@/components/charts/skeletons/barchart-horizontal'

const BarChartBrands = dynamic(() => import('./barchart-goals-brands'), {
  ssr: false,
})

export default function BarchartGoalBrands({ params }: SellerProps) {
  const { goals, fetchGoalsBySeller, loading, dateRange } = useSeller()

  useEffect(() => {
    const month = new Date(dateRange.dateFrom).getMonth() + 1
    const year = new Date(dateRange.dateFrom).getFullYear()
    const sellerId = params.id

    fetchGoalsBySeller(month, year, sellerId)
  }, [dateRange.dateFrom, params.id])

  if (!loading) {
    if (goals?.brandTargets && goals.brandTargets.length === 0) {
      return <SkeletonBarChartHorizontal bar={10} /> // ou qualquer outro indicador de carregamento
    } else if (!goals?.brandTargets || goals.brandTargets.length === 0) {
      return <SkeletonBarChartHorizontal bar={10} />
    }
  }

  const goalsBrand: BarChartBrandsProps = {
    data: goals?.brandTargets
      ? goals.brandTargets.map((goal) => ({
          brandName: goal.brandName,
          salesAchieved: goal.achieved, // Assumindo valor fictício para fins de exemplo
          salesTarget: goal.target,
        }))
      : [],
  }

  return (
    <div className="h-full w-full p-1">
      <BarChartBrands data={goalsBrand.data} />
    </div>
  )
}
