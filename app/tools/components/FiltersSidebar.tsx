import { useFilterStore } from '@/store/useFilterStore'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const categoriesWithCount = [
  { id: 'design', label: 'Design', count: 24 },
  { id: 'development', label: 'Development', count: 18 },
  { id: 'marketing', label: 'Marketing', count: 12 },
  { id: 'video', label: 'Video Creation', count: 8 },
]

const pricingOptions = ['Free', 'Freemium', 'Paid', 'Enterprise']

export function FiltersSidebar() {
  const { category, pricing, setFilter } = useFilterStore()

  const handleCategoryChange = (id: string, checked: boolean) => {
    if (checked) {
      setFilter('category', [...category, id])
    } else {
      setFilter('category', category.filter((c: string) => c !== id))
    }
  }

  const handlePricingChange = (id: string, checked: boolean) => {
    if (checked) {
      setFilter('pricing', [...pricing, id])
    } else {
      setFilter('pricing', pricing.filter((p: string) => p !== id))
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Categories</h3>
        <div className="space-y-3">
          {categoriesWithCount.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={`cat-${cat.id}`} 
                  checked={category.includes(cat.id)}
                  onCheckedChange={(checked) => handleCategoryChange(cat.id, checked as boolean)}
                />
                <Label htmlFor={`cat-${cat.id}`} className="cursor-pointer">{cat.label}</Label>
              </div>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Pricing</h3>
        <div className="space-y-3">
          {pricingOptions.map((price) => (
            <div key={price} className="flex items-center space-x-2">
              <Checkbox 
                id={`price-${price}`} 
                checked={pricing.includes(price)}
                onCheckedChange={(checked) => handlePricingChange(price, checked as boolean)}
              />
              <Label htmlFor={`price-${price}`} className="cursor-pointer">{price}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}