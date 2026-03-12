import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import projectCctv from "@/assets/project-cctv.jpg";

const ProjectsPage = () => {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div>
      <section className="section-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
          <p className="opacity-80 max-w-lg mx-auto">A showcase of completed installations and deployments</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl bg-card border border-border animate-pulse">
                  <div className="aspect-video bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-5 bg-muted rounded w-2/3" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <p className="text-center text-muted-foreground">No projects yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((p) => (
                <div key={p.id} className="group rounded-xl overflow-hidden bg-card border border-border hover:shadow-[var(--card-shadow-hover)] transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img src={p.image_url || projectCctv} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    {p.category && (
                      <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">{p.category}</span>
                    )}
                    <h3 className="font-display font-semibold text-lg mb-2">{p.title}</h3>
                    {p.description && <p className="text-sm text-muted-foreground">{p.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
