'use client'
import { ApexOptions } from 'apexcharts'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { ComponentProps } from 'react'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export type ApexRadialChartProps = ComponentProps<'div'> & {
  data: {
    labels: string[]
    series: number[]
  }
}

export function ApexRadialChart({ data }: ApexRadialChartProps) {
  const { theme } = useTheme()

  const chartOptions: ApexOptions = {
    responsive: [
      {
        breakpoint: undefined,
        options: {},
      },
    ],
    labels: data.labels,
    series: data.series,
    colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
    chart: {
      type: 'radialBar',
      width: '100%',
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 270,

        hollow: {
          size: '30%',
        },
      },
    },
    legend: {
      show: false,
      labels: {
        colors:
          theme === 'light'
            ? 'rgba(24, 24, 27, 0.5)'
            : 'rgba(244, 244, 245, 1)',
      },
      position: 'left',
      floating: true,
      fontSize: '10px',
      height: 100,
      offsetX: 50,
      itemMargin: {
        horizontal: 0,
        vertical: 0,
      },
    },
  }

  return (
    <div className={`h-full w-full`}>
      <Chart
        options={chartOptions}
        series={data.series}
        type="radialBar"
        width="100%"
        height="100%"
      />
    </div>
  )
}
