import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("Reset link sent!");
    }, 1500);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to login
        </Link>

        {!sent ? (
          <>
            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold tracking-tight text-foreground" style={{ lineHeight: '1.1' }}>Reset your password</h2>
              <p className="text-sm text-muted-foreground">We'll send a password reset link to your email. The link expires in 15 minutes.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="reset-email">Email</Label>
                <Input id="reset-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full h-11 font-medium active:scale-[0.98] transition-transform" disabled={loading}>
                {loading ? "Sending…" : "Send reset link"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold tracking-tight text-foreground" style={{ lineHeight: '1.1' }}>Check your email</h2>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                We've sent a reset link to <span className="font-medium text-foreground">{email}</span>. It expires in 15 minutes.
              </p>
            </div>
            <Button variant="outline" className="mt-2 active:scale-[0.98] transition-transform" onClick={() => { setSent(false); setEmail(""); }}>
              Try a different email
            </Button>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
