'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { enrichToolDescription } from '@/lib/actions'; // تأكد من صحة المسار

export function AutoEnrichButton({ tools }: { tools: any[] }) {
  const [isEnriching, setIsEnriching] = useState(false);
  const [status, setStatus] = useState('');

  const handleEnrichAll = async () => {
    // تصفية الأدوات التي ليس لها وصف طويل (تجنباً لإعادة توليد محتوى موجود مسبقاً)
    const toolsToEnrich = tools.filter(t => !t.description || t.description.length < 150);

    if (toolsToEnrich.length === 0) {
      alert('جميع الأدوات تمتلك وصفاً تفصيلياً بالفعل! ✨');
      return;
    }

    const confirmMessage = `سيتم الآن توليد محتوى لـ ${toolsToEnrich.length} أداة باستخدام Gemini.\nهل تريد البدء؟ (يرجى عدم إغلاق الصفحة حتى تنتهي العملية)`;
    if (!confirm(confirmMessage)) return;

    setIsEnriching(true);

    for (let i = 0; i < toolsToEnrich.length; i++) {
      const tool = toolsToEnrich[i];
      setStatus(`جاري إثراء: ${tool.name}... (${i + 1} من ${toolsToEnrich.length})`);

      try {
        // استدعاء دالة السيرفر لكل أداة على حدة
        const result = await enrichToolDescription(tool.id);
        if (!result.success) {
          console.error(`فشل في أداة ${tool.name}:`, result.message);
        }
      } catch (error) {
        console.error(`حدث خطأ غير متوقع مع أداة ${tool.name}:`, error);
      }
    }

    setStatus('تمت عملية الإثراء بنجاح! 🎉');
    setIsEnriching(false);
    
    // إخفاء رسالة النجاح بعد 5 ثوانٍ
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 my-6 p-4 bg-purple-900/10 border border-purple-500/20 rounded-xl">
      <Button
        onClick={handleEnrichAll}
        disabled={isEnriching || tools.length === 0}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold w-full sm:w-auto"
      >
        {isEnriching ? (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <Sparkles className="w-5 h-5 mr-2" />
        )}
        {isEnriching ? 'جاري العمل...' : '✨ إثراء جميع الأدوات بالذكاء الاصطناعي'}
      </Button>

      {/* عرض حالة التقدم */}
      {status && (
        <span className={`text-sm font-medium ${isEnriching ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`}>
          {status}
        </span>
      )}
    </div>
  );
}