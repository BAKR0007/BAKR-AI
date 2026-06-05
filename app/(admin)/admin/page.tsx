'use client';

import { useQuery } from '@tanstack/react-query';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, Wrench, DollarSign, Activity } from 'lucide-react';

const mockData = {
  signups: [
    { name: 'السبت', uv: 400 }, 
    { name: 'الأحد', uv: 300 }, 
    { name: 'الاثنين', uv: 550 }, 
    { name: 'الثلاثاء', uv: 480 }
  ],
  revenue: [
    { name: 'يناير', val: 4000 }, 
    { name: 'فبراير', val: 5500 }, 
    { name: 'مارس', val: 7200 }
  ],
};

export default function AdminOverview() {
  const { data, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => ({ totalTools: 1245, totalUsers: 8430, mrr: "$14,500", newToday: 42 }) // محاكاة الـ API
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-rose-400 animate-pulse text-lg font-semibold">جاري تحميل الإحصائيات...</div>
      </div>
    );
  }

  const stats = [
    { label: 'إجمالي الأدوات', value: data?.totalTools, icon: Wrench, color: 'text-blue-400' },
    { label: 'المستخدمين النشطين', value: data?.totalUsers, icon: Users, color: 'text-emerald-400' },
    { label: 'الدخل الشهري (MRR)', value: data?.mrr, icon: DollarSign, color: 'text-amber-400' },
    { label: 'أدوات جديدة اليوم', value: data?.newToday, icon: Activity, color: 'text-rose-400' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-100">نظرة عامة (Overview)</h1>
      
      {/* شبكة الإحصائيات - متجاوبة مع جميع الشاشات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon; // تعريف الأيقونة كمكون React
          return (
            <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-100 mt-2">{stat.value}</p>
              </div>
              <Icon className={`w-10 h-10 ${stat.color} opacity-80`} />
            </div>
          );
        })}
      </div>

      {/* شبكة الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-96">
        
        {/* الرسم البياني الأول */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">التسجيلات الجديدة (Signups)</h3>
          <div className="flex-1 min-h-[250px] lg:min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData.signups}>
                <XAxis dataKey="name" stroke="#475569" />
                <YAxis stroke="#475569" />
                <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b' }} />
                <Area type="monotone" dataKey="uv" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* الرسم البياني الثاني */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">العوائد الشهرية (Revenue)</h3>
          <div className="flex-1 min-h-[250px] lg:min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.revenue}>
                <XAxis dataKey="name" stroke="#475569" />
                <YAxis stroke="#475569" />
                <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b' }} />
                <Bar dataKey="val" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}