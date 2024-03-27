import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { time: 'Dia', real: 3000, meta: 5000 },
  { time: 'Semana', real: 20000, meta: 25000 },
  { time: 'Mês', real: 80000, meta: 100000 },
  { time: 'Ano', real: 600000, meta: 750000 },
  // Adicione mais dados conforme necessário
]

const StackedBarChartComponent: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="real" stackId="a" fill="#82ca9d" />
        <Bar dataKey="meta" stackId="a" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default StackedBarChartComponent
