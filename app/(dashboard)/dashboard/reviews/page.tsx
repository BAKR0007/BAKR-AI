'use client';

import { Star, Edit2, Trash2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function MyReviewsPage() {
  // بيانات محاكاة للتقييمات
  const myReviews = [
    { id: 1, toolName: 'Midjourney Pro', rating: 5, date: '2026-05-20', content: 'أداة خرافية بمعنى الكلمة! جودة الصور السينمائية التي تنتجها لا يعلى عليها وتوفر علي ساعات من العمل.', status: 'published' },
    { id: 2, contentName: 'ChatBase', rating: 4, date: '2026-04-12', content: 'ممتازة لخدمة العملاء، لكن واجهة المستخدم تحتاج لبعض التحسينات لتكون أسهل للمبتدئين.', status: 'published' },
    { id: 3, contentName: 'SEO AI Ninja', rating: 3, date: '2026-03-05', content: 'جيدة بشكل عام ولكن الأسعار مرتفعة جداً مقارنة بالمنافسين.', status: 'pending' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">التقييمات والمراجعات</h1>
        <p className="text-slate-400 text-sm">سجل بجميع التقييمات والمراجعات التي كتبتها لأدوات الذكاء الاصطناعي المختلفة.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {myReviews.map((review) => (
          <div key={review.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md transition-all hover:border-slate-700 flex flex-col md:flex-row gap-6">
            
            {/* قسم معلومات الأداة والتقييم */}
            <div className="md:w-1/4 flex flex-col gap-2 border-b md:border-b-0 md:border-l border-slate-800 pb-4 md:pb-0 md:pl-6">
              <h3 className="font-bold text-slate-200 text-lg">{review.toolName || review.contentName}</h3>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-4 h-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} 
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500 mt-1">{review.date}</span>
              <div className="mt-2">
                <Badge className={review.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}>
                  {review.status === 'published' ? 'منشور' : 'قيد المراجعة'}
                </Badge>
              </div>
            </div>

            {/* قسم محتوى التقييم والتحكم */}
            <div className="flex-1 flex flex-col">
              <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">
                "{review.content}"
              </p>
              <div className="flex items-center justify-end gap-3 mt-auto">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-amber-400 hover:bg-amber-500/10">
                  <Edit2 className="w-4 h-4 ml-2" /> تعديل المراجعة
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4 ml-2" /> حذف
                </Button>
              </div>
            </div>

          </div>
        ))}

        {myReviews.length === 0 && (
          <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-xl">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-300">لم تقم بكتابة أي تقييمات بعد</h3>
          </div>
        )}
      </div>
    </div>
  );
}