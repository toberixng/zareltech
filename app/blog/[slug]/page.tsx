import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { PrimaryButton } from '../../../components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  
  const supabase = await createClient()
  const { data: post } = await supabase.from('posts').select('*').eq('slug', slug).single()

  if (!post) {
    notFound()
  }

  return (
    <div className="pt-32 pb-24">
      <article className="max-w-4xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#CEFF00] transition-colors mb-12 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to insights
        </Link>

        <div>
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#CEFF00] text-sm font-semibold uppercase tracking-wider bg-[#CEFF00]/10 px-4 py-1.5 rounded-full">
                {post.category}
              </span>
              <span className="text-slate-500 font-medium">
                {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">
              {post.title}<span className="text-[#CEFF00]">.</span>
            </h1>
          </div>

          {/* Hero Cover Image */}
          {post.image_url ? (
            <div className="w-full aspect-video md:aspect-21/9 rounded-3xl mb-16 overflow-hidden border border-white/10">
              <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-full aspect-video md:aspect-21/9 rounded-3xl mb-16 bg-linear-to-br from-zinc-800/50 to-black border border-white/10 flex items-center justify-center">
              <span className="text-white/40 font-medium tracking-widest uppercase text-lg">No Cover Image</span>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none mb-20">
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {/* Embedded CTA Section */}
          <div className="bg-[#050505] border border-white/10 p-12 rounded-4xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-80 h-80 rounded-full bg-[#CEFF00]/10 blur-[100px] pointer-events-none"></div>
            <h2 className="text-3xl font-black text-white tracking-tight mb-4 relative z-10">Enjoyed this technical deep dive?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto relative z-10">
              Our engineering team builds scalable, high-performance systems for ambitious brands. Let's talk about your next project.
            </p>
            <PrimaryButton href="/contact" className="mx-auto relative z-10 w-full sm:w-auto inline-flex">
              Work with Us <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </PrimaryButton>
          </div>
        </div>
      </article>
    </div>
  )
}