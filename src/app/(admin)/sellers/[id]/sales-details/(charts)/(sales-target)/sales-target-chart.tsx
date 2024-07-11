'use client'

import SkeletonBarChartHorizontal from '@/components/charts/skeletons/barchart-horizontal'
import { useSeller } from '@/context/seller-context'
import { formatAbbreviatedValue } from '@/utils/formatAbbreviatedValue'
import { ApexOptions } from 'apexcharts'
import { useTheme } from 'next-themes'
import { useMemo } from 'react'
import Chart from 'react-apexcharts'

interface SalesData {
  date: string
  totalValue: number
}

interface SalesChartProps {
  data: SalesData[]
  period: string
}

const SalesTargetChart = ({ data, period }: SalesChartProps) => {
  const { theme } = useTheme()
  const { loading } = useSeller()

  // Function to group data by the selected period
  const groupDataByPeriod = (data: SalesData[], period: string) => {
    const groupedData: { [key: string]: number } = {}

    data.forEach((item) => {
      const date = new Date(item.date)
      let key = ''

      if (period === 'day') {
        key = date.toISOString().split('T')[0]
      } else if (period === 'week') {
        const week = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`
        key = week
      } else if (period === 'month') {
        key = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}`
      } else if (period === 'year') {
        key = `${date.getFullYear()}`
      }

      if (!groupedData[key]) {
        groupedData[key] = 0
      }
      groupedData[key] += item.totalValue
    })

    return Object.entries(groupedData).map(([date, totalValue]) => ({
      date,
      totalValue,
    }))
  }

  const filteredData = useMemo(
    () => groupDataByPeriod(data, period),
    [data, period],
  )

  const series = [
    {
      name: 'Total Vendido',
      data: filteredData.map((item) => item.totalValue),
    },
  ]

  const options: ApexOptions = {
    theme: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
    chart: {
      id: 'salesChart',
      background: 'transparent',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: filteredData.map((item) => item.date),
      labels: {
        show: true,
      },
    },
    yaxis: {
      title: {
        text: 'Valor Total',
      },
      labels: {
        formatter: function (value) {
          return `R$ ${formatAbbreviatedValue(value)}`
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (value) {
        return `R$ ${value
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
          .replace('R$', '')}` // Remove o símbolo duplicado
      },
      offsetY: -20, // Move as labels para cima
      style: {
        colors: [`${theme === 'dark' ? '#fff' : '#000'}`],
        fontWeight: 'bold',
        fontSize: '14px',
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top', // Posicionar as labels no topo da barra
        },
      },
    },
    stroke: {
      show: true,
      width: 2,
    },
    tooltip: {
      y: {
        formatter: (val: number) =>
          `R$ ${val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`,
      },
    },
  }

  if (!loading || data.length === 0) {
    return (
      <div className="h-full flex flex-col items-center space-y-4">
        <SkeletonBarChartHorizontal bar={10} />
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Chart options={options} series={series} type="bar" height="100%" />
    </div>
  )
}

export default SalesTargetChart
