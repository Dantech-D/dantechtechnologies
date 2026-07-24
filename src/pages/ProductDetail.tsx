import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ShoppingCart, MessageCircle, Check, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const WHATSAPP_NUMBER = "254727849984";

// Derive lightweight specs from product name/description/category — no schema change
const deriveSpecs = (p: any): { label: string; value: string }[] => {
  const specs: { label: string; value: string }[] = [];
  const text = `${p.name} ${p.description ?? ""}`;
  const brandMatch = p.name.match(/^(Dahua|Hikvision|MikroTik|Ubiquiti|Ruijie|Seagate)/i);
  if (brandMatch) specs.push({ label: "Brand", value: brandMatch[1] });
  const modelMatch = p.name.match(/\b([A-Z]{2,}[-A-Z0-9/+]{3,})\b/);
  if (modelMatch) specs.push({ label: "Model", value: modelMatch[1] });
  if (p.category) specs.push({ label: "Category", value: p.category });
  const mpMatch = text.match(/(\d+)\s?MP\b/i);
  if (mpMatch) specs.push({ label: "Resolution", value: `${mpMatch[1]} MP` });
  const portMatch = text.match(/(\d+)[- ]?port/i);
  if (portMatch) specs.push({ label: "Ports", value: `${portMatch[1]} ports` });
  const chMatch = text.match(/(\d+)[- ]?CH\b/i);
  if (chMatch) specs.push({ label: "Channels", value: `${chMatch[1]} channels` });
  const irMatch = text.match(/IR\s?(?:up to\s?)?(\d+)m/i);
  if (irMatch) specs.push({ label: "IR Range", value: `${irMatch[1]}m` });
  if (/PoE/i.test(text)) specs.push({ label: "PoE", value: "Supported" });
  if (/IP6[7-8]/.test(text)) specs.push({ label: "Weatherproof", value: (text.match(/IP6[7-8]/) || [""])[0] });
  if (/H\.?265/i.test(text)) specs.push({ label: "Compression", value: "H.265" });
  if (/Wi-?Fi\s?6|802\.11ax/i.test(text)) specs.push({ label: "Wi-Fi", value: "Wi-Fi 6 (802.11ax)" });
  else if (/802\.11ac|dual-?band/i.test(text)) specs.push({ label: "Wi-Fi", value: "Dual-band 802.11ac" });
  const sfpMatch = text.match(/SFP\+?/i);
  if (sfpMatch) specs.push({ label: "Uplink", value: sfpMatch[0].toUpperCase() });
  specs.push({ label: "Warranty", value: "12 months" });
  specs.push({ label: "Availability", value: p.in_stock ? "In stock" : "Out of stock" });
  return specs;
};

const ProductDetail = () => {
  const { id } = useParams();
  const [activeImg, setActiveImg] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: related = [] } = useQuery({
    queryKey: ["related", product?.category, product?.id],
    queryFn: async () => {
      if (!product?.category) return [];
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("category", product.category)
        .neq("id", product.id)
        .limit(4);
      return data ?? [];
    },
    enabled: !!product?.category,
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Loading product…</div>;
  }
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl mb-4">Product not found</h1>
        <Button asChild><Link to="/shop">Back to Shop</Link></Button>
      </div>
    );
  }

  // Build a small gallery — same image shown up to 3x (real gallery once multiple images are supported)
  const gallery = product.image_url ? [product.image_url, product.image_url, product.image_url] : [];
  const specs = deriveSpecs(product);
  const waMsg = encodeURIComponent(`Hello Dantech, I'm interested in ${product.name} (KSh ${Number(product.price).toLocaleString()}). Please share availability and delivery details.`);

  return (
    <div>
      <section className="py-8 border-b border-border/40">
        <div className="container mx-auto px-4">
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link to="/shop"><ArrowLeft size={16} className="mr-2" />Back to Shop</Link>
          </Button>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="aspect-square rounded-xl bg-muted overflow-hidden border border-border mb-3">
              {gallery[activeImg] ? (
                <img src={gallery[activeImg]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <ShoppingCart size={48} />
                </div>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`aspect-square rounded-md overflow-hidden border-2 transition ${
                      activeImg === i ? "border-primary" : "border-transparent opacity-70"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.category && (
              <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full mb-3">
                {product.category}
              </span>
            )}
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>
            <div className="text-3xl font-display font-bold text-primary mb-4">
              KSh {Number(product.price).toLocaleString()}
            </div>
            {product.in_stock ? (
              <div className="flex items-center gap-2 text-sm text-green-600 mb-6">
                <Check size={16} /> In stock — ready to ship
              </div>
            ) : (
              <div className="text-sm text-destructive mb-6">Currently out of stock — inquire for ETA</div>
            )}

            {product.description && (
              <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button size="lg" asChild className="flex-1">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2" size={18} /> Order on WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+254727849984"><Phone className="mr-2" size={18} /> Call</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact"><Mail className="mr-2" size={18} /> Email</Link>
              </Button>
            </div>

            {/* Specs */}
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 font-display font-semibold">Specifications</div>
              <dl className="divide-y divide-border">
                {specs.map((s, i) => (
                  <div key={i} className="grid grid-cols-3 px-4 py-3 text-sm">
                    <dt className="text-muted-foreground col-span-1">{s.label}</dt>
                    <dd className="col-span-2 font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-muted/30 border-t border-border/40">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-bold mb-6">Related products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {related.map((p: any) => (
                <Link
                  key={p.id}
                  to={`/shop/${p.id}`}
                  className="group rounded-lg bg-card border border-border p-3 hover:border-primary/30 transition"
                >
                  <div className="aspect-square rounded-md bg-muted overflow-hidden mb-2">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <ShoppingCart size={24} />
                      </div>
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-sm line-clamp-2 mb-1">{p.name}</h3>
                  <span className="text-primary font-bold text-sm">KSh {Number(p.price).toLocaleString()}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
