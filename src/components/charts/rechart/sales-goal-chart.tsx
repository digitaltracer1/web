import React, { useState } from 'react'
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Cell,
  PolarAngleAxis,
} from 'recharts'
import { useTheme } from 'next-themes'
import { useSeller } from '@/context/seller-context'
import { Skeleton } from '@/components/ui/skeleton'
import { formatNumber } from '@/app/(admin)/sellers/[id]/table-top-clients'

interface SimpleRadialBarChartProps {
  name?: string
  data: {
    value: number
    total: number
  }
}

const RadialBarComponent: React.FC<SimpleRadialBarChartProps> = ({ data }) => {
  const { theme } = useTheme()
  const { loading } = useSeller()
  const [hoverData, setHoverData] = useState<{
    name?: string
    value?: number
  } | null>(null)

  const exceed = Math.max(0, data.value - data.total)
  const maxValue = data.total + (exceed > 0 ? exceed : 0)

  const chartData =
    exceed > 0
      ? [
          {
            name: 'Excedente',
            value: Math.max(0, data.value - data.total),
            fill: 'url(#gradientSoldExeed)',
          },
          {
            name: 'Meta',
            value: data.value,
            fill: 'url(#gradientSoldProgress)',
          },
        ]
      : [
          {
            name: 'Meta',
            value: data.value,
            fill: 'url(#gradientSoldProgress)',
          },
        ]

  const startAngle = 225
  const endAngle = -135

  if (!loading) {
    return (
      <div className="flex  h-full justify-center items-center flex-grow w-full">
        <div className="relative">
          <Skeleton className="h-64 w-64 rounded-full" />
          <div className="absolute inset-0 m-auto h-56 w-56 bg-white dark:bg-zinc-800 rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        innerRadius={exceed > 0 ? '60%' : '80%'}
        outerRadius="100%"
        barSize={20}
        data={chartData}
        startAngle={startAngle}
        endAngle={endAngle}
        cy="50%"
        cx="50%"
      >
        <defs>
          <filter id="shadowSold" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="5"
              floodColor="#000"
              floodOpacity="0.6"
            />
          </filter>
          <linearGradient
            id="gradientSoldProgress"
            x1="50%"
            y1="0%"
            x2="100%"
            y2="50%"
          >
            <stop
              offset="5%"
              stopColor={theme === 'dark' ? '#03A9F4' : '#03A9F4'}
              stopOpacity={0.8}
            />
            <stop
              offset="100%"
              stopColor={theme === 'dark' ? '#008000 ' : '#008000'}
              stopOpacity={1}
            />
          </linearGradient>
          <linearGradient
            id="gradientSoldExeed"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="5%"
              stopColor={theme === 'dark' ? '#FFD700' : '#FFD700'}
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor={theme === 'dark' ? '#FFAB00 ' : '#FFAB00'}
              stopOpacity={0.8}
            />
          </linearGradient>
        </defs>

        <PolarAngleAxis type="number" domain={[0, maxValue]} tick={false} />
        <RadialBar
          dataKey="value"
          cornerRadius={10}
          background={{
            fill: theme === 'dark' ? '#333' : '#dbdbdb',
            style: { filter: 'url(#shadowSold)' },
          }}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              onMouseOver={() =>
                setHoverData({
                  name: entry.name,
                  value: entry.value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }),
                })
              }
              onMouseOut={() => setHoverData(null)}
            />
          ))}
        </RadialBar>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={theme === 'dark' ? '#6B7280' : '#1F2937'}
          style={{ fontSize: '15px' }}
          dy="-15"
        >
          {hoverData
            ? 'Valor vendido'
            : `${data.total === 0 ? 'Meta não definida' : formatNumber(data.total)}`}
        </text>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={theme === 'dark' ? '#6B7280' : '#1F2937'}
          style={{ fontSize: '20px', fontWeight: 'bold' }}
          dy="10"
        >
          {hoverData
            ? `${hoverData.value}`
            : `${data.value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}`}
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

export default RadialBarComponent
