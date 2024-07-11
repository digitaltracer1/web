'use client'

import { formatAbbreviatedValue } from '@/utils/formatAbbreviatedValue'
import { ApexOptions } from 'apexcharts'
import { useTheme } from 'next-themes'
import Chart from 'react-apexcharts'
import 'tailwindcss/tailwind.css'

interface DataProps {
  brandName: string
  salesTarget: number
  salesAchieved: number
}

export interface BarChartBrandsProps {
  data: DataProps[]
}

export default function BarChartBrands({ data }: BarChartBrandsProps) {
  const { theme } = useTheme()

  const series = [
    {
      name: 'Atual',
      data: data.map((item) => ({
        x: item.brandName,
        y: item.salesAchieved,
        goals: [
          {
            name: 'Meta',
            value: item.salesTarget,
            strokeHeight: 5,
            strokeColor: '#ff9000',
          },
        ],
      })),
    },
  ]

  const options: ApexOptions = {
    theme: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
    chart: {
      id: 'GoalByBrand',
      background: 'transparent',
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
      background: {
        foreColor: '#000',
      },
    },
    stroke: {
      show: true,
      width: 2,
    },
    title: {
      text: 'Metas de Marcas',
      align: 'center',
    },
    xaxis: {
      categories: data.map((item) => item.brandName),
    },
    yaxis: {
      title: {
        text: 'Valor',
      },
      labels: {
        formatter: function (value) {
          return `R$ ${formatAbbreviatedValue(value)}`
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) =>
          `R$ ${val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`, // Formata como moeda
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Atual', 'Meta'],
      markers: {
        fillColors: ['#36a2eb', '#ff9000'],
      },
    },
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Chart options={options} series={series} type="bar" height="100%" />
    </div>
  )
}
