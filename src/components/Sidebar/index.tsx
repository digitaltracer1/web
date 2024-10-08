'use client'

import { Logo } from '@/components/Sidebar/Logo'
import * as Collapsible from '@radix-ui/react-collapsible'
import {
  Activity,
  BarChart,
  FileWarning,
  LayoutDashboard,
  LifeBuoy,
  Menu,
  PackageSearch,
  Settings,
} from 'lucide-react'
import { Button } from '../Button'
import ThemeSwitch from '../ThemeSwitcher'
import { NavItem } from './NavItem'
import { Profile } from './Profile'

export function Sidebar() {
  return (
    <Collapsible.Root className="fixed left-0 right-0 top-0 z-30 flex flex-col gap-6 border-b border-zinc-200 bg-white p-4 data-[state=open]:bottom-0 dark:border-zinc-800 dark:bg-zinc-900 lg:right-auto  lg:w-56 lg:border-r lg:px-5 lg:py-8 lg:data-[state=closed]:bottom-0">
      <div className="flex items-center justify-between">
        <Logo />
        <Collapsible.Trigger asChild className="lg:hidden">
          <Button variant="ghost">
            <Menu className="h-6 w-6" />
          </Button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content
        forceMount
        className="flex flex-1 flex-col gap-6 data-[state=closed]:hidden lg:data-[state=closed]:flex"
      >
        <nav className="space-y-0.5">
          {/* <NavItem page="/home" title="Home" icon={Home} /> */}
          <NavItem page="/dashboard" title="Dashboard" icon={LayoutDashboard} />
          <NavItem page="/finance" title="Financeiro" icon={BarChart} />
          <NavItem page="/sellers" title="Vendas" icon={Activity} />
          <NavItem page="/products" title="Produtos" icon={PackageSearch} />
          <NavItem page="/shortage" title="Estoque" icon={FileWarning} />
          {/* <NavItem page="/goals" title="Metas" icon={Goal} /> */}
          {/* <NavItem page="/reporting" title="Reporting" icon={Flag} /> */}
          {/* <NavItem page="/users" title="Users" icon={Users} /> */}
        </nav>

        <div className="mt-auto flex flex-col gap-6">
          <nav className="space-y-0.5">
            <ThemeSwitch />
            <NavItem page="/support" title="Support" icon={LifeBuoy} />
            <NavItem page="/settings" title="Settings" icon={Settings} />
          </nav>

          <div className="h-px bg-zinc-200 dark:bg-zinc-700" />

          <Profile />
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
