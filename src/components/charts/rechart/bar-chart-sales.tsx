import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { GraficoDetalhado } from './bar-chart-sales-datails'

const dadosVendas = [
  { grupo: 'Grupo 1', vendas: 500, valor: 10000 },
  { grupo: 'Grupo 2', vendas: 480, valor: 9600 },
  { grupo: 'Grupo 3', vendas: 450, valor: 9000 },
  { grupo: 'Grupo 4', vendas: 430, valor: 8600 },
  { grupo: 'Grupo 5', vendas: 400, valor: 8000 },
  { grupo: 'Grupo 6', vendas: 380, valor: 7600 },
  { grupo: 'Grupo 7', vendas: 350, valor: 7000 },
  { grupo: 'Grupo 8', vendas: 330, valor: 6600 },
  { grupo: 'Grupo 9', vendas: 300, valor: 6000 },
  { grupo: 'Grupo 10', vendas: 280, valor: 5600 },
  // Mais dados...
]

export const GraficoVendas = () => {
  const [grupoSelecionado, setGrupoSelecionado] = useState(null)

  // Simulando clique para selecionar um grupo
  const onBarClick = (data) => {
    setGrupoSelecionado(data)
  }

  // Função para resetar a seleção e voltar para a visualização inicial dos grupos
  const voltarParaGrupos = () => {
    setGrupoSelecionado(null)
  }

  return (
    <>
      {!grupoSelecionado && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={dadosVendas.slice(0, 10)}
            onClick={(event) => onBarClick(event.activePayload[0].payload)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="grupo" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Bar dataKey="vendas" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}

      {grupoSelecionado && (
        // Aqui será implementado o gráfico detalhado
        <>
          <button
            onClick={voltarParaGrupos}
            // style={{ margin: '10px', padding: '5px' }}
          >
            Voltar aos Grupos
          </button>
          <ResponsiveContainer width="100%" height={300}>
            <GraficoDetalhado grupo={grupoSelecionado.grupo} />
          </ResponsiveContainer>
        </>
      )}
    </>
  )
}
