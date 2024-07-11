'use client'

import { formatAbbreviatedValue } from '@/utils/formatAbbreviatedValue'
import { ApexOptions } from 'apexcharts'
import { useTheme } from 'next-themes'
import Chart from 'react-apexcharts'

interface DataPoint {
  x: number // Unix timestamp (data em milissegundos)
  y: number // Valor do ticket médio
  orderId: string
}

interface LineChartProps {
  name: string // Nome da série (e.g., 'Ticket Médio')
  data: DataPoint[] // Array de pontos de dados
  averageTicket: number //
}

export default function LineChart({
  data,
  name,
  averageTicket,
}: LineChartProps) {
  const { theme } = useTheme()

  const upperIntervalStart = averageTicket * 1.25 // Exemplo: 25% acima do valor médio
  const upperIntervalEnd = averageTicket * 1.5 // Exemplo: 50% acima do valor médio

  const series = [
    {
      name,
      data,
    },
  ]

  const chartOptions: ApexOptions = {
    theme: {
      mode: theme === 'light' ? 'light' : 'dark',
    },

    chart: {
      height: 350,
      type: 'line',
      id: 'areachart-2',
      background: 'transparent',
    },
    annotations: {
      yaxis: [
        {
          y: averageTicket,
          borderColor: '#00E396',
          label: {
            borderColor: '#00E396',
            style: {
              color: '#fff',
              background: '#00E396',
            },
            text: `Média ${averageTicket}`,
          },
        },
        {
          y: upperIntervalStart,
          y2: upperIntervalEnd,
          borderColor: '#000',
          fillColor: '#FEB019',
          opacity: 0.2,
          label: {
            borderColor: '#333',
            style: {
              fontSize: '10px',
              color: '#333',
              background: '#FEB019',
            },
            text: 'Intervalo Superior',
          },
        },
      ],
      // xaxis: [
      //   {
      //     x: new Date('05 jul 2024').getTime(),
      //     strokeDashArray: 0,
      //     borderColor: '#775DD0',
      //     label: {
      //       borderColor: '#775DD0',
      //       style: {
      //         color: '#fff',
      //         background: '#775DD0',
      //       },
      //       text: 'Meta Alcançada',
      //     },
      //   },
      // ],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    grid: {
      padding: {
        right: 30,
        left: 20,
      },
    },
    title: {
      text: `${name}`,
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return `R$ ${formatAbbreviatedValue(value)}`
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return `R$ ${value.toFixed(2).replace('.', ',')}`
        },
      },
    },
  }

  return (
    <div className="flex-row h-full w-full p-2 ">
      <Chart options={chartOptions} series={series} type="line" height="100%" />
    </div>
  )
}
