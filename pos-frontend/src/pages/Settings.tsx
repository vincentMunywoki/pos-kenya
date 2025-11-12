import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  // Local state for form inputs
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [store, setStore] = useState(user?.store || "Main Store");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setStore(user.store || "Main Store");
    }
  }, [user]);

  const handleSave = async () => {
    try {
      if (!user) return;

      const { data } = await axios.put(
        `http://localhost:5000/api/users/${user.id}`,
        { name, email, store }
      );

      setUser(data.user); // update context
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-foreground">Settings</h1>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="store">Default Store</Label>
            <Input id="store" value={store} onChange={(e) => setStore(e.target.value)} />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave}>Save Changes</Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
