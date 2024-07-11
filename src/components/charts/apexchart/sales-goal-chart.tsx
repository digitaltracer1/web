'use client'

import { ApexOptions } from 'apexcharts'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface SalesData {
  period: string
  sales: number
  goal: number
}

export default function SalesGoalChart() {
  const { theme } = useTheme()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [series, setSeries] = useState<any[]>([])

  useEffect(() => {
    // Simulação de dados de vendas e metas
    const mockData: SalesData[] = [
      { period: 'Jan', sales: 10000, goal: 12000 },
      { period: 'Feb', sales: 15000, goal: 14000 },
      { period: 'Mar', sales: 20000, goal: 18000 },
      { period: 'Apr', sales: 18000, goal: 20000 },
      { period: 'May', sales: 22000, goal: 24000 },
      { period: 'Jun', sales: 25000, goal: 26000 },
      { period: 'Jul', sales: 23000, goal: 25000 },
      { period: 'Aug', sales: 24000, goal: 27000 },
      { period: 'Sep', sales: 28000, goal: 30000 },
      { period: 'Oct', sales: 30000, goal: 32000 },
      { period: 'Nov', sales: 32000, goal: 34000 },
      { period: 'Dec', sales: 34000, goal: 36000 },
    ]

    setSeries([
      {
        name: 'Vendas',
        data: mockData.map((data) => data.sales),
      },
      {
        name: 'Meta',
        data: mockData.map((data) => data.goal),
      },
    ])
  }, [])

  const chartOptions: ApexOptions = {
    theme: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
    chart: {
      type: 'bar',
      height: 350,
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    yaxis: {
      title: {
        text: 'Valor em R$',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return `R$ ${val.toLocaleString('pt-BR')}`
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
  }

  return (
    <div className="relative flex flex-col h-full w-full p-2">
      <Chart options={chartOptions} series={series} type="bar" height="100%" />
    </div>
  )
}
