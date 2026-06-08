import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma"; 
import { registerSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. استخداercم safeParse بدلاً من parse لتجنب تحطم الخادم
    const validation = registerSchema.safeParse(body);

    // 2. إذا كانت البيانات لا تطابق الشروط (مثلاً الباسورد ضعيف)، نرجع الخطأ للواجهة
    if (!validation.success) {
      return NextResponse.json(
       
     { error: validation.error.issues[0].message },
     
        { status: 400 }
      );
    }

    // 3. سحب البيانات المعتمدة والصحيحة
    const validatedData = validation.data;

    // 4. التحقق مما إذا كان الإيميل مسجلاً مسبقاً
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "البريد الإلكتروني مسجل مسبقاً" },
        { status: 400 }
      );
    }

    // 5. تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // 6. حفظ المستخدم الجديد
    const newUser = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: "ADMIN", 
      },
    });

    // 7. إرجاع استجابة بنجاح العملية
    return NextResponse.json(
      { 
        message: "تم إنشاء الحساب بنجاح", 
        user: { id: newUser.id, name: newUser.name, email: newUser.email } 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Register Error:", error);
    
    // التقاط أخطاء الخادم العامة
    return NextResponse.json(
      { error: "حدث خطأ داخلي في الخادم" },
      { status: 500 }
    );
  }
}