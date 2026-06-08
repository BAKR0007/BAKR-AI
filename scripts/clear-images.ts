import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- جاري حذف جميع روابط الصور القديمة من جدول AI_Tool ---');

  const result = await prisma.aI_Tool.updateMany({
    data: {
      image_url: '', // الحقل الصحيح بالشرطة السفلية لتصفير البيانات بالكامل
    },
  });

  console.log(`✅ تم بنجاح تصفير صور ${result.count} أداة في قاعدة البيانات.`);
}

main()
  .catch((e) => {
    console.error("❌ حدث خطأ أثناء التصفير:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });