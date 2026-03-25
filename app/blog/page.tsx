import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'


export default async function BlogPage() {
  const supabase = await createClient()
  
  // Fetch published posts directly from Supabase
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
            Our <span className="text-[#CEFF00] italic">Insights.</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Thoughts, learnings, and technical deep-dives from the engineering team at Zarel.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        {(!posts || posts.length === 0) && (
          <p className="text-slate-400 text-lg">No posts published yet. Check back soon!</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <div key={post.id}>
              <Link href={`/blog/${post.slug}`} className="h-full group bg-[#050505] border border-white/10 p-6 rounded-3xl hover:border-[#CEFF00]/50 transition-colors flex flex-col overflow-hidden">
                {post.image_url ? (
                  <div className="w-full aspect-video rounded-2xl mb-6 overflow-hidden bg-white/5 shrink-0">
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-2xl mb-6 bg-white/5 flex items-center justify-center text-white/20 text-sm font-medium shrink-0">No Image</div>
                )}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[#CEFF00] text-xs font-bold uppercase tracking-wider bg-[#CEFF00]/10 px-3 py-1 rounded-full">{post.category}</span>
                  <span className="text-slate-500 text-sm font-medium">
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-[#CEFF00] transition-colors">{post.title}</h2>
                <p className="text-slate-400 mb-8 line-clamp-3">{post.content}</p>
                <div className="flex items-center text-white font-medium group-hover:text-[#CEFF00] transition-colors mt-auto pt-4 border-t border-white/5">
                  Read Article <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}