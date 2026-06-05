'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Wrench, 
  Bookmark, 
  FolderKanban, 
  Star, 
  CreditCard, 
  Settings, 
  Menu,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const sidebarLinks = [
  { name: 'نظرة عامة', href: '/dashboard', icon: LayoutDashboard },
  { name: 'أدواتي', href: '/dashboard/my-tools', icon: Wrench },
  { name: 'الأدوات المحفوظة', href: '/dashboard/saved', icon: Bookmark },
  { name: 'المجموعات', href: '/dashboard/collections', icon: FolderKanban },
  { name: 'التقييمات', href: '/dashboard/reviews', icon: Star },
  { name: 'الفواتير والاشتراك', href: '/dashboard/billing', icon: CreditCard },
  { name: 'الإعدادات', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-950 border-l border-slate-800 text-slate-300">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">
          BAKR <span className="text-slate-100 text-lg">Dashboard</span>
        </h2>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link key={link.name} href={link.href}>
              <div className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'hover:bg-slate-900 hover:text-slate-100'
              }`}>
                <Icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10">
          <LogOut className="w-5 h-5 ml-2" />
          تسجيل الخروج
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      
      {/* القائمة الجانبية للشاشات الكبيرة (Desktop Sidebar) */}
      <aside className="hidden lg:block w-72 flex-shrink-0 fixed h-full z-10 right-0">
        <SidebarContent />
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 lg:mr-72 min-h-screen flex flex-col">
        
        {/* شريط التنقل العلوي للموبايل (Mobile Header) */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">
            BAKR Dashboard
          </h2>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-300">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 border-slate-800 w-72">
              <SheetTitle className="sr-only">قائمة التنقل</SheetTitle>
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </header>

        {/* عرض محتوى الصفحات الفرعية */}
        <div className="flex-1 p-6 md:p-10">
          {children}
        </div>
        
      </main>
    </div>
  );
}