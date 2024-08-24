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

  const createAcronym = (brandName: string) => {
    const words = brandName.split(' ')
    if (words.length === 1) {
      return words[0].substring(0, 3).toUpperCase()
    } else {
      return words
        .slice(0, 3)
        .map((word) => word[0])
        .join('')
        .toUpperCase()
    }
  }

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
      labels: {
        show: true,
        formatter: function (value) {
          return createAcronym(value)
        },
      },
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
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const brandName = data[dataPointIndex].brandName
        const salesAchieved = series[seriesIndex][dataPointIndex]
        const salesTarget = data[dataPointIndex].salesTarget

        const backgroundColor = theme === 'dark' ? '#0b1212' : '#eceff1'
        const textColor = theme === 'dark' ? '#ffffff' : '#000000'
        const borderColor = theme === 'dark' ? '#444444' : '#dddddd'
        const boxShadow =
          theme === 'dark'
            ? '0px 4px 8px rgba(0, 0, 0, 0.5)'
            : '0px 4px 8px rgba(0, 0, 0, 0.2)'

        return `
          <div style="color: ${textColor}; border: 1px solid ${borderColor}; border-radius: 5px; box-shadow: ${boxShadow};">
            <div style="font-weight: bold; background-color: ${backgroundColor}; padding: 5px; border-radius: 4px; margin-bottom: 5px; font-size: 12px;">
              ${brandName}
            </div>
            <div style="padding: 5px 20px 15px; border-radius: 4px; font-size: 12px;">
              <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="background-color: #36a2eb; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px;"></span>
                <span>Atual: </span>
                <span style="font-weight: bold; margin-left: 5px;">
                  R$ ${salesAchieved.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </span>
              </div>
              <div style="display: flex; align-items: center;">
                <span style="background-color: #ff9000; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px;"></span>
                <span>Meta: </span>
                <span style="font-weight: bold; margin-left: 5px;">
                  R$ ${salesTarget.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </span>
              </div>
            </div>
          </div>
        `
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
      {series[0].data.length > 0 ? (
        <Chart options={options} series={series} type="bar" height="100%" />
      ) : (
        <div className="flex justify-center items-center h-full">
          Não foi definido meta para este mês
        </div>
      )}
    </div>
  )
}
