import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = "admin@example.com";
  const password = "Aa123321"; // الكلمة التي تريدها
  
  // تشفير كلمة المرور بشكل صحيح قبل الحفظ
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
    },
  });
  
  console.log("✅ تم تحديث كلمة مرور الأدمن بنجاح!");
}

main().catch(console.error).finally(() => prisma.$disconnect());