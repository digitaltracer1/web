import React from 'react'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export interface RadialProps {
  name: string
  data: {
    total: number
    totalValue: number
    canceled: number
    totalCanceled: number
  }
}

export default function RadialBarChart({ name, data }: RadialProps) {
  const { theme } = useTheme()

  const percent =
    parseFloat(((data?.canceled / data?.total) * 100).toFixed(2)) || 0

  const chartOptions: ApexOptions = {
    series: [percent],
    chart: {
      height: '100%',
      width: '100%',
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        // offsetY: -15,
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: theme === 'dark' ? 0.24 : 0,
          },
        },
        track: {
          background: theme === 'dark' ? '#333' : '#dbdbdb',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: theme === 'dark' ? 0.35 : 0,
          },
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: '10px',
            offsetY: -15,
          },
          value: {
            fontSize: '15px',
            fontWeight: 'bold',
            color: theme === 'dark' ? '#808080' : '#404040',
            formatter: function (val: number) {
              return `${val}%`
            },
            offsetY: -5,
          },
        },
      },
    },
    labels: [name || ''],
    colors: theme === 'dark' ? ['#bfbfbf'] : ['#404040'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: theme === 'dark' ? ['#a7a7a7'] : ['#202020'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0.5,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
  }

  return (
    <div className="h-full w-full">
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="radialBar"
        width="100%"
        height="auto"
      />
    </div>
  )
}
