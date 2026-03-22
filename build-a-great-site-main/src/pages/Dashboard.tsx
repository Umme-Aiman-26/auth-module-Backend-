import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, LogOut, User, Mail, Phone, CheckCircle2, Clock, Key } from "lucide-react";

const mockUser = {
  name: "Arjun Mehta",
  email: "arjun@example.com",
  phone: "+91 98765 43210",
  role: "admin" as const,
  emailVerified: true,
  phoneVerified: false,
  createdAt: "2026-03-15",
};

const roleBadgeClass: Record<string, string> = {
  user: "bg-secondary text-secondary-foreground",
  admin: "bg-primary/10 text-primary",
  super_admin: "bg-accent/10 text-accent",
};

export default function Dashboard() {
  const [user] = useState(mockUser);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto flex items-center justify-between h-14 px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg auth-gradient flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-foreground">AuthModule</span>
          </div>
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground active:scale-[0.97] transition-transform">
              <LogOut className="h-4 w-4 mr-1.5" /> Logout
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground" style={{ lineHeight: '1.1' }}>My Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your account settings and security</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Profile Card */}
          <div className="rounded-xl border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{user.name}</p>
                <Badge className={`text-xs ${roleBadgeClass[user.role]}`}>{user.role}</Badge>
              </div>
            </div>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
                {user.emailVerified && <CheckCircle2 className="h-3.5 w-3.5 text-green-600 ml-auto" />}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{user.phone}</span>
                {!user.phoneVerified && <span className="text-xs text-amber-600 ml-auto font-medium">Unverified</span>}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Joined {user.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="rounded-xl border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-foreground text-sm">Security</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Password</span>
                <Link to="/reset-password">
                  <Button variant="outline" size="sm" className="h-8 text-xs active:scale-[0.97] transition-transform">Change</Button>
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Phone verification</span>
                <Link to="/verify-otp">
                  <Button variant="outline" size="sm" className="h-8 text-xs active:scale-[0.97] transition-transform">Verify</Button>
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active sessions</span>
                <span className="text-xs font-medium text-foreground tabular-nums">1 device</span>
              </div>
            </div>
          </div>
        </div>

        {/* API Endpoints Reference */}
        <div className="rounded-xl border bg-card p-5 shadow-sm space-y-3">
          <h3 className="font-semibold text-foreground text-sm">API Endpoints</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            {[
              ["POST", "/auth/register"],
              ["POST", "/auth/verify-otp"],
              ["POST", "/auth/login"],
              ["POST", "/auth/login-otp"],
              ["POST", "/auth/refresh-token"],
              ["POST", "/auth/forgot-password"],
              ["POST", "/auth/reset-password"],
              ["POST", "/auth/logout"],
              ["GET", "/auth/me"],
            ].map(([method, path]) => (
              <div key={path} className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2">
                <span className={`text-xs font-mono font-semibold ${method === "GET" ? "text-green-600" : "text-primary"}`}>{method}</span>
                <span className="text-muted-foreground font-mono text-xs">{path}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
