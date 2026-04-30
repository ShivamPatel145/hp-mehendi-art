"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-xl border border-accent/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Admin Login</h1>
          <p className="text-muted-foreground">Sign in to manage the gallery.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-600 rounded-md text-sm text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Username</label>
            <input 
              name="username" 
              type="text" 
              required 
              className="w-full px-4 py-2 bg-background border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full px-4 py-2 bg-background border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
}
