import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  { name: "Hikvision 4CH DVR Kit", price: "KSh 25,000", category: "CCTV", desc: "4-channel DVR with 4 HD cameras, cables, and 1TB HDD" },
  { name: "Dahua 8CH NVR System", price: "KSh 45,000", category: "CCTV", desc: "8-channel NVR with 8 IP cameras and PoE switch" },
  { name: "MikroTik hAP ac³", price: "KSh 15,000", category: "Router", desc: "Dual-band wireless router with 5 Gigabit ports" },
  { name: "MikroTik CCR1036", price: "KSh 85,000", category: "Router", desc: "Cloud Core Router for ISPs with 36-core CPU" },
  { name: "Cat6 Cable (305m)", price: "KSh 8,500", category: "Cabling", desc: "UTP Cat6 cable, 305m box, tested and certified" },
  { name: "24-Port PoE Switch", price: "KSh 18,000", category: "Networking", desc: "Managed PoE+ switch with 24 ports and 2 SFP uplinks" },
  { name: "Ubiquiti UniFi AP", price: "KSh 12,000", category: "WiFi", desc: "Indoor access point with dual-band and mesh support" },
  { name: "1TB Surveillance HDD", price: "KSh 5,500", category: "Storage", desc: "Western Digital Purple surveillance-grade hard drive" },
];

const ShopPage = () => (
  <div>
    <section className="section-dark py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Shop</h1>
        <p className="opacity-80 max-w-lg mx-auto">Quality networking and CCTV equipment at competitive prices</p>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.name} className="group rounded-xl bg-card border border-border p-5 hover:border-primary/30 hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 flex flex-col">
            <div className="aspect-square rounded-lg bg-muted flex items-center justify-center mb-4">
              <ShoppingCart className="text-muted-foreground" size={40} />
            </div>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full self-start mb-2">{p.category}</span>
            <h3 className="font-display font-semibold mb-1">{p.name}</h3>
            <p className="text-xs text-muted-foreground mb-3 flex-1">{p.desc}</p>
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-primary">{p.price}</span>
              <Button size="sm" variant="outline" asChild>
                <a href="https://wa.me/254700000000?text=I'm%20interested%20in%20" target="_blank" rel="noopener noreferrer">Inquire</a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default ShopPage;
