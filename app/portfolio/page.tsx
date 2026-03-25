'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function PortfolioPage() {
  const projects = [
    {
      title: 'Fintech Dashboard',
      slug: 'fintech-dashboard',
      client: 'Nexus Global',
      category: 'Web Application',
      color: 'from-blue-500/20 to-purple-500/20',
      border: 'group-hover:border-blue-500/50'
    },
    {
      title: 'E-Commerce Platform',
      slug: 'e-commerce-platform',
      client: 'Acme Corp',
      category: 'System Architecture',
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'group-hover:border-emerald-500/50'
    },
    {
      title: 'Healthcare Portal',
      slug: 'healthcare-portal',
      client: 'Synthesis Health',
      category: 'Mobile Development',
      color: 'from-rose-500/20 to-orange-500/20',
      border: 'group-hover:border-rose-500/50'
    },
    {
      title: 'Logistics Tracker',
      slug: 'logistics-tracker',
      client: 'Global.io',
      category: 'Web Application',
      color: 'from-amber-500/20 to-yellow-500/20',
      border: 'group-hover:border-amber-500/50'
    },
    {
      title: 'Crypto Exchange',
      slug: 'crypto-exchange',
      client: 'CoinFlow',
      category: 'Security & DevOps',
      color: 'from-indigo-500/20 to-cyan-500/20',
      border: 'group-hover:border-indigo-500/50'
    },
    {
      title: 'AI Content Generator',
      slug: 'ai-content-generator',
      client: 'WriteMind',
      category: 'System Architecture',
      color: 'from-fuchsia-500/20 to-pink-500/20',
      border: 'group-hover:border-fuchsia-500/50'
    }
  ]

  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
            Featured <span className="text-[#CEFF00] italic">Work.</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Explore some of our recent projects. We partner with ambitious brands to build scalable, high-performance digital products.
          </p>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/portfolio/${project.slug}`} className="block group">
                <div className={`w-full aspect-4/3 rounded-3xl mb-6 bg-linear-to-br ${project.color} border border-white/10 ${project.border} transition-all duration-500 relative overflow-hidden flex items-center justify-center`}>
                   <span className="text-white/40 font-medium tracking-widest uppercase text-sm">Image Placeholder</span>
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="flex justify-between items-start pr-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#CEFF00] transition-colors">{project.title}</h3>
                    <p className="text-slate-400">{project.client} • {project.category}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-[#CEFF00] group-hover:text-black group-hover:border-[#CEFF00] transition-all -rotate-45 group-hover:rotate-0">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}