'use client';

import React from 'react';
import Link from 'next/link';

interface ToolProps {
  tool: {
    id: string;
    name: string;
    slug: string; 
    description: string;
    image_url?: string;
  };
}

export function ToolCard({ tool }: ToolProps) {
  // توليد أول حرفين من اسم الأداة لعرضها بشكل احترافي لو فشلت الصورة
  const initials = tool.name ? tool.name.slice(0, 2).toUpperCase() : "AI";

  return (
    <div className="relative group border border-transparent rounded-2xl p-6 bg-gray-950 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-amber-400 flex flex-col justify-between">
      
      {/* تأثير التوهج الخلفي الذهبي عند الحوم */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center mb-6">
        
        {/* مربع عرض الصورة أو الحروف البديلة */}
        <div className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center bg-gray-900 border border-amber-300/30 text-amber-300 text-3xl font-bold mb-5 shadow-[0_0_15px_rgba(251,191,36,0.2)] relative select-none">
          {tool.image_url ? (
            <>
              {/* تمرير رابط الصورة عبر الـ Proxy المحلّي */}
              <img 
                src={`/api/proxy-image?url=${encodeURIComponent(tool.image_url)}`} 
                alt={tool.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // إذا فشل البروكسي أو الصورة ميتة، تختفي الصورة ويظهر الفولباك الذهبي فوراً
                  e.currentTarget.style.display = 'none';
                  const fallbackDiv = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallbackDiv) fallbackDiv.style.display = 'flex';
                }}
              />
              {/* الفولباك المخفي افتراضياً */}
              <div style={{ display: 'none' }} className="w-full h-full items-center justify-center bg-gray-900 text-amber-300 text-3xl font-bold">
                <span>{initials}</span>
              </div>
            </>
          ) : (
            // إذا لم يتوفر رابط في الداتابيس من الأساس
            <span>{initials}</span> 
          )}
        </div>

        {/* اسم الأداة */}
        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-amber-400 transition-colors duration-300">
          {tool.name}
        </h3>
        
        {/* وصف الأداة */}
        <p className="text-gray-300 text-base line-clamp-3 leading-relaxed">
          {tool.description}
        </p>
      </div>
      
      {/* زر التفاصيل */}
      <div className="relative z-10 mt-auto w-full">
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