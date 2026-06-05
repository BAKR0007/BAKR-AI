'use client'

import { motion } from 'framer-motion'
import { Search, ArrowRight, Star, Code, Video, PenTool, Megaphone, MonitorPlay, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

// --- Mock Data ---
const featuredTools = [
  { id: 1, name: 'ChatGPT', category: 'Chatbot', rating: 4.9, pricing: 'Freemium', logo: '🤖' },
  { id: 2, name: 'Midjourney', category: 'Image Generation', rating: 4.8, pricing: 'Paid', logo: '🎨' },
  { id: 3, name: 'Synthesia', category: 'Video Creation', rating: 4.7, pricing: 'Paid', logo: '📹' },
  { id: 4, name: 'Copy.ai', category: 'Copywriting', rating: 4.6, pricing: 'Freemium', logo: '✍️' },
]

const categories = [
  { name: 'Development', icon: Code, count: 124 },
  { name: 'Video Creation', icon: Video, count: 85 },
  { name: 'Design', icon: PenTool, count: 210 },
  { name: 'Marketing', icon: Megaphone, count: 156 },
  { name: 'Productivity', icon: MonitorPlay, count: 320 },
  { name: 'Generative AI', icon: Sparkles, count: 95 },
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
}

// --- Sections ---

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container px-4 mx-auto text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        >
          Discover the Best <span className="text-primary">AI Tools</span> <br /> for Your Next Big Idea
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        >
          Explore our curated directory of 1,000+ AI resources to supercharge your workflow, design, and development.
        </motion.p>
        
        <motion.div 
          className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              type="text" 
              placeholder="Search tools, categories, or keywords..." 
              className="pl-10 h-12 w-full text-lg rounded-full"
            />
          </div>
          <Button size="lg" className="h-12 rounded-full px-8">
            Explore Tools
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export function StatsBar() {
  return (
    <motion.section {...fadeIn} className="border-y bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x border-border">
          <div className="flex flex-col space-y-2 pt-4 md:pt-0">
            <span className="text-4xl font-bold text-primary">1,200+</span>
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Tools Indexed</span>
          </div>
          <div className="flex flex-col space-y-2 pt-4 md:pt-0">
            <span className="text-4xl font-bold text-primary">45</span>
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Categories</span>
          </div>
          <div className="flex flex-col space-y-2 pt-4 md:pt-0">
            <span className="text-4xl font-bold text-primary">50K+</span>
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Monthly Visitors</span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export function FeaturedTools() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Tools</h2>
            <p className="text-muted-foreground">Top rated AI tools hand-picked by our editors.</p>
          </div>
        </div>
        
        <div className="flex overflow-x-auto pb-8 gap-6 hide-scrollbar snap-x">
          {featuredTools.map((tool, idx) => (
            <motion.div 
              key={tool.id} 
              className="snap-start shrink-0 w-[300px]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-4xl">{tool.logo}</div>
                    <Badge variant={tool.pricing === 'Free' ? 'default' : 'secondary'}>{tool.pricing}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tool.category}</p>
                  <div className="flex items-center text-sm font-medium">
                    <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                    {tool.rating}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CategoriesGrid() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon
            return (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer text-center group">
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-3">
                    <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium text-sm">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground">{cat.count} tools</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function NewsletterCTA() {
  return (
    <motion.section {...fadeIn} className="py-24">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-16 text-center overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Never Miss an AI Update</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto text-lg">
              Join 10,000+ creators and developers. Get a weekly digest of the newest and most impactful AI tools.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-primary-foreground text-foreground border-none h-12"
                required
              />
              <Button size="lg" variant="secondary" className="h-12 w-full sm:w-auto shrink-0">
                Subscribe <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
          {/* Decorative Background Elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </motion.section>
  )
}