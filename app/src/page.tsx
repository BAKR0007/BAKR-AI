import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search, Sparkles, Cpu, Code, Paintbrush, Video,
  MessageSquare, BarChart3, Shield, Database, Music,
  Globe, ArrowRight, Star, Layers, TrendingUp, Mail
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";

// --- بيانات افتراضية ---
const CATEGORIES = [
  { name: "Text & Writing",         icon: MessageSquare, count: 342 },
  { name: "Image Generation",       icon: Paintbrush,    count: 215 },
  { name: "Video Creation",         icon: Video,         count: 128 },
  { name: "Code & Dev",             icon: Code,          count: 189 },
  { name: "Data & Analytics",       icon: BarChart3,     count: 94  },
  { name: "Audio & Voice",          icon: Music,         count: 76  },
  { name: "Marketing & SEO",        icon: Globe,         count: 143 },
  { name: "Business & Productivity",icon: Cpu,           count: 256 },
  { name: "Cybersecurity",          icon: Shield,        count: 42  },
  { name: "Design & UI",            icon: Sparkles,      count: 112 },
  { name: "Database & Backend",     icon: Database,      count: 67  },
  { name: "Finance & Web3",         icon: TrendingUp,    count: 53  },
];

const FEATURED_TOOLS = [
  { id: 1, name: "SynthMind AI", category: "Productivity",     rating: 4.9, price: "Freemium", desc: "Automate your daily workflow with context-aware AI agents.",        logo: "https://unsplash.com" },
  { id: 2, name: "PixelCraft",   category: "Image Generation", rating: 4.8, price: "Paid",     desc: "Next-gen photorealistic image generation from simple text.",        logo: "https://unsplash.com" },
  { id: 3, name: "DeepCode Pro", category: "Code & Dev",       rating: 4.7, price: "Free",     desc: "AI-powered pair programmer that writes clean, secure code.",        logo: "https://unsplash.com" },
  { id: 4, name: "VoiceVibe",    category: "Audio & Voice",    rating: 4.6, price: "Freemium", desc: "Convert text to emotional, human-like speech in seconds.",          logo: "https://unsplash.com" },
];

