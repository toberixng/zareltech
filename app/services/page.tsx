'use client'

import { motion } from 'framer-motion'
import { Globe2, Zap, BarChart3, Smartphone, Database, Lock, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { PrimaryButton } from '../../components/ui/button'

export default function ServicesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const services = [
    {
      icon: <Globe2 className="w-7 h-7" />,
      title: 'Web Applications',
      slug: 'web-applications',
      description: 'Lightning-fast, SEO-optimized web applications built on modern frameworks like Next.js and React. We create digital experiences that turn visitors into customers.'
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: 'System Architecture',
      slug: 'system-architecture',
      description: 'Scalable backend systems and microservices built for high availability. We design infrastructure that grows seamlessly with your business.'
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: 'Performance Audits',
      slug: 'performance-audits',
      description: 'Deep-dive technical audits. We identify bottlenecks in your current stack and implement solutions that radically improve speed and reliability.'
    },
    {
      icon: <Smartphone className="w-7 h-7" />,
      title: 'Mobile Development',
      slug: 'mobile-development',
      description: 'Cross-platform mobile applications using React Native. Deliver native-like experiences to your users on both iOS and Android from a single codebase.'
    },
    {
      icon: <Database className="w-7 h-7" />,
      title: 'Data Engineering',
      slug: 'data-engineering',
      description: 'Complex data pipelines, warehousing, and analytics setups. Turn your raw data into actionable business intelligence securely.'
    },
    {
      icon: <Lock className="w-7 h-7" />,
      title: 'Security & DevOps',
      slug: 'security-and-devops',
      description: 'Enterprise-grade security implementations and automated CI/CD pipelines. Ship code faster without compromising on safety or quality.'
    }
  ]

  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
            Engineering solutions that <span className="text-[#CEFF00] italic">scale.</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            We don't just write code; we build digital businesses. From high-converting marketing sites to complex internal tools, our engineering team delivers excellence across the stack.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
            >
              <Link href={`/services/${service.slug}`} className="block h-full bg-[#050505] border border-white/10 p-10 rounded-3xl hover:border-[#CEFF00]/30 hover:bg-[#0A0A0B] transition-colors group">
                <div className="w-14 h-14 bg-[#CEFF00]/10 rounded-2xl flex items-center justify-center mb-8 text-[#CEFF00] group-hover:scale-110 group-hover:bg-[#CEFF00] group-hover:text-black transition-all">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#CEFF00] transition-colors">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-[#050505] border border-white/10 p-12 md:p-20 rounded-5xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-[#CEFF00]/10 blur-[100px] pointer-events-none"></div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 relative z-10">Ready to build something great?</h2>
          <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto relative z-10">
            Let's discuss your technical challenges and see how our team can help you achieve your business goals.
          </p>
          <PrimaryButton href="/contact" className="mx-auto relative z-10 w-full sm:w-auto inline-flex">
            Schedule a Consultation <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </PrimaryButton>
        </div>
      </section>
    </div>
  )
}
