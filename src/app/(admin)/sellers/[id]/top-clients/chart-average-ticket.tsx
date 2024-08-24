'use client'

import { ClientSummary } from '@/context/models/sales-data-clients'
import { useSeller } from '@/context/seller-context'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const LineChart = dynamic(
  () => import('@/components/charts/apexchart/linechart'),
  {
    ssr: false,
  },
)

export function AverageTicketChart() {
  const { client } = useSeller()

  if (!client) {
    return <div>Selecione um cliente</div>
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LineChart data={client as ClientSummary} />
    </Suspense>
  )
}
