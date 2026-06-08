import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params; // قد يكون هذا المتغير slug أو id

    // 1. البحث عن الرابط التابع (ندعم البحث بالـ slug أو الـ id)
    const affiliateData = await prisma.affiliateLink.findFirst({
      where: { 
        tool: {
          OR: [
            { slug: slug },
            { id: slug }
          ]
        } 
      },
      include: {
        tool: true, 
      }
    });

    if (affiliateData) {
      await prisma.affiliateLink.update({
        where: { id: affiliateData.id },
        data: { clicks: { increment: 1 } },
      });
      return NextResponse.redirect(affiliateData.trackingUrl);
    }

    // 2. إذا لم يوجد رابط تابع، نبحث عن الأداة نفسها كخيار بديل
    const fallbackTool = await prisma.aI_Tool.findFirst({
      where: {
        OR: [
          { slug: slug },
          { id: slug }
        ]
      }
    });

    if (!fallbackTool || !fallbackTool.url) {
      return new NextResponse('Tool not found', { status: 404 });
    }
    
    // 3. توجيه للرابط الأساسي الخاص بالأداة
    return NextResponse.redirect(fallbackTool.url);

  } catch (error) {
    console.error('Affiliate Redirect Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}