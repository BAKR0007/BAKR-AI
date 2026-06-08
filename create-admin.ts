// create-admin.ts
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'admin@example.com';
  const password = 'Aa123321'; // كلمة مرور بسيطة للتطوير

  const admin = await prisma.user.upsert({
    where: { email },
    update: { 
      password: password, // ملاحظة: نضعها كما هي مؤقتاً
      role: 'ADMIN' 
    },
    create: {
      email,
      password: password,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  console.log('تم إنشاء المستخدم بنجاح:', admin);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());