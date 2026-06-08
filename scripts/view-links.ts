// E:\my-frontend\scripts\view-links.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("جاري جلب جميع الروابط من قاعدة البيانات...");
  
  const tools = await prisma.aI_Tool.findMany({
    select: {
      id: true,
      name: true,
      image_url: true,
    },
  });

  if (tools.length === 0) {
    console.log("لا توجد أدوات في قاعدة البيانات.");
    return;
  }

  console.table(tools); // هذا الأمر سيعرض النتائج في جدول مرتب في التيرمينال
  console.log(`تم العثور على ${tools.length} أداة.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });