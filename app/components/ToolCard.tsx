'use client'; // أضف هذا السطر في الأعلى

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ToolProps {
  tool: {
    id: string;
    name: string;
    slug: string; 
    description: string;
    image_url?: string; // أضفنا رابط الصورة هنا
  };
}

export function ToolCard({ tool }: ToolProps) {
  // حالة (State) لتتبع ما إذا كانت الصورة قد فشلت في التحميل
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative group border border-transparent rounded-2xl p-6 bg-gray-950 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-amber-400 flex flex-col justify-between">
      
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center mb-6">
        
        {/* التعامل الذكي مع الصور الميتة */}
        <div className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center bg-gray-900 border border-amber-300/30 text-amber-300 text-3xl font-bold mb-5 shadow-[0_0_15px_rgba(251,191,36,0.2)] relative">
          {tool.image_url && !imageError ? (
            <Image 
              src={tool.image_url} 
              alt={tool.name} 
              fill 
              className="object-cover"
              onError={() => setImageError(true)} // إذا فشل السيرفر الخارجي، فعّل الخطأ
              unoptimized // يمنع Next.js من محاولة معالجة الصور الخارجية الميتة
            />
          ) : (
            <span>AI</span> // الأيقونة البديلة إذا كانت الصورة ميتة
          )}
        </div>

        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-amber-400 transition-colors duration-300">
          {tool.name}
        </h3>
        
        <p className="text-gray-300 text-base line-clamp-3 leading-relaxed">
          {tool.description}
        </p>
      </div>
      
      <div className="relative z-10 mt-auto w-full">
        {/* الزر الداخلي */}
        <Link 
          href={`/tools/${tool.slug}`} 
          className="block w-full text-center bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-gray-950 font-extrabold text-lg py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]"
        >
          قراءة التفاصيل
        </Link>
      </div>

    </div>
  );
}