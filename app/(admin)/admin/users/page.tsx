'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, MoreVertical, Shield, UserX, Trash2, Eye, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// واجهة تعريف بيانات المستخدم
interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'SUSPENDED';
  subscription: {
    plan: string;
    status: string;
    nextBilling: string;
  };
}

export default function AdminUsersManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  // جلب البيانات باستخدام React Query
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      // هنا يتم جلب البيانات من الـ API الفعلي لقاعدة البيانات
      return [
        { id: '1', name: 'محمد أحمد', email: 'mohammed@example.com', role: 'USER', status: 'ACTIVE', subscription: { plan: 'Pro Plan', status: 'Active', nextBilling: '2026-07-01' } },
        { id: '2', name: 'سارة خالد', email: 'sara@example.com', role: 'USER', status: 'SUSPENDED', subscription: { plan: 'Free Plan', status: 'None', nextBilling: '-' } },
        { id: '3', name: 'علي حسن', email: 'ali@example.com', role: 'ADMIN', status: 'ACTIVE', subscription: { plan: 'Enterprise', status: 'Lifetime', nextBilling: '-' } },
      ];
    }
  });

  // دالة تسجيل حركات المشرف (Audit Log)
  const logAdminAction = (actionType: string, targetUser: string, details: string) => {
    console.log(`[AUDIT LOG] Action: ${actionType} | Target: ${targetUser} | Details: ${details} | Timestamp: ${new Date().toISOString()}`);
    // هنا يتم إرسال العمليات لاحقاً إلى جدول الـ audit_logs عبر Mutation
  };

  // فلاتر البحث تصفية المصفوفة
  const filteredUsers = users?.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="text-rose-500 animate-pulse p-6">جاري جلب قائمة المستخدمين...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">إدارة المستخدمين (User Management)</h1>
        <p className="text-slate-400 text-sm mt-1">التحكم في صلاحيات الأعضاء، وتحديث الاشتراكات، ومراقبة الحسابات.</p>
      </div>

      {/* شريط البحث */}
      <div className="relative max-w-md">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
        <Input 
          type="text"
          placeholder="ابحث باسم المستخدم أو البريد الإلكتروني..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-900 border-slate-800 text-slate-100 pr-12 h-12 focus:ring-rose-500/50 rounded-xl"
        />
      </div>

      {/* جدول المستخدمين */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <Table>
          <TableHeader className="bg-slate-950 border-b border-slate-800">
            <TableRow>
              <TableHead className="text-right text-slate-400 p-4">المستخدم</TableHead>
              <TableHead className="text-right text-slate-400 p-4">الصلاحية</TableHead>
              <TableHead className="text-right text-slate-400 p-4">الحالة</TableHead>
              <TableHead className="text-right text-slate-400 p-4">تفاصيل الاشتراك</TableHead>
              <TableHead className="text-left text-slate-400 p-4">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers?.map((user) => (
              <TableRow key={user.id} className="border-b border-slate-800/60 hover:bg-slate-950/40 transition-colors">
                <TableCell className="p-4">
                  <div className="font-bold text-slate-200">{user.name}</div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">{user.email}</div>
                </TableCell>
                <TableCell className="p-4">
                  <Badge className={user.role === 'ADMIN' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-slate-800 text-slate-300'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="p-4">
                  <Badge className={user.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}>
                    {user.status === 'ACTIVE' ? 'نشط' : 'محظور'}
                  </Badge>
                </TableCell>
                <TableCell className="p-4">
                  <div className="text-sm text-slate-300 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-amber-400" /> {user.subscription.plan}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">التجديد: {user.subscription.nextBilling}</div>
                </TableCell>
                <TableCell className="p-4 text-left">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-300 w-48">
                      <DropdownMenuItem className="hover:bg-slate-800 cursor-pointer flex items-center gap-2" onClick={() => logAdminAction('VIEW_SUBSCRIPTION', user.name, 'عرض تفاصيل الفواتير')}>
                        <Eye className="w-4 h-4 text-sky-400" /> عرض الاشتراكات
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-slate-800 cursor-pointer flex items-center gap-2" onClick={() => logAdminAction('CHANGE_ROLE', user.name, 'تغيير الصلاحية إلى ADMIN')}>
                        <Shield className="w-4 h-4 text-amber-400" /> تغيير الصلاحية
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-slate-800 cursor-pointer flex items-center gap-2 text-amber-500" onClick={() => logAdminAction('SUSPEND_USER', user.name, 'حظر مؤقت')}>
                        <UserX className="w-4 h-4" /> حظر / تعليق
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-slate-800 cursor-pointer flex items-center gap-2 text-red-400" onClick={() => logAdminAction('DELETE_USER', user.name, 'حذف نهائي')}>
                        <Trash2 className="w-4 h-4" /> حذف الحساب
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}