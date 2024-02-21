'use client'
import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import { useTheme } from 'next-themes'
import DynamicWrapper from './DynamicWrapper'

export interface ApexDoughnutChartProps {
  data: {
    labels: string[]
    series: number[]
  }
}

const dark = [
  'rgba(255, 99, 132, 0.5)',
  'rgba(54, 162, 235, 0.5)',
  'rgba(255, 206, 86, 0.5)',
  'rgba(75, 192, 192, 0.5)',
  'rgba(153, 102, 255, 0.5)',
  'rgba(255, 159, 64, 0.5)',
]
const light = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
]

export function ApexDoughnutChart({ data }: ApexDoughnutChartProps) {
  const { theme } = useTheme()

  const backgroundColor = theme === 'light' ? light : dark

  const chartOptions: ApexOptions = {
    stroke: {
      colors: backgroundColor,
    },
    labels: data.labels,
    colors: backgroundColor,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '80%',
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              fontSize: '1rem',
              color:
                theme === 'light'
                  ? 'rgba(24, 24, 27, 0.5)'
                  : 'rgba(244, 244, 245, 1)',
              formatter(val) {
                return `R$ ${Number(val).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              },
            },
          },
        },
      },
    },
    tooltip: {
      enabled: false,
    },
  }

  return (
    <DynamicWrapper>
      <div className="h-full w-full">
        <Chart options={chartOptions} series={data.series} type="donut" />
      </div>
    </DynamicWrapper>
  )
}

// function formatCurrency(value: number) {
//   // Verifica se o valor é um número
//   if (typeof value !== 'number') {
//     return value // Retorna o valor original se não for um número
//   }

//   // Formata o número para moeda brasileira (Real - R$)
//   return value.toLocaleString('pt-BR', {
//     style: 'currency',
//     currency: 'BRL',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })
// }
