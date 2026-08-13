"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";

const CATEGORIES = ["All", "Market Analysis", "Investment Tips", "Property Guide", "Legal & Title", "Company News"];

const ARTICLES = [
  {
    category: "Market Analysis",
    title: "Nigeria's Real Estate Market in 2025: What Investors Need to Know",
    excerpt:
      "Rising demand in secondary cities, infrastructure development, and changing buyer demographics are reshaping Nigeria's property landscape. Here's what that means for your investment.",
    readTime: "6 min read",
    date: "July 2025",
    featured: true,
  },
  {
    category: "Investment Tips",
    title: "5 Questions to Ask Before Buying Land in Nigeria",
    excerpt:
      "Title fraud remains one of the biggest risks in Nigerian real estate. These five questions — and the documents behind them — can protect your purchase.",
    readTime: "5 min read",
    date: "June 2025",
    featured: false,
  },
  {
    category: "Legal & Title",
    title: "Understanding the Certificate of Occupancy (C of O) in Nigeria",
    excerpt:
      "The C of O is the gold standard of property ownership in Nigeria. We break down what it is, why it matters, and what to do if a property doesn't have one.",
    readTime: "7 min read",
    date: "June 2025",
    featured: false,
  },
  {
    category: "Investment Tips",
    title: "LPO Financing: How Nigerian Contractors Can Stop Losing Contracts to Cash Flow",
    excerpt:
      "Many contractors win government contracts but can't execute them without working capital. LPO financing closes this gap — here's how it works in practice.",
    readTime: "4 min read",
    date: "May 2025",
    featured: false,
  },
  {
    category: "Property Guide",
    title: "Buying vs. Renting in Nigeria's Major Cities: A 2025 Breakdown",
    excerpt:
      "With property prices climbing in Lagos, Abuja, and Port Harcourt, is it still worth buying? We run the numbers across Nigeria's top cities.",
    readTime: "8 min read",
    date: "May 2025",
    featured: false,
  },
  {
    category: "Market Analysis",
    title: "Why Secondary Cities Are the Smartest Real Estate Bet Right Now",
    excerpt:
      "Enugu, Asaba, Awka, and Owerri are seeing sustained demand growth while remaining far more affordable than Lagos and Abuja. Here's the data behind the trend.",
    readTime: "5 min read",
    date: "April 2025",
    featured: false,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Market Analysis": "bg-blue-100 text-blue-700",
  "Investment Tips": "bg-violet-100 text-violet-700",
  "Property Guide": "bg-emerald-100 text-emerald-700",
  "Legal & Title": "bg-amber-100 text-amber-700",
  "Company News": "bg-rose-100 text-rose-700",
};

function articleEnquiryLink(title: string) {
  return `/contact?message=${encodeURIComponent(`Hi, I read your article "${title}" and would like to learn more.`)}`;
}

export function InsightsContent() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === activeCategory);

  const featured = activeCategory === "All" ? ARTICLES.find((a) => a.featured) : null;
  const grid = activeCategory === "All" ? ARTICLES.filter((a) => !a.featured) : filtered;

  return (
    <>
      {/* Category filters */}
      <AnimateIn delay={0.08}>
        <div className="flex flex-wrap gap-2 mt-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                cat === activeCategory
                  ? "bg-[#A0111C] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#A0111C]/30 hover:text-[#A0111C]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </AnimateIn>

      {/* Featured article */}
      {featured && (
        <section className="relative pb-8 pt-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimateIn>
              <Link
                href={articleEnquiryLink(featured.title)}
                className="group block rounded-2xl border border-[#A0111C]/15 bg-white/80 p-8 sm:p-10 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="rounded-full bg-[#A0111C] px-3 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                    Featured
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[featured.category] ?? "bg-gray-100 text-gray-600"}`}>
                    {featured.category}
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#A0111C] transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {featured.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6 max-w-2xl">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {featured.readTime}
                    </span>
                    <span>{featured.date}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#A0111C] group-hover:gap-2.5 transition-all">
                    Read article <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* Article grid */}
      <section className="relative pb-24 pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {grid.length === 0 ? (
            <AnimateIn>
              <p className="text-center text-gray-400 text-sm py-16">No articles in this category yet.</p>
            </AnimateIn>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {grid.map((article, i) => (
                <AnimateIn key={article.title} delay={i * 0.06}>
                  <Link
                    href={articleEnquiryLink(article.title)}
                    className="group flex flex-col rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm hover:shadow-md hover:border-[#A0111C]/15 transition-all duration-300 h-full"
                  >
                    <span className={`self-start rounded-full px-2.5 py-0.5 text-xs font-semibold mb-4 ${CATEGORY_COLORS[article.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {article.category}
                    </span>
                    <h3
                      className="font-bold text-gray-900 mb-3 group-hover:text-[#A0111C] transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readTime}
                      </span>
                      <span>{article.date}</span>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
