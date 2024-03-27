'use client'

import { useSeller } from '@/context/seller-context'
import { SellerProps } from './page'
import { MonthNavigation } from '../MonthNavigation'

export default function HeaderSeller({ params }: SellerProps) {
  const { info } = useSeller()

  const seller = info?.sellers.find((s) => s.id === params.id)

  return (
    <div className="flex">
      <div className="px-4">{seller?.name}</div>
      <a href="/sellers">Voltar</a>
      <MonthNavigation />
    </div>
  )
}
