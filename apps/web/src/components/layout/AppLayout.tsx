import type { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div
      className="min-h-screen flex"
      style={{
        background: 'linear-gradient(126.87deg, #F3F1ED 7.14%, #F3F1ED 46.43%, #FFF2D1 78.57%)',
      }}
    >
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
