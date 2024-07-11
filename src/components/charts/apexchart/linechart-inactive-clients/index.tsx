'use client'

import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/Button'

interface Client {
  name: string
  reason?: string // A razão agora é opcional
}

interface MockData {
  period: string
  clients: Client[]
  count: number
}

interface SeriesData {
  x: string
  y: number
}

export default function InactiveClientsBarChart() {
  const { theme } = useTheme()
  const [series, setSeries] = useState<{ name: string; data: SeriesData[] }[]>(
    [],
  )
  const [selectedData, setSelectedData] = useState<MockData | null>(null)

  // Simulação de dados de clientes inativos por mês
  const mockData: MockData[] = [
    {
      period: 'Jan 2023',
      clients: [
        { name: 'Cliente 1', reason: 'Não realizou compras' },
        { name: 'Cliente 2' }, // Sem razão especificada
        { name: 'Cliente 3', reason: 'Mudança de região' },
        { name: 'Cliente 4' }, // Sem razão especificada
      ],
      count: 4,
    },
    {
      period: 'Feb 2023',
      clients: [
        { name: 'Cliente 5', reason: 'Conta inativa' },
        { name: 'Cliente 6', reason: 'Não realizou compras' },
        { name: 'Cliente 6', reason: 'Não realizou compras' },
        { name: 'Cliente 6', reason: 'Não realizou compras' },
        { name: 'Cliente 6', reason: 'Não realizou compras' },
        { name: 'Cliente 6', reason: 'Não realizou compras' },
        { name: 'Cliente 6', reason: 'Não realizou compras' },
        { name: 'Cliente 6', reason: 'Não realizou compras' },
        { name: 'Cliente 7' }, // Sem razão especificada
      ],
      count: 9,
    },
    {
      period: 'Mar 2023',
      clients: [
        { name: 'Cliente 8', reason: 'Mudança de região' },
        { name: 'Cliente 9', reason: 'Conta inativa' },
        { name: 'Cliente 10' }, // Sem razão especificada
      ],
      count: 3,
    },
    // Adicione mais dados conforme necessário
  ]

  useEffect(() => {
    setSeries([
      {
        name: 'Clientes Inativos',
        data: mockData.map((item) => ({ x: item.period, y: item.count })),
      },
    ])
  }, [])

  const chartOptions: ApexOptions = {
    theme: {
      mode: theme === 'light' ? 'light' : 'dark',
    },

    chart: {
      type: 'bar',
      height: 350,
      background: 'transparent',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const selectedPeriod = series[0].data[config.dataPointIndex].x
          const selectedClients =
            mockData.find((item) => item.period === selectedPeriod)?.clients ||
            []
          setSelectedData({
            period: selectedPeriod,
            clients: selectedClients,
            count: 0,
          }) // Ajuste necessário para corresponder ao tipo MockData
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    title: {
      text: 'Relatório de Clientes Inativos por Período',
      align: 'left',
    },
    xaxis: {
      categories: series.length > 0 ? series[0].data.map((item) => item.x) : [],
      title: {
        text: 'Período',
      },
    },
    yaxis: {
      title: {
        text: 'Número de Clientes Inativos',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return `${value} clientes`
        },
      },
    },
  }

  return (
    <div className="relative flex flex-col h-full w-full">
      <Chart options={chartOptions} series={series} type="bar" height="100%" />
      {selectedData && (
        <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">
              Clientes Inativos em {selectedData.period}
            </h2>
            <ul className="mb-4">
              {selectedData.clients.map((client, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{client.name}</span>
                  {client.reason ? `: ${client.reason}` : ''}
                </li>
              ))}
            </ul>
            <Button variant="primary" onClick={() => setSelectedData(null)}>
              Fechar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
