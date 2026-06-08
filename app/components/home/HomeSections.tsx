'use client'

import { motion } from 'framer-motion'
import { Search, ArrowLeft, Star, Code, Video, PenTool, Megaphone, MonitorPlay, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

// --- بيانات الأقسام ---
const categories = [
  { name: 'برمجة وتطوير', icon: Code, count: 124 },
  { name: 'صناعة الفيديو', icon: Video, count: 85 },
  { name: 'تصميم', icon: PenTool, count: 210 },
  { name: 'تسويق', icon: Megaphone, count: 156 },
  { name: 'إنتاجية', icon: MonitorPlay, count: 320 },
  { name: 'ذكاء توليدي', icon: Sparkles, count: 95 },
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
}

// --- الأقسام ---

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-gray-900">
      <div className="container px-4 mx-auto text-center z-10 relative">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        >
          مرحباً بك في <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">BAKR AI</span>
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        >
          دليلك الشامل لاستكشاف أقوى أدوات الذكاء الاصطناعي لتطوير أعمالك، تحسين تصميماتك، ومضاعفة إنتاجيتك.
        </motion.p>
        
        <motion.div 
          className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
        >
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input 
              type="text" 
              placeholder="ابحث عن الأدوات، الأقسام، أو الكلمات المفتاحية..." 
              className="pr-12 pl-4 h-14 w-full text-lg rounded-full bg-[#111] border-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-yellow-500"
              dir="rtl"
            />
          </div>
          <Button size="lg" className="h-14 rounded-full px-8 text-lg bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold border-0">
            استكشف الأدوات
          </Button>
        </motion.div>
      </div>
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    </section>
  )
}

export function StatsBar() {
  return (
    <motion.section {...fadeIn} className="border-b border-gray-900 bg-[#0c0c0c]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse border-gray-800">
          <div className="flex flex-col space-y-2 pt-4 md:pt-0">
            <span className="text-4xl font-bold text-yellow-500">1,200+</span>
            <span className="text-sm text-gray-400 font-medium tracking-wider">أداة مفهرسة</span>
          </div>
          <div className="flex flex-col space-y-2 pt-4 md:pt-0">
            <span className="text-4xl font-bold text-yellow-500">45</span>
            <span className="text-sm text-gray-400 font-medium tracking-wider">قسم وتصنيف</span>
          </div>
          <div className="flex flex-col space-y-2 pt-4 md:pt-0">
            <span className="text-4xl font-bold text-yellow-500">50K+</span>
            <span className="text-sm text-gray-400 font-medium tracking-wider">زائر شهرياً</span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export function TopRatedToolsSlider({ tools }: { tools: any[] }) {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="py-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">أدوات مميزة ومقترحة</h2>
          <p className="text-gray-400">أفضل أدوات الذكاء الاصطناعي التي نوصي بها.</p>
        </div>
      </div>
      
      <div className="flex overflow-x-auto pb-8 gap-6 hide-scrollbar snap-x" style={{ scrollbarWidth: 'none' }}>
        {tools.slice(0, 8).map((tool, idx) => (
          <motion.div 
            key={tool.id} 
            className="snap-start shrink-0 w-[300px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="hover:border-yellow-500/50 transition-colors cursor-pointer h-full bg-[#111] border-gray-800">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 relative rounded-xl overflow-hidden bg-gray-900 border border-gray-800 flex items-center justify-center">
                    {tool.image_url ? (
                      <Image src={tool.image_url} alt={tool.name} fill className="object-cover" />
                    ) : (
                      <Sparkles className="w-6 h-6 text-yellow-500" />
                    )}
                  </div>
                  <Badge className="bg-gray-800 text-gray-300 hover:bg-gray-700 border-0">
                    {tool.pricing_type || 'مدفوع'}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{tool.name}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2" dir="auto">
                  {tool.description || 'وصف الأداة غير متوفر حالياً.'}
                </p>
                <div className="flex items-center text-sm font-medium text-gray-300">
                  <Star className="w-4 h-4 text-yellow-500 ml-1 fill-yellow-500" />
                  4.9
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function CategoriesGrid() {
  return (
    <section className="py-20 border-t border-gray-900 bg-[#0c0c0c]">
      <div className="container px-4 mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold mb-10 text-center text-white">تصفح حسب الأقسام</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon
            return (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="bg-[#111] border-gray-800 hover:border-yellow-500/40 transition-colors cursor-pointer text-center group">
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-3">
                    <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-500 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium text-sm text-gray-200">{cat.name}</h3>
                    <p className="text-xs text-gray-500">{cat.count} أداة</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function NewsletterCTA() {
  return (
    <motion.section {...fadeIn} className="py-24 bg-[#0a0a0a]">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-black rounded-3xl p-8 md:p-16 text-center overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">لا تفوت أي تحديث!</h2>
            <p className="text-black/80 mb-8 max-w-xl mx-auto text-lg font-medium">
              انضم إلى أكثر من 10,000 مبدع ومطور. احصل على نشرة أسبوعية تتضمن أحدث وأقوى أدوات الذكاء الاصطناعي مباشرة في بريدك.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="أدخل بريدك الإلكتروني" 
                className="bg-white/90 text-black border-none h-12 placeholder:text-gray-500 text-right text-base"
                required
                dir="rtl"
              />
              <Button size="lg" className="h-12 w-full sm:w-auto shrink-0 bg-black text-white hover:bg-gray-900">
                اشترك الآن <ArrowLeft className="mr-2 w-4 h-4" />
              </Button>
            </form>
          </div>
          {/* تأثيرات زخرفية */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </motion.section>
  )
}