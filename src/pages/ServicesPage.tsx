import { Shield, Wifi, Monitor, Globe, Wrench, Server } from "lucide-react";

const services = [
  { icon: Shield, title: "CCTV Installation", desc: "Complete security camera solutions including IP cameras, DVR/NVR setup, remote viewing configuration, and ongoing maintenance. We cover homes, offices, and commercial properties.", features: ["HD & 4K cameras", "Remote mobile viewing", "Night vision setup", "Motion detection alerts"] },
  { icon: Wifi, title: "Network Infrastructure", desc: "End-to-end network design and deployment including structured cabling, switch configuration, and wireless access point setup for offices and campuses.", features: ["Cat6/Cat6a cabling", "Managed switches", "WiFi coverage design", "VLAN configuration"] },
  { icon: Monitor, title: "MikroTik Configuration", desc: "Expert MikroTik RouterOS setup for ISPs and businesses. Hotspot management, PPPoE, bandwidth control, and firewall configuration.", features: ["Hotspot setup", "Bandwidth management", "PPPoE server", "Firewall rules"] },
  { icon: Wrench, title: "Internet Troubleshooting", desc: "Fast diagnosis and resolution of connectivity issues. We fix slow speeds, dropped connections, DNS issues, and network conflicts.", features: ["Speed optimization", "DNS troubleshooting", "Hardware diagnostics", "ISP coordination"] },
  { icon: Globe, title: "Web Development", desc: "Modern, responsive websites and web applications built with the latest technologies. From landing pages to full business platforms.", features: ["Responsive design", "SEO optimized", "Custom CMS", "E-commerce ready"] },
  { icon: Server, title: "Server Management", desc: "Server setup, maintenance, and monitoring for small to medium businesses. Cloud and on-premise solutions available.", features: ["Linux/Windows servers", "Cloud migration", "Backup solutions", "24/7 monitoring"] },
];

const ServicesPage = () => (
  <div>
    <section className="section-dark py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="opacity-80 max-w-lg mx-auto">Professional IT solutions tailored to meet the unique needs of every client</p>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s) => (
          <div key={s.title} className="group p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-[var(--card-shadow-hover)]">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <s.icon size={28} />
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
            <p className="text-sm text-muted-foreground mb-5">{s.desc}</p>
            <ul className="space-y-2">
              {s.features.map((f) => (
                <li key={f} className="text-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default ServicesPage;
