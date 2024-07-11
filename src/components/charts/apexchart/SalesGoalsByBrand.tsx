'use client'

import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

interface SalesData {
  brand: string
  sales: number
  goal: number
  topProducts: { name: string; sales: number }[]
}

export default function SalesGoalsByBrand() {
  const { theme } = useTheme()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [series, setSeries] = useState<any[]>([])

  useEffect(() => {
    // Simulação de dados de vendas e metas por marcas/seções de produtos
    const mockData: SalesData[] = [
      {
        brand: 'Marca A',
        sales: 50000,
        goal: 60000,
        topProducts: [
          { name: 'Produto A1', sales: 10000 },
          { name: 'Produto A2', sales: 15000 },
          { name: 'Produto A3', sales: 25000 },
        ],
      },
      {
        brand: 'Marca B',
        sales: 40000,
        goal: 50000,
        topProducts: [
          { name: 'Produto B1', sales: 12000 },
          { name: 'Produto B2', sales: 13000 },
          { name: 'Produto B3', sales: 15000 },
        ],
      },
      {
        brand: 'Marca C',
        sales: 70000,
        goal: 80000,
        topProducts: [
          { name: 'Produto C1', sales: 20000 },
          { name: 'Produto C2', sales: 25000 },
          { name: 'Produto C3', sales: 25000 },
        ],
      },
      {
        brand: 'Marca D',
        sales: 60000,
        goal: 70000,
        topProducts: [
          { name: 'Produto D1', sales: 20000 },
          { name: 'Produto D2', sales: 20000 },
          { name: 'Produto D3', sales: 20000 },
        ],
      },
      {
        brand: 'Marca E',
        sales: 30000,
        goal: 40000,
        topProducts: [
          { name: 'Produto E1', sales: 10000 },
          { name: 'Produto E2', sales: 10000 },
          { name: 'Produto E3', sales: 10000 },
        ],
      },
    ]

    const seriesData = [
      {
        name: 'Meta',
        data: mockData.map((data) => data.goal),
      },
      {
        name: 'Produto A1',
        data: mockData.map((data) => data.topProducts[0]?.sales || 0),
      },
      {
        name: 'Produto A2',
        data: mockData.map((data) => data.topProducts[1]?.sales || 0),
      },
      {
        name: 'Produto A3',
        data: mockData.map((data) => data.topProducts[2]?.sales || 0),
      },
    ]

    setSeries(seriesData)
  }, [])

  const chartOptions: ApexOptions = {
    theme: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
    chart: {
      type: 'bar',
      height: 350,
      background: 'transparent',
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
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
    xaxis: {
      categories: ['Marca A', 'Marca B', 'Marca C', 'Marca D', 'Marca E'],
      title: {
        text: 'Marcas/Seções de Produtos',
      },
    },
    yaxis: {
      title: {
        text: 'Valor em R$',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return `R$ ${val.toLocaleString('pt-BR')}`
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
  }

  return (
    <div className="relative flex flex-col h-full w-full p-2">
      <Chart options={chartOptions} series={series} type="bar" height="100%" />
    </div>
  )
}
