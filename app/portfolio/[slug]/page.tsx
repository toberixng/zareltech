'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { PrimaryButton } from '../../../components/ui/button'

// In production, this will come from your Supabase 'projects' table!
const portfolioData: Record<string, any> = {
  'fintech-dashboard': {
    title: 'Fintech Dashboard',
    client: 'Nexus Global',
    category: 'Web Application',
    color: 'from-blue-500/20 to-purple-500/20',
    overview: 'Nexus Global needed a comprehensive financial dashboard to help their users manage cross-border payments, track currency fluctuations, and execute high-volume trades in real-time.',
    challenge: 'The existing system was built on a legacy PHP monolith that struggled to handle more than 100 concurrent users without significant lag. Data updates required manual page refreshes, and the UI was outdated, leading to poor user retention.',
    solution: 'We re-architected the platform using Next.js for the frontend and a scalable microservices backend in Node.js. We implemented WebSockets for real-time data streaming and completely overhauled the UI/UX to feel like a premium trading terminal.',
    results: [
      'Reduced page load times by 75%',
      'Handled 10,000+ concurrent users with zero downtime',
      'Increased daily active users (DAU) by 42% within 3 months',
      'Won "Best Fintech UI" at the Annual Finance Tech Awards'
    ]
  }
}

// Fallback data for the other placeholders in the demo
const defaultData = {
  overview: 'We partnered with the client to deliver a complete digital transformation, focusing on scalability, performance, and user experience.',
  challenge: 'The business was facing severe bottlenecks with their existing infrastructure, limiting their ability to scale and causing frustration for their user base.',
  solution: 'Our team architected a custom solution from the ground up, leveraging modern web technologies and cloud infrastructure to build a robust, future-proof platform.',
  results: [
    'Improved system performance by 3x',
    'Automated 40% of manual administrative tasks',
    'Successfully scaled to support 5x user growth',
    'Reduced cloud infrastructure costs by 25%'
  ]
}

export default function PortfolioCaseStudyPage() {
  const params = useParams()
  const slug = params.slug as string
  
  // Map the slug to data, or fall back to generic generated content
  const project = portfolioData[slug] || {
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    client: 'Confidential Client',
    category: 'Digital Product',
    color: 'from-slate-500/20 to-zinc-500/20',
    ...defaultData
  }

  return (
    <div className="pt-32 pb-24">
      <article className="max-w-5xl mx-auto px-6">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#CEFF00] transition-colors mb-12 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to all work
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <p className="text-[#CEFF00] font-semibold tracking-widest uppercase text-sm mb-4">{project.client} • {project.category}</p>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                {project.title}<span className="text-[#CEFF00]">.</span>
              </h1>
            </div>
          </div>

          {/* Hero Cover Image Placeholder */}
          <div className={`w-full aspect-video md:aspect-21/9 rounded-3xl mb-16 bg-linear-to-br ${project.color} border border-white/10 flex items-center justify-center`}>
            <span className="text-white/40 font-medium tracking-widest uppercase text-lg">Case Study Hero Image</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2 space-y-12">
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">1. The Overview</h2>
                <p className="text-lg text-slate-400 leading-relaxed">{project.overview}</p>
              </section>
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">2. The Challenge</h2>
                <p className="text-lg text-slate-400 leading-relaxed">{project.challenge}</p>
              </section>
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">3. The Solution</h2>
                <p className="text-lg text-slate-400 leading-relaxed">{project.solution}</p>
              </section>
            </div>

            <div className="space-y-8">
              <div className="bg-[#050505] border border-white/10 p-8 rounded-3xl">
                <h3 className="text-xl font-bold text-white mb-6">Key Results</h3>
                <ul className="space-y-4">
                  {project.results.map((result: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-[#CEFF00] shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#050505] border border-white/10 p-12 md:p-20 rounded-5xl text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-[#CEFF00]/10 blur-[100px] pointer-events-none"></div>
             <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 relative z-10">Want to build something similar?</h2>
             <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto relative z-10">
               Let's discuss how we can solve your complex technical challenges and scale your platform.
             </p>
             <PrimaryButton href="/contact" className="mx-auto relative z-10 w-full sm:w-auto inline-flex">
               Start a Project <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
             </PrimaryButton>
          </div>
        </motion.div>
      </article>
    </div>
  )
}