const LATEST_TOOLS = [
  { id: 5,  name: "PromptMaster", category: "Design & UI",      rating: 4.5, price: "Free",     logo: "https://unsplash.com" },
  { id: 6,  name: "DataWhisper",  category: "Data & Analytics", rating: 4.7, price: "Paid",     logo: "https://unsplash.com" },
  { id: 7,  name: "CopyFlow",     category: "Text & Writing",   rating: 4.4, price: "Freemium", logo: "https://unsplash.com" },
  { id: 8,  name: "VisionCut",    category: "Video Creation",   rating: 4.8, price: "Freemium", logo: "https://unsplash.com" },
  { id: 9,  name: "SecureBot",    category: "Cybersecurity",    rating: 4.9, price: "Paid",     logo: "https://unsplash.com" },
  { id: 10, name: "ArchiAI",      category: "Design & UI",      rating: 4.6, price: "Free",     logo: "https://unsplash.com" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 antialiased selection:bg-cyan-500 selection:text-slate-950">

      {/* ===== 1. Hero Section ===== */}
      <section className="relative overflow-hidden border-b border-slate-900 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950 to-slate-950 py-24 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4 text-center">

          <Badge className="mb-4 border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-cyan-400 hover:bg-cyan-500/20">
            <Sparkles className="mr-1 h-3.5 w-3.5 inline" /> Discover the Future of Automation
          </Badge>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            The Ultimate Directory for <br />
            <span className="text-cyan-400">Next-Gen AI Tools</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Explore, compare, and integrate the world's most advanced AI utilities into your daily workflow.
          </p>

          {/* Search Bar */}
          <div className="mx-auto mt-10 max-w-xl flex gap-2 items-center rounded-xl border border-slate-800 bg-slate-900/50 p-2 backdrop-blur-md">
            <Search className="ml-3 h-5 w-5 text-slate-500 flex-shrink-0" />
            <Input
              type="text"
              placeholder="Search over 1,420+ AI tools..."
              className="border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-500 w-full"
            />
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-medium px-5">
              Explore Tools
            </Button>
          </div>

          <div className="mt-8 text-sm text-slate-500">
            <span className="font-mono text-cyan-400 text-base font-bold bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10">
              1,428
            </span>{" "}
            tools indexed today
          </div>

        </div>
      </section>

      {/* ===== 2. Featured Tools Section ===== */}
      <section className="py-16 bg-slate-950 border-b border-slate-900">
        <div className="container mx-auto max-w-7xl px-4">

          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured AI Tools</h2>
              <p className="text-sm text-slate-400 mt-1">Handpicked premium tools delivering elite results.</p>
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {FEATURED_TOOLS.map((tool) => (
              <Card
                key={tool.id}
                className="min-w-[300px] md:min-w-[340px] bg-slate-900/40 border-slate-800/80 hover:border-cyan-500/40 transition-colors flex-shrink-0"
              >
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-slate-800">
                    <Image src={tool.logo} alt={tool.name} fill className="object-cover" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-slate-200">{tool.name}</CardTitle>
                    <Badge
                      variant="secondary"
                      className="mt-1 text-[10px] uppercase tracking-wider bg-slate-800 text-slate-400 border-0"
                    >
                      {tool.category}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-slate-400 line-clamp-2">{tool.desc}</p>
                </CardContent>

                <CardFooter className="flex justify-between items-center border-t border-slate-800/60 pt-4 text-xs">
                  <div className="flex items-center text-amber-400 font-medium">
                    <Star className="h-3.5 w-3.5 fill-current mr-1" /> {tool.rating}
                  </div>
                  <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {tool.price}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* ===== 3. Categories Grid ===== */}
      <section className="py-16 bg-slate-950 border-b border-slate-900">
        <div className="container mx-auto max-w-7xl px-4">

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Explore by Category</h2>
            <p className="text-slate-400 mt-2">
              Find the specific solution to streamline your workspace architecture.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => {
              const IconComponent = cat.icon;
              return (
                <Link
                  href="#"
                  key={i}
                  className="group flex flex-col items-center justify-center p-6 rounded-xl bg-slate-900/30 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/60 transition-all text-center"
                >
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-colors">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-medium text-sm text-slate-300 group-hover:text-white transition-colors">
                    {cat.name}
                  </h3>
                  <span className="mt-1 text-xs text-slate-500">{cat.count} tools</span>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* ===== 4. Latest Tools Section ===== */}
      <section className="py-16 bg-slate-950 border-b border-slate-900">
        <div className="container mx-auto max-w-7xl px-4">

          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Latest Uploads</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {LATEST_TOOLS.map((tool) => (
              <Link
                href="#"
                key={tool.id}
                className="group flex items-center gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/60 transition-all"
              >
                <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                  <Image src={tool.logo} alt={tool.name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-slate-200 group-hover:text-white truncate">
                    {tool.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{tool.category}</p>
                </div>

                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <div className="flex items-center text-amber-400 text-xs font-medium">
                    <Star className="h-3 w-3 fill-current mr-1" />
                    {tool.rating}
                  </div>
                  <Badge className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {tool.price}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ===== 5. Newsletter / CTA Section ===== */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center">

            <Mail className="mx-auto h-10 w-10 text-cyan-400 mb-4" />

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Stay Ahead of the Curve
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              Get weekly roundups of the best new AI tools delivered straight to your inbox.
            </p>

            <div className="mx-auto mt-6 max-w-md flex gap-2">
              <Input
                type="email"
                placeholder="you@example.com"
                className="bg-slate-950 border-slate-800 placeholder:text-slate-600 focus-visible:ring-cyan-500"
              />
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-medium flex-shrink-0">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <p className="mt-3 text-xs text-slate-600">No spam. Unsubscribe anytime.</p>

          </div>
        </div>
      </section>

    </div>
  );
}
