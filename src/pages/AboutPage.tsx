import { CheckCircle, Users, Award, Clock, Handshake } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import danielPhoto from "@/assets/daniel-mokaya.jpg";

const AboutPage = () => (
  <div>
    <section className="section-dark py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">About Dantech</h1>
        <p className="opacity-80 max-w-lg mx-auto">Your trusted partner for professional IT solutions</p>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-display text-3xl font-bold mb-6">Who We Are</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Dantech Technologies is a growing IT solutions provider based in Nairobi, Kenya. With over 3+ years of hands-on experience, we specialize in CCTV installation, network infrastructure, MikroTik configuration, internet troubleshooting, and web development.
            </p>
            <p>
              Our team of skilled professionals is committed to delivering high-quality, reliable IT solutions that help businesses grow and stay secure. We work with trusted brands like Hikvision, Dahua, MikroTik, and Ubiquiti to ensure our clients get the best technology available.
            </p>
            <p>
              From small businesses to large enterprises, we tailor our solutions to meet each client's unique requirements and budget.
            </p>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden">
          <img src={heroBg} alt="Dantech Technologies" className="w-full h-80 object-cover" />
        </div>
      </div>
    </section>

    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: Users, label: "200+ Clients", desc: "Businesses trust us" },
          { icon: Award, label: "Certified Team", desc: "Industry certifications" },
          { icon: Clock, label: "24/7 Support", desc: "Always available" },
          { icon: CheckCircle, label: "500+ Projects", desc: "Successfully delivered" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <item.icon className="text-primary" size={28} />
            </div>
            <div className="font-display font-bold">{item.label}</div>
            <div className="text-sm text-muted-foreground">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Co-Founder Section */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold text-center mb-12">Leadership</h2>
        <div className="max-w-md mx-auto text-center">
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 border-4 border-primary/20">
            <User className="text-primary" size={56} />
          </div>
          <h3 className="font-display text-xl font-bold">Daniel Mokaya</h3>
          <p className="text-primary font-medium mb-3">Co-Founder & IT Solutions Lead</p>
          <p className="text-muted-foreground text-sm">
            With 3+ years of hands-on experience in IT infrastructure, CCTV installations, and MikroTik configuration, Daniel leads Dantech Technologies with a passion for delivering reliable, cutting-edge solutions to businesses across Kenya.
          </p>
        </div>
      </div>
    </section>

    {/* Partners Section */}
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold text-center mb-4">Our Partners</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          We collaborate with trusted partners to deliver the best solutions
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-card border border-border rounded-xl p-8 text-center min-w-[200px]">
            <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Handshake className="text-primary" size={36} />
            </div>
            <h3 className="font-display font-bold">Lucky Z Communication</h3>
            <p className="text-sm text-muted-foreground mt-1">Strategic Partner</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;
