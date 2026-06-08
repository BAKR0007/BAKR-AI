import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // 1. استخراج البيانات بالإضافة إلى معرف التصنيف (categoryId) القادم من الواجهة
    const { name, description, url, imageUrl, categoryId } = body;

    // 2. التحقق من وجود البيانات الأساسية المطلوبة بما فيها التصنيف
    if (!name || !description || !url || !categoryId) {
      return NextResponse.json(
        { error: 'الاسم، الوصف، الرابط، ومعرف التصنيف حقول مطلوبة' },
        { status: 400 }
      );
    }

    // 3. حفظ الأداة الجديدة في قاعدة البيانات مع ربطها بالتصنيف
    const newTool = await prisma.tool.create({
      data: {
        name,
        description,
        url,
        imageUrl: imageUrl || '', // في حال لم يتم إدخال رابط الصورة
        // 👈 الربط الصحيح للعلاقة لحل خطأ الـ TypeScript والـ Build
        category: {
          connect: { id: categoryId }
        }
      },
    });

    // 4. إرجاع استجابة ناجحة
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