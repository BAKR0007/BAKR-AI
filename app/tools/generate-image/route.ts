import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { GoogleGenAI } from '@google/genai';

const prisma = new PrismaClient();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { toolId, toolName, toolDescription } = await request.json();

    console.log(`✨ جاري توليد غلاف فني رقمي للأداة: ${toolName}`);

    // هندسة Prompt سينمائي فاخر متوافق تماماً مع ذوقك والهوية البصرية المميزة لـ BAKR AI
    const promptDescription = `A premium, high-end, cinematic 3D web icon or digital product illustration for an AI app named "${toolName}". 
    The overall aesthetic must be luxurious, featuring a dark slate background, elegant glowing gold lines, and subtle dark neon accents. 
    It must look professional, modern, clean, and perfectly suited for a luxury tech ecosystem. Strictly do NOT include any text, words, or typography.`;

    // استدعاء نموذج توليد الصور الأحدث
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: promptDescription,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    const base64Image = response.generatedImages[0].image.imageBytes;
    const newImageUrl = `data:image/jpeg;base64,${base64Image}`;

    // تحديث قاعدة البيانات فوراً في الحقل الصحيح image_url
    const updatedTool = await prisma.aI_Tool.update({
      where: { id: toolId },
      data: { image_url: newImageUrl },
    });

    return NextResponse.json({ success: true, imageUrl: updatedTool.image_url });

  } catch (error) {
    console.error('❌ Error in AI generation:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}