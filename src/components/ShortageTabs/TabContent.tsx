'use client'
import * as Tabs from '@radix-ui/react-tabs'
import { ReactNode } from 'react'

interface AuthLayoutProps {
  value: string
  children: ReactNode
}

export default function TabContent({ value, children }: AuthLayoutProps) {
  return (
    <div className="mt-24">
      <Tabs.Content value={value}>{children}</Tabs.Content>
    </div>
  )
}
