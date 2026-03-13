import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Edit2 } from "lucide-react";
import ImageUpload from "./ImageUpload";
import type { Tables } from "@/integrations/supabase/types";

type Product = Tables<"products">;

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
          <ImageUpload value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="products" />
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
                <div className="flex items-center gap-3">
                  {p.image_url && <img src={p.image_url} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />}
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.category} — KSh {p.price}</div>
                  </div>
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

export default ProductsTab;
