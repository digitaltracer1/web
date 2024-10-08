'use client'

import { useSeller } from '@/context/seller-context'
import { ArrowBigLeftDash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SellerProps } from './page'
import { Skeleton } from '@/components/ui/skeleton'
import MonthPicker from '@/components/date-pickers/month-picker-range'
import { Button } from '@/components/ui/button'

function capitalizeFirstLetter(str: string) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

interface HeaderSellerProps extends SellerProps {
  showMonthPicker?: boolean
}

export default function HeaderSeller({
  params,
  showMonthPicker = true,
}: HeaderSellerProps) {
  const { sellers, loading } = useSeller()
  const router = useRouter()

  const seller = sellers?.find((s) => s.sellerId === params.id)

  if (!seller) return null

  return (
    <div className="flex h-12 w-full rounded-sm py-2 pr-4 justify-between bg-white dark:bg-zinc-900">
      {loading.fetchSellers ? (
        <>
          <div className="flex items-center justify-center px-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowBigLeftDash size={25} />
            </Button>
            <Skeleton className="h-8 w-52 ml-4" />
          </div>
          {showMonthPicker && (
            <div className="flex items-center">
              <Skeleton className="h-8 w-48" />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex items-center justify-center pl-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowBigLeftDash size={25} />
            </Button>
            <div className="px-4 font-semibold text-xl">
              {capitalizeFirstLetter(seller.sellerName.toLocaleLowerCase())}
            </div>
          </div>
          {showMonthPicker && (
            <div className="flex items-center">
              <MonthPicker allowRangeSelection={false} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
