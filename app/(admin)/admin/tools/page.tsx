'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image'; 
import { CheckCircle2, XCircle, Loader2, Search, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getTools } from '@/lib/actions';
import { EnrichAndViewButton } from '@/components/EnrichAndViewButton'; // 👈 استدعاء الزر الذكي

export default function AdminToolsModeration() {
  const { data: tools, isLoading, error } = useQuery({
    queryKey: ['tools'],
    queryFn: getTools,
  });

  if (isLoading) return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin w-10 h-10 text-yellow-500" /></div>;
  if (error) return <div className="text-center text-red-500 p-10 bg-red-500/5 rounded-xl"><AlertCircle className="w-8 h-8 mx-auto mb-2"/> حدث خطأ أثناء جلب البيانات</div>;

  return (
    <div className="space-y-6">
      {/* قسم البراند */}
      <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-yellow-500/20">
        <div className="relative w-12 h-12">
            <Image src="/logo.png" alt="BAKR Brand" fill className="object-contain" />
        </div>
        <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">BAKR Portal</h1>
            <p className="text-slate-400 text-sm">لوحة تحكم إدارة أدوات الذكاء الاصطناعي</p>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <h2 className="text-xl font-semibold text-slate-200">إدارة الأدوات (Moderation Queue)</h2>
        <div className="relative">
           <Search className="absolute right-3 top-3 w-4 h-4 text-slate-500" />
           <input placeholder="البحث في الأدوات..." className="bg-slate-900 border border-slate-800 rounded-lg py-2 pr-10 pl-4 text-sm focus:ring-1 focus:ring-yellow-500 outline-none w-64" />
        </div>
      </div>

      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-slate-900/50">
            <TableRow className="hover:bg-transparent border-slate-800">
              <TableHead className="text-right py-4">اسم الأداة</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-center">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tools?.map((tool: any) => (
              <TableRow key={tool.id} className="border-slate-800 hover:bg-slate-900/50 transition-colors">
                <TableCell className="font-bold text-slate-200">
                  <Link href={`/tools/${tool.slug}`} target="_blank" className="hover:text-yellow-400 transition-colors">
                    {tool.name}
                  </Link>
                </TableCell>
                <TableCell>
                   <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">نشطة</Badge>
                </TableCell>
                
                <TableCell className="flex justify-center items-center gap-2">
                  
                  {/* 👈 الزر الذكي (تم تعديل الشرط إلى 600 حرف لضمان عمل الذكاء الاصطناعي مع الأوصاف القصيرة) */}
                  <EnrichAndViewButton 
                    toolId={tool.id} 
                    slug={tool.slug || ''} 
                    hasDescription={tool.description ? tool.description.length > 600 : false} 
                  />

                  <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-slate-950 font-bold px-4">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> موافقة
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-900/50 text-red-400 hover:bg-red-900/20">
                    <XCircle className="w-4 h-4 mr-2" /> حذف
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