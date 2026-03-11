import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, Trash2, Edit2, Eye, EyeOff, FolderOpen, ShoppingBag, Mail } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Project = Tables<"projects">;
type Product = Tables<"products">;
type Message = Tables<"messages">;

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();

  if (loading) return <div className="min-h-[80vh] flex items-center justify-center"><p>Loading...</p></div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return (
    <div className="min-h-[80vh] flex items-center justify-center text-center">
      <div>
        <h2 className="font-display text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-4">You don't have admin privileges.</p>
        <Button variant="outline" onClick={signOut}>Sign Out</Button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={signOut}><LogOut size={16} className="mr-2" /> Sign Out</Button>
      </div>

      <Tabs defaultValue="projects">
        <TabsList className="mb-6">
          <TabsTrigger value="projects"><FolderOpen size={16} className="mr-2" /> Projects</TabsTrigger>
          <TabsTrigger value="products"><ShoppingBag size={16} className="mr-2" /> Products</TabsTrigger>
          <TabsTrigger value="messages"><Mail size={16} className="mr-2" /> Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="projects"><ProjectsTab /></TabsContent>
        <TabsContent value="products"><ProductsTab /></TabsContent>
        <TabsContent value="messages"><MessagesTab /></TabsContent>
      </Tabs>
    </div>
  );
};

/* ─── Projects Tab ─── */
const ProjectsTab = () => {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState({ title: "", description: "", category: "", image_url: "" });

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Project[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editing) {
        const { error } = await supabase.from("projects").update(form).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert(form);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success(editing ? "Project updated!" : "Project added!");
      resetForm();
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success("Project deleted!");
    },
    onError: (e) => toast.error(e.message),
  });

  const resetForm = () => { setEditing(null); setForm({ title: "", description: "", category: "", image_url: "" }); };

  const startEdit = (p: Project) => {
    setEditing(p);
    setForm({ title: p.title, description: p.description || "", category: p.category || "", image_url: p.image_url || "" });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6">
        <h3 className="font-display font-semibold text-lg mb-4">{editing ? "Edit Project" : "Add Project"}</h3>
        <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-3">
          <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <Input placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={saveMutation.isPending}>
              <Plus size={16} className="mr-1" /> {editing ? "Update" : "Add"}
            </Button>
            {editing && <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>}
          </div>
        </form>
      </div>
      <div className="lg:col-span-2">
        {isLoading ? <p>Loading...</p> : projects.length === 0 ? <p className="text-muted-foreground">No projects yet.</p> : (
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.category}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(p)}><Edit2 size={14} /></Button>
                  <Button size="sm" variant="outline" onClick={() => deleteMutation.mutate(p.id)} className="text-destructive"><Trash2 size={14} /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Products Tab ─── */
const ProductsTab = () => {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", description: "", price: "0", category: "", image_url: "", in_stock: true });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Product[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { ...form, price: parseFloat(form.price) || 0 };
      if (editing) {
        const { error } = await supabase.from("products").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success(editing ? "Product updated!" : "Product added!");
      resetForm();
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product deleted!");
    },
    onError: (e) => toast.error(e.message),
  });

  const resetForm = () => { setEditing(null); setForm({ name: "", description: "", price: "0", category: "", image_url: "", in_stock: true }); };

  const startEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, description: p.description || "", price: String(p.price), category: p.category || "", image_url: p.image_url || "", in_stock: p.in_stock });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6">
        <h3 className="font-display font-semibold text-lg mb-4">{editing ? "Edit Product" : "Add Product"}</h3>
        <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-3">
          <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <Input placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.in_stock} onChange={(e) => setForm({ ...form, in_stock: e.target.checked })} />
            In Stock
          </label>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={saveMutation.isPending}>
              <Plus size={16} className="mr-1" /> {editing ? "Update" : "Add"}
            </Button>
            {editing && <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>}
          </div>
        </form>
      </div>
      <div className="lg:col-span-2">
        {isLoading ? <p>Loading...</p> : products.length === 0 ? <p className="text-muted-foreground">No products yet.</p> : (
          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.category} — KSh {p.price}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(p)}><Edit2 size={14} /></Button>
                  <Button size="sm" variant="outline" onClick={() => deleteMutation.mutate(p.id)} className="text-destructive"><Trash2 size={14} /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Messages Tab ─── */
const MessagesTab = () => {
  const qc = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Message[];
    },
  });

  const toggleRead = useMutation({
    mutationFn: async ({ id, read }: { id: string; read: boolean }) => {
      const { error } = await supabase.from("messages").update({ read: !read }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-messages"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("messages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-messages"] });
      toast.success("Message deleted!");
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (messages.length === 0) return <p className="text-muted-foreground">No messages yet.</p>;

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <div key={m.id} className={`p-5 rounded-xl border ${m.read ? "bg-card border-border opacity-70" : "bg-card border-primary/30 shadow-[var(--card-shadow)]"}`}>
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="font-semibold">{m.name}</div>
              <div className="text-xs text-muted-foreground">{m.email} {m.phone && `• ${m.phone}`}</div>
              {m.service && <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full mt-1">{m.service}</span>}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => toggleRead.mutate({ id: m.id, read: m.read })}>
                {m.read ? <EyeOff size={14} /> : <Eye size={14} />}
              </Button>
              <Button size="sm" variant="outline" onClick={() => deleteMutation.mutate(m.id)} className="text-destructive"><Trash2 size={14} /></Button>
            </div>
          </div>
          <p className="text-sm">{m.message}</p>
          <div className="text-xs text-muted-foreground mt-2">{new Date(m.created_at).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
