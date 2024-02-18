'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'

export interface TabItemProps {
  value: string
  title: string
  isSelected?: boolean
}

export function TabItem({ value, title, isSelected = false }: TabItemProps) {
  return (
    <Tabs.Trigger
      value={value}
      className=":px-1 group relative pb-4 text-sm font-medium text-zinc-500 outline-none hover:text-orange-700 data-[state=active]:text-orange-700 dark:text-zinc-300 dark:hover:text-orange-300 dark:data-[state=active]:text-orange-300"
    >
      <span className="whitespace-nowrap rounded group-focus-visible:ring-2 group-focus-visible:ring-orange-400 group-focus-visible:ring-offset-4">
        {title}
      </span>

      {isSelected && (
        <motion.div
          layoutId="activeTab"
          className="absolute -bottom-px left-0 right-0 h-0.5 bg-orange-700 dark:bg-orange-300"
        />
      )}
    </Tabs.Trigger>
  )
}
