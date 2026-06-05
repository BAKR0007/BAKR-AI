import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // محاكاة جلب الجلسة والدور من الـ Cookies (أو NextAuth/Supabase)
  const authSession = request.cookies.get('auth_session')?.value;
  const userRole = request.cookies.get('user_role')?.value; // مثلاً: 'USER' أو 'ADMIN'

  const { pathname } = request.nextUrl;

  // 1. حماية لوحة تحكم المستخدم العادي
  if (pathname.startsWith('/dashboard') && !authSession) {
    // إعادة التوجيه إلى صفحة تسجيل الدخول
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. حماية صارمة للوحة الإدارة (Admin)
  if (pathname.startsWith('/admin')) {
    if (!authSession || userRole !== 'ADMIN') {
      // طرده إلى الصفحة الرئيسية إذا لم يكن آدمن
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // تفعيل الميدل وير على مسارات لوحة التحكم ومسارات الإدارة معاً
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};