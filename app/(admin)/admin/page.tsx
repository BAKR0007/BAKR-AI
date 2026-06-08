'use client';

import { useTransition } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import { Users, Wrench, DollarSign, Activity, RefreshCw, Loader2 } from 'lucide-react';
import { fetchAndSaveTools } from "@/lib/actions";

// بيانات تجريبية للرسوم البيانية لملء الصفحة
const areaData = [
  { name: 'يناير', value: 4000 },
  { name: 'فبراير', value: 3000 },
  { name: 'مارس', value: 5000 },
  { name: 'أبريل', value: 4500 },
  { name: 'مايو', value: 6000 },
  { name: 'يونيو', value: 8000 },
];

const barData = [
  { name: 'الأحد', users: 120 },
  { name: 'الإثنين', users: 200 },
  { name: 'الثلاثاء', users: 150 },
  { name: 'الأربعاء', users: 280 },
  { name: 'الخميس', users: 220 },
  { name: 'الجمعة', users: 300 },
  { name: 'السبت', users: 250 },
];

export default function AdminOverview() {
  // استخدام useTransition لإظهار حالة التحميل أثناء عمل Server Action
  const [isPending, startTransition] = useTransition();

  const { data, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => ({ totalTools: 1245, totalUsers: 8430, mrr: "$14,500", newToday: 42 }) 
  });

  // دالة لتشغيل عملية سحب البيانات من الـ API
  const handleFetchTools = () => {
    startTransition(async () => {
      try {
        const result = await fetchAndSaveTools();
        if (result.success) {
          alert("🎉 " + result.message);
        } else {
          alert("❌ حدث خطأ: " + result.message);
        }
      } catch (error) {
        alert("❌ حدث خطأ غير متوقع أثناء الاتصال بالخادم.");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-emerald-500" />
        <p>جاري تحميل الإحصائيات...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      
      {/* قسم العنوان وزر الجلب */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-100">نظرة عامة (Overview)</h1>
        
        <button 
          onClick={handleFetchTools}
          disabled={isPending}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white px-5 py-2.5 rounded-xl font-medium transition-all"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <RefreshCw className="w-5 h-5" />
          )}
          {isPending ? 'جاري السحب من RapidAPI...' : 'جلب أدوات جديدة'}
        </button>
      </div>

      {/* قسم البطاقات الإحصائية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-blue-500/10 rounded-xl"><Wrench className="w-6 h-6 text-blue-500" /></div>
          <div>
            <p className="text-sm text-slate-400">إجمالي الأدوات</p>
            <p className="text-2xl font-bold text-slate-100">{data?.totalTools}</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-emerald-500/10 rounded-xl"><Users className="w-6 h-6 text-emerald-500" /></div>
          <div>
            <p className="text-sm text-slate-400">إجمالي المستخدمين</p>
            <p className="text-2xl font-bold text-slate-100">{data?.totalUsers}</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-amber-500/10 rounded-xl"><DollarSign className="w-6 h-6 text-amber-500" /></div>
          <div>
            <p className="text-sm text-slate-400">الأرباح (MRR)</p>
            <p className="text-2xl font-bold text-slate-100">{data?.mrr}</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-purple-500/10 rounded-xl"><Activity className="w-6 h-6 text-purple-500" /></div>
          <div>
            <p className="text-sm text-slate-400">زيارات اليوم</p>
            <p className="text-2xl font-bold text-slate-100">+{data?.newToday}</p>
          </div>
        </div>
      </div>

      {/* قسم الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* الرسم البياني الأول (مساحي) */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-slate-100 mb-6">نمو الزيارات والمبيعات</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f1f5f9' }} 
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* الرسم البياني الثاني (أعمدة) */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-slate-100 mb-6">تسجيلات المستخدمين الجدد</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }} 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f1f5f9' }} 
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
    </div>
  );
}