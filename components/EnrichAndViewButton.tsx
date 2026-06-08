'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, Loader2, Sparkles } from 'lucide-react';
import { enrichToolDescription } from '@/lib/actions'; // استدعاء دالة Gemini

interface Props {
  toolId: string;
  slug: string;
  hasDescription: boolean; // لمعرفة ما إذا كانت الأداة مثرية مسبقاً أم لا
}

export function EnrichAndViewButton({ toolId, slug, hasDescription }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleViewClick = async () => {
    // إذا كان هناك وصف طويل بالفعل، انتقل للصفحة فوراً بدون تأخير
    if (hasDescription) {
      router.push(`/tools/${slug}`);
      return;
    }

    // إذا لم يكن هناك وصف، ابدأ عملية الإثراء
    setIsLoading(true);
    
    try {
      const result = await enrichToolDescription(toolId);
      
      if (result.success) {
        // بعد نجاح الإثراء، انتقل للصفحة
        router.push(`/tools/${slug}`);
      } else {
        alert("فشل في توليد المحتوى: " + result.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("حدث خطأ غير متوقع.");
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleViewClick}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md border transition-colors text-sm disabled:opacity-70 
        ${hasDescription 
          ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' // لون عادي للأدوات الجاهزة
          : 'bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 border-purple-500/30' // لون مميز للأدوات التي تحتاج إثراء
        }`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
      ) : hasDescription ? (
        <Eye className="w-4 h-4" />
      ) : (
        <Sparkles className="w-4 h-4" />
      )}
      
      {isLoading ? 'جاري الإثراء...' : 'عرض'}
    </button>
  );
}