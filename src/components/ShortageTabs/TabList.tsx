'use client'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Tabs from '@radix-ui/react-tabs'
import { TabItem } from './TabItem'

export default function TabList({ currentTab }: { currentTab: string }) {
  return (
    <div className="fixed w-full bg-white dark:bg-zinc-900 top-0 z-20  ">
      <ScrollArea.Root className="w-full mt-10" type="scroll">
        <ScrollArea.Viewport className="w-full overflow-x-scroll">
          <Tabs.List className=" mt-6 flex w-full items-center gap-4 border-b border-zinc-200 dark:border-zinc-700">
            <TabItem
              value="tab1"
              title="Faltas Diarias"
              isSelected={currentTab === 'tab1'}
            />
            <TabItem
              value="tab2"
              title="Indicados"
              isSelected={currentTab === 'tab2'}
            />
            <TabItem
              value="tab3"
              title="Controle de Faltas"
              isSelected={currentTab === 'tab3'}
            />
            <TabItem
              value="tab4"
              title="Custo Oportunidade"
              isSelected={currentTab === 'tab4'}
            />
          </Tabs.List>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          className="flex h-0.5 translate-y-1.5 touch-none select-none flex-col bg-zinc-100"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  )
}
