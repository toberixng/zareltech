import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Trash2, Pencil, Eye, EyeOff } from 'lucide-react'
import { deleteService } from './actions'

export default async function AdminServicesPage() {
  const supabase = await createClient()
  
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Services CMS</h1>
        <Link href="/admin/services/create" className="bg-[#CEFF00] text-black px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#b3ff00] transition-colors">
          <Plus className="w-5 h-5" /> New Service
        </Link>
      </div>
      
      <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-5 text-sm font-semibold text-slate-300">Service Title</th>
              <th className="p-5 text-sm font-semibold text-slate-300">Slug</th>
              <th className="p-5 text-sm font-semibold text-slate-300">Visibility</th>
              <th className="p-5 text-sm font-semibold text-slate-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(!services || services.length === 0) && <tr><td colSpan={4} className="p-8 text-center text-slate-500">No services found. Create your first service!</td></tr>}
            {services?.map((service) => (
              <tr key={service.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="p-5 font-medium text-white">{service.title}</td>
                <td className="p-5 text-slate-400 font-mono text-sm">/{service.slug}</td>
                <td className="p-5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${service.is_visible ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
                    {service.is_visible ? <><Eye className="w-3 h-3" /> Visible</> : <><EyeOff className="w-3 h-3" /> Hidden</>}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <Link href={`/admin/services/edit/${service.id}`} className="inline-block p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors mr-2" title="Edit Service">
                    <Pencil className="w-5 h-5" />
                  </Link>
                  <form action={deleteService.bind(null, service.id)} className="inline-block">
                    <button type="submit" className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete Service"><Trash2 className="w-5 h-5" /></button>
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