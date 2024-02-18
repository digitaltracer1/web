'use client'
import { ReactNode, useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import TabList from './TabList'

interface AuthLayoutProps {
  children: ReactNode
}

export default function TabRoot({ children }: AuthLayoutProps) {
  const [currentTab, setCurrentTab] = useState('tab1')
  return (
    <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
      <TabList currentTab={currentTab} />
      {children}
    </Tabs.Root>
  )
}
