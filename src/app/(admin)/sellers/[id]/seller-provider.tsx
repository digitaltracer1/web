'use client'

import { useSeller } from '@/context/seller-context'
import { ReactNode, useEffect } from 'react'

interface SellerLayoutProps {
  children: ReactNode
  id: string
}

export default function SellerProviderData({
  children,
  id,
}: SellerLayoutProps) {
  const { fetchSalesSeller, dateRange } = useSeller()

  useEffect(() => {
    fetchSalesSeller(dateRange.dateFrom, dateRange.dateTo, id)
  }, [id])

  return <div>{children}</div>
}
