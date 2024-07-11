import { Button } from '@/components/Button'
import { SaleByBrand } from '@/context/models/sales-data-groups'
import { ApexOptions } from 'apexcharts'
import { ArrowBigLeft } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import Chart from 'react-apexcharts'
import BarChartProducts from './products'

const BarChartBrands = ({
  brands,
  groupName,
}: {
  brands: SaleByBrand[]
  groupName: string
}) => {
  const [selectionBrand, setSelectionBrand] = useState<SaleByBrand | null>(null)
  const { theme } = useTheme()

  const options: ApexOptions = {
    theme: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
    chart: {
      id: 'salesByBrand',
      background: 'transparent',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const brand = brands[config.dataPointIndex] || null
          setSelectionBrand(brand)
        },
      },
    },
    xaxis: {
      categories: brands.map((item) => item.brandName),
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
            return `R$ ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}` // Formata como moeda
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
    stroke: {
      show: true,
      width: 2,
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
      background: {
        foreColor: '#000',
      },
    },
    title: {
      text: `Marcas vendidas por ${groupName}`,
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
  }

  const series = [
    {
      name: 'Valor',
      type: 'column',
      data: brands.map((sale) => sale.totalValueSold),
    },
    {
      name: 'Quantidade',
      type: 'line',
      data: brands.map((sale) => sale.totalAmountSold),
    },
  ]

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-row h-full w-full">
        {selectionBrand === null ? (
          <Chart options={options} series={series} type="line" height="100%" />
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={() => setSelectionBrand(null)}
              className="absolute z-10"
            >
              <ArrowBigLeft />
            </Button>
            <BarChartProducts
              products={selectionBrand.products}
              brandName={selectionBrand.brandName}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default BarChartBrands
