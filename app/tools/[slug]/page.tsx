import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, ExternalLink, CheckCircle2, XCircle, DollarSign } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // تمت إضافته لمعالجة نصوص الماركدون
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// استيراد المكونات التفاعلية
import { ToolActions, ScreenshotGallery, WriteReviewForm } from './InteractiveElements';

// إعدادات الـ ISR (تحديث الكاش كل ساعة)
export const revalidate = 3600;

// محاكاة جلب بيانات الأداة
async function getToolData(slug: string) {
  if (slug === 'not-found') return null;
  
  return {
    slug,
    name: "مساعد الذكاء الاصطناعي المتقدم",
    logo: "https://ui-avatars.com/api/?name=AI&background=020617&color=10b981",
    tagline: "عزز إنتاجيتك واكتب أكوادك بسرعة خيالية باستخدام أحدث النماذج.",
    category: "Development",
    pricingType: "Freemium",
    rating: 4.8,
    reviewsCount: 1250,
    website: "https://example.com/?ref=bakr",
    // محاكاة نص مكتوب بصيغة ماركدون
    description: "هذه الأداة تعتبر ثورة في عالم البرمجة. تتيح لك:\n- **تحليل الأكواد**\n- اكتشاف الأخطاء\n- كتابة دوال كاملة بضغطة زر.\n\nمبنية على بنية تحتية قوية تدعم أكثر من 20 لغة برمجة.",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80"
    ],
    pros: ["واجهة مستخدم سريعة جداً", "دعم كامل للغة العربية", "تكامل مباشر مع VS Code"],
    cons: ["النسخة المجانية محدودة جداً", "تحتاج لاتصال دائم بالإنترنت"],
    pricingPlans: [
      { name: "الأساسية", price: "مجاني", features: ["100 طلب شهرياً", "دعم مجتمعي"] },
      { name: "الاحترافية", price: "$20/شهر", features: ["طلبات غير محدودة", "أولوية في الدعم", "وصول للنماذج الأحدث"] }
    ],
    reviews: [
      { user: "أحمد محمد", avatar: "", date: "2026-05-10", rating: 5, text: "أداة لا غنى عنها في عملي اليومي كمبرمج.", helpful: 45 },
      { user: "سارة علي", avatar: "", date: "2026-04-22", rating: 4, text: "ممتازة ولكن السعر مرتفع قليلاً.", helpful: 12 }
    ],
    faqs: [
      { q: "هل الأداة تدعم اللغة العربية؟", a: "نعم، تدعم العربية بشكل ممتاز في الفهم والتوليد." },
      { q: "هل يمكنني الإلغاء في أي وقت؟", a: "بالتأكيد، يمكنك إلغاء اشتراكك بنقرة واحدة من لوحة التحكم." }
    ]
  };
}

// 1. توليد الصفحات الثابتة مسبقاً (SSG) لأهم 1000 أداة
export async function generateStaticParams() {
  const topTools = ['ai-coder', 'design-pro', 'copy-writer']; 
  return topTools.map((slug) => ({
    slug: slug,
  }));
}

// 2. توليد الـ SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const tool = await getToolData(resolvedParams.slug);
  
  if (!tool) return { title: 'أداة غير موجودة' };

  return {
    title: `${tool.name} | مراجعة وتسعير الأداة`,
    description: tool.tagline,
    openGraph: {
      title: tool.name,
      description: tool.tagline,
      images: [tool.logo],
      type: 'website',
    },
  };
}

