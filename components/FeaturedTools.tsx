"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// تعريف نوع البيانات القادمة من الـ API
interface Tool {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}

interface AdCampaign {
  id: string;
  tool: Tool;
}

export default function FeaturedTools({ position = "HOMEPAGE_HERO" }: { position?: string }) {
  const [ads, setAds] = useState<AdCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب الإعلانات من الـ API الذي برمجناه سابقاً
    const fetchAds = async () => {
      try {
        const res = await fetch(`/api/ads?position=${position}&limit=3`);
        const result = await res.json();
        
        if (result.success) {
          setAds(result.data);
        }
      } catch (error) {
        console.error("فشل جلب الإعلانات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [position]);

  if (loading) {
    return <div className="text-center py-8 text-gray-400">جاري تحميل الأدوات المميزة...</div>;
  }

  if (ads.length === 0) {
    return null; // إخفاء القسم بالكامل إذا لم تكن هناك إعلانات نشطة
  }

  return (
    <div className="my-12 p-6 bg-gray-800/50 rounded-xl border border-blue-500/30">
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
        <span className="text-blue-400">★</span> أدوات مميزة
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <div key={ad.id} className="bg-gray-800 p-5 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">{ad.tool.name}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {ad.tool.description}
            </p>
            
            {/* استخدام مسار التتبع الخاص بنا بدلاً من الرابط المباشر */}
            <Link 
              href={`/api/go/${ad.tool.id}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              زيارة الأداة
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}