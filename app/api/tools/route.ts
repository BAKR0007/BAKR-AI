import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, url, imageUrl } = body;

    // 1. التحقق من وجود البيانات الأساسية المطلوبة
    if (!name || !description || !url) {
      return NextResponse.json(
        { error: 'الاسم، الوصف، والرابط حقول مطلوبة' },
        { status: 400 }
      );
    }

    // 2. حفظ الأداة الجديدة في قاعدة البيانات
    const newTool = await prisma.tool.create({
      data: {
        name,
        description,
        url,
        imageUrl: imageUrl || '', // في حال لم يتم إدخال رابط الصورة
      },
    });

    // 3. إرجاع استجابة ناجحة
    return NextResponse.json(
      { success: true, message: 'تمت إضافة الأداة بنجاح!', data: newTool },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating tool:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم أثناء إضافة الأداة' },
      { status: 500 }
    );
  }
}