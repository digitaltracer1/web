'use client'

import { ClientSummary } from '@/context/models/sales-data-clients'
import { formatAbbreviatedValue } from '@/utils/formatAbbreviatedValue'
import { ApexOptions } from 'apexcharts'
import { useTheme } from 'next-themes'
import Chart from 'react-apexcharts'

interface LineChartProps {
  data: ClientSummary
}

export default function LineChart({ data }: LineChartProps) {
  const { orders, clientName } = data
  const { theme } = useTheme()

  const averageTicket = data.valueBought / data.amountBought

  // Agrupa as vendas por dia e calcula a quantidade de vendas por dia
  const salesByDay = orders.reduce(
    (acc, order) => {
      const date = new Date(order.date).toLocaleDateString('pt-BR')
      if (!acc[date]) {
        acc[date] = { value: 0, quantity: 0 }
      }
      acc[date].value += order.value
      acc[date].quantity += 1
      return acc
    },
    {} as Record<string, { value: number; quantity: number }>,
  )

  const series = [
    {
      name: 'Valor Vendido',
      type: 'line',
      data: Object.entries(salesByDay).map(([date, { value }]) => ({
        x: new Date(date.split('/').reverse().join('-')).getTime(), // Converte a data para timestamp
        y: value,
      })),
    },
    {
      name: 'Quantidade Vendida',
      type: 'column',
      data: Object.entries(salesByDay).map(([date, { quantity }]) => ({
        x: new Date(date.split('/').reverse().join('-')).getTime(), // Converte a data para timestamp
        y: quantity,
      })),
    },
  ]

  const chartOptions: ApexOptions = {
    theme: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
    chart: {
      height: 350,
      type: 'line',
      background: 'transparent',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    markers: {
      size: 4,
      colors: ['#FFA41B'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    grid: {
      padding: {
        right: 30,
        left: 20,
      },
    },
    title: {
      text: `${clientName} | Ticket médio ${averageTicket.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: false,
      },
    },
    yaxis: [
      {
        title: {
          text: 'Valor Vendido',
        },
        labels: {
          formatter: function (value) {
            return `R$ ${formatAbbreviatedValue(value)}`
          },
        },
      },
      {
        opposite: true,
        title: {
          text: 'Quantidade Vendida',
        },
        labels: {
          formatter: function (value) {
            return `${value}`
          },
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        formatter: function (value: number) {
          const date = new Date(value)
          return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        },
      },
      y: {
        formatter: function (value, { seriesIndex }) {
          if (seriesIndex === 0) {
            return `R$ ${value.toFixed(2).replace('.', ',')}`
          }
          return `${value} pedidos`
        },
      },
    },
  }

  return (
    <div className="flex-row h-full w-full p-2 ">
      {/* <div className="mb-4">
        <span className="text-sm font-semibold">
          Ticket Médio:{' '}
          {averageTicket.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div> */}
      <Chart options={chartOptions} series={series} type="line" height="100%" />
    </div>
  )
}
