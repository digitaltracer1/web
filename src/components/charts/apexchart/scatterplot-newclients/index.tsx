'use client'

import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface Client {
  name: string
  registrationDate: string
  firstSaleDate: string
}

interface SeriesData {
  x: string // name of the client
  y: number // timestamp for the date
}

export default function NewClientsCrossPlot() {
  const { theme } = useTheme()
  const [series, setSeries] = useState<{ name: string; data: SeriesData[] }[]>(
    [],
  )

  useEffect(() => {
    // Simulação de dados de novos clientes
    const mockData: Client[] = [
      {
        name: 'Cliente 1',
        registrationDate: '2023-01-01',
        firstSaleDate: '2023-01-10',
      },
      {
        name: 'Cliente 2',
        registrationDate: '2023-01-05',
        firstSaleDate: '2023-01-15',
      },
      {
        name: 'Cliente 3',
        registrationDate: '2023-01-10',
        firstSaleDate: '2023-01-20',
      },
      {
        name: 'Cliente 4',
        registrationDate: '2023-01-15',
        firstSaleDate: '2023-01-25',
      },
      {
        name: 'Cliente 5',
        registrationDate: '2023-01-20',
        firstSaleDate: '2023-01-30',
      },
      // Adicione mais dados conforme necessário
    ]

    const registrationData = mockData.map((client) => ({
      x: client.name,
      y: new Date(client.registrationDate).getTime(),
    }))

    const firstSaleData = mockData.map((client) => ({
      x: client.name,
      y: new Date(client.firstSaleDate).getTime(),
    }))

    setSeries([
      {
        name: 'Data de Cadastro',
        data: registrationData,
      },
      {
        name: 'Data da 1ª Venda',
        data: firstSaleData,
      },
    ])
  }, [])

  const chartOptions: ApexOptions = {
    theme: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
    chart: {
      type: 'line',
      height: 350,
      background: 'transparent',
    },
    xaxis: {
      categories: series.length > 0 ? series[0].data.map((item) => item.x) : [],
      title: {
        text: 'Clientes',
      },
    },
    yaxis: [
      {
        title: {
          text: 'Data de Cadastro',
        },
        labels: {
          show: false,
          formatter: function (value) {
            return new Date(value).toLocaleDateString('pt-BR')
          },
        },
      },
      {
        opposite: true,
        title: {
          text: 'Data da 1ª Venda',
        },
        labels: {
          show: false,
          formatter: function (value) {
            return new Date(value).toLocaleDateString('pt-BR')
          },
        },
      },
    ],
  }

  return (
    <div className="relative flex flex-col h-full w-full p-2">
      <Chart options={chartOptions} series={series} type="line" height="100%" />
    </div>
  )
}
