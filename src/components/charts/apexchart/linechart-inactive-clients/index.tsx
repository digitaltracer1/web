'use client'

import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { useSeller } from '@/context/seller-context'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import * as ScrollArea from '@radix-ui/react-scroll-area'

interface Client {
  clientId: string
  clientName: string
  businessName: string
  state: string
  areaCode: string
  phoneNumber: string
  createdAt: string
  lastPurchase: string
}

interface SeriesData {
  x: string
  y: number
}

export default function InactiveClientsBarChart({ id }: { id: string }) {
  const { theme } = useTheme()
  const { clientsInactive, fetchClientsInactive } = useSeller()
  const [series, setSeries] = useState<{ name: string; data: SeriesData[] }[]>(
    [],
  )
  const [selectedData, setSelectedData] = useState<{
    period: string
    clients: Client[]
  } | null>(null)
  const [groupedData, setGroupedData] = useState<
    Record<string, { period: string; clients: Client[]; count: number }>
  >({})

  useEffect(() => {
    fetchClientsInactive(id)
  }, [id])

  useEffect(() => {
    if (clientsInactive.length > 0) {
      const now = new Date()
      const startDate = new Date(now.getFullYear(), now.getMonth() - 7, 1)

      const filteredClients = clientsInactive.filter((client) => {
        const lastPurchaseDate = new Date(client.lastPurchase)
        return lastPurchaseDate >= startDate
      })

      const groupedData = filteredClients.reduce(
        (acc, client) => {
          if (client.lastPurchase) {
            const date = new Date(client.lastPurchase)
            const period = date.toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'short',
            })
            if (!acc[period]) {
              acc[period] = { period, clients: [], count: 0 }
            }

            // Verificar se as datas são válidas antes de convertê-las
            const createdAt = new Date(client.createdAt)
            const lastPurchase = new Date(client.lastPurchase)
            const isValidDate = (date: Date) => !isNaN(date.getTime())

            acc[period].clients.push({
              clientId: client.clientId,
              clientName: client.clientName,
              businessName: client.businessName,
              state: client.state,
              areaCode: client.areaCode,
              phoneNumber: client.phoneNumber,
              createdAt: isValidDate(createdAt)
                ? createdAt.toISOString()
                : client.createdAt,
              lastPurchase: isValidDate(lastPurchase)
                ? lastPurchase.toISOString()
                : client.lastPurchase,
            })
            acc[period].count += 1
          }
          return acc
        },
        {} as Record<
          string,
          { period: string; clients: Client[]; count: number }
        >,
      )

      const data = Object.values(groupedData).map((item) => ({
        x: item.period,
        y: item.count,
      }))

      setGroupedData(groupedData)
      setSeries([{ name: 'Clientes Inativos', data }])
    }
  }, [clientsInactive])

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
          const selectedClients = groupedData[selectedPeriod]?.clients || []
          setSelectedData({
            period: selectedPeriod,
            clients: selectedClients,
          })
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
      text: 'Relatório de Clientes Inativos',
      align: 'left',
    },
    xaxis: {
      categories: series.length > 0 ? series[0].data.map((item) => item.x) : [],
      labels: {
        show: false,
      },
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
            <ScrollArea.Root
              className="w-full h-[38rem] overflow-hidden"
              type="scroll"
            >
              <ScrollArea.Viewport className="w-full h-full rounded overflow-y-scroll">
                <div className="table-container">
                  <Table className="w-full">
                    <TableCaption>
                      Clientes Inativos em {selectedData.period}
                    </TableCaption>
                    <TableHeader className="sticky top-0 bg-white dark:bg-gray-800 z-10">
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>DDD</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Última Compra</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-xs">
                      {selectedData.clients.map((client, index) => (
                        <TableRow key={index}>
                          <TableCell>{client.clientId}</TableCell>
                          <TableCell>{client.clientName}</TableCell>
                          <TableCell>{client.areaCode}</TableCell>
                          <TableCell>{client.phoneNumber}</TableCell>
                          <TableCell>
                            {new Date(client.lastPurchase).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className="flex h-0.5 touch-none select-none flex-col bg-zinc-100"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
            <Button variant="primary" onClick={() => setSelectedData(null)}>
              Fechar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
