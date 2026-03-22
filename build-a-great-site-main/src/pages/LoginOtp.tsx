import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OtpInput from "@/components/OtpInput";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function LoginOtp() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      toast.success("OTP sent to your phone!");
    }, 1000);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return toast.error("Enter the full OTP");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Login successful!");
    }, 1500);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to login
        </Link>

        <div className="space-y-1.5">
          <h2 className="text-2xl font-bold tracking-tight text-foreground" style={{ lineHeight: '1.1' }}>
            {step === "phone" ? "Sign in with OTP" : "Enter verification code"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {step === "phone" ? "We'll send a one-time code to your phone" : `Code sent to ${phone}`}
          </p>
        </div>

        {step === "phone" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="otp-phone">Phone number</Label>
              <Input id="otp-phone" type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full h-11 font-medium active:scale-[0.98] transition-transform" disabled={loading}>
              {loading ? "Sending…" : <span className="flex items-center gap-2">Send OTP <ArrowRight className="h-4 w-4" /></span>}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-5">
            <OtpInput value={otp} onChange={setOtp} />
            <Button type="submit" className="w-full h-11 font-medium active:scale-[0.98] transition-transform" disabled={loading || otp.length < 6}>
              {loading ? "Verifying…" : "Verify & sign in"}
            </Button>
            <button type="button" onClick={() => { setStep("phone"); setOtp(""); }} className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              Use a different number
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
