import Link from 'next/link'
import { LayoutDashboard, FileText, Briefcase, Settings, LogOut } from 'lucide-react'
import { logout } from './actions'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0B] flex text-white font-sans selection:bg-[#CEFF00] selection:text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-[#050505] border-r border-white/10 flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Link href="/admin" className="text-xl font-black tracking-tighter text-white">
            ZAREL<span className="text-[#CEFF00]">.</span> ADMIN
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors font-medium">
            <LayoutDashboard className="w-5 h-5 text-[#CEFF00]" /> Dashboard
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors font-medium">
            <FileText className="w-5 h-5" /> Blog CMS
          </Link>
          <Link href="/admin/portfolio" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors font-medium">
            <Briefcase className="w-5 h-5" /> Portfolio
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors font-medium">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>
        
        {/* Logout Form Button */}
        <div className="p-4 border-t border-white/10">
          <form action={logout}>
            <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 transition-colors font-medium">
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-20 flex items-center px-8 border-b border-white/10 bg-[#0A0A0B]/80 backdrop-blur-md">
          <h2 className="text-xl font-semibold text-slate-200">System Overview</h2>
        </header>
        
        <div className="p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
