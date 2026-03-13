import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.81.1v-3.5a6.37 6.37 0 00-.81-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.81a4.83 4.83 0 01-1-.12z" />
  </svg>
);

const Footer = () => (
  <footer className="section-dark py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display font-bold text-xl mb-4">Dantech Technologies</h3>
          <p className="text-sm opacity-80">
            Professional IT solutions — networking, CCTV, MikroTik, and web development services.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="https://www.instagram.com/dan_ke_tech?igsh=MWZ5cDZuZ3l3ZWt1dA==" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              <Instagram size={16} />
            </a>
            <a href="https://www.tiktok.com/@ramdaneille?_r=1&_t=ZS-94eAW7IDZZp" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              <TikTokIcon />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <Link to="/services" className="hover:opacity-100 transition-opacity">Services</Link>
            <Link to="/projects" className="hover:opacity-100 transition-opacity">Projects</Link>
            <Link to="/shop" className="hover:opacity-100 transition-opacity">Shop</Link>
            <Link to="/blog" className="hover:opacity-100 transition-opacity">Blog</Link>
            <Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Services</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <span>CCTV Installation</span>
            <span>Network Setup</span>
            <span>MikroTik Config</span>
            <span>Web Development</span>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm opacity-80">
            <span className="flex items-center gap-2"><Phone size={14} /> +254 727 849 984</span>
            <span className="flex items-center gap-2"><Mail size={14} /> info@dantech.co.ke</span>
            <span className="flex items-center gap-2"><MapPin size={14} /> Nairobi, Kenya</span>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-10 pt-6 text-center text-sm opacity-60">
        © Dantech@2026. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
