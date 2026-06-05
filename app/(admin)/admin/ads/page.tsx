'use client';

import { useQuery } from '@tanstack/react-query';
import { Megaphone, DollarSign, BarChart3, Play, Pause, Eye, MousePointerClick } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Campaign {
  id: string;
  name: string;
  position: string;
  impressions: number;
  clicks: number;
  revenue: string;
  status: 'ACTIVE' | 'PAUSED';
}

export default function AdminAdManagement() {
  // جلب بيانات الإعلانات عبر React Query
  const { data: campaigns, isLoading } = useQuery<Campaign[]>({
    queryKey: ['adminAds'],
    queryFn: async () => {
      return [
        { id: '1', name: 'حملة أدوات البرمجة المميزة', position: 'Top Banner Sidebar', impressions: 45200, clicks: 1890, revenue: '$450.00', status: 'ACTIVE' },
        { id: '2', name: 'إعلان شركة Cloud Hosting', position: 'Main Feed Grid Native', impressions: 89000, clicks: 4200, revenue: '$1,200.00', status: 'PAUSED' },
        { id: '3', name: 'أفلييت دورة تعلم الذكاء الاصطناعي', position: 'Footer Sticky Placement', impressions: 12100, clicks: 310, revenue: '$125.50', status: 'ACTIVE' },
      ];
    }
  });

  const logAdminAction = (action: string, campaignName: string) => {
    console.log(`[AUDIT LOG] Action: ${action} | Campaign: ${campaignName} | Timestamp: ${new Date().toISOString()}`);
  };

  if (isLoading) return <div className="text-rose-500 animate-pulse p-6">جاري تحميل بيانات الإعلانات...</div>;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">إدارة الإعلانات والمساحات (Ad Management)</h1>
        <p className="text-slate-400 text-sm mt-1">تتبع الظهور، وإدارة الحملات النشطة، وتحليل توزيع الأرباح حسب الموقع.</p>
      </div>

      {/* لوحة توزيع الأرباح */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-amber-400" /> تحليل العوائد حسب موضع الإعلان (Revenue Breakdown)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-500 block">Top Banner</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">$450.00</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-500 block">Grid Native Ads</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">$1,200.00</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-500 block">Sticky Footer</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">$125.50</span>
          </div>
        </div>
      </div>

      {/* جدول الحملات */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <Table>
          <TableHeader className="bg-slate-950 border-b border-slate-800">
            <TableRow>
              <TableHead className="text-right text-slate-400 p-4">اسم الحملة الإعلانية</TableHead>
              <TableHead className="text-right text-slate-400 p-4">الموضع في الموقع</TableHead>
              <TableHead className="text-right text-slate-400 p-4">الظهور (Impressions)</TableHead>
              <TableHead className="text-right text-slate-400 p-4">النقرات (Clicks)</TableHead>
              <TableHead className="text-right text-slate-400 p-4">العوائد</TableHead>
              <TableHead className="text-right text-slate-400 p-4">الحالة</TableHead>
              <TableHead className="text-left text-slate-400 p-4">التحكم</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns?.map((campaign) => (
              <TableRow key={campaign.id} className="border-b border-slate-800/60 hover:bg-slate-950/40 transition-colors">
                <TableCell className="p-4 font-bold text-slate-200 flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-slate-500" /> {campaign.name}
                </TableCell>
                <TableCell className="p-4 text-slate-400 text-sm font-mono">{campaign.position}</TableCell>
                <TableCell className="p-4 text-slate-300 font-mono text-sm">
                  <div className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-slate-500" /> {campaign.impressions.toLocaleString()}</div>
                </TableCell>
                <TableCell className="p-4 text-slate-300 font-mono text-sm">
                  <div className="flex items-center gap-1"><MousePointerClick className="w-3.5 h-3.5 text-slate-500" /> {campaign.clicks.toLocaleString()}</div>
                </TableCell>
                <TableCell className="p-4 text-emerald-400 font-bold font-mono text-sm">
                  <div className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-emerald-600" /> {campaign.revenue}</div>
                </TableCell>
                <TableCell className="p-4">
                  <Badge className={campaign.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}>
                    {campaign.status === 'ACTIVE' ? 'نشط' : 'موقوف مؤقتاً'}
                  </Badge>
                </TableCell>
                <TableCell className="p-4 text-left">
                  {campaign.status === 'ACTIVE' ? (
                    <Button size="sm" variant="secondary" className="bg-slate-800 hover:bg-slate-700 text-slate-300" onClick={() => logAdminAction('PAUSE_CAMPAIGN', campaign.name)}>
                      <Pause className="w-3.5 h-3.5 ml-1" /> إيقاف
                    </Button>
                  ) : (
                    <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-medium" onClick={() => logAdminAction('APPROVE_CAMPAIGN', campaign.name)}>
                      <Play className="w-3.5 h-3.5 ml-1" /> تفعيل
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}