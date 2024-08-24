'use client'

import SkeletonBarChartHorizontal from '@/components/charts/skeletons/barchart-horizontal'
import { useSeller } from '@/context/seller-context'
import { formatAbbreviatedValue } from '@/utils/formatAbbreviatedValue'
import { ApexOptions } from 'apexcharts'
import { useTheme } from 'next-themes'
import { useMemo } from 'react'
import Chart from 'react-apexcharts'

export interface SalesData {
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
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
        const pastDaysOfMonth = Math.floor(
          (date.getTime() - startOfMonth.getTime()) / 86400000,
        )
        const weekNumber = Math.ceil(
          (pastDaysOfMonth + startOfMonth.getDay() + 1) / 7,
        )
        key = `W${weekNumber}`
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

    return Object.entries(groupedData)
      .map(([date, totalValue]) => ({
        date,
        totalValue,
      }))
      .sort((a, b) => {
        if (period === 'week') {
          // Extrair o número da semana e ordenar numericamente
          const weekA = parseInt(a.date.replace('W', ''), 10)
          const weekB = parseInt(b.date.replace('W', ''), 10)
          return weekA - weekB
        }
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
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
      floating: false,
      labels: {
        show: true,
        formatter: function (value) {
          if (period === 'day') {
            const date = new Date(value)

            // Obter o dia, mês e ano abreviado
            const day = date.getDate().toString().padStart(2, '0') // "23"
            const month = (date.getMonth() + 1).toString().padStart(2, '0') // "08"
            const year = date.getFullYear().toString().slice(-2) // "24"

            // Formatar a data com o ano abreviado
            const formattedDate = `${day}/${month}/${year}`
            // Exibir apenas o número do dia
            return formattedDate
          }
          return value
        },
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
      enabled: false,
      distributed: true,
      formatter: function (value) {
        return `R$ ${formatAbbreviatedValue(Number(value))}` // Remove o símbolo duplicado
      },
      offsetY: 0,
      offsetX: 0,
      style: {
        colors: [`${theme === 'dark' ? '#fff' : '#000'}`],
        fontWeight: 'bold',
        fontSize: '14px',
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'center', // Posicionar as labels no topo da barra
          orientation: 'vertical',
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
