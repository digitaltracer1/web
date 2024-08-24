'use client'

import { Newclients } from '@/context/models/new-clients'
import { useSeller } from '@/context/seller-context'
import { ApexOptions } from 'apexcharts'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

interface SeriesData {
  x: string // name of the client
  y: number // timestamp for the date
}

export default function NewClientsCrossPlot({ id }: { id: string }) {
  const { theme } = useTheme()
  const { newclients, fetchNewClients, dateRange } = useSeller()
  const [series, setSeries] = useState<{ name: string; data: SeriesData[] }[]>(
    [],
  )

  useEffect(() => {
    fetchNewClients(dateRange.dateFrom, dateRange.dateTo, id)
  }, [dateRange.dateFrom, dateRange.dateTo, id])

  useEffect(() => {
    if (newclients && newclients.length > 0) {
      const registrationData = newclients.map((client: Newclients) => ({
        x: client.clientName,
        y: new Date(client.createdAt).getTime(),
      }))

      const firstSaleData = newclients.map((client: Newclients) => ({
        x: client.clientName,
        y: new Date(client.firstPurchase).getTime(),
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
    }
  }, [newclients])

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
      labels: {
        show: false,
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
