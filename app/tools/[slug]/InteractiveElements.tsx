'use client';

import { useState } from 'react';
import { Bookmark, Share2, Star, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

// 1. أزرار التفاعل (Bookmark & Claim) - لم تتغير
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

// 2. معرض الصور (Lightbox) - تم تحسين الأداء
export function ScreenshotGallery({ images }: { images: string[] }) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, idx) => (
          <div 
            key={idx}
            className="relative aspect-video rounded-xl overflow-hidden cursor-pointer border border-slate-800 hover:border-emerald-500/50 transition-all group"
            onClick={() => setSelectedImg(src)}
          >
            <Image src={src} alt={`Screenshot ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImg} onOpenChange={(open) => !open && setSelectedImg(null)}>
        <DialogContent className="max-w-5xl bg-slate-950 border-slate-800 p-1">
          <DialogTitle className="sr-only">صورة مكبرة</DialogTitle>
          <div className="relative w-full h-[80vh]">
            {selectedImg && <Image src={selectedImg} alt="Enlarged Screenshot" fill className="object-contain" />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// 3. نموذج كتابة المراجعة - تم تفعيله كـ Form
export function WriteReviewForm() {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const isAuthenticated = false; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("يرجى تسجيل الدخول أولاً!"); 
      return;
    }
    if (rating === 0) {
      alert("يرجى تحديد عدد النجوم");
      return;
    }
    console.log("Submitting:", { rating, reviewText });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-xl mt-8">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">اكتب تقييماً</h3>
      <div className="flex items-center gap-2 mb-4" role="radiogroup" aria-label="تقييم النجوم">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-sm"
          >
            <Star 
              className={`w-6 h-6 transition-colors ${rating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`}
            />
          </button>
        ))}
      </div>
      <Textarea 
        placeholder="شارك تجربتك مع هذه الأداة..." 
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="bg-slate-950 border-slate-800 text-slate-200 mb-4 h-24 focus:ring-emerald-500/50"
        required
      />
      <Button 
        type="submit" 
        className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold w-full sm:w-auto"
      >
        {isAuthenticated ? 'نشر التقييم' : 'نشر التقييم (يتطلب تسجيل الدخول)'}
      </Button>
    </form>
  );
}