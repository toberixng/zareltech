'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Globe2, Zap, BarChart3, Smartphone, Database, Lock, CheckCircle2 } from 'lucide-react'
import { PrimaryButton } from '../../../components/ui/button'

// In a real application, this might come from a CMS, database, or a dedicated data file.
const servicesData: Record<string, any> = {
  'web-applications': {
    title: 'Web Applications',
    icon: <Globe2 className="w-8 h-8" />,
    description: 'Lightning-fast, SEO-optimized web applications built on modern frameworks like Next.js and React.',
    content: 'In today\'s digital landscape, your web application is often the first point of contact with your customers. We specialize in building robust, scalable, and blazing-fast web applications that not only look beautiful but perform flawlessly. Our team leverages the latest technologies to ensure your product is future-proof.',
    features: ['React & Next.js Development', 'Progressive Web Apps (PWA)', 'API Development & Integration', 'SEO & Performance Optimization']
  },
  'system-architecture': {
    title: 'System Architecture',
    icon: <Zap className="w-8 h-8" />,
    description: 'Scalable backend systems and microservices built for high availability.',
    content: 'A strong foundation is critical for any growing digital business. We design and implement system architectures that can handle millions of requests without breaking a sweat. From monolithic migrations to cloud-native microservices, we build for scale, resilience, and maintainability.',
    features: ['Microservices Architecture', 'Cloud Infrastructure (AWS, GCP)', 'High-Availability Systems', 'Database Design & Optimization']
  },
  'performance-audits': {
    title: 'Performance Audits',
    icon: <BarChart3 className="w-8 h-8" />,
    description: 'Deep-dive technical audits to identify bottlenecks and radically improve speed.',
    content: 'Slow applications cost you users and revenue. Our comprehensive performance audits identify the exact bottlenecks holding your system back. We provide actionable insights and can help you implement fixes that drastically improve load times, reduce server costs, and enhance the user experience.',
    features: ['Core Web Vitals Optimization', 'Backend Profiling & Tracing', 'Database Query Optimization', 'Load Testing & Capacity Planning']
  },
  'mobile-development': {
    title: 'Mobile Development',
    icon: <Smartphone className="w-8 h-8" />,
    description: 'Cross-platform mobile applications using React Native for native-like experiences.',
    content: 'Reach your users wherever they are with powerful mobile applications. We specialize in React Native, allowing us to deliver high-quality iOS and Android apps from a single codebase. This approach drastically reduces time-to-market and maintenance costs without sacrificing performance.',
    features: ['React Native Development', 'iOS & Android Deployment', 'Offline-First Capabilities', 'Push Notifications & Engagement']
  },
  'data-engineering': {
    title: 'Data Engineering',
    icon: <Database className="w-8 h-8" />,
    description: 'Complex data pipelines, warehousing, and analytics setups for business intelligence.',
    content: 'Your data is your most valuable asset. We help you unlock its potential by building robust data pipelines, scalable data warehouses, and comprehensive analytics setups. Make informed, data-driven decisions with real-time insights and scalable data infrastructure.',
    features: ['ETL Pipeline Construction', 'Data Warehousing', 'Real-Time Analytics', 'Business Intelligence Dashboards']
  },
  'security-and-devops': {
    title: 'Security & DevOps',
    icon: <Lock className="w-8 h-8" />,
    description: 'Enterprise-grade security implementations and automated CI/CD pipelines.',
    content: 'Ship code faster, safer, and more reliably. Our DevOps engineers automate your deployment processes, ensuring seamless transitions from development to production. Coupled with our rigorous security practices, we protect your infrastructure against modern threats.',
    features: ['CI/CD Pipeline Automation', 'Infrastructure as Code (IaC)', 'Security Audits & Penetration Testing', '24/7 Monitoring & Alerting']
  }
}

export default function ServiceDetailsPage() {
  const params = useParams()
  const slug = params.slug as string
  const service = servicesData[slug]

  if (!service) {
    return (
      <div className="pt-40 pb-24 max-w-7xl mx-auto px-6 text-center min-h-[60vh]">
        <h1 className="text-4xl font-bold text-white mb-6">Service not found</h1>
        <Link href="/services" className="text-[#CEFF00] hover:underline font-medium">Return to Services</Link>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-24">
      <article className="max-w-4xl mx-auto px-6">
        <Link href="/services" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#CEFF00] transition-colors mb-12 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to all services
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-16 h-16 bg-[#CEFF00]/10 rounded-2xl flex items-center justify-center mb-8 text-[#CEFF00]">
            {service.icon}
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
            {service.title}<span className="text-[#CEFF00]">.</span>
          </h1>
          <p className="text-2xl text-slate-300 leading-relaxed mb-12 font-medium">{service.description}</p>
          <div className="prose prose-invert prose-lg max-w-none mb-16">
            <p className="text-slate-400 leading-relaxed">{service.content}</p>
          </div>
          <div className="bg-[#050505] border border-white/10 p-8 md:p-12 rounded-4xl mb-16">
            <h3 className="text-2xl font-bold text-white mb-8">What this includes:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-4 text-slate-300"><CheckCircle2 className="w-6 h-6 text-[#CEFF00] shrink-0" /><span>{feature}</span></li>
              ))}
            </ul>
          </div>
          <PrimaryButton href="/contact" className="w-full sm:w-auto inline-flex">Start a Project <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></PrimaryButton>
        </motion.div>
      </article>
    </div>
  )
}
