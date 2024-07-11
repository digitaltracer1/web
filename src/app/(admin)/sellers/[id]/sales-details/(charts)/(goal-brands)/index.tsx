import dynamic from 'next/dynamic'
import { BarChartBrandsProps } from './barchart-goals-brands'

const BarChartBrands = dynamic(() => import('./barchart-goals-brands'), {
  ssr: false,
})

const mockData: BarChartBrandsProps = {
  data: [
    { brandName: 'Ranalle', salesTarget: 12000, salesAchieved: 8000 },
    { brandName: 'Volda', salesTarget: 13000, salesAchieved: 9500 },
    { brandName: 'Sintech', salesTarget: 7500, salesAchieved: 7000 },
    { brandName: 'Japan Parts', salesTarget: 7000, salesAchieved: 6500 },
    { brandName: 'Corteco', salesTarget: 7000, salesAchieved: 6000 },
    { brandName: 'Sampel', salesTarget: 8000, salesAchieved: 7500 },
  ],
}

export default function BarchartGoalBrands() {
  return (
    <div className="h-full w-full p-1">
      <BarChartBrands data={mockData.data} />
    </div>
  )
}
