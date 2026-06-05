'use client';

import { useState } from 'react';
import { Save, ShieldAlert, Globe, ListFilter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function AdminSettingsPage() {
  // الحالات الخاصة بالإعدادات والتغيير
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [seoTitle, setSeoTitle] = useState('دليل أدوات الذكاء الاصطناعي الشامل');
  const [seoDesc, setSeoDesc] = useState('اكتشف واستكشف أفضل أدوات الذكاء الاصطناعي المتقدمة لتطوير أعمالك وإنتاجيتك.');
  const [categories, setCategories] = useState('Development, Writing, Image Generation, Video Editor');
  const [emailTemplate, setEmailTemplate] = useState('مرحباً {username}، يسعدنا إعلامك بأنه تم قبول أداة الذكاء الاصطناعي الخاصة بك بنجاح وهي الآن متاحة للجمهور.');

  const handleSaveSettings = () => {
    console.log('[AUDIT LOG] Settings Updated | Timestamp: ' + new Date().toISOString());
    alert('تم حفظ إعدادات المنصة بنجاح وتوثيق العملية في سجل العمليات الخاص بالإدارة.');
  };

  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">إعدادات المنصة (Site Config)</h1>
        <p className="text-slate-400 text-sm mt-1">تعديل التكوينات الافتراضية، ومسارات السيو، والتحكم بحالة عمل المنصة.</p>
      </div>

      <div className="space-y-6">
        
        {/* 1. نظام وضع الصيانة الصارم */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-between shadow-md">
          <div className="space-y-1">
            <div className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500" /> وضع الصيانة (Maintenance Mode)
            </div>
            <p className="text-slate-400 text-xs">تفعيل هذا الخيار سيحجب الموقع بالكامل عن الزوار ويعرض صفحة الصيانة ما عدا المدراء.</p>
          </div>
          <Switch 
            checked={maintenanceMode} 
            onCheckedChange={(checked) => {
              setMaintenanceMode(checked);
              console.log(`[AUDIT LOG] Toggle Maintenance Mode to: ${checked}`);
            }}
            className="data-[state=checked]:bg-rose-500 bg-slate-950"
          />
        </div>

        {/* 2. إعدادات محركات البحث الافتراضية SEO */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Globe className="w-5 h-5 text-sky-400" /> البيانات الوصفية الافتراضية (SEO Defaults)
          </h3>
          <div className="space-y-2">
            <Label className="text-sm text-slate-300">عنوان الموقع الافتراضي (Meta Title)</Label>
            <Input 
              value={seoTitle} 
              onChange={(e) => setSeoTitle(e.target.value)}
              className="bg-slate-950 border-slate-800 text-slate-200 h-11"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-slate-300">الوصف الافتراضي (Meta Description)</Label>
            <Textarea 
              value={seoDesc} 
              onChange={(e) => setSeoDesc(e.target.value)}
              className="bg-slate-950 border-slate-800 text-slate-200 h-24"
            />
          </div>
        </div>

        {/* 3. تصنيفات الأدوات البارزة */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
            <ListFilter className="w-5 h-5 text-amber-400" /> التصنيفات الرئيسية المدعومة (Featured Categories)
          </h3>
          <div className="space-y-2">
            <Label className="text-sm text-slate-300">التصنيفات (مفصولة بفاصلة)</Label>
            <Input 
              value={categories} 
              onChange={(e) => setCategories(e.target.value)}
              className="bg-slate-950 border-slate-800 text-slate-200 h-11"
            />
            <p className="text-slate-500 text-xs">تتحكم هذه التصنيفات في الفلاتر المنبثقة وشريط تصفية استكشاف الأدوات.</p>
          </div>
        </div>

        {/* 4. قوالب رسائل البريد الإلكتروني للأنظمة */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Mail className="w-5 h-5 text-emerald-400" /> قالب بريد الموافقة الآلي (Email Template)
          </h3>
          <div className="space-y-2">
            <Label className="text-sm text-slate-300">نص رسالة القبول (Approval Email Notification)</Label>
            <Textarea 
              value={emailTemplate} 
              onChange={(e) => setEmailTemplate(e.target.value)}
              className="bg-slate-950 border-slate-800 text-slate-200 h-28 leading-relaxed"
            />
          </div>
        </div>

        {/* زر الحفظ الكبير */}
        <div className="pt-4">
          <Button 
            onClick={handleSaveSettings}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-10 py-6 text-base rounded-xl shadow-lg shadow-rose-500/10 flex items-center gap-2 transition-all w-full sm:w-auto"
          >
            <Save className="w-5 h-5" /> حفظ جميع التكوينات والتعديلات
          </Button>
        </div>

      </div>
    </div>
  );
}