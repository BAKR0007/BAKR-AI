import { CreditCard, Calendar, Receipt, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function BillingPage() {
  // بيانات محاكاة للفواتير والاشتراكات
  const billingInfo = {
    planName: "الخطة الاحترافية المتقدمة (Pro)",
    price: "$29.00 / شهرياً",
    nextBillingDate: "12 يوليو، 2026",
    stripePortalUrl: "https://billing.stripe.com/p/session/mock_url"
  };

  const invoices = [
    { id: "INV-0041", date: "2026-06-12", amount: "$29.00", status: "مدفوعة" },
    { id: "INV-0023", date: "2026-05-12", amount: "$29.00", status: "مدفوعة" },
    { id: "INV-0009", date: "2026-04-12", amount: "$29.00", status: "مدفوعة" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">الفواتير والاشتراك</h1>
        <p className="text-slate-400 text-sm">إدارة خطتك الحالية، مراجعة الفواتير والوصول لبوابة الدفع الآمنة Stripe.</p>
      </div>

      {/* كارت الاشتراك الحالي */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute left-0 top-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
              <CreditCard className="w-4 h-4" /> خطتك الحالية نشطة
            </div>
            <h2 className="text-2xl font-bold text-slate-100">{billingInfo.planName}</h2>
            <div className="text-slate-300 text-lg font-semibold">{billingInfo.price}</div>
            
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <Calendar className="w-4 h-4 text-slate-500" /> تاريخ التجديد القادم: <span className="text-slate-200 font-medium">{billingInfo.nextBillingDate}</span>
            </div>
          </div>

          {/* أزرار بوابة الدفع Stripe */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold px-6 py-5 rounded-lg shadow-md">
              ترقية الخطة الحالية
            </Button>
            <a href={billingInfo.stripePortalUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-900 px-6 py-5 rounded-lg w-full sm:w-auto">
                إدارة الاشتراك أو إلغاء <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* تاريخ الفواتير والمستندات */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
          <Receipt className="w-5 h-5 text-amber-400" /> أرشيف الفواتير السابقة
        </h3>
        
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <Table>
            <TableHeader className="bg-slate-950/50 border-b border-slate-800">
              <TableRow className="border-b border-slate-800 hover:bg-transparent">
                <TableHead className="text-right text-slate-400 font-medium p-4">رقم الفاتورة</TableHead>
                <TableHead className="text-right text-slate-400 font-medium p-4">تاريخ الإصدار</TableHead>
                <TableHead className="text-right text-slate-400 font-medium p-4">المبلغ الإجمالي</TableHead>
                <TableHead className="text-right text-slate-400 font-medium p-4">حالة الدفع</TableHead>
                <TableHead className="text-left text-slate-400 font-medium p-4">المستند</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} className="border-b border-slate-800/60 hover:bg-slate-950/40 transition-colors">
                  <TableCell className="font-mono text-slate-300 p-4">{invoice.id}</TableCell>
                  <TableCell className="text-slate-400 p-4">{invoice.date}</TableCell>
                  <TableCell className="text-slate-200 font-bold p-4 font-mono">{invoice.amount}</TableCell>
                  <TableCell className="p-4">
                    <span className="inline-flex items-center text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/10">
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-left p-4">
                    <Button variant="link" className="p-0 text-amber-400 hover:text-amber-300 text-xs h-auto">
                      تحميل PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}