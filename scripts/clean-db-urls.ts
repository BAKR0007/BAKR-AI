// scripts/clean-db-urls.ts
import { PrismaClient } from '@prisma/client';

// تهيئة الاتصال بقاعدة البيانات
const prisma = new PrismaClient();

async function main() {
  console.log('🧹 بدء عملية التنظيف العميق لقاعدة البيانات...');

  // 1. جلب الأدوات التي يحتوي وصفها على 'http' فقط لتقليل الضغط على قاعدة البيانات
  const toolsWithUrls = await prisma.aI_Tool.findMany({
    where: {
      description: {
        contains: 'http',
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
    }
  });

  console.log(`🔍 تم العثور على ${toolsWithUrls.length} أداة قد تحتوي على روابط. جاري الفحص...`);

  let updatedCount = 0;

  // 2. المرور على الأدوات وتنظيفها
  for (const tool of toolsWithUrls) {
    if (!tool.description) continue;

    const originalDescription = tool.description;

    // تطبيق المقصلة (Regex) لتنظيف النص
    const sanitizedDescription = originalDescription
      // يحذف جملة "الرابط: [url]" مع أو بدون أيقونة الكوكب السطحية
      .replace(/🌐?\s*(الرابط|Link|رابط الأداة):\s*\[?https?:\/\/[^\s\]]+\]?/g, '')
      // يحذف أي رابط ويب متبقي في النص بشكل عام
      .replace(/https?:\/\/[^\s\]]+/g, '')
      // تنظيف الأسطر الفارغة الإضافية التي قد تنتج عن الحذف
      .trim();

    // 3. تحديث قاعدة البيانات فقط إذا تم تغيير النص فعلياً
    if (sanitizedDescription !== originalDescription) {
      await prisma.aI_Tool.update({
        where: { id: tool.id },
        data: { description: sanitizedDescription },
      });
      updatedCount++;
      console.log(`✅ تم تنظيف الأداة بنجاح: ${tool.name}`);
    }
  }

  console.log(`\n🎉 اكتملت العملية السحرية! تم تنظيف وتحديث ${updatedCount} أداة بشكل دائم.`);
}

// تشغيل الدالة مع معالجة الأخطاء وإغلاق الاتصال
main()
  .catch((error) => {
    console.error('❌ حدث خطأ فادح أثناء التنظيف:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });