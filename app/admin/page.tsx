import { createClient } from '@/lib/supabase/server'
import { FileText, Briefcase, Eye } from 'lucide-react'

export default async function AdminDashboard() {
  // Initialize server client
  const supabase = await createClient()
  
  // Fetch total counts for stats cards
  const { count: postsCount } = await supabase.from('posts').select('*', { count: 'exact', head: true })
  const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true })

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">Welcome Back</h1>
        <p className="text-slate-400">Here is what is happening on your platform today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Posts Card */}
        <div className="bg-[#050505] p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-slate-400 font-medium text-sm uppercase tracking-wider">Total Posts</h3>
              <p className="text-3xl font-bold text-white">{postsCount || 0}</p>
            </div>
          </div>
        </div>

        {/* Total Projects Card */}
        <div className="bg-[#050505] p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#CEFF00]/10 text-[#CEFF00] rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-slate-400 font-medium text-sm uppercase tracking-wider">Portfolio Projects</h3>
              <p className="text-3xl font-bold text-white">{projectsCount || 0}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
