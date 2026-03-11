import { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you shortly.");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <div>
      <section className="section-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="opacity-80 max-w-lg mx-auto">Get in touch for a free consultation or quote</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <Input type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <Input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select a Service</option>
                <option>CCTV Installation</option>
                <option>Network Setup</option>
                <option>MikroTik Configuration</option>
                <option>Internet Troubleshooting</option>
                <option>Web Development</option>
              </select>
              <Textarea placeholder="Your Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              <Button type="submit" size="lg" className="w-full">
                <Send className="mr-2" size={18} /> Send Message
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <h2 className="font-display text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="text-primary" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-muted-foreground text-sm">+254 700 000 000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="text-primary" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground text-sm">info@dantech.co.ke</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-primary" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-muted-foreground text-sm">Nairobi, Kenya</p>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="w-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)]">
              <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2" size={20} /> Chat on WhatsApp
              </a>
            </Button>

            {/* Booking Form */}
            <div className="bg-muted/50 rounded-xl p-6 border border-border">
              <h3 className="font-display font-semibold mb-3">Book an Installation</h3>
              <p className="text-sm text-muted-foreground mb-4">Schedule a site visit for installation or consultation.</p>
              <Button asChild variant="outline" className="w-full">
                <a href="https://wa.me/254700000000?text=I'd%20like%20to%20book%20an%20installation" target="_blank" rel="noopener noreferrer">
                  Book via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
