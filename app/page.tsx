import { 
  HeroSection, 
  StatsBar, 
  FeaturedTools, 
  CategoriesGrid, 
  NewsletterCTA 
} from './components/home/HomeSections'

export const metadata = {
  title: 'BAKR AI | The Ultimate AI Tools Directory',
  description: 'Discover, compare, and review the best AI tools for developers, designers, and creators.',
}

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <StatsBar />
      <FeaturedTools />
      <CategoriesGrid />
      <NewsletterCTA />
    </main>
  )
}