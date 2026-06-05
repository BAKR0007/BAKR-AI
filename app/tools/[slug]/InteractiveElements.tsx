'use client';

import { useState } from 'react';
import { Bookmark, Share2, Star, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

// 1. أزرار التفاعل (Bookmark & Claim)
export function ToolActions() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <div className="flex gap-3">
      <Button 
        variant={isBookmarked ? "default" : "outline"}
        className={isBookmarked ? "bg-emerald-500 hover:bg-emerald-600" : "border-slate-700 text-slate-300 hover:bg-slate-800"}
        onClick={() => setIsBookmarked(!isBookmarked)}
      >
        <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
        {isBookmarked ? 'محفوظ' : 'حفظ'}
      </Button>
      <Button variant="ghost" className="text-slate-400 hover:text-white">
        <Share2 className="w-4 h-4 mr-2" />
        مشاركة
      </Button>
      <Button variant="link" className="text-slate-500 hover:text-amber-400 text-xs">
        المطالبة بالأداة (Claim)
      </Button>
    </div>
  );
}

// 2. معرض الصور (Lightbox)
export function ScreenshotGallery({ images }: { images: string[] }) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((src, idx) => (
        <Dialog key={idx} open={selectedImg === src} onOpenChange={(open) => !open && setSelectedImg(null)}>
          <DialogTrigger asChild>
            <div 
              className="relative aspect-video rounded-xl overflow-hidden cursor-pointer border border-slate-800 hover:border-emerald-500/50 transition-all group"
              onClick={() => setSelectedImg(src)}
            >
              <Image src={src} alt={`Screenshot ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-5xl bg-slate-950 border-slate-800 p-1">
            <DialogTitle className="sr-only">صورة مكبرة</DialogTitle>
            <div className="relative w-full h-[80vh]">
              <Image src={src} alt={`Screenshot ${idx + 1}`} fill className="object-contain" />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

// 3. نموذج كتابة المراجعة
export function WriteReviewForm() {
  const [rating, setRating] = useState(0);
  
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl mt-8">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">اكتب تقييماً</h3>
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`w-6 h-6 cursor-pointer transition-colors ${rating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <Textarea 
        placeholder="شارك تجربتك مع هذه الأداة..." 
        className="bg-slate-950 border-slate-800 text-slate-200 mb-4 h-24 focus:ring-emerald-500/50"
      />
      <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold w-full sm:w-auto">
        نشر التقييم (يتطلب تسجيل الدخول)
      </Button>
    </div>
  );
}