"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import { BLOG_POSTS } from "@/lib/constants";

// Kept for later use. Not currently rendered on the website.
export default function BlogPreview() {
  return (
    <section className="bg-cliq-gray-100 py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionLabel className="bg-cliq-purple-soft text-cliq-purple">From Our Desk</SectionLabel>
        <h2 className="mt-5 text-4xl font-black text-cliq-text-heading">
          Business tips for the modern
          <br />
          Growing business.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl border border-cliq-gray-200 bg-white shadow-card transition-all hover:shadow-card-hover"
            >
              <div className={`relative h-40 ${post.cover}`}>
                <img
                  src={`/assets/${encodeURIComponent(post.image)}`}
                  alt={post.title}
                  className="h-full w-full object-cover opacity-80"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/blog-placeholder-1.svg";
                  }}
                />
              </div>
              <div className="p-5">
                <span className="rounded-full bg-cliq-purple-soft px-3 py-1 text-xs text-cliq-purple">
                  {post.tag}
                </span>
                <h3 className="mt-3 text-sm font-bold leading-snug text-cliq-text-heading">{post.title}</h3>
                <p className="mt-2 text-xs text-cliq-text-muted">{post.readTime}</p>
                <a href="/blog" className="mt-3 inline-block text-sm font-semibold text-cliq-purple">
                  Read article →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
