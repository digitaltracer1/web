import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface SaleData {
  productName: string
  valueSold: number
  soldAmount: number
}

interface Props {
  data: SaleData[]
}

// const data = [
//   { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
//   { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
//   { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
//   { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
//   { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
//   { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
//   { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
// ]
export default function BarChartComponent({ data }: Props) {
  // Estado para armazenar os dados filtrados e limitados
  const [displayData, setDisplayData] = useState<SaleData[]>([])
  // Estado para controlar a base da ordenação (por 'valueSold' ou 'soldAmount')
  const [orderBy, setOrderBy] = useState<'valueSold' | 'soldAmount'>(
    'soldAmount',
  )

  useEffect(() => {
    // Filtra e ordena os dados cada vez que o estado 'orderBy' muda
    const sortedData = [...data]
      .sort((a, b) => b[orderBy] - a[orderBy])
      .slice(0, 20)
    setDisplayData(sortedData)
  }, [data, orderBy])

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={displayData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="productName" tick={false} />
          <YAxis />

          <Tooltip
            contentStyle={{
              backgroundColor: '#0f0f0f',
              border: 'none',
              borderRadius: '8px', // Aqui estamos definindo as bordas arredondadas
              color: '#fff', // Adicionando cor branca ao texto para melhorar a visibilidade
            }}
          />

          <Bar dataKey="valueSold" fill="#8884d8" name="Valor Vendido" />
          <Bar dataKey="soldAmount" fill="#82ca9d" name="Quantidade Vendida" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
