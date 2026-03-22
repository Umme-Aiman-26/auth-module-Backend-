import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return toast.error("Passwords do not match");
    if (password.length < 8) return toast.error("Password must be at least 8 characters");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      toast.success("Password updated successfully!");
    }, 1500);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        {!done ? (
          <>
            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold tracking-tight text-foreground" style={{ lineHeight: '1.1' }}>Set new password</h2>
              <p className="text-sm text-muted-foreground">Choose a strong password with at least 8 characters</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="new-pw">New password</Label>
                <div className="relative">
                  <Input id="new-pw" type={showPassword ? "text" : "password"} placeholder="Min 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm-pw">Confirm password</Label>
                <Input id="confirm-pw" type="password" placeholder="Re-enter password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full h-11 font-medium active:scale-[0.98] transition-transform" disabled={loading}>
                {loading ? "Updating…" : "Update password"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="mx-auto h-14 w-14 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 text-green-600" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold tracking-tight text-foreground" style={{ lineHeight: '1.1' }}>Password updated</h2>
              <p className="text-sm text-muted-foreground">You can now sign in with your new password.</p>
            </div>
            <Link to="/login">
              <Button className="mt-2 active:scale-[0.98] transition-transform">Go to login</Button>
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
