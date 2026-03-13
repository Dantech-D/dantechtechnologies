import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, Eye, EyeOff } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  image_url: string | null;
  video_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const BlogTab = () => {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({
    title: "", content: "", excerpt: "", category: "", image_url: "", video_url: "", published: false,
  });

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["admin-blog"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        content: form.content,
        excerpt: form.excerpt || null,
        category: form.category || null,
        image_url: form.image_url || null,
        video_url: form.video_url || null,
        published: form.published,
      };
      if (editing) {
        const { error } = await supabase.from("blog_posts").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-blog"] });
      toast.success(editing ? "Post updated!" : "Post added!");
      resetForm();
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-blog"] });
      toast.success("Post deleted!");
    },
    onError: (e) => toast.error(e.message),
  });

  const togglePublish = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase.from("blog_posts").update({ published: !published }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-blog"] });
      toast.success("Post visibility updated!");
    },
  });

  const resetForm = () => {
    setEditing(null);
    setForm({ title: "", content: "", excerpt: "", category: "", image_url: "", video_url: "", published: false });
  };

  const startEdit = (p: BlogPost) => {
    setEditing(p);
    setForm({
      title: p.title,
      content: p.content,
      excerpt: p.excerpt || "",
      category: p.category || "",
      image_url: p.image_url || "",
      video_url: p.video_url || "",
      published: p.published,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6">
        <h3 className="font-display font-semibold text-lg mb-4">{editing ? "Edit Post" : "Add Post"}</h3>
        <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-3">
          <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Input placeholder="Excerpt (short summary)" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          <Textarea
            placeholder="Content (supports links like https://example.com)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="min-h-[150px]"
            required
          />
          <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Cover Image</label>
            <ImageUpload value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="blog" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Video URL (YouTube, TikTok, etc.)</label>
            <Input
              placeholder="https://youtube.com/watch?v=... or TikTok link"
              value={form.video_url}
              onChange={(e) => setForm({ ...form, video_url: e.target.value })}
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Publish immediately
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
        {isLoading ? <p>Loading...</p> : posts.length === 0 ? <p className="text-muted-foreground">No blog posts yet.</p> : (
          <div className="space-y-3">
            {posts.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-3">
                  {p.image_url && <img src={p.image_url} alt={p.title} className="w-12 h-12 rounded-lg object-cover" />}
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      {p.title}
                      {!p.published && <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">Draft</span>}
                    </div>
                    <div className="text-xs text-muted-foreground">{p.category} • {new Date(p.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => togglePublish.mutate({ id: p.id, published: p.published })}>
                    {p.published ? <EyeOff size={14} /> : <Eye size={14} />}
                  </Button>
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

export default BlogTab;
