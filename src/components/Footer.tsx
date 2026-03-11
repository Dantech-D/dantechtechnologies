import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="section-dark py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display font-bold text-xl mb-4">Dantech Technologies</h3>
          <p className="text-sm opacity-80">
            Professional IT solutions — networking, CCTV, MikroTik, and web development services.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <Link to="/services" className="hover:opacity-100 transition-opacity">Services</Link>
            <Link to="/projects" className="hover:opacity-100 transition-opacity">Projects</Link>
            <Link to="/shop" className="hover:opacity-100 transition-opacity">Shop</Link>
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
            <span className="flex items-center gap-2"><Phone size={14} /> +254 700 000 000</span>
            <span className="flex items-center gap-2"><Mail size={14} /> info@dantech.co.ke</span>
            <span className="flex items-center gap-2"><MapPin size={14} /> Nairobi, Kenya</span>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-10 pt-6 text-center text-sm opacity-60">
        © {new Date().getFullYear()} Dantech Technologies. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
