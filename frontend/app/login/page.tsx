"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, ArrowLeft, Briefcase, UserCheck } from "lucide-react"

type Role = "candidate" | "hr"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState<Role>("candidate")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push(role === "hr" ? "/hr" : "/candidate")
  }

  return (
    <div className="gradient-bg relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* Decorative orbs */}
      <div className="orb left-[-15%] top-[20%] h-[350px] w-[350px] bg-neon-purple/40" />
      <div className="orb right-[-10%] bottom-[15%] h-[300px] w-[300px] bg-neon-pink/30" style={{ animationDelay: "7s" }} />

      {/* Back link */}
      <Link
        href="/"
        className="glass absolute left-6 top-6 z-20 flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-muted-foreground transition-all hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Home
      </Link>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-purple to-neon-pink">
            <svg className="h-7 w-7 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {"Welcome back to "}
            <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              BiasFreeAI
            </span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8" suppressHydrationWarning>
          {error && (
            <div className="mb-5 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
              {error}
            </div>
          )}

          {/* Role Selector */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-foreground">Sign in as</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("candidate")}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 text-sm font-medium transition-all ${
                  role === "candidate"
                    ? "border-neon-green bg-neon-green/10 text-neon-green"
                    : "border-border bg-secondary/30 text-muted-foreground hover:border-neon-green/40 hover:text-foreground"
                }`}
                suppressHydrationWarning
              >
                <UserCheck className="h-6 w-6" />
                Candidate
              </button>
              <button
                type="button"
                onClick={() => setRole("hr")}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 text-sm font-medium transition-all ${
                  role === "hr"
                    ? "border-neon-purple bg-neon-purple/10 text-neon-purple"
                    : "border-border bg-secondary/30 text-muted-foreground hover:border-neon-purple/40 hover:text-foreground"
                }`}
                suppressHydrationWarning
              >
                <Briefcase className="h-6 w-6" />
                HR / Recruiter
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-secondary/50 py-3 pl-11 pr-4 text-sm text-foreground placeholder-muted-foreground transition-all duration-300 focus:border-neon-purple/50 focus:outline-none focus:ring-2 focus:ring-neon-purple/20"
                suppressHydrationWarning
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <button type="button" className="text-xs text-neon-purple transition-colors hover:text-neon-pink" suppressHydrationWarning>
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-border bg-secondary/50 py-3 pl-11 pr-12 text-sm text-foreground placeholder-muted-foreground transition-all duration-300 focus:border-neon-purple/50 focus:outline-none focus:ring-2 focus:ring-neon-purple/20"
                suppressHydrationWarning
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
                suppressHydrationWarning
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="pulse-glow flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink px-8 py-3.5 text-base font-bold text-foreground transition-all duration-300 hover:scale-[1.02] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:scale-100"
            suppressHydrationWarning
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-foreground/30 border-t-foreground" />
                Signing in...
              </>
            ) : (
              `Sign In as ${role === "hr" ? "HR / Recruiter" : "Candidate"}`
            )}
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <button
              type="button"
              className="glass flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary/60"
              suppressHydrationWarning
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="glass flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary/60"
              suppressHydrationWarning
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/signup" className="font-semibold text-neon-purple transition-colors hover:text-neon-pink">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
