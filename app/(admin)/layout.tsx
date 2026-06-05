'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShieldCheck, Users, Megaphone, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const adminLinks = [
  { name: 'الإحصائيات (Overview)', href: '/admin', icon: LayoutDashboard },
  { name: 'إدارة الأدوات', href: '/admin/tools', icon: ShieldCheck },
  { name: 'إدارة المستخدمين', href: '/admin/users', icon: Users },
  { name: 'إدارة الإعلانات', href: '/admin/ads', icon: Megaphone },
  { name: 'إعدادات المنصة', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-rose-500/30">
      <aside className="w-72 fixed h-full bg-slate-950 border-l border-slate-800 flex flex-col right-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-rose-500">ADMIN</span> <span className="text-slate-100">Portal</span>
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'hover:bg-slate-900 text-slate-300'
                }`}>
                  <Icon className="w-5 h-5" /> <span className="font-medium">{link.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 mr-72 p-10 min-h-screen">
        {children}
      </main>
    </div>
  );
}