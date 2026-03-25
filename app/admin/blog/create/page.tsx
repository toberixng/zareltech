'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createProject } from '../actions'

export default function CreateProjectPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    const formData = new FormData(event.currentTarget)
    const result = await createProject(formData)
    
    if (result?.error) {
      setError(result.error)
      setIsSubmitting(false)
    } else {
      router.push('/admin/portfolio')
    }
  }

  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-8">
        <Link href="/admin/portfolio" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </Link>
        <h1 className="text-3xl font-black text-white tracking-tight">Create Case Study</h1>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 bg-[#050505] border border-white/10 p-8 rounded-3xl">
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium">{error}</div>}
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Project Title</label>
          <input name="title" required className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50" placeholder="e.g. Fintech Dashboard" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">URL Slug</label>
            <input name="slug" required className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50" placeholder="fintech-dashboard" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Client Name</label>
            <input name="client" required className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50" placeholder="Nexus Global" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Category</label>
            <input name="category" required className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50" placeholder="Web Application" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Hero Image (Upload)</label>
          <input type="file" name="image" accept="image/*" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#CEFF00] file:text-black hover:file:bg-[#b3ff00]" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">1. The Overview</label>
          <textarea name="overview" required rows={4} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 resize-none"></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">2. The Challenge</label>
          <textarea name="challenge" required rows={4} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 resize-none"></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">3. The Solution</label>
          <textarea name="solution" required rows={4} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 resize-none"></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Key Results (One per line)</label>
          <textarea name="results" required rows={4} placeholder="Increased revenue by 40%&#10;Reduced load time to 1.2s&#10;Handled 10k concurrent users" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 resize-none font-mono"></textarea>
        </div>

        <div className="flex items-center gap-3 pt-4">
          <input type="checkbox" name="published" value="true" id="published" className="w-5 h-5 rounded border-white/10 bg-[#0A0A0B] text-[#CEFF00] focus:ring-1 focus:ring-[#CEFF00]" />
          <label htmlFor="published" className="text-sm font-semibold text-slate-300 cursor-pointer">Publish immediately (Public)</label>
        </div>

        <div className="pt-4 border-t border-white/10">
          <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-[#CEFF00] text-black px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-[#b3ff00] transition-all disabled:opacity-50">{isSubmitting ? 'Saving...' : 'Save Case Study'}</button>
        </div>
      </form>
    </div>
  )
}