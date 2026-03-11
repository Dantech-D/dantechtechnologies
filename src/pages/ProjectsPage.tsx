import projectCctv from "@/assets/project-cctv.jpg";
import projectNetwork from "@/assets/project-network.jpg";
import projectMikrotik from "@/assets/project-mikrotik.jpg";

const projects = [
  { img: projectCctv, title: "Corporate Office CCTV", category: "CCTV", desc: "Installed a 16-camera HD surveillance system with remote monitoring for a corporate office in Nairobi CBD." },
  { img: projectNetwork, title: "School Network Infrastructure", category: "Networking", desc: "Deployed structured Cat6 cabling and managed switches for 50 classrooms and administrative offices." },
  { img: projectMikrotik, title: "ISP Bandwidth Management", category: "MikroTik", desc: "Configured MikroTik RouterOS for a local ISP serving 500+ subscribers with PPPoE and bandwidth control." },
  { img: projectCctv, title: "Residential Security System", category: "CCTV", desc: "8-camera security system with night vision and mobile app access for a gated community." },
  { img: projectNetwork, title: "Hotel WiFi Deployment", category: "Networking", desc: "Full WiFi coverage for a 100-room hotel with guest portal and bandwidth management." },
  { img: projectMikrotik, title: "Cyber Café Hotspot", category: "MikroTik", desc: "MikroTik hotspot system with voucher-based access and usage tracking for a cyber café chain." },
];

const ProjectsPage = () => (
  <div>
    <section className="section-dark py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
        <p className="opacity-80 max-w-lg mx-auto">A showcase of completed installations and deployments</p>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <div key={i} className="group rounded-xl overflow-hidden bg-card border border-border hover:shadow-[var(--card-shadow-hover)] transition-all duration-300">
            <div className="aspect-video overflow-hidden">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">{p.category}</span>
              <h3 className="font-display font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default ProjectsPage;
