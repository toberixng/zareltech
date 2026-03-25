'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createProject } from '../actions'

const projectSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(3, 'Slug is required'),
  client: z.string().min(2, 'Client is required'),
  category: z.string().min(2, 'Category is required'),
  overview: z.string().min(10, 'Overview is too short'),
  challenge: z.string().min(10, 'Challenge is too short'),
  solution: z.string().min(10, 'Solution is too short'),
  results: z.string().min(5, 'At least one key result is required'),
  published: z.boolean(),
})

type ProjectFormValues = z.infer<typeof projectSchema>

export default function CreateProjectPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { published: false }
  })

  async function onSubmit(data: ProjectFormValues) {
    setIsSubmitting(true)
    setError(null)
    
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('slug', data.slug)
    formData.append('client', data.client)
    formData.append('category', data.category)
    formData.append('overview', data.overview)
    formData.append('challenge', data.challenge)
    formData.append('solution', data.solution)
    formData.append('results', data.results)
    formData.append('published', String(data.published || false))
    
    const fileInput = document.getElementById('image') as HTMLInputElement
    if (fileInput?.files?.[0]) formData.append('image', fileInput.files[0])
    
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-[#050505] border border-white/10 p-8 rounded-3xl">
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium">{error}</div>}
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Project Title</label>
          <input {...register('title')} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50" />
          {errors.title && <p className="text-red-400 text-sm font-medium">{errors.title.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">URL Slug</label>
            <input {...register('slug')} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50" />
            {errors.slug && <p className="text-red-400 text-sm font-medium">{errors.slug.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Client Name</label>
            <input {...register('client')} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50" />
            {errors.client && <p className="text-red-400 text-sm font-medium">{errors.client.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Category</label>
            <input {...register('category')} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50" />
            {errors.category && <p className="text-red-400 text-sm font-medium">{errors.category.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Hero Image (Upload)</label>
          <input type="file" id="image" accept="image/*" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#CEFF00] file:text-black hover:file:bg-[#b3ff00]" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">1. The Overview</label>
          <textarea {...register('overview')} rows={4} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 resize-none"></textarea>
          {errors.overview && <p className="text-red-400 text-sm font-medium">{errors.overview.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">2. The Challenge</label>
          <textarea {...register('challenge')} rows={4} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 resize-none"></textarea>
          {errors.challenge && <p className="text-red-400 text-sm font-medium">{errors.challenge.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">3. The Solution</label>
          <textarea {...register('solution')} rows={4} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 resize-none"></textarea>
          {errors.solution && <p className="text-red-400 text-sm font-medium">{errors.solution.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Key Results (One per line)</label>
          <textarea {...register('results')} rows={4} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 resize-none font-mono"></textarea>
          {errors.results && <p className="text-red-400 text-sm font-medium">{errors.results.message}</p>}
        </div>

        <div className="flex items-center gap-3 pt-4">
          <input type="checkbox" id="published" {...register('published')} className="w-5 h-5 rounded border-white/10 bg-[#0A0A0B] text-[#CEFF00] focus:ring-1 focus:ring-[#CEFF00]" />
          <label htmlFor="published" className="text-sm font-semibold text-slate-300 cursor-pointer">Publish immediately (Public)</label>
        </div>

        <div className="pt-4 border-t border-white/10">
          <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-[#CEFF00] text-black px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-[#b3ff00] transition-all disabled:opacity-50">
            {isSubmitting ? 'Saving...' : 'Create Case Study'}
          </button>
        </div>
      </form>
    </div>
  )
}