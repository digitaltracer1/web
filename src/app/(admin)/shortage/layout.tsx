import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export default function ShortageLayout({ children }: AuthLayoutProps) {
  return <div>{children}</div>
}
