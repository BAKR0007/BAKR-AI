import { useFilterStore } from '../../../store/useFilterStore'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SearchX, Bookmark, Star, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { PaginationControl } from './PaginationControl'

const totalPages = 5 

export function ToolsGrid() {
  const { q, category } = useFilterStore()
  
  const isListEmpty = true // غير هذه القيمة إلى false لترى شكل الكرت

  if (isListEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border rounded-lg border-dashed">
        <SearchX className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No tools found</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          We couldn't find any tools matching your current filters. Try adjusting your search criteria or submit a new tool.
        </p>
        <Button asChild>
          <Link href="/tools/submit">Submit a Tool</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center font-bold">Logo</div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
            
            <div>
              <h4 className="font-bold text-lg line-clamp-1">ChatGPT</h4>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                Advanced conversational AI model by OpenAI.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              <Badge variant="outline">Development</Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300">Freemium</Badge>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-foreground">4.8</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>12.5k views</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <PaginationControl totalPages={totalPages} />
    </div>
  )
}