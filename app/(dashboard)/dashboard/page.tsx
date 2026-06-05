import { PlusCircle, DollarSign, ArrowUpRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function DashboardOverview() {
  // بيانات محاكاة سريعة (Mock Data)
  const stats = {
    plan: "الخطة الاحترافية (Pro)",
    usage: 65, // نسبة الاستخدام 65%
    limit: "65 من أصل 100 أداة مضافة",
    earnings: "$240.50"
  };

  const activities = [
    { id: 1, type: 'live', text: 'تمت الموافقة على أداة "Smart Write AI" وهي الآن نشطة.', time: 'منذ ساعتين', icon: CheckCircle2, color: 'text-emerald-400' },
    { id: 2, type: 'pending', text: 'قمت بتقديم أداة جديدة "Designify Pro" للمراجعة.', time: 'منذ يوم واحد', icon: Clock, color: 'text-amber-400' },
    { id: 3, type: 'bookmark', text: 'قمت بحفظ أداة "CodeGuru AI" في المفضلة.', time: 'منذ 3 أيام', icon: ArrowUpRight, color: 'text-slate-400' }
  ];

  return (
    <div className="space-y-10">
      {/* الـ Header الخاص بالصفحة */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">مرحباً بك مجدداً</h1>
        <p className="text-slate-400 text-sm md:text-base">إليك نظرة عامة على أداء أدواتك ونشاطك الحالي.</p>
      </div>

      {/* قسم الإحصائيات والخطة الحالية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* بطاقة الخطة والاستهلاك */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-slate-400 font-medium text-sm mb-1">الاشتراك الحالي</h3>
              <div className="text-xl font-bold text-slate-100">{stats.plan}</div>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 py-1 px-3">نشط</Badge>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-xs text-slate-400">
              <span>معدل استهلاك خطة الـ لستة</span>
              <span>{stats.limit}</span>
            </div>
            <Progress value={stats.usage} className="h-2 bg-slate-950 [&>div]:bg-emerald-500" />
          </div>
        </div>

        {/* بطاقة الأرباح السريعة */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <h3 className="text-slate-400 font-medium text-sm mb-1">إجمالي الأرباح المستلمة</h3>
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 mt-2">
              {stats.earnings}
            </div>
            <p className="text-xs text-slate-500 mt-1">الأرباح الناتجة عن نقرات الإحالة ونظام الأفلييت الخاص بأدواتك.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800/60">
            <Button variant="link" className="p-0 text-amber-400 hover:text-amber-300 h-auto text-sm flex items-center gap-1">
              عرض تفاصيل الأرباح والتقارير <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* قسم الإجراءات السريعة (Quick Actions) */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-slate-200 mb-4">إجراءات سريعة</h2>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold px-6 py-5 rounded-lg flex items-center gap-2 shadow-lg shadow-emerald-500/10 transition-all">
            <PlusCircle className="w-5 h-5" /> إضافة أداة ذكاء اصطناعي جديدة
          </Button>
          <Button variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-900 px-6 py-5 rounded-lg flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-amber-400" /> سحب الأرباح المتاحة
          </Button>
        </div>
      </div>

      {/* الخط الزمني للأنشطة الأخيرة (Recent Activity Timeline) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-slate-200 mb-6">آخر الأنشطة والعمليات</h2>
        <div className="relative border-r border-slate-800 pr-6 space-y-8">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="relative flex flex-col md:flex-row md:items-center justify-between gap-2">
                {/* نقطة أيقونة النشاط على الخط الزمني */}
                <span className="absolute -right-[35px] top-0 bg-slate-950 p-1.5 rounded-full border border-slate-800">
                  <Icon className={`w-4 h-4 ${activity.color}`} />
                </span>
                
                <div>
                  <p className="text-sm text-slate-200 font-medium">{activity.text}</p>
                  <span className="text-xs text-slate-500 mt-1 block">{activity.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}