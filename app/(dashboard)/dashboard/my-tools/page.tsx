import { Edit2, Eye, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function MyToolsPage() {
  // بيانات محاكاة للأدوات المضافة
  const myTools = [
    { id: 1, name: "Smart Write AI", slug: "smart-write", status: "live", views: 1420, clicks: 380, date: "2026-05-12" },
    { id: 2, name: "Designify Pro", slug: "designify-pro", status: "pending", views: 0, clicks: 0, date: "2026-06-04" },
    { id: 3, name: "VideoCut AI", slug: "videocut-ai", status: "rejected", views: 45, clicks: 2, date: "2026-04-18" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">منشور نشط</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500/10 text-amber-400 border border-amber-400/20">قيد المراجعة</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/10 text-red-400 border border-red-500/20">مرفوض</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">أدواتي المضافة</h1>
        <p className="text-slate-400 text-sm">إدارة وتحليل أداء جميع أدوات الذكاء الاصطناعي التي قمت بتقديمها للدليل.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <Table>
          <TableHeader className="bg-slate-950/60 border-b border-slate-800">
            <TableRow className="border-b border-slate-800 hover:bg-transparent">
              <TableHead className="text-right text-slate-400 font-medium p-4">اسم الأداة</TableHead>
              <TableHead className="text-right text-slate-400 font-medium p-4">الحالة</TableHead>
              <TableHead className="text-right text-slate-400 font-medium p-4">تاريخ التقديم</TableHead>
              <TableHead className="text-right text-slate-400 font-medium p-4">المشاهدات</TableHead>
              <TableHead className="text-right text-slate-400 font-medium p-4">النقرات (Clicks)</TableHead>
              <TableHead className="text-left text-slate-400 font-medium p-4">العمليات والإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myTools.map((tool) => (
              <TableRow key={tool.id} className="border-b border-slate-800/60 hover:bg-slate-950/40 transition-colors">
                <TableCell className="font-bold text-slate-200 p-4">{tool.name}</TableCell>
                <TableCell className="p-4">{getStatusBadge(tool.status)}</TableCell>
                <TableCell className="text-slate-400 p-4">{tool.date}</TableCell>
                <TableCell className="text-slate-300 p-4 font-mono">{tool.views.toLocaleString()}</TableCell>
                <TableCell className="text-slate-300 p-4 font-mono">{tool.clicks.toLocaleString()}</TableCell>
                <TableCell className="text-left p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-amber-400 hover:bg-amber-500/10">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}