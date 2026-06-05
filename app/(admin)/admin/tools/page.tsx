'use client';

import { useQuery } from '@tanstack/react-query';
import { Check, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AdminToolsModeration() {
  const { data: tools } = useQuery({
    queryKey: ['pendingTools'],
    queryFn: async () => [
      { id: 1, name: 'AutoScript AI', user: 'ahmed@mail.com', status: 'pending', reports: 0 },
      { id: 2, name: 'ScrapeBot', user: 'sara@mail.com', status: 'reported', reports: 5 },
    ]
  });

  // دالة محاكاة لتسجيل حركات الإدمن (Audit Log)
  const logAdminAction = (action: string, toolName: string) => {
    console.log(`[AUDIT LOG]: Admin performed "${action}" on tool "${toolName}" at ${new Date().toISOString()}`);
    // في الواقع يتم إرسال هذا الـ Log للـ Database (Mutate)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-100">إدارة الأدوات (Moderation Queue)</h1>
        <Button variant="outline" className="border-slate-800">إجراءات جماعية (Bulk Actions)</Button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-950 border-b border-slate-800">
            <TableRow>
              <TableHead className="text-right">اسم الأداة</TableHead>
              <TableHead className="text-right">المقدم (User)</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">الإبلاغات</TableHead>
              <TableHead className="text-left">القرار (Action)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tools?.map((tool) => (
              <TableRow key={tool.id} className="border-b border-slate-800">
                <TableCell className="font-bold">{tool.name}</TableCell>
                <TableCell className="text-slate-400">{tool.user}</TableCell>
                <TableCell>
                  {tool.status === 'pending' ? <Badge className="bg-amber-500/10 text-amber-400">بانتظار الموافقة</Badge> 
                  : <Badge className="bg-red-500/10 text-red-400">مُبلغ عنها</Badge>}
                </TableCell>
                <TableCell className="text-slate-400">
                  {tool.reports > 0 && <span className="flex items-center text-red-400"><AlertTriangle className="w-4 h-4 ml-1"/> {tool.reports}</span>}
                </TableCell>
                <TableCell className="text-left space-x-2 space-x-reverse">
                  <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-slate-950" onClick={() => logAdminAction('Approve', tool.name)}>
                    <Check className="w-4 h-4 ml-1" /> موافقة
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => logAdminAction('Reject', tool.name)}>
                    <X className="w-4 h-4 ml-1" /> رفض (مع السبب)
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}