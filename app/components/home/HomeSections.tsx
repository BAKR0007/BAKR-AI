'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowLeft, Star, Code, Video, PenTool, Megaphone, MonitorPlay, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation' 

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

// 💡 المكون الذكي للتعامل مع الصور (مطابق لـ ToolCard)
function SliderImage({ src, alt }: { src: string; alt: string }) {
  const [imgError, setImgError] = useState(false);
  
  if (!src || imgError) {
    return <span>AI</span>;
  }
  
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill 
      className="object-cover" 
      unoptimized 
      onError={() => setImgError(true)} 
    />
  );
}

// --- الأقسام ---

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tools?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-[#090514] via-[#160a35] to-[#0f0c29] border-b border-indigo-900/50">
      <div className="container px-4 mx-auto text-center z-10 relative">
        <motion.div className="flex justify-center mb-8" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-amber-400/50 shadow-[0_0_50px_rgba(251,191,36,0.3)] hover:shadow-[0_0_80px_rgba(251,191,36,0.5)] transition-all duration-500">
            <Image src="/logo.png" alt="BAKR AI Logo" fill sizes="(max-width: 768px) 128px, 160px" className="object-cover hover:scale-110 transition-transform duration-700" priority />
          </div>
        </motion.div>

        <motion.h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white drop-shadow-lg" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          مرحباً بك في <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]">BAKR AI</span>
        </motion.h1>
        
        <motion.p className="text-lg md:text-xl text-indigo-200/80 mb-10 max-w-2xl mx-auto leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          دليلك الشامل لاستكشاف أقوى أدوات الذكاء الاصطناعي لتطوير أعمالك، تحسين تصميماتك، ومضاعفة إنتاجيتك في عالم سحري.
        </motion.p>
        
        <motion.form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 h-5 w-5" />
            <Input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="ابحث عن الأدوات، الأقسام، أو الكلمات المفتاحية..." className="pr-12 pl-4 h-14 w-full text-lg rounded-full bg-white/5 backdrop-blur-md border-indigo-500/30 text-white placeholder:text-indigo-300/50 focus-visible:ring-amber-500 shadow-inner" dir="rtl" />
          </div>
          <Button type="submit" size="lg" className="h-14 rounded-full px-8 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold border-0 shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all">
            استكشف الأدوات
          </Button>
        </motion.form>
      </div>
      
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
    </section>
  )
}

