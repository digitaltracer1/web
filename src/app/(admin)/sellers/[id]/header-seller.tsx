'use client'

import { useSeller } from '@/context/seller-context'
import { ArrowBigLeftDash } from 'lucide-react'
import Link from 'next/link'
import { SellerProps } from './page'

function capitalizeFirstLetter(str: string) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function HeaderSeller({ params }: SellerProps) {
  const { info } = useSeller()

  const seller = info?.sellers.find((s) => s.sellerId === params.id)

  if (!seller) return null

  return (
    <div className="flex">
      <div className="flex items-center justify-center ">
        <Link href="/sellers" className="px-6 hover:border-orange-200">
          <ArrowBigLeftDash size={25} />
        </Link>
        <div className="px-4 font-semibold text-base">
          {capitalizeFirstLetter(seller?.sellerName.toLocaleLowerCase())}
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        {/* <MonthNavigation selectMonth={(month) => updateSellers(month)} /> */}
      </div>
    </div>
  )
}
