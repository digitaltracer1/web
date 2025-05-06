'use client'

import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { useSeller } from '@/context/seller-context'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import * as XLSX from 'xlsx'
import { InactiveClientReport } from '@/context/models/inactive-client-report'

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

  type Client = InactiveClientReport

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
      console.log(clientsInactive)
      const now = new Date()
      const startDate = new Date(now.getFullYear(), now.getMonth() - 7, 1)

      const filteredClients = clientsInactive.filter((client) => {
        const lastPurchaseDate = new Date(client.lastPurchaseWithSeller)
        return lastPurchaseDate >= startDate
      })

      const grouped = filteredClients.reduce(
        (acc, client) => {
          if (client.lastPurchaseWithSeller) {
            const date = new Date(client.lastPurchaseWithSeller)
            const period = date.toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'short',
            })
            if (!acc[period]) {
              acc[period] = { period, clients: [], count: 0 }
            }
            acc[period].clients.push(client)
            acc[period].count += 1
          }
          return acc
        },
        {} as Record<
          string,
          { period: string; clients: Client[]; count: number }
        >,
      )

      const data = Object.values(grouped).map((item) => ({
        x: item.period,
        y: item.count,
      }))

      setGroupedData(grouped)
      setSeries([{ name: 'Clientes Inativos', data }])
    }
  }, [clientsInactive])

  const chartOptions: ApexOptions = {
    theme: { mode: theme === 'light' ? 'light' : 'dark' },
    chart: {
      type: 'bar',
      height: 350,
      background: 'transparent',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const selectedPeriod = series[0].data[config.dataPointIndex].x
          const selectedClients = groupedData[selectedPeriod]?.clients || []
          setSelectedData({ period: selectedPeriod, clients: selectedClients })
        },
      },
    },
    plotOptions: { bar: { horizontal: false, columnWidth: '50%' } },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    title: { text: 'Relatório de Clientes Inativos', align: 'left' },
    xaxis: {
      categories: series.length > 0 ? series[0].data.map((item) => item.x) : [],
      labels: { show: false },
      title: { text: 'Período' },
    },
    yaxis: { title: { text: 'Número de Clientes Inativos' } },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (value) => `${value} clientes` } },
  }

  const exportToExcel = () => {
    if (!selectedData) return

    const worksheet = XLSX.utils.json_to_sheet(
      selectedData.clients.map((client) => ({
        ID: client.clientId,
        Nome: client.clientName,
        Empresa: client.businessName,
        Estado: client.state,
        DDD: client.areaCode,
        Telefone: client.phoneNumber,
        'Data Criação': new Date(client.createdAt).toLocaleDateString('pt-BR'),
        'Vendedor da Última Compra': client.sellerWithLastPurchase,
        'Pedido com Vendedor': client.orderWithSeller,
        'Última Compra com Vendedor': new Date(
          client.lastPurchaseWithSeller,
        ).toLocaleDateString('pt-BR'),
        'Vendedor da Última Compra na Loja': client.sellerOfLastPurchase,
        'Pedido Última Compra': client.orderLastPurchase,
        'Última Compra na Loja': new Date(
          client.lastPurchaseInStore,
        ).toLocaleDateString('pt-BR'),
        Status: client.status,
      })),
    )

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes Inativos')
    XLSX.writeFile(
      workbook,
      `clientes-inativos-${selectedData.period}-${id}.xlsx`,
    )
  }

  return (
    <div className="relative flex flex-col h-full w-full">
      <Chart options={chartOptions} series={series} type="bar" height="100%" />

      {selectedData && (
        <div className="fixed z-50 inset-0 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg max-w-7xl w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Clientes Inativos em {selectedData.period}
            </h2>
            <div className="flex justify-end gap-4 mb-4">
              <Button variant="outline" onClick={exportToExcel}>
                Baixar Excel
              </Button>
              <Button variant="primary" onClick={() => setSelectedData(null)}>
                Fechar
              </Button>
            </div>

            <ScrollArea.Root className="w-full h-[35rem] rounded overflow-hidden">
              <ScrollArea.Viewport className="w-full h-full">
                <div className="min-w-max w-fit">
                  <Table className="w-full text-sm">
                    <TableCaption>Lista de clientes</TableCaption>
                    <TableHeader className="sticky top-0 z-20 bg-white dark:bg-gray-900 shadow-sm">
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>DDD</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Última Compra</TableHead>
                        <TableHead>Vendedor</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedData.clients.map((client, index) => (
                        <TableRow key={index}>
                          <TableCell>{client.clientName}</TableCell>
                          <TableCell>{client.areaCode}</TableCell>
                          <TableCell>{client.phoneNumber}</TableCell>
                          <TableCell>{client.businessName}</TableCell>
                          <TableCell>{client.state}</TableCell>
                          <TableCell>
                            {new Date(
                              client.lastPurchaseWithSeller,
                            ).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>{client.sellerWithLastPurchase}</TableCell>
                          <TableCell>{client.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea.Viewport>

              <ScrollArea.Scrollbar orientation="vertical">
                <ScrollArea.Thumb className="bg-zinc-400 rounded-full" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </div>
        </div>
      )}
    </div>
  )
}
