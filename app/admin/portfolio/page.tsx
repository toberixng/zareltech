import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Trash2, Pencil } from 'lucide-react'
import { deleteProject } from './actions'

export default async function AdminPortfolioPage() {
  const supabase = await createClient()
  
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Portfolio CMS</h1>
        <Link href="/admin/portfolio/create" className="bg-[#CEFF00] text-black px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#b3ff00] transition-colors">
          <Plus className="w-5 h-5" /> New Project
        </Link>
      </div>
      
      <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-5 text-sm font-semibold text-slate-300">Project Name</th>
              <th className="p-5 text-sm font-semibold text-slate-300">Client</th>
              <th className="p-5 text-sm font-semibold text-slate-300">Category</th>
              <th className="p-5 text-sm font-semibold text-slate-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(!projects || projects.length === 0) && <tr><td colSpan={4} className="p-8 text-center text-slate-500">No projects found. Create your first case study!</td></tr>}
            {projects?.map((project) => (
              <tr key={project.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="p-5 font-medium text-white">{project.title}</td>
                <td className="p-5 text-slate-400">{project.client}</td>
                <td className="p-5 text-slate-400">{project.category}</td>
                <td className="p-5 text-right">
                  <Link href={`/admin/portfolio/edit/${project.id}`} className="inline-block p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors mr-2" title="Edit Project">
                    <Pencil className="w-5 h-5" />
                  </Link>
                  <form action={deleteProject.bind(null, project.id)} className="inline-block">
                    <button type="submit" className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete Project"><Trash2 className="w-5 h-5" /></button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
