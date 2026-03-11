import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const posts = [
  { slug: "mikrotik-bandwidth", title: "How to Set Up Bandwidth Management on MikroTik", excerpt: "Learn how to configure simple queues and PCQ on MikroTik RouterOS to manage bandwidth for your network users.", date: "March 5, 2026", category: "MikroTik" },
  { slug: "cctv-tips", title: "5 Tips for Choosing the Right CCTV System", excerpt: "Not all CCTV systems are the same. Here's what to look for when selecting cameras, DVRs, and storage for your property.", date: "February 20, 2026", category: "CCTV" },
  { slug: "network-cabling", title: "Cat5e vs Cat6 vs Cat6a: Which Cable Do You Need?", excerpt: "Understanding the differences between Ethernet cable categories and choosing the right one for your network.", date: "February 10, 2026", category: "Networking" },
  { slug: "internet-speed", title: "Why Your Internet Is Slow and How to Fix It", excerpt: "Common causes of slow internet and practical troubleshooting steps you can take before calling your ISP.", date: "January 28, 2026", category: "Troubleshooting" },
  { slug: "web-presence", title: "Why Every Business Needs a Professional Website", excerpt: "In today's digital age, a professional website is essential for credibility, marketing, and customer acquisition.", date: "January 15, 2026", category: "Web Dev" },
  { slug: "wifi-optimization", title: "Optimizing WiFi Coverage in Large Buildings", excerpt: "Best practices for access point placement, channel selection, and signal optimization in offices and hotels.", date: "January 5, 2026", category: "WiFi" },
];

const BlogPage = () => (
  <div>
    <section className="section-dark py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">IT Tips & Blog</h1>
        <p className="opacity-80 max-w-lg mx-auto">Expert insights, tutorials, and tips for IT and networking</p>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="group rounded-xl bg-card border border-border p-6 hover:border-primary/30 hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 flex flex-col">
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full self-start mb-3">{post.category}</span>
            <h2 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
            <p className="text-sm text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
              <span className="text-primary font-medium flex items-center gap-1">Read More <ArrowRight size={12} /></span>
            </div>
          </article>
        ))}
      </div>
    </section>
  </div>
);

export default BlogPage;
