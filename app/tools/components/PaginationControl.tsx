import { useFilterStore } from '@/store/useFilterStore'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationControl({ totalPages }: { totalPages: number }) {
  const { page, setFilter } = useFilterStore()

  if (totalPages <= 1) return null

  return (
    <Pagination className="mt-8 justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            onClick={(e) => { e.preventDefault(); if (page > 1) setFilter('page', page - 1) }}
            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        
        {[...Array(totalPages)].map((_, i) => {
          const pageNumber = i + 1;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink 
                href="#" 
                isActive={page === pageNumber}
                onClick={(e) => { e.preventDefault(); setFilter('page', pageNumber) }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext 
            href="#" 
            onClick={(e) => { e.preventDefault(); if (page < totalPages) setFilter('page', page + 1) }}
            className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}