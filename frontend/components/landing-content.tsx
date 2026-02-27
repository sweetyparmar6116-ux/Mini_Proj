import Link from "next/link"
import {
  Brain,
  Shield,
  Sparkles,
  BarChart3,
  FileText,
  Upload,
  Zap,
  ArrowRight,
  CheckCircle2,
  Users,
  Eye,
  Star,
  UserCheck,
  Briefcase,
} from "lucide-react"

export function LandingContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-24 pb-20 text-center">
        <div className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-neon-purple" />
          <span>AI-Powered Fair Hiring</span>
        </div>

        <h1 className="max-w-4xl text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Hire for Skills,{" "}
          <span className="bg-gradient-to-r from-neon-purple via-neon-pink to-neon-green bg-clip-text text-transparent">
            Not for Bias
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Screen resumes fairly with TF-IDF and SBERT semantic scoring.
          No names, no photos, no prejudice -- just skill-based rankings that find the best talent.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="pulse-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink px-8 py-4 text-base font-bold text-foreground transition-all hover:scale-105 hover:brightness-110"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/login"
            className="glass inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-secondary/60"
          >
            Sign In to Dashboard
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-neon-green" />
            Free to start
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-neon-green" />
            100% bias-free
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-neon-green" />
            Instant results
          </span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-neon-purple">Features</p>
          <h2 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl">
            Everything you need for fair hiring
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Powerful AI-driven tools that remove unconscious bias and surface the best candidates based on skills alone.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Brain className="h-6 w-6" />}
            title="TF-IDF + SBERT Scoring"
            description="Dual-engine NLP analysis combines keyword relevance with deep semantic understanding for accurate matching."
            color="purple"
          />
          <FeatureCard
            icon={<Eye className="h-6 w-6" />}
            title="Blind Screening"
            description="Names, photos, and demographic info are stripped before analysis. Only skills and experience matter."
            color="pink"
          />
          <FeatureCard
            icon={<BarChart3 className="h-6 w-6" />}
            title="Visual Analytics"
            description="Interactive charts and dashboards show score distributions, shortlist ratios, and candidate comparisons."
            color="green"
          />
          <FeatureCard
            icon={<FileText className="h-6 w-6" />}
            title="Multi-Format Upload"
            description="Upload resumes in PDF, DOCX, or TXT format. Drag-and-drop or bulk upload supported."
            color="purple"
          />
          <FeatureCard
            icon={<Upload className="h-6 w-6" />}
            title="JD Upload or Paste"
            description="Paste your job description text directly or upload a JD file. Flexible to fit your workflow."
            color="pink"
          />
          <FeatureCard
            icon={<Users className="h-6 w-6" />}
            title="Team Collaboration"
            description="Share screening results with hiring managers. Export reports for team review and decision-making."
            color="green"
          />
        </div>
      </section>

      {/* Two Dashboards */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-neon-purple">Two Experiences</p>
          <h2 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl">
            One platform, two dashboards
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Whether you are a candidate checking your resume or an HR professional screening applicants, BiasFreeAI has you covered.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-strong group rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:glow-green">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-neon-green/15">
              <UserCheck className="h-7 w-7 text-neon-green" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Candidate Dashboard</h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Upload your resume and instantly see your AI match score with a transparent breakdown of skills matched, skills to improve, and a clear explanation of how you were evaluated. Simple, friendly, and fair.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-neon-green/15 px-5 py-2.5 text-sm font-bold text-neon-green transition-all hover:bg-neon-green/25"
            >
              Try as Candidate
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="glass-strong group rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:glow-purple">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-neon-purple/15">
              <Briefcase className="h-7 w-7 text-neon-purple" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">HR Dashboard</h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Upload a job description and multiple resumes for bulk AI screening. View ranked results with TF-IDF and SBERT scores, filter by status, preview bias-removed resumes, and analyze results with interactive charts.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-neon-purple/15 px-5 py-2.5 text-sm font-bold text-neon-purple transition-all hover:bg-neon-purple/25"
            >
              Try as HR
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-4 py-20">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-neon-pink">How It Works</p>
          <h2 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl">
            Three simple steps to fair hiring
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <StepCard
            number="01"
            title="Upload Job Description"
            description="Paste the JD text or upload a PDF/DOCX file describing the role requirements and qualifications."
          />
          <StepCard
            number="02"
            title="Upload Resumes"
            description="Drag and drop candidate resumes in bulk. Supports PDF, DOCX, and TXT formats."
          />
          <StepCard
            number="03"
            title="Get Ranked Results"
            description="AI scores each resume with TF-IDF and SBERT. View shortlisted candidates instantly with analytics."
          />
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-neon-green">Testimonials</p>
          <h2 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl">
            Trusted by hiring teams
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <TestimonialCard
            quote="BiasFreeAI completely transformed our hiring process. We saw a 40% increase in diverse hires within the first quarter."
            author="Sarah Chen"
            role="Head of Talent, TechCorp"
            rating={5}
          />
          <TestimonialCard
            quote="The SBERT scoring is incredibly accurate. It surfaces candidates we would have missed with traditional keyword matching."
            author="James Rodriguez"
            role="HR Director, StartupXYZ"
            rating={5}
          />
          <TestimonialCard
            quote="Finally a tool that lets us focus on what matters -- skills and experience. The analytics dashboard is beautiful."
            author="Priya Patel"
            role="Recruiter, GlobalHire"
            rating={5}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <div className="glass-strong rounded-3xl px-8 py-16 text-center md:px-16">
          <h2 className="text-balance text-3xl font-extrabold text-foreground md:text-4xl">
            Ready to hire{" "}
            <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              without bias?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Join hundreds of companies using BiasFreeAI to build diverse, talented teams. Free to start, no credit card required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="pulse-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink px-8 py-4 text-base font-bold text-foreground transition-all hover:scale-105 hover:brightness-110"
            >
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-muted-foreground transition-all hover:text-foreground"
            >
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-neon-purple to-neon-pink">
              <svg className="h-3.5 w-3.5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-sm font-bold text-foreground">
              BiasFree<span className="text-neon-purple">AI</span>
            </span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#how-it-works" className="transition-colors hover:text-foreground">How It Works</a>
            <Link href="/login" className="transition-colors hover:text-foreground">Sign In</Link>
            <Link href="/signup" className="transition-colors hover:text-foreground">Sign Up</Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Built with AI fairness in mind.
          </p>
        </div>
      </footer>
    </>
  )
}

