import { SellerProvider } from '@/context/seller-context'
import { ReactNode } from 'react'

interface SellerLayoutProps {
  children: ReactNode
}

export default function SellerLayout({ children }: SellerLayoutProps) {
  return <SellerProvider>{children}</SellerProvider>
}
