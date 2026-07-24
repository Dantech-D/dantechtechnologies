import { Link } from "react-router-dom";
import { Shield, Wifi, Monitor, Globe, Wrench, Star, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import projectCctv from "@/assets/project-cctv.jpg";
import projectNetwork from "@/assets/project-network.jpg";
import projectMikrotik from "@/assets/project-mikrotik.jpg";

const services = [
  { icon: Shield, title: "CCTV Installation", desc: "Professional security camera setup for homes and businesses with remote monitoring." },
  { icon: Wifi, title: "Network Setup", desc: "Complete LAN/WAN infrastructure, cabling, and wireless network deployment." },
  { icon: Monitor, title: "MikroTik Configuration", desc: "Expert MikroTik router setup, hotspot management, and bandwidth control." },
  { icon: Wrench, title: "Internet Troubleshooting", desc: "Fast diagnosis and repair of connectivity issues and network problems." },
  { icon: Globe, title: "Web Development", desc: "Modern, responsive websites and web applications for your business." },
];

const projects = [
  { img: projectCctv, title: "Office CCTV System", desc: "16-camera HD surveillance for a corporate office" },
  { img: projectNetwork, title: "Data Center Network", desc: "Full network infrastructure for 200+ workstations" },
  { img: projectMikrotik, title: "ISP MikroTik Setup", desc: "Bandwidth management for a local internet provider" },
];

const testimonials = [
  { name: "James Mwangi", role: "Business Owner", text: "Dantech transformed our office security with a state-of-the-art CCTV system. Highly professional!", rating: 5 },
  { name: "Grace Wanjiku", role: "School Administrator", text: "The network setup for our school was flawless. Fast internet for all 50 classrooms.", rating: 5 },
  { name: "Peter Ochieng", role: "ISP Manager", text: "Their MikroTik expertise saved us thousands in bandwidth costs. Exceptional service!", rating: 5 },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-secondary/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/20 text-primary mb-6">
              Trusted IT Solutions
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-secondary-foreground leading-tight mb-6">
              Professional IT & <span className="text-gradient">Networking</span> Services
            </h1>
            <p className="text-lg text-secondary-foreground/70 mb-8 max-w-lg">
              From CCTV installation to MikroTik configuration — we deliver reliable, enterprise-grade IT solutions for businesses of all sizes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="font-semibold">
                <Link to="/services">Our Services <ArrowRight className="ml-2" size={18} /></Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="font-semibold bg-white text-secondary hover:bg-white/90">
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-primary-foreground">
          {[
            ["500+", "Projects Completed"],
            ["200+", "Happy Clients"],
            ["3+", "Years Experience"],
            ["24/7", "Support Available"],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="font-display text-3xl font-bold">{num}</div>
              <div className="text-sm opacity-80">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Comprehensive IT solutions tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-[var(--card-shadow-hover)]"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <s.icon size={24} />
                </div>
                <h3 className="font-display font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground">Some of our recent installations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((p) => (
              <div key={p.title} className="group rounded-xl overflow-hidden bg-card border border-border hover:shadow-[var(--card-shadow-hover)] transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link to="/projects">View All Projects <ArrowRight className="ml-2" size={16} /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Why Choose Dantech?</h2>
              <div className="space-y-4">
                {[
                  "Certified IT professionals with 3+ years experience",
                  "Fast turnaround and 24/7 support",
                  "Competitive pricing with no hidden costs",
                  "Quality equipment from trusted brands",
                  "End-to-end project management",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="text-primary mt-0.5 shrink-0" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="relative">
              <img src={projectNetwork} alt="Our work" className="rounded-xl shadow-[var(--card-shadow)]" />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-xl p-6 shadow-lg">
                <div className="font-display text-3xl font-bold">3+</div>
                <div className="text-sm opacity-90">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 section-dark">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-14">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-secondary-foreground/5 backdrop-blur-sm border border-secondary-foreground/10 rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm opacity-90 mb-4">"{t.text}"</p>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs opacity-60">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Contact us today for a free consultation and quote on your IT project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://wa.me/254727849984" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