// 3. المكون الرئيسي للصفحة
export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const tool = await getToolData(resolvedParams.slug);

  if (!tool) notFound();

  // إعداد JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "operatingSystem": "Web, Windows, macOS",
    "applicationCategory": "DeveloperApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": tool.rating,
      "ratingCount": tool.reviewsCount
    },
    "offers": {
      "@type": "Offer",
      "price": tool.pricingPlans[1]?.price.replace(/[^0-9]/g, '') || "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* شريط الإحالة (Affiliate Banner) */}
      <div className="bg-emerald-500/10 border-b border-emerald-500/20 text-center py-2 px-4">
        <p className="text-sm text-emerald-400 font-medium">
          🔥 احصل على خصم 20% عند التسجيل عبر الرابط الخاص بنا باستخدام الكود <span className="font-bold text-amber-400">BAKR20</span>
        </p>
      </div>

      <main className="max-w-6xl mx-auto px-6 md:px-12 py-10 space-y-16">
        
        {/* 1. Header Section */}
        <section className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden relative">
            <Image src={tool.logo} alt={tool.name} fill className="object-cover" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">{tool.name}</h1>
                <p className="text-lg text-slate-400">{tool.tagline}</p>
              </div>
              <Link href={tool.website} target="_blank" rel="noopener noreferrer">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 py-6 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                  زيارة الموقع <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Badge variant="secondary" className="bg-slate-800 text-slate-200 border-slate-700">{tool.category}</Badge>
              <Badge variant="outline" className="text-amber-400 border-amber-400/50">{tool.pricingType}</Badge>
              <div className="flex items-center text-amber-400 font-medium">
                <Star className="w-4 h-4 fill-amber-400 mr-1" />
                {tool.rating} <span className="text-slate-500 ml-1">({tool.reviewsCount} تقييم)</span>
              </div>
            </div>

            <ToolActions />
          </div>
        </section>

        <Separator className="bg-slate-800" />

        {/* 2. Screenshot Gallery */}
        <section>
          <h2 className="text-2xl font-bold text-slate-100 mb-6">الواجهة والصور</h2>
          <ScreenshotGallery images={tool.images} />
        </section>

        {/* 3. Description (Markdown Rendered) */}
        <section className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">نظرة عامة</h2>
          <div className="prose prose-invert prose-emerald max-w-none text-slate-300 leading-relaxed">
            {/* استخدام ReactMarkdown هنا لعرض النصوص */}
            <ReactMarkdown>{tool.description}</ReactMarkdown>
          </div>
        </section>

        {/* 4. Pros & Cons */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" /> المميزات (Pros)
            </h3>
            <ul className="space-y-3">
              {tool.pros.map((pro, i) => (
                <li key={i} className="text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span> {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6" /> العيوب (Cons)
            </h3>
            <ul className="space-y-3">
              {tool.cons.map((con, i) => (
                <li key={i} className="text-slate-300 flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span> {con}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Pricing Table */}
        <section>
          <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-emerald-400" /> خطط الأسعار
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tool.pricingPlans.map((plan, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-slate-700 transition-colors">
                <h3 className="text-xl font-semibold text-slate-200 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-emerald-400 mb-6">{plan.price}</div>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-slate-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <Separator className="bg-slate-800" />

        {/* 6. Reviews Section */}
        <section>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3 space-y-4">
              <h2 className="text-2xl font-bold text-slate-100">تقييمات المستخدمين</h2>
              <div className="flex items-end gap-4 mb-6">
                <span className="text-5xl font-bold text-slate-100">{tool.rating}</span>
                <span className="text-slate-500 mb-1">من أصل 5 ({tool.reviewsCount} تقييم)</span>
              </div>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm text-slate-400 w-3">{star}</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Progress value={star === 5 ? 70 : star === 4 ? 20 : 10} className="h-2 bg-slate-800 [&>div]:bg-amber-400" />
                </div>
              ))}
              
              <WriteReviewForm />
            </div>

            <div className="w-full md:w-2/3 space-y-6">
              {tool.reviews.map((review, idx) => (
                <div key={idx} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="border border-slate-700">
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback className="bg-slate-800 text-emerald-400">{review.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-slate-200">{review.user}</div>
                        <div className="text-xs text-slate-500">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{review.text}</p>
                  <Button variant="ghost" size="sm" className="text-xs text-slate-500 hover:text-emerald-400">
                    مفيد ({review.helpful})
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FAQ Accordion */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 text-center">الأسئلة الشائعة</h2>
          <Accordion type="single" collapsible className="w-full">
            {tool.faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-slate-800">
                <AccordionTrigger className="text-slate-200 hover:text-emerald-400 hover:no-underline text-right">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 leading-relaxed text-right">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* 7. Similar Tools (Updated to 6 cards) */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-slate-100">أدوات مشابهة</h2>
            <Link href="/tools" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">عرض الكل</Link>
          </div>
          {/* تم التعديل لعرض 6 بطاقات أدوات كما طلب البرومبت */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-all flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-slate-400">AI</div>
                   <div>
                     <h3 className="font-bold text-slate-200">أداة بديلة {i}</h3>
                     <div className="text-amber-400 text-xs flex items-center"><Star className="w-3 h-3 fill-amber-400 mr-1" /> 4.5</div>
                   </div>
                </div>
                <p className="text-sm text-slate-400 mb-4 flex-1">وصف قصير لهذه الأداة وكيف تنافس الأداة الحالية.</p>
                <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">عرض التفاصيل</Button>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}