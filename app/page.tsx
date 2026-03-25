'use client'

import Link from 'next/link'
import { ArrowUpRight, BarChart3, Globe2, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { PrimaryButton, SecondaryButton } from '../components/ui/button'

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 lg:py-48">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#CEFF00] text-sm font-semibold mb-8 tracking-wide uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-[#CEFF00] animate-pulse"></span>
              Engineering Growth
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.05] text-white mb-8"
            >
              We build platforms that <span className="text-[#CEFF00] italic">outperform.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl leading-relaxed"
            >
              Zarel is the high-performance technology partner for ambitious brands. We engineer scalable web applications and digital systems that drive serious revenue.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <PrimaryButton href="/contact">
                Start a Project <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </PrimaryButton>
              <SecondaryButton href="/portfolio">
                View Our Work
              </SecondaryButton>
            </motion.div>
          </div>
        </div>
        
        {/* Subtle glowing background graphic */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-150 h-150 rounded-full bg-[#CEFF00]/5 blur-[120px] pointer-events-none"></div>
      </section>

      {/* Marquee / "Trusted By" Section */}
      <section className="border-y border-white/10 bg-white/5 py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap">Trusted by industry leaders</p>
          <div className="flex flex-wrap items-center justify-end gap-12 text-2xl font-black text-slate-600 grayscale opacity-50 w-full">
            <span>ACME CORP</span>
            <span>GLOBAL.IO</span>
            <span>NEXUS</span>
            <span>SYNTHESIS</span>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-white max-w-2xl"
            >
              Expect more from your technology.
            </motion.h2>
            <Link href="/services" className="text-white hover:text-[#CEFF00] font-bold flex items-center gap-2 transition-colors mb-2">
              View all services <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-[#0A0A0B] border border-white/10 p-10 rounded-3xl hover:border-[#CEFF00]/30 transition-colors group"
            >
              <div className="w-14 h-14 bg-[#CEFF00]/10 rounded-2xl flex items-center justify-center mb-8 text-[#CEFF00] group-hover:scale-110 transition-transform">
                <Globe2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Web Applications</h3>
              <p className="text-slate-400 leading-relaxed">
                Lightning-fast, SEO-optimized web applications built on Next.js. We create digital experiences that turn visitors into customers.
              </p>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="bg-[#0A0A0B] border border-white/10 p-10 rounded-3xl hover:border-[#CEFF00]/30 transition-colors group"
            >
              <div className="w-14 h-14 bg-[#CEFF00]/10 rounded-2xl flex items-center justify-center mb-8 text-[#CEFF00] group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">System Architecture</h3>
              <p className="text-slate-400 leading-relaxed">
                Scalable backend systems and APIs built for high availability. We design infrastructure that grows seamlessly with your business.
              </p>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="bg-[#0A0A0B] border border-white/10 p-10 rounded-3xl hover:border-[#CEFF00]/30 transition-colors group"
            >
              <div className="w-14 h-14 bg-[#CEFF00]/10 rounded-2xl flex items-center justify-center mb-8 text-[#CEFF00] group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Performance Audit</h3>
              <p className="text-slate-400 leading-relaxed">
                Deep-dive technical audits. We identify bottlenecks in your current stack and implement solutions that radically improve speed.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}