import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export const GraficoDetalhado = ({ grupo }) => {
  // Aqui, você usaria o nome do grupo para buscar ou filtrar os dados detalhados desse grupo específico
  // Para o exemplo, estou usando dados fictícios simplificados
  const dadosDetalhados = [
    { subgrupo: 'Subgrupo 1', vendas: 250, valor: 4000 },
    { subgrupo: 'Subgrupo 2', vendas: 150, valor: 3600 },
    // Dados para 5 subgrupos...
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={dadosDetalhados}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="subgrupo" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: '#0f0f0f',
            border: 'none',
            borderRadius: '8px', // Aqui estamos definindo as bordas arredondadas
            color: '#fff', // Adicionando cor branca ao texto para melhorar a visibilidade
          }}
        />
        <Bar dataKey="vendas" fill="#8884d8" />
        <Bar dataKey="valor" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}
