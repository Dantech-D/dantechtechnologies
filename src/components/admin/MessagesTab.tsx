import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Eye, EyeOff } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Message = Tables<"messages">;

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

export default MessagesTab;
