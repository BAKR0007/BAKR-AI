import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('جاري تهيئة قاعدة البيانات الأساسية...')

  // إنشاء تصنيف افتراضي (ضروري لكي لا يحدث خطأ عند استخدام جدول Tool مستقبلاً)
  await prisma.category.upsert({
    where: { slug: 'general' },
    update: {},
    create: {
      name: 'عام',
      slug: 'general',
    },
  })

  console.log('✅ تم تجهيز قاعدة البيانات بنجاح! لا توجد أدوات وهمية. يمكنك الآن السحب من الـ API.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })