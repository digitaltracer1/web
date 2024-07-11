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
  const { fetchSalesSeller } = useSeller()

  useEffect(() => {
    fetchSalesSeller(new Date().toString(), id)
  }, [id])

  return <div>{children}</div>
}
