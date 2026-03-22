import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Account created! Please verify your email.");
    }, 1500);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-1.5">
          <h2 className="text-2xl font-bold tracking-tight text-foreground" style={{ lineHeight: '1.1' }}>Create an account</h2>
          <p className="text-sm text-muted-foreground">Fill in your details to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" placeholder="Arjun Mehta" value={form.name} onChange={update("name")} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="reg-email">Email</Label>
            <Input id="reg-email" type="email" placeholder="you@example.com" value={form.email} onChange={update("email")} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={update("phone")} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="reg-password">Password</Label>
            <div className="relative">
              <Input id="reg-password" type={showPassword ? "text" : "password"} placeholder="Min 8 characters" value={form.password} onChange={update("password")} required minLength={8} className="pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full h-11 font-medium active:scale-[0.98] transition-transform" disabled={loading}>
            {loading ? <span className="flex items-center gap-2"><span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />Creating account…</span> : <span className="flex items-center gap-2">Create account <ArrowRight className="h-4 w-4" /></span>}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline underline-offset-4">Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
