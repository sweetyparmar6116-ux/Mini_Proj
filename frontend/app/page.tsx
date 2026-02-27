import { Navbar } from "@/components/navbar"
import { LandingContent } from "@/components/landing-content"

export default function Page() {
  return (
    <div className="gradient-bg relative min-h-screen overflow-hidden">
      {/* Decorative orbs */}
      <div className="orb left-[-10%] top-[10%] h-[400px] w-[400px] bg-neon-purple/40" />
      <div className="orb right-[-8%] top-[40%] h-[350px] w-[350px] bg-neon-pink/30" style={{ animationDelay: "5s" }} />
      <div className="orb bottom-[10%] left-[20%] h-[300px] w-[300px] bg-neon-green/20" style={{ animationDelay: "10s" }} />

      <div className="relative z-10">
        <Navbar />
        <main>
          <LandingContent />
        </main>
      </div>
    </div>
  )
}
