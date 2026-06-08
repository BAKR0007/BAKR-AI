import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AdPosition } from '@prisma/client'; // استيراد نوع المواقع من Prisma

export async function GET(request: Request) {
  try {
    // 1. استخراج المتغيرات من الرابط (مثل: /api/ads?position=HOMEPAGE_HERO&limit=3)
    const { searchParams } = new URL(request.url);
    const positionParam = searchParams.get('position');
    const limitParam = searchParams.get('limit');
    
    // تحديد العدد المطلوب (الافتراضي 3 إعلانات)
    const limit = limitParam ? parseInt(limitParam, 10) : 3;

    if (!positionParam) {
      return NextResponse.json(
        { error: 'يجب تحديد موقع الإعلان (position)' },
        { status: 400 }
      );
    }

    // التحقق من أن الموقع المدخل متطابق مع القيم المسموحة في قاعدة البيانات
    const position = positionParam as AdPosition;

    // 2. البحث عن الإعلانات الفعالة والتي تملك ميزانية متبقية، وترتيبها حسب السعر الأعلى
    const activeAds = await prisma.adCampaign.findMany({
      where: {
        position: position,
        isActive: true,
        budget: { gt: 0 }, // الميزانية يجب أن تكون أكبر من صفر
      },
      orderBy: {
        cpmBid: 'desc', // الترتيب التنازلي (الأعلى سعراً أولاً)
      },
      take: limit,
      include: {
        tool: true, // جلب بيانات الأداة نفسها (الاسم، الوصف، الرابط) ليتم عرضها في الواجهة
      },
    });

    // 3. تحديث العدادات والميزانية في الخلفية (Impressions tracking)
    if (activeAds.length > 0) {
      const updatePromises = activeAds.map((ad) => {
        // حساب تكلفة المشاهدة الواحدة (CPM تعني التكلفة لكل 1000 مشاهدة)
        const costPerImpression = ad.cpmBid / 1000;

        return prisma.adCampaign.update({
          where: { id: ad.id },
          data: {
            impressions: { increment: 1 }, // زيادة عدد المشاهدات بـ 1
            budget: { decrement: costPerImpression }, // خصم التكلفة من الميزانية
            // الإيقاف التلقائي إذا نفدت الميزانية (اختياري للتحسين)
            isActive: ad.budget - costPerImpression > 0, 
          },
        });
      });

      // تنفيذ التحديثات في قاعدة البيانات
      await Promise.all(updatePromises);
    }

    // 4. إرسال الإعلانات للواجهة لتقوم بعرضها
    return NextResponse.json(
      { success: true, data: activeAds },
      { status: 200 }
    );

  } catch (error) {
    console.error('Ads Display API Error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب الإعلانات' },
      { status: 500 }
    );
  }
}