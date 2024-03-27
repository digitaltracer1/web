'use client'
// import { ApexDoughnutChart } from '@/components/charts/ApexDoughnutChart'
// import { ApexRadialChartProps } from '@/components/charts/ApexRadialBarChart'
import DonutChart from '@/components/charts/rechart/sales-goal-chart'

// const chartData: ApexRadialChartProps['data'] = {
//   labels: [
//     'Category 1',
//     'Category 2',
//     'Category 3',
//     'Category 4',
//     'Category 5',
//   ],
//   series: [30, 40, 25, 15, 20],
// }

export default function ChartSeller() {
  return <DonutChart />
}
