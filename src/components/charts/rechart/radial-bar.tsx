// components/RadialBarComponent.tsx
import { useTheme } from 'next-themes'
import React from 'react'
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Cell,
  PolarAngleAxis,
} from 'recharts'

interface SimpleRadialBarChartProps {
  name: string
  data: {
    value: number
    total: number
  }
}

const RadialBarComponent: React.FC<SimpleRadialBarChartProps> = ({
  name,
  data,
}) => {
  const { theme } = useTheme()

  const percent =
    parseFloat(((data?.value / data?.total) * 100).toFixed(2)) || 0

  // Ajusta os dados para o gráfico com base na porcentagem
  const chartData = [
    { name: 'Devoluções', value: percent, fill: '#a7a7a7' }, // Cor para a porcentagem preenchida
  ]

  // Ajusta os ângulos de início e fim para formar um círculo de 270 graus
  const startAngle = 225
  const endAngle = -135

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        innerRadius="80%"
        outerRadius="100%"
        barSize={10}
        data={chartData}
        startAngle={startAngle}
        endAngle={endAngle}
        cy="50%"
        cx="50%"
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="5"
              floodColor="#000"
              floodOpacity="0.6"
            />
          </filter>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="5%"
              stopColor={theme === 'dark' ? '#a7a7a7' : '#404040'}
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor={theme === 'dark' ? '#808080' : '#202020'}
              stopOpacity={0.8}
            />
          </linearGradient>
        </defs>

        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar
          dataKey="value"
          cornerRadius={10}
          background={{
            fill: theme === 'dark' ? '#333' : '#dbdbdb',
            style: { filter: 'url(#shadow)' },
          }}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={'url(#gradient)'} />
          ))}
        </RadialBar>
        {/* Texto para "Devoluções" */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={theme === 'dark' ? '#6B7280' : '#1F2937'}
          style={{ fontSize: '15px' }}
          dy="-15"
        >
          {name}
        </text>
        {/* Texto para o valor da porcentagem */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={theme === 'dark' ? '#6B7280' : '#1F2937'} // Cor que corresponde à barra preenchida
          style={{ fontSize: '20px', fontWeight: 'bold' }}
          dy="10"
        >
          {`${percent.toFixed(2)}%`}
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

export default RadialBarComponent