/* --- Sub-components --- */

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: "purple" | "pink" | "green"
}) {
  const colorMap = {
    purple: { bg: "bg-neon-purple/15", text: "text-neon-purple", glow: "hover:glow-purple" },
    pink: { bg: "bg-neon-pink/15", text: "text-neon-pink", glow: "hover:glow-pink" },
    green: { bg: "bg-neon-green/15", text: "text-neon-green", glow: "hover:glow-green" },
  }
  const c = colorMap[color]

  return (
    <div className={`glass-strong group rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${c.glow}`}>
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${c.bg}`}>
        <span className={c.text}>{icon}</span>
      </div>
      <h3 className="mb-2 text-lg font-bold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="glass-strong relative rounded-2xl p-6">
      <span className="mb-4 inline-block bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-4xl font-extrabold text-transparent">
        {number}
      </span>
      <h3 className="mb-2 text-lg font-bold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}

function TestimonialCard({
  quote,
  author,
  role,
  rating,
}: {
  quote: string
  author: string
  role: string
  rating: number
}) {
  return (
    <div className="glass-strong flex flex-col rounded-2xl p-6">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-neon-purple text-neon-purple" />
        ))}
      </div>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
        {`"${quote}"`}
      </p>
      <div>
        <p className="text-sm font-bold text-foreground">{author}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
    </div>
  )
}
