'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPost, updatePost } from '../../actions'

const postSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug is required. E.g., "my-first-post"'),
  category: z.string().min(2, 'Category is required'),
  content: z.string().min(20, 'Content is too short'),
  published: z.boolean(),
})

type PostFormValues = z.infer<typeof postSchema>

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema)
  })

  useEffect(() => {
    async function fetchPost() {
      if (!id) return
      const result = await getPost(id)
      if (result.error) {
        setError(result.error)
      } else if (result.post) {
        reset({
          title: result.post.title,
          slug: result.post.slug,
          category: result.post.category,
          content: result.post.content,
          published: result.post.published
        })
        setCurrentImage(result.post.image_url)
      }
      setIsLoading(false)
    }
    fetchPost()
  }, [id, reset])

  async function onSubmit(data: PostFormValues) {
    setIsSubmitting(true)
    setError(null)
    
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('slug', data.slug)
    formData.append('category', data.category)
    formData.append('content', data.content)
    formData.append('published', String(data.published || false))
    
    const fileInput = document.getElementById('image') as HTMLInputElement
    if (fileInput?.files?.[0]) {
      formData.append('image', fileInput.files[0])
    }
    
    const result = await updatePost(id, formData)
    
    if (result?.error) {
      setError(result.error)
      setIsSubmitting(false)
    } else {
      router.push('/admin/blog')
    }
  }

  if (isLoading) return <div className="p-8 text-slate-400 font-medium animate-pulse">Loading post data...</div>

  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-8">
        <Link href="/admin/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to posts
        </Link>
        <h1 className="text-3xl font-black text-white tracking-tight">Edit Post</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-[#050505] border border-white/10 p-8 rounded-3xl">
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium">{error}</div>}
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Article Title</label>
          <input {...register('title')} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50" />
          {errors.title && <p className="text-red-400 text-sm font-medium">{errors.title.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">URL Slug</label>
            <input {...register('slug')} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50" />
            {errors.slug && <p className="text-red-400 text-sm font-medium">{errors.slug.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Category</label>
            <input {...register('category')} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50" />
            {errors.category && <p className="text-red-400 text-sm font-medium">{errors.category.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300 flex justify-between">
            <span>Cover Image (Upload to replace)</span>
            {currentImage && <a href={currentImage} target="_blank" rel="noreferrer" className="text-[#CEFF00] hover:underline text-xs">View Current Image</a>}
          </label>
          <input type="file" id="image" accept="image/*" className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#CEFF00] file:text-black hover:file:bg-[#b3ff00]" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Content</label>
          <textarea {...register('content')} rows={12} className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CEFF00]/50 resize-none font-mono text-sm leading-relaxed"></textarea>
          {errors.content && <p className="text-red-400 text-sm font-medium">{errors.content.message}</p>}
        </div>

        <div className="flex items-center gap-3 pt-4">
          <input type="checkbox" id="published" {...register('published')} className="w-5 h-5 rounded border-white/10 bg-[#0A0A0B] text-[#CEFF00] focus:ring-1 focus:ring-[#CEFF00]" />
          <label htmlFor="published" className="text-sm font-semibold text-slate-300 cursor-pointer">Published (Public)</label>
        </div>

        <div className="pt-4 border-t border-white/10">
          <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-[#CEFF00] text-black px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-[#b3ff00] transition-all disabled:opacity-50">
            {isSubmitting ? 'Saving...' : 'Update Post'}
          </button>
        </div>
      </form>
    </div>
  )
}