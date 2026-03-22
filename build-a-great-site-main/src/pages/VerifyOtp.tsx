import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import OtpInput from "@/components/OtpInput";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 min
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const mins = Math.floor(countdown / 60);
  const secs = countdown % 60;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return toast.error("Please enter the complete OTP");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Verification successful!");
    }, 1500);
  };

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setCountdown(300);
      setOtp("");
      toast.success("New OTP sent!");
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to login
        </Link>

        <div className="space-y-1.5">
          <h2 className="text-2xl font-bold tracking-tight text-foreground" style={{ lineHeight: '1.1' }}>Verify your identity</h2>
          <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your email or phone</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5">
          <OtpInput value={otp} onChange={setOtp} />

          <div className="text-center text-sm text-muted-foreground tabular-nums">
            {countdown > 0 ? (
              <span>Code expires in <span className="font-medium text-foreground">{mins}:{secs.toString().padStart(2, "0")}</span></span>
            ) : (
              <span className="text-destructive font-medium">Code expired</span>
            )}
          </div>

          <Button type="submit" className="w-full h-11 font-medium active:scale-[0.98] transition-transform" disabled={loading || otp.length < 6}>
            {loading ? <span className="flex items-center gap-2"><span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />Verifying…</span> : "Verify code"}
          </Button>
        </form>

        <div className="text-center">
          <button onClick={handleResend} disabled={resending || countdown > 270} className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-4 disabled:opacity-40 disabled:no-underline disabled:cursor-not-allowed transition-opacity">
            <RefreshCw className={`h-3.5 w-3.5 ${resending ? "animate-spin" : ""}`} /> Resend code
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
