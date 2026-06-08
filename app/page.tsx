import { ToolCard } from '@/components/ToolCard';
import { prisma } from '@/lib/prisma';
import FeaturedTools from '@/components/FeaturedTools'; // مكون الإعلانات الخاص بك
import { HeroSection, StatsBar, TopRatedToolsSlider, CategoriesGrid, NewsletterCTA } from './components/home/HomeSections';

export default async function Home() {
  // جلب الأدوات من الجدول الفعلي الذي قمنا بإنشائه (AI_Tool)
  const tools = await prisma.aI_Tool.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* 1. قسم الترحيب الرئيسي */}
      <HeroSection />
      
      {/* 2. شريط الإحصائيات */}
      <StatsBar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 3. بانر الإعلانات (مكونك القديم) */}
        <FeaturedTools position="HOMEPAGE_HERO" />

        {/* 4. شريط تمرير أفقي لأفضل الأدوات مقترحة */}
        {tools.length > 0 && <TopRatedToolsSlider tools={tools} />}

        {/* 5. شبكة أحدث الأدوات المضافة */}
        <div className="mb-8 mt-12 border-b border-gray-800 pb-4">
          <h2 className="text-3xl font-bold text-white">أحدث الأدوات المضافة</h2>
        </div>

        {tools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <ToolCard 
                key={tool.id} 
                tool={{
                  id: tool.id,
                  name: tool.name || "بدون اسم",
                  slug: tool.slug || "", // 👈 التعديل السحري هنا! تمرير الـ slug للبطاقة لتعرف مسار الصفحة
                  description: tool.description || "" 
                }} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 border border-gray-800 rounded-2xl border-dashed bg-[#111]">
            <p className="text-xl">لا توجد أدوات مضافة حتى الآن.</p>
            <p className="text-sm mt-2">توجه للوحة التحكم وقم بـ "جلب الأدوات" للبدء.</p>
          </div>
        )}
      </div>

      {/* 6. شبكة تصفح الأقسام */}
      <CategoriesGrid />

      {/* 7. نموذج الاشتراك البريدي */}
      <NewsletterCTA />
    </main>
  );
}