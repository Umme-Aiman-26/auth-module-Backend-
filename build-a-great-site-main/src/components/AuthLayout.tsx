import { Shield, Lock, Key, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

const features = [
  { icon: Shield, label: "End-to-end encrypted" },
  { icon: Lock, label: "JWT token security" },
  { icon: Key, label: "OTP verification" },
  { icon: UserCheck, label: "Role-based access" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex min-h-screen">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] auth-gradient flex-col justify-between p-10 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-lg bg-white/15 flex items-center justify-center backdrop-blur-sm">
              <Shield className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">AuthModule</span>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tight" style={{ lineHeight: '1.15' }}>
            Secure authentication,<br />built for production.
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-sm">
            A complete authentication system with OTP verification, role-based access, and token management.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {features.map((f, i) => (
              <div
                key={f.label}
                className="flex items-center gap-2.5 rounded-lg bg-white/10 backdrop-blur-sm px-3.5 py-2.5 text-sm"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(8px)',
                  transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${150 + i * 80}ms`,
                }}
              >
                <f.icon className="h-4 w-4 shrink-0 text-white/80" />
                <span className="text-white/90">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/40">
          © 2026 AuthModule. All rights reserved.
        </p>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-background">
        <div className="w-full max-w-[420px] animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
}
