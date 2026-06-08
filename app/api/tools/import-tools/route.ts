import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // الرابط المحدث من الصورة الجديدة
    const url = 'https://ai-tools2.p.rapidapi.com/ai_tools/';
    
    const options = {
      method: 'GET',
      headers: {
        // انسخ المفتاح الطويل الظاهر في صورتك تحت خانة X-RapidAPI-Key وضعه هنا
        'x-rapidapi-key': '191e8c541dmsh89232670a38080ap127796jsna4f7c7956c94', 
        'x-rapidapi-host': 'ai-tools2.p.rapidapi.com'
      }
    };

    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error('فشل الاتصال بـ RapidAPI');
    }

    const result = await response.json();

    // ملاحظة: بناءً على توثيق هذا الـ API، البيانات قد تكون مباشرة في المصفوفة أو داخل كائن
    const toolsData = result.tools || result; 

    return NextResponse.json({ 
      success: true, 
      count: toolsData.length,
      message: "تم جلب البيانات بنجاح من المصدر الجديد",
      data: toolsData.slice(0, 5) // عرض عينة من أول 5 أدوات للتأكد
    });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}