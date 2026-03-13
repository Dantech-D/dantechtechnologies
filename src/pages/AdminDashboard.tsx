import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, FolderOpen, ShoppingBag, Mail, FileText } from "lucide-react";
import ProjectsTab from "@/components/admin/ProjectsTab";
import ProductsTab from "@/components/admin/ProductsTab";
import MessagesTab from "@/components/admin/MessagesTab";
import BlogTab from "@/components/admin/BlogTab";

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
          <TabsTrigger value="blog"><FileText size={16} className="mr-2" /> Blog</TabsTrigger>
          <TabsTrigger value="messages"><Mail size={16} className="mr-2" /> Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="projects"><ProjectsTab /></TabsContent>
        <TabsContent value="products"><ProductsTab /></TabsContent>
        <TabsContent value="blog"><BlogTab /></TabsContent>
        <TabsContent value="messages"><MessagesTab /></TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
