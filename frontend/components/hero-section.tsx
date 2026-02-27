"use client"

import { Brain, Shield, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 pt-24 pb-16 text-center">
      {/* Floating badge */}
      <div className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground">
        <Sparkles className="h-4 w-4 text-neon-purple" />
        <span>Powered by AI &amp; NLP</span>
      </div>

      {/* Main headline */}
      <h1 className="max-w-4xl text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
        AI Resume Screening,{" "}
        <span className="bg-gradient-to-r from-neon-purple via-neon-pink to-neon-green bg-clip-text text-transparent">
          Minus the Bias
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
        Screen resumes fairly with TF-IDF and SBERT semantic scoring.
        No names, no photos, no prejudice — just skill-based rankings.
      </p>

      {/* Feature pills */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <FeaturePill icon={<Brain className="h-4 w-4" />} label="TF-IDF + SBERT" />
        <FeaturePill icon={<Shield className="h-4 w-4" />} label="Bias-Free" />
        <FeaturePill icon={<Sparkles className="h-4 w-4" />} label="Instant Results" />
      </div>
    </section>
  )
}

function FeaturePill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:scale-105 hover:border-neon-purple/30">
      <span className="text-neon-purple">{icon}</span>
      {label}
    </div>
  )
}