export function StatsBar() {
  return (
    <motion.section {...fadeIn} className="border-b border-indigo-900/50 bg-[#0b081a]/80 backdrop-blur-xl relative z-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse border-indigo-900/50">
          <div className="flex flex-col space-y-2 pt-4 md:pt-0">
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-500 drop-shadow-sm">1,200+</span>
            <span className="text-sm text-indigo-200 font-medium tracking-wider">أداة مفهرسة</span>
          </div>
          <div className="flex flex-col space-y-2 pt-4 md:pt-0">
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-500 drop-shadow-sm">45</span>
            <span className="text-sm text-indigo-200 font-medium tracking-wider">قسم وتصنيف</span>
          </div>
          <div className="flex flex-col space-y-2 pt-4 md:pt-0">
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-500 drop-shadow-sm">50K+</span>
            <span className="text-sm text-indigo-200 font-medium tracking-wider">زائر شهرياً</span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export function TopRatedToolsSlider({ tools }: { tools: any[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    const scroll = () => {
      if (sliderRef.current && !isHovered) {
        sliderRef.current.scrollLeft += 1;
        if (sliderRef.current.scrollLeft >= (sliderRef.current.scrollWidth - sliderRef.current.clientWidth)) {
          sliderRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  if (!tools || tools.length === 0) return null;
  const infiniteTools = [...tools, ...tools, ...tools];

  return (
    <section className="py-16 bg-gradient-to-b from-[#0f0c29] to-[#120b2e] overflow-hidden">
      <div className="flex justify-between items-end mb-4 px-4 max-w-7xl mx-auto relative z-20">
        <div>
          <h2 className="text-3xl font-extrabold mb-2 text-white flex items-center gap-2">
            <Sparkles className="text-amber-400 w-6 h-6" /> أدوات مميزة ومقترحة
          </h2>
          <p className="text-indigo-300/80">أفضل أدوات الذكاء الاصطناعي التي نوصي بها.</p>
        </div>
      </div>
      
      <div 
        ref={sliderRef}
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
        className="flex overflow-x-auto py-16 px-4 gap-8 w-full [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {infiniteTools.map((tool, idx) => (
          <div key={`${tool.id}-${idx}`} className="shrink-0 w-[320px] relative group h-full">
            
            {/* 🌟 التعديل هنا: زيادة قوة الوهج ومساحته (opacity-60 و -inset-2) */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"></div>

            <Link href={`/tools/${tool.slug || tool.id}`} className="block relative z-10 h-full outline-none">
              {/* 🌟 التعديل هنا: جعل لون البطاقة أسود داكن جداً (bg-[#050505]) ليعكس الوهج */}
              <div className="border border-transparent rounded-2xl p-6 bg-[#050505] shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-amber-400 flex flex-col justify-between h-[360px]">
                
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center bg-gray-900 border border-amber-300/30 text-amber-300 text-3xl font-bold mb-5 shadow-[0_0_15px_rgba(251,191,36,0.2)] relative">
                    <SliderImage src={tool.image_url} alt={tool.name} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-amber-400 transition-colors duration-300">
                    {tool.name}
                  </h3>
                  
                  <p className="text-gray-300 text-base line-clamp-3 leading-relaxed">
                    {tool.description || 'وصف الأداة غير متوفر حالياً.'}
                  </p>
                </div>
                
                <div className="relative z-10 mt-auto w-full">
                  <div className="block w-full text-center bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 group-hover:from-amber-600 group-hover:to-amber-500 text-gray-950 font-extrabold text-lg py-3 px-6 rounded-xl transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                    قراءة التفاصيل
                  </div>
                </div>

              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export function CategoriesGrid() {
  return (
    <section className="py-20 border-t border-indigo-900/40 bg-gradient-to-b from-[#120b2e] to-[#0a0514]">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4 text-white">تصفح حسب الأقسام</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full opacity-50"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
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
                <Card 
                  className={`bg-[#1a103c]/30 backdrop-blur-sm border-indigo-500/20 
                    hover:border-amber-400/50 hover:bg-[#1a103c]/60 
                    hover:shadow-[0_10px_30px_rgba(251,191,36,0.1)] 
                    transition-all duration-300 cursor-pointer text-center group`}
                >
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                    <div 
                      className={`p-4 bg-indigo-950/50 rounded-2xl text-indigo-300 
                        group-hover:bg-amber-400/10 group-hover:text-amber-400 
                        group-hover:scale-110 transition-all duration-300 border 
                        border-indigo-500/20 group-hover:border-amber-400/30`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-sm text-indigo-50 group-hover:text-white transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-indigo-300/60 bg-indigo-950/50 px-3 py-1 rounded-full">
                      {cat.count} أداة
                    </p>
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
    <motion.section {...fadeIn} className="py-24 bg-[#0a0514]">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 border border-indigo-500/30 text-white rounded-[2.5rem] p-8 md:p-16 text-center overflow-hidden relative shadow-[0_20px_50px_rgba(79,70,229,0.2)]">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">لا تفوت سحر الذكاء الاصطناعي!</h2>
            <p className="text-indigo-100/90 mb-10 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              انضم إلى أكثر من 10,000 مبدع ومطور. احصل على نشرة أسبوعية تتضمن أحدث وأقوى أدوات الذكاء الاصطناعي مباشرة في بريدك.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="أدخل بريدك الإلكتروني السحري..." className="bg-indigo-950/50 backdrop-blur-md border border-indigo-400/40 text-white h-14 placeholder:text-indigo-300/60 text-right text-base focus-visible:ring-amber-500 rounded-2xl shadow-inner" required dir="rtl" />
              <Button size="lg" className="h-14 w-full sm:w-auto shrink-0 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-2xl shadow-lg hover:shadow-amber-500/25 transition-all duration-300">
                اشترك الآن <ArrowLeft className="mr-2 w-5 h-5" />
              </Button>
            </form>
          </div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px]"></div>
        </div>
      </div>
    </motion.section>
  )
}