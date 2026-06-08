import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SearchX, Bookmark, Star, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { PaginationControl } from './PaginationControl'

interface ToolsGridProps {
  tools?: any[]
}

const totalPages = 1 

export function ToolsGrid({ tools = [] }: ToolsGridProps) {
  const isListEmpty = tools.length === 0

  if (isListEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border rounded-2xl border-dashed border-slate-800 bg-[#020817]/40 w-full backdrop-blur-sm">
        <SearchX className="w-12 h-12 text-slate-500 mb-4" />
        <h3 className="text-lg font-semibold mb-2 text-slate-100">No tools found</h3>
        <p className="text-slate-400 mb-6 max-w-md">
          We couldn't find any tools matching your current filters. Try adjusting your search criteria or submit a new tool.
        </p>
        <Button asChild className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:opacity-90">
          <Link href="/tools/submit">Submit a Tool</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8 w-full p-6 bg-[#020817] rounded-3xl border border-slate-800/60 shadow-inner">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool: any) => {
          // دمج ذكي لدعم مسار الصورة سواء جاءت camelCase أو snake_case من الـ API
          const currentImageUrl = tool.imageUrl || tool.image_url;

          return (
            <Link key={tool.id} href={`/tools/${tool.slug || tool.id}`} className="block relative group">
              
              {/* تأثير الوهج الخارجي الفخم عند حوم الماوس (Hover) */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"></div>

              {/* بطاقة الأداة بتصميم زجاجي داكن وتأثيرات تفاعلية */}
              <Card className="flex flex-col h-[360px] relative z-10 overflow-hidden bg-[#0a0514]/90 backdrop-blur-xl border border-slate-800 rounded-3xl transition-all duration-300 group-hover:scale-105 group-hover:border-amber-400">
                
                {/* إضاءة داخلية علوية ناعمة تظهر عند الـ Hover */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <CardContent className="p-6 flex-1 flex flex-col gap-4 relative z-10 text-right" dir="rtl">
                  <div className="flex justify-between items-start">
                    
                    {/* مربع شعار الأداة */}
                    <div className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center bg-slate-950 border border-slate-800 group-hover:border-amber-400/50 text-amber-300 text-3xl font-bold shadow-lg transition-colors">
                      {currentImageUrl ? (
                        <img src={currentImageUrl} alt={tool.name} className="w-full h-full object-cover" />
                      ) : (
                        <span>AI</span>
                      )}
                    </div>

                    {/* زر المفضلة - مع منع انتشار الحدث (Propagation) لكي لا يفتح الرابط عند الضغط عليه */}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-500 hover:text-amber-400 hover:bg-transparent -mt-1 -mr-1" 
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('Bookmark clicked for tool:', tool.id);
                      }}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* نصوص كرت الأداة */}
                  <div>
                    <h4 className="font-extrabold text-xl line-clamp-1 text-slate-50 group-hover:text-amber-400 transition-colors">
                      {tool.name}
                    </h4>
                    <p className="text-base text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  {/* وسوم التصنيف والأسعار */}
                  <div className="flex flex-wrap gap-2.5 mt-auto pt-3 border-t border-slate-800/80">
                    {tool.category && (
                      <Badge variant="outline" className="text-slate-400 border-slate-700">
                        {tool.category}
                      </Badge>
                    )}
                    {tool.pricing && (
                      <Badge variant="secondary" className="bg-emerald-950 text-emerald-300 hover:bg-emerald-950 border border-emerald-800">
                        {tool.pricing}
                      </Badge>
                    )}
                  </div>

                  {/* التقييم والمشاهدات أسفل الكرت */}
                  <div className="flex items-center justify-between text-sm text-slate-400 pt-3">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-slate-50">{tool.rating || '4.5'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="h-4 w-4 text-slate-500" />
                      <span>{tool.views || '0'} views</span>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <PaginationControl totalPages={totalPages} />
    </div>
  )
}