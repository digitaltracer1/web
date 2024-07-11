'use client'

import { Button } from '@/components/Button'
import { Skeleton } from '@/components/ui/skeleton'
import { SaleByGroup } from '@/context/models/sales-data-groups'
import { useSeller } from '@/context/seller-context'
import { ApexOptions } from 'apexcharts'
import { ArrowBigLeft } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import Chart from 'react-apexcharts'
import BarChartBrands from './brands'
import { formatAbbreviatedValue } from '@/utils/formatAbbreviatedValue'
import SkeletonBarChartHorizontal from '../../skeletons/barchart-horizontal'

const BarChartDataSales = ({ dataSales }: { dataSales: SaleByGroup[] }) => {
  const { loading } = useSeller()
  const { theme } = useTheme()

  const [selectionGroup, setSelectionGroup] = useState<SaleByGroup | null>(null)

  const chartOptions: ApexOptions = {
    theme: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
    chart: {
      id: 'salesByGroup',
      background: 'transparent',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const group = dataSales[config.dataPointIndex] || null
          setSelectionGroup(group)
        },
      },
    },
    xaxis: {
      categories: dataSales.map((data) => data.groupName),
      labels: {
        show: false, // Oculta as legendas do eixo X
      },
    },
    yaxis: [
      {
        title: {
          text: 'Valor',
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
          text: 'Quantidade',
        },
        labels: {
          formatter: function (value) {
            return value.toFixed(0) // Formata como número inteiro
          },
        },
      },
    ],
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
      text: 'Vendas por Grupo',
      align: 'center',
    },
    tooltip: {
      y: [
        {
          formatter: (val: number) =>
            `R$ ${val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`, // Formata como moeda
        },
        {
          formatter: (val: number) => val.toFixed(0), // Formata como número inteiro
        },
      ],
    },
    legend: {
      show: false,
    },
  }

  const series = [
    {
      name: 'Valor',
      type: 'column',
      data: dataSales.map((data) => data.totalValueSold),
    },
    {
      name: 'Quantidade',
      type: 'line',
      data: dataSales.map((data) => data.totalAmountSold),
    },
  ]

  if (!loading || dataSales.length === 0) {
    return (
      <div className="h-full flex flex-col items-center space-y-4">
        <Skeleton className="h-4 w-2/6" />
        <SkeletonBarChartHorizontal bar={10} />
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-row h-full w-full">
        {selectionGroup === null ? (
          <Chart
            options={chartOptions}
            series={series}
            type="line"
            height="100%"
          />
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={() => setSelectionGroup(null)}
              className="absolute z-10"
            >
              <ArrowBigLeft />
            </Button>
            <BarChartBrands
              brands={selectionGroup.brands}
              groupName={selectionGroup.groupName}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default BarChartDataSales
