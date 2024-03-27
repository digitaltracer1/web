'use client'

import BarChartComponent from '@/components/charts/rechart/bar-chart'
import { useSeller } from '@/context/seller-context'
import { SellerProps } from '../[id]/page'

export default function BarChartSeller({ params }: SellerProps) {
  const { info } = useSeller()

  const dataSeller = info?.dataSale.find((data) => params.id === data.sellerId)

  const sales = dataSeller?.sales

  if (!sales) return null

  // Agrupa e soma os valores e quantidades por produto
  const aggregatedData = sales?.reduce((acc, item) => {
    // Verifica se o item atual já foi adicionado ao acumulador
    if (!acc[item.productId]) {
      acc[item.productId] = { ...item, count: 1 } // Inicializa o item no acumulador
    } else {
      // Soma os valores e incrementa a contagem para o produto existente
      acc[item.productId].valueSold += item.valueSold
      acc[item.productId].soldAmount += item.soldAmount
      acc[item.productId].count += 1 // Conta quantas vezes o produto aparece, se necessário
    }
    return acc
  }, {})

  // Transforma o objeto acumulado em um array para uso no gráfico
  const aggregatedDataArray = Object.values(aggregatedData).map((item) => ({
    productName: item.productName,
    valueSold: Number(item.valueSold.toFixed(2)),
    soldAmount: item.soldAmount,
  }))

  if (!aggregatedDataArray) return null

  return <BarChartComponent data={aggregatedDataArray} />
}
