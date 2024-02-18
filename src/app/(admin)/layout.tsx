import { Sidebar } from '@/components/Sidebar'
import { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen dark:bg-zinc-900 lg:grid lg:grid-cols-app">
      <Sidebar />
      <main className="px-4 pb-12 pt-24 lg:col-start-2 lg:max-w-app lg:px-8 lg:pt-8">
        {children}
      </main>
    </div>
  )
}
