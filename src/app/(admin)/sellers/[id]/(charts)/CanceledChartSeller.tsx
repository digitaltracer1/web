'use client'

import RadialBar from '@/components/charts/rechart/radial-bar'
import { useSeller } from '@/context/seller-context'
import { BanknoteIcon, Hash } from 'lucide-react'
import { SellerProps } from '../page'

export default function CancelChartSeller({ params }: SellerProps) {
  const { info } = useSeller()

  const dataSeller = info.find((data) => params.id === data.sellerId)

  const saleByCanceled = {
    total: dataSeller?.summary?.soldAmount || 0,
    value: dataSeller?.summary?.canceledAmount || 0,
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex pt-1 text-sm w-full justify-center items-center gap-4">
        {/* Container para quantidade */}
        <div className="flex items-center">
          <Hash size={15} className="text-gray-800 dark:text-gray-500" />
          <p className="px-2 text-gray-800 dark:text-gray-500 font-extrabold">
            {saleByCanceled.value}
          </p>
        </div>

        {/* Container para valor */}
        <div className="flex items-center">
          <BanknoteIcon
            size={15}
            className="text-gray-800 dark:text-gray-500"
          />
          <p className="px-2 text-gray-800 dark:text-gray-500 font-extrabold ">
            {dataSeller?.summary?.valueCanceled.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </div>
      </div>
      <div className="flex-grow w-full">
        <RadialBar name="Cancelados" data={saleByCanceled} />
      </div>
    </div>
  )
}
