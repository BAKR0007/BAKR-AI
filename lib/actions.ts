// E:\my-frontend\lib\actions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from '@google/generative-ai';

function generateSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

export async function fetchAndSaveTools() {
  try {
    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey) throw new Error("مفتاح RapidAPI مفقود.");

    const response = await fetch('https://ai-tools2.p.rapidapi.com/ai_tools/', {
      headers: { 'x-rapidapi-key': apiKey, 'x-rapidapi-host': 'ai-tools2.p.rapidapi.com' }
    });

    if (!response.ok) throw new Error("فشل الاتصال بـ RapidAPI");

    const responseData = await response.json();
    const tools = responseData.data;

    for (const tool of tools) {
      if (!tool.tool_url) continue;
      const toolName = tool.tool_name || "أداة بدون اسم";
      await prisma.aI_Tool.upsert({
        where: { url: tool.tool_url },
        update: { name: toolName, description: tool.description || "", image_url: tool.thumb || "" },
        create: { name: toolName, slug: generateSlug(toolName), description: tool.description || "", url: tool.tool_url, image_url: tool.thumb || "" }
      });
    }

    revalidatePath("/admin/tools");
    return { success: true, message: `تمت مزامنة ${tools.length} أداة بنجاح!` };
  } catch (error) {
    return { success: false, message: "حدث خطأ أثناء المزامنة." };
  }
}

export async function getTools() {
  return await prisma.aI_Tool.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
}

export async function enrichToolDescription(toolId: string) {
  try {
    const tool = await prisma.aI_Tool.findUnique({ where: { id: toolId } });
    if (!tool) return { success: false, message: "الأداة غير موجودة." };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return { success: false, message: "مفتاح Gemini مفقود." };

    // تهيئة Gemini بالنموذج الأحدث المدعوم لتجنب خطأ 404
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // الـ Prompt السحري المحدث لضمان استجابة بصرية ومباشرة
    const prompt = `أنت خبير تقني ذكي. أريد وصفاً لأداة "${tool.name}" (الرابط: ${tool.url}) بتنسيق Markdown بصري، جذاب، ومباشر جداً. 
    يُمنع منعاً باتاً كتابة أي مقدمات أو خواتيم إنشائية طويلة. التزم حرفياً بهذا القالب فقط (استبدل الأقواس بالبيانات المناسبة مع الحفاظ على الإيموجي والتنسيق):

    > 🚀 **${tool.name} | [اكتب وصفاً جذاباً من 3 كلمات كحد أقصى]**
    > 🌐 الرابط: [${tool.url}]
    > 💡 **الفكرة باختصار:** [سطر واحد فقط يشرح جوهر عمل الأداة بأسلوب تسويقي ذكي]

    ---

    ### ✨ **المميزات الخارقة**
    * [إيموجي مناسب] **[اسم الميزة الأولى]:** [وصف قصير ومباشر]
    * [إيموجي مناسب] **[اسم الميزة الثانية]:** [وصف قصير ومباشر]
    * [إيموجي مناسب] **[اسم الميزة الثالثة]:** [وصف قصير ومباشر]

    ---

    ### ⚠️ **العيوب والمطبات**
    * 💰 **التكلفة:** [وضح إذا كانت غالية أو لا تناسب المبتدئين]
    * [إيموجي مناسب] **[عيب آخر]:** [وصف قصير]
    * [إيموجي مناسب] **[عيب آخر]:** [وصف قصير]

    ---

    ### 💳 **الأسعار والعروض**
    * [إيموجي] [اشرح باختصار هل هي مجانية أم تعتمد على الاشتراكات]
    * [إيموجي] [تفصيلة سريعة عن الباقات]
    > **🔥 احصل على خصم 20% عند التسجيل باستخدام الكود BAKR20**

    ---

    ### 🎯 **الجمهور المستهدف**
    * [إيموجي] **[الفئة الأولى]:** [لماذا هذه الأداة مفيدة لهم؟]
    * [إيموجي] **[الفئة الثانية]:** [لماذا هذه الأداة مفيدة لهم؟]
    * [إيموجي] **[الفئة الثالثة]:** [لماذا هذه الأداة مفيدة لهم؟]

    تذكر: لا تضف أي نص خارج هذا الهيكل. استخدم القوائم (Bullet points) دائماً.`;

    const result = await model.generateContent(prompt);
    const generatedMarkdown = result.response.text();

    await prisma.aI_Tool.update({
      where: { id: toolId },
      data: { description: generatedMarkdown },
    });

    revalidatePath("/admin/tools");
    revalidatePath(`/tools/${(tool as any).slug}`);

    return { success: true, message: "تم تحديث الأداة بنجاح!" };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { success: false, message: "حدث خطأ أثناء توليد المحتوى." };
  }
}