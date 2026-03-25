import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Trash2, Pencil } from 'lucide-react'
import { deletePost } from './actions'

export default async function AdminBlogPage() {
  const supabase = await createClient()
  
  // Fetch all posts from the database
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Blog CMS</h1>
        <Link href="/admin/blog/create" className="bg-[#CEFF00] text-black px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#b3ff00] transition-colors">
          <Plus className="w-5 h-5" /> New Post
        </Link>
      </div>
      
      <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-5 text-sm font-semibold text-slate-300">Title</th>
              <th className="p-5 text-sm font-semibold text-slate-300">Category</th>
              <th className="p-5 text-sm font-semibold text-slate-300">Status</th>
              <th className="p-5 text-sm font-semibold text-slate-300">Date</th>
              <th className="p-5 text-sm font-semibold text-slate-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(!posts || posts.length === 0) && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">No posts found. Create your first post!</td>
              </tr>
            )}
            {posts?.map((post) => (
              <tr key={post.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="p-5 font-medium text-white">{post.title}</td>
                <td className="p-5 text-slate-400">{post.category}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${post.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-5 text-slate-400">{new Date(post.created_at).toLocaleDateString()}</td>
                <td className="p-5 text-right">
                  <Link href={`/admin/blog/edit/${post.id}`} className="inline-block p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors mr-2" title="Edit Post">
                    <Pencil className="w-5 h-5" />
                  </Link>
                  <form action={deletePost.bind(null, post.id)} className="inline-block">
                    <button type="submit" className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete Post">
                      <Trash2 className="w-5 h-5" />
                    </button>
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
