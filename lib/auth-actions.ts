'use server'

import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/validations'; // هذا الملف موجود عندك بالفعل

export async function loginAction(data: unknown) {
  const result = loginSchema.safeParse(data);
  if (!result.success) return { success: false, message: "بيانات غير صالحة" };

  const { email, password } = result.data;

  // 1. البحث عن المستخدم
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { success: false, message: "بيانات الدخول غير صحيحة" };

  // 2. التحقق من كلمة المرور (التعديل المؤقت للتطوير)
  // بدل استخدام bcrypt.compare، نقارن النص الصريح مباشرة
  const isPasswordValid = password === user.password;
  
  if (!isPasswordValid) return { success: false, message: "بيانات الدخول غير صحيحة" };

  // 3. التحقق من الصلاحية (تأكد أن الـ role هو ADMIN في قاعدة البيانات)
  if (user.role !== 'ADMIN') return { success: false, message: "ليس لديك صلاحية الدخول" };

  return { success: true, user };
}