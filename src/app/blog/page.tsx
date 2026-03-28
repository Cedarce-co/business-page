"use client";

import { useState } from "react";
import { BLOG_POSTS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

const tabs = ["All", "Getting Started", "Payments", "Email & Identity"];

export default function BlogPage() {
  const [active, setActive] = useState("All");
  const posts = BLOG_POSTS.filter((post) => active === "All" || post.tag === active);

  return (
    <section className="bg-cliq-white pb-20 pt-36">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionLabel className="bg-cliq-purple-soft text-cliq-purple">Blog</SectionLabel>
        <h1 className="mt-6 text-5xl font-black text-cliq-text-heading">Insights from your buddy</h1>

        <article className="mt-8 rounded-3xl bg-cliq-navy-900 p-8">
          <p className="text-sm text-cliq-teal">Featured post</p>
          <h2 className="mt-3 text-3xl font-black text-white">{BLOG_POSTS[0].title}</h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Straight advice for Nigerian founders who want to run professionally.
          </p>
          <img
            src={`/assets/${encodeURIComponent(BLOG_POSTS[0].image)}`}
            alt={BLOG_POSTS[0].title}
            className="mt-6 h-64 w-full rounded-2xl object-cover opacity-85"
            onError={(e) => {
              e.currentTarget.src = "/assets/blog-placeholder-1.svg";
            }}
          />
        </article>

        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`rounded-full px-4 py-2 text-sm ${
                active === tab ? "bg-cliq-purple text-white" : "bg-cliq-gray-100 text-cliq-text-body"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="rounded-2xl border border-cliq-gray-200 bg-white p-5 shadow-card">
              <img
                src={`/assets/${encodeURIComponent(post.image)}`}
                alt={post.title}
                className="mb-4 h-40 w-full rounded-xl object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/assets/blog-placeholder-1.svg";
                }}
              />
              <span className="rounded-full bg-cliq-purple-soft px-3 py-1 text-xs text-cliq-purple">
                {post.tag}
              </span>
              <h3 className="mt-3 text-lg font-bold text-cliq-text-heading">{post.title}</h3>
              <p className="mt-2 text-sm text-cliq-text-muted">{post.readTime}</p>
              <a href="/blog" className="mt-3 inline-block text-sm font-semibold text-cliq-purple">
                Read article →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
