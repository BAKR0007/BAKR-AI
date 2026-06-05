'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { useFilterStore } from '../../../store/useFilterStore'
import { FiltersSidebar } from './FiltersSidebar'
import { ToolsGrid } from './ToolsGrid'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X, Search } from 'lucide-react'

interface InitialParams {
  q?: string
  category?: string
  pricing?: string
  sort?: string
  page?: string
}

export function ToolsClient({ initialParams }: { initialParams: InitialParams }) {
  const router = useRouter()
  const pathname = usePathname()

  const { q, category, pricing, sort, page, setFilter, reset } = useFilterStore()
  const [searchValue, setSearchValue] = useState(initialParams.q ?? '')

  // تهيئة الفلاتر من URL عند أول تحميل
  useEffect(() => {
    if (initialParams.q)        setFilter('q', initialParams.q)
    if (initialParams.category) setFilter('category', initialParams.category.split(','))
    if (initialParams.pricing)  setFilter('pricing', initialParams.pricing.split(','))
    if (initialParams.sort)     setFilter('sort', initialParams.sort)
    if (initialParams.page)     setFilter('page', Number(initialParams.page))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // تحديث URL عند تغيير الفلاتر
  useEffect(() => {
    const params = new URLSearchParams()
    if (q)               params.set('q', q)
    if (category.length) params.set('category', category.join(','))
    if (pricing.length)  params.set('pricing', pricing.join(','))
    if (sort !== 'newest') params.set('sort', sort)
    if (page > 1)        params.set('page', page.toString())

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [q, category, pricing, sort, page, pathname, router])

  // debounce لحقل البحث
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter('q', searchValue)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchValue, setFilter])

  const removeFilter = (type: 'category' | 'pricing', item: string) => {
    if (type === 'category') setFilter('category', category.filter((c: string) => c !== item))
    if (type === 'pricing')  setFilter('pricing',  pricing.filter((p: string)  => p !== item))
  }

  return (
    <>
      <aside className="w-full md:w-64 shrink-0">
        <FiltersSidebar />
      </aside>

      <main className="flex-1 space-y-6">

        {/* شريط البحث */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* الفلاتر النشطة */}
        {(category.length > 0 || pricing.length > 0) && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Active:</span>

            {category.map((c: string) => (
              <Badge
                key={c}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => removeFilter('category', c)}
              >
                {c} <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}

            {pricing.map((p: string) => (
              <Badge
                key={p}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => removeFilter('pricing', p)}
              >
                {p} <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}

            <Button
              variant="ghost"
              size="sm"
              onClick={reset}
              className="h-6 px-2 text-xs"
            >
              Clear all
            </Button>
          </div>
        )}

        <ToolsGrid />

      </main>
    </>
  )
}
