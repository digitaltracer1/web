'use client'
import { ReactNode, useEffect, useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import TabList from './TabList'
import { setCookie, getCookie } from 'cookies-next'

interface AuthLayoutProps {
  children: ReactNode
}

export default function TabRoot({ children }: AuthLayoutProps) {
  const [currentTab, setCurrentTab] = useState(
    getCookie('sellerActiveTab') || 'tab1',
  )
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    setCookie('sellerActiveTab', currentTab)
  }, [currentTab])

  if (!isClient) {
    return null
  }

  return (
    <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
      <TabList currentTab={currentTab} />
      {children}
    </Tabs.Root>
  )
}
