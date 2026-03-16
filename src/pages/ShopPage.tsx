import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CATEGORIES = ["All", "CCTV & Cameras", "Networking", "Storage & Power", "Software & Licenses"];

const ShopPage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || (p.description?.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  return (
    <div>
      <section className="section-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Shop</h1>
          <p className="opacity-80 max-w-lg mx-auto">Quality networking and CCTV equipment at competitive prices</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Search & Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={activeCategory === cat ? "default" : "outline"}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-xl bg-card border border-border p-5 animate-pulse">
                  <div className="aspect-square bg-muted rounded-lg mb-4" />
                  <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                  <div className="h-5 bg-muted rounded w-2/3 mb-2" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground">
              {search || activeCategory !== "All" ? "No products match your search." : "No products yet. Check back soon!"}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <div key={p.id} className="group rounded-xl bg-card border border-border p-5 hover:border-primary/30 hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 flex flex-col">
                  <div className="aspect-square rounded-lg bg-muted flex items-center justify-center mb-4 overflow-hidden">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <ShoppingCart className="text-muted-foreground" size={40} />
                    )}
                  </div>
                  {p.category && (
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full self-start mb-2">{p.category}</span>
                  )}
                  <h3 className="font-display font-semibold mb-1">{p.name}</h3>
                  {p.description && <p className="text-xs text-muted-foreground mb-3 flex-1">{p.description}</p>}
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-primary">KSh {Number(p.price).toLocaleString()}</span>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`https://wa.me/254727849984?text=I'm%20interested%20in%20${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer">Inquire</a>
                    </Button>
                  </div>
                  {!p.in_stock && (
                    <span className="text-xs text-destructive mt-2">Out of stock</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
