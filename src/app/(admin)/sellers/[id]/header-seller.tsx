'use client'

import { useSeller } from '@/context/seller-context'
import { SellerProps } from './page'
import { MonthNavigation } from '../MonthNavigation'
import Link from 'next/link'
import { ArrowBigLeftDash } from 'lucide-react'

function capitalizeFirstLetter(str: string) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function HeaderSeller({ params }: SellerProps) {
  const { info, updateSellers } = useSeller()

  const seller = info?.sellers.find((s) => s.id === params.id)

  if (!seller) return null

  return (
    <div className="flex">
      <div className="flex items-center justify-center ">
        <Link href="/sellers" className="px-6 hover:border-orange-200">
          <ArrowBigLeftDash size={25} />
        </Link>
        <div className="px-4 font-semibold text-base">
          {capitalizeFirstLetter(seller?.name.toLocaleLowerCase())}
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        {/* <MonthNavigation selectMonth={(month) => updateSellers(month)} /> */}
      </div>
    </div>
  )
}
