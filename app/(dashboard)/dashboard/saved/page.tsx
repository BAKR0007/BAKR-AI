'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookmarkX, ExternalLink, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SavedToolsPage() {
  // بيانات محاكاة (Mock Data) للأدوات المحفوظة
  const [savedTools, setSavedTools] = useState([
    { id: 1, name: 'Smart Write AI', category: 'Writing', rating: 4.8, type: 'Freemium', desc: 'أداة كتابة متقدمة تعتمد على الذكاء الاصطناعي لإنشاء محتوى حصري.' },
    { id: 2, name: 'Designify Pro', category: 'Design', rating: 4.9, type: 'Paid', desc: 'توليد صور وتصاميم سينمائية فائقة الدقة بضغطة زر واحدة.' },
    { id: 3, name: 'CodeGuru', category: 'Development', rating: 4.7, type: 'Free', desc: 'مساعد برمجي ذكي لاكتشاف الأخطاء وتصحيحها في أكثر من 20 لغة.' },
  ]);

  // دالة محاكاة لإزالة أداة من المفضلة
  const removeTool = (id: number) => {
    setSavedTools(savedTools.filter(tool => tool.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">الأدوات المحفوظة</h1>
        <p className="text-slate-400 text-sm">قائمتك الخاصة بأفضل أدوات الذكاء الاصطناعي التي قمت بالاحتفاظ بها للرجوع إليها لاحقاً.</p>
      </div>

      {savedTools.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <BookmarkX className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-200 mb-2">لا توجد أدوات محفوظة</h3>
          <p className="text-slate-400 mb-6 max-w-md">لم تقم بإضافة أي أداة إلى مفضلتك حتى الآن. استكشف دليل الأدوات وابدأ في حفظ ما يعجبك!</p>
          <Link href="/tools">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold px-6">
              استكشاف الأدوات <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {savedTools.map((tool) => (
            <div key={tool.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all flex flex-col h-full shadow-lg group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-emerald-400 text-xl">
                  {tool.name.charAt(0)}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                  onClick={() => removeTool(tool.id)}
                  title="إزالة من المفضلة"
                >
                  <BookmarkX className="w-5 h-5" />
                </Button>
              </div>
              
              <h3 className="text-xl font-bold text-slate-100 mb-2">{tool.name}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
                {tool.desc}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 mt-auto">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-slate-300 border-slate-700 bg-slate-950">{tool.category}</Badge>
                  <div className="flex items-center text-amber-400 text-sm font-medium">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" /> {tool.rating}
                  </div>
                </div>
                <Link href={`/tools/${tool.id}`}>
                  <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
                    عرض <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}