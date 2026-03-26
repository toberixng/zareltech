import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: blogCount },
    { count: portfolioCount },
    { count: servicesCount },
    { data: recentBlogs },
    { data: recentProjects },
    { data: recentServices },
  ] = await Promise.all([
    // Fetch statistics for display cards
    supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published'), // Assuming you have a status column
    supabase
      .from('projects')
      .select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),

    // Fetch the 5 most recently updated items from each table
    supabase
      .from('services')
      .select('id, title, updated_at')
      .order('updated_at', { ascending: false })
      .limit(5),
    supabase
      .from('projects')
      .select('id, title, updated_at')
      .order('updated_at', { ascending: false })
      .limit(5),
    supabase
      .from('blog_posts')
      .select('id, title, updated_at')
      .order('updated_at', { ascending: false })
      .limit(5),
  ])

  // Combine and sort all recent items to find the top 5 across all types
  const allRecentItems = [
    ...(recentBlogs?.map((item) => ({ ...item, type: 'Blog Post', href: `/admin/blog/edit/${item.id}` })) || []),
    ...(recentProjects?.map((item) => ({ ...item, type: 'Project', href: `/admin/portfolio/edit/${item.id}` })) || []),
    ...(recentServices?.map((item) => ({ ...item, type: 'Service', href: `/admin/services/edit/${item.id}` })) || []),
  ]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Blog Stats Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col">
          <h2 className="text-lg font-medium text-gray-600">Active Blog Posts</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2 flex-grow">{blogCount || 0}</p>
          <Link 
            href="/admin/blog" 
            className="text-sm font-medium text-blue-500 hover:text-blue-700 mt-4 transition-colors"
          >
            Manage Blog &rarr;
          </Link>
        </div>

        {/* Portfolio Stats Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col">
          <h2 className="text-lg font-medium text-gray-600">Portfolio Projects</h2>
          <p className="text-4xl font-bold text-emerald-600 mt-2 flex-grow">{portfolioCount || 0}</p>
          <Link 
            href="/admin/portfolio" 
            className="text-sm font-medium text-emerald-500 hover:text-emerald-700 mt-4 transition-colors"
          >
            Manage Portfolio &rarr;
          </Link>
        </div>

        {/* Services Stats Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col">
          <h2 className="text-lg font-medium text-gray-600">Active Services</h2>
          <p className="text-4xl font-bold text-purple-600 mt-2 flex-grow">{servicesCount || 0}</p>
          <Link 
            href="/admin/services" 
            className="text-sm font-medium text-purple-500 hover:text-purple-700 mt-4 transition-colors"
          >
            Manage Services &rarr;
          </Link>
        </div>
      </div>

      {/* Recently Updated Table */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recently Updated</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600">Title</th>
                <th className="p-4 font-semibold text-gray-600">Type</th>
                <th className="p-4 font-semibold text-gray-600">Last Updated</th>
                <th className="p-4 font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {allRecentItems.length > 0 ? (
                allRecentItems.map((item) => (
                  <tr key={`${item.type}-${item.id}`} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-900 font-medium">{item.title}</td>
                    <td className="p-4 text-gray-600">{item.type}</td>
                    <td className="p-4 text-gray-600">
                      {new Date(item.updated_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="p-4 text-right">
                      <Link href={item.href} className="text-blue-600 hover:text-blue-800 font-semibold">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">No recent updates to show.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
