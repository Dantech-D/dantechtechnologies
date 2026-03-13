import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Play } from "lucide-react";

const getEmbedUrl = (url: string) => {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  // TikTok - link directly
  return null;
};

const BlogPage = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div>
      <section className="section-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">IT Tips & Blog</h1>
          <p className="opacity-80 max-w-lg mx-auto">Expert insights, tutorials, and tips for IT and networking</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl bg-card border border-border p-6 animate-pulse">
                  <div className="h-40 bg-muted rounded-lg mb-4" />
                  <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                  <div className="h-5 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground">No blog posts yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const embedUrl = post.video_url ? getEmbedUrl(post.video_url) : null;

                return (
                  <article key={post.id} className="group rounded-xl bg-card border border-border overflow-hidden hover:border-primary/30 hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 flex flex-col">
                    {/* Cover image or video */}
                    {embedUrl ? (
                      <div className="aspect-video">
                        <iframe
                          src={embedUrl}
                          title={post.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : post.video_url ? (
                      <a href={post.video_url} target="_blank" rel="noopener noreferrer" className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
                        {post.image_url ? (
                          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <Play size={40} />
                            <span className="text-xs">Watch Video</span>
                          </div>
                        )}
                      </a>
                    ) : post.image_url ? (
                      <div className="aspect-video overflow-hidden">
                        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    ) : null}

                    <div className="p-6 flex flex-col flex-1">
                      {post.category && (
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full self-start mb-3">{post.category}</span>
                      )}
                      <h2 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                      {post.excerpt && <p className="text-sm text-muted-foreground mb-4 flex-1">{post.excerpt}</p>}
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar size={12} /> {new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
