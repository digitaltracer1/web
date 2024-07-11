import { SaleByProduct } from '@/context/models/sales-data-groups'
import { ApexOptions } from 'apexcharts'
import { useTheme } from 'next-themes'
import Chart from 'react-apexcharts'

const BarChartProducts = ({
  products,
  brandName,
}: {
  products: SaleByProduct[]
  brandName: string
}) => {
  const { theme } = useTheme()

  const topSalesByProduct = products
    .sort((a, b) => b.totalValueSold - a.totalValueSold)
    .slice(0, 10)

  const options: ApexOptions = {
    theme: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
    chart: {
      id: 'salesByProduct',
      background: 'transparent',
    },
    xaxis: {
      categories: topSalesByProduct.map((item) => item.productId),
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
      text: `Top 10 Produtos da ${brandName}`,
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
      data: topSalesByProduct.map((product) => product.totalValueSold),
    },
    {
      name: 'Quantidade',
      type: 'line',
      data: topSalesByProduct.map((product) => product.totalAmountSold),
    },
  ]

  return <Chart options={options} series={series} type="line" height="100%" />
}

export default BarChartProducts
