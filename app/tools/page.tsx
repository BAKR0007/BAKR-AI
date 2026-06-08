import { ToolsClient } from './components/ToolsClient'
import { prisma } from '@/lib/prisma' 

export const metadata = {
  title: 'Explore AI Tools',
  description: 'Discover the best AI tools for your workflow.',
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // 1. عمل await للـ searchParams لاستخراج القيم
  const resolvedParams = await searchParams
  
  // دعم قراءة نص البحث سواء جاء من الرابط المباشر بـ q أو من الهيرو بـ search
  const search = (typeof resolvedParams.q === 'string' ? resolvedParams.q : null) || 
                 (typeof resolvedParams.search === 'string' ? resolvedParams.search : undefined)

  // 2. جلب البيانات من قاعدة البيانات باستخدام Prisma بناءً على قيمة البحث
  const tools = await prisma.aI_Tool.findMany({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive', // لتجاهل حالة الأحرف الكبيرة والصغيرة
              },
            },
            {
              description: {
                contains: search,
                mode: 'insensitive', // للبحث داخل الوصف أيضاً
              },
            },
          ],
        }
      : {}, // إذا لم يكن هناك بحث يجلب كل الأدوات
  })

  return (
    <div className="container py-8 mx-auto">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* مررنا الـ tools والـ params بأمان والتوافق الآن 100% */}
        <ToolsClient initialTools={tools} initialParams={resolvedParams as any} />
      </div>
    </div>
  )
}