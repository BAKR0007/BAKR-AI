import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Sparkles, Zap, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { ToolActions } from './InteractiveElements';

// إيقاف الكاش لجعل الصفحة تفحص وتولد البيانات فوراً
export const revalidate = 0; 

// مصفوفة ذكية لروابط صور سينمائية فاخرة تناسب التطبيقات التقنية والذكاء الاصطناعي كبديل فوري ومستقر
const techLogos = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80", // تصميم تجريدي فخم بلمسات ذهبية ومظلمة
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=150&auto=format&fit=crop&q=80", // أيقونة نيون متوهجة
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=150&auto=format&fit=crop&q=80", // مجسم ثلاثي أبعاد فخم
  "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=150&auto=format&fit=crop&q=80"  // كود وشاشات مظلمة سينمائية
];

async function getToolData(slug: string) {
  try {
    const tool = await prisma.aI_Tool.findUnique({
      where: { slug: slug },
    });

    if (!tool) return null;

    // 💡 محرك الصور الذكي: إذا كانت الصورة فارغة أو تحتوي على روابط وهمية مكسورة، تمنح رابطاً فخماً ومستقراً فوراً
    if (!tool.image_url || tool.image_url.trim() === '' || tool.image_url.includes('thumb') || tool.image_url.includes('placeholder')) {
      // اختيار صورة عشوائية مستقرة وثابتة لكل أداة بناءً على طول الاسم
      const index = tool.name.length % techLogos.length;
      tool.image_url = techLogos[index];

      // تحديث قاعدة البيانات في الخلفية بدون حظر الواجهة لحفظ الرابط الجديد دائماً
      await prisma.aI_Tool.update({
        where: { id: tool.id },
        data: { image_url: techLogos[index] }
      }).catch(() => {});
    }

    return tool;
  } catch (error) {
    console.error("❌ Prisma Error:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolData(slug);
  
  if (!tool) return { title: 'الأداة غير موجودة | BAKR AI' };

  return {
    title: `${tool.name} | BAKR AI`,
    description: tool.description?.substring(0, 160) || 'تعرف على تفاصيل ومميزات أداة الذكاء الاصطناعي',
  };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getToolData(slug);

  if (!tool) notFound();

  // تنظيف الوصف البرمجي من الروابط العشوائية لتجهيزه للعرض اللائق
  const sanitizedDescription = tool.description
    ?.replace(/🌐?\s*(الرابط|Link):\s*\[?https?:\/\/[^\s\]]+\]?/g, '')
    ?.replace(/https?:\/\/[^\s]+/g, '') || 'لا يوجد وصف تفصيلي متاح لهذه الأداة.';

  const isEnriched = sanitizedDescription.includes('###');

  return (
    <div className="min-h-screen bg-[#020817] text-slate-50 font-sans selection:bg-emerald-500/30">
      {/* شريط الكود الترويجي المميز لبراند BAKR */}
      <div className="bg-gradient-to-r from-emerald-900/50 via-emerald-600/20 to-emerald-900/50 border-b border-emerald-500/30 text-center py-3 px-4">
        <p className="text-sm md:text-base text-emerald-300 font-medium flex items-center justify-center gap-2">
          <span>🎁</span> احصل على خصم 20% عند التسجيل باستخدام الكود 
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-amber-200 to-amber-500 animate-pulse tracking-wider">BAKR20</span>
        </p>
      </div>

      <main className="max-w-6xl mx-auto px-6 md:px-12 py-12 space-y-16">
        <section className="flex flex-col md:flex-row gap-8 items-center md:items-start bg-slate-900/30 p-8 rounded-3xl border border-slate-800/60 backdrop-blur-sm shadow-xl">
          
          {/* مربع الصورة المعزز والمحمي من الـ 404 والروابط المكسورة */}
          <div className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0 bg-slate-950 rounded-2xl border-2 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)] overflow-hidden relative">
            <Image 
              src={tool.image_url} 
              alt={tool.name} 
              fill 
              sizes="(max-width: 768px) 112px, 144px"
              className="object-cover animate-fade-in" 
              unoptimized
            />
          </div>
          
          <div className="flex-1 space-y-6 text-center md:text-right w-full">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-slate-100 to-slate-400">
              {tool.name}
            </h1>
            <ToolActions />
            
            <div className="pt-4">
              <Button asChild className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold px-8 h-14 rounded-xl w-full md:w-auto text-lg hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all">
                <Link href={`/api/go/${tool.slug}`} target="_blank" rel="noopener noreferrer">
                  <Zap className="w-5 h-5 ml-2" />
                  تفعيل الخصم والحصول على الأداة
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-8 h-8 text-amber-400" />
            <h2 className="text-3xl font-bold">نظرة تفصيلية</h2>
          </div>
          
          {/* عرض المحتوى التفصيلي المولد محلياً عبر الـ Markdown */}
          <div className={`w-full text-right leading-loose ${!isEnriched ? 'bg-slate-800/40 p-8 rounded-2xl border border-slate-700/50 shadow-inner text-lg text-slate-300 flex items-start gap-4' : ''}`} dir="rtl">
            {!isEnriched && <Info className="w-8 h-8 text-slate-500 shrink-0 mt-1" />}
            <div className={!isEnriched ? "flex-1" : ""}>
              <ReactMarkdown components={{ a: ({children}) => <span className="hidden">{children}</span> }}>
                {sanitizedDescription}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}