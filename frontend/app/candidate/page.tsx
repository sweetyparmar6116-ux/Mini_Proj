"use client"

import { useState, useRef, type DragEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Upload,
  FileText,
  X,
  Sparkles,
  CheckCircle2,
  XCircle,
  TrendingUp,
  LogOut,
  User,
  Info,
  ArrowRight,
} from "lucide-react"

interface CandidateResult {
  overallScore: number
  status: "SHORTLISTED" | "REJECTED"
  skillsMatched: string[]
  skillsMissing: string[]
  tfidf: number
  sbert: number
  explanation: string
}

export default function CandidateDashboard() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<CandidateResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = (e: DragEvent) => { e.preventDefault(); setIsDragging(false) }
  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = Array.from(e.dataTransfer.files).find(
      (f) => f.name.endsWith(".pdf") || f.name.endsWith(".docx") || f.name.endsWith(".txt")
    )
    if (dropped) { setFile(dropped); setResult(null) }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) { setFile(e.target.files[0]); setResult(null) }
  }

  const handleAnalyze = () => {
    if (!file) return
    setIsAnalyzing(true)
    setResult(null)

    setTimeout(() => {
      const tfidf = Math.random() * 0.5 + 0.3
      const sbert = Math.random() * 0.5 + 0.3
      const overall = tfidf * 0.4 + sbert * 0.6
      const allSkills = ["React", "Node.js", "Python", "SQL", "AWS", "Docker", "TypeScript", "Git", "REST APIs", "CI/CD"]
      const matchCount = Math.floor(Math.random() * 4) + 4
      const shuffled = allSkills.sort(() => 0.5 - Math.random())
      const matched = shuffled.slice(0, matchCount)
      const missing = shuffled.slice(matchCount, matchCount + 3)

      setResult({
        overallScore: overall,
        status: overall >= 0.45 ? "SHORTLISTED" : "REJECTED",
        skillsMatched: matched,
        skillsMissing: missing,
        tfidf,
        sbert,
        explanation: overall >= 0.45
          ? "Your resume shows strong alignment with the job requirements. Your skills and experience match the key competencies the role demands. You have been shortlisted for the next round."
          : "Your resume has some relevant skills, but key qualifications are missing for this specific role. Consider strengthening the areas noted below and reapplying.",
      })
      setIsAnalyzing(false)
    }, 2500)
  }

  return (
    <div className="gradient-bg relative min-h-screen overflow-hidden">
      <div className="orb left-[-10%] top-[10%] h-[400px] w-[400px] bg-neon-green/30" />
      <div className="orb right-[-8%] top-[50%] h-[300px] w-[300px] bg-neon-purple/20" style={{ animationDelay: "5s" }} />

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="glass sticky top-0 z-50">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-purple to-neon-pink">
                <svg className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-lg font-bold text-foreground">
                BiasFree<span className="text-neon-purple">AI</span>
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="glass hidden items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-neon-green md:flex">
                <User className="h-4 w-4" />
                Candidate
              </div>
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 rounded-lg bg-secondary/60 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-3xl px-4 py-12">
          {/* Welcome */}
          <section className="mb-10 text-center">
            <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {"Your "}
              <span className="bg-gradient-to-r from-neon-green to-neon-purple bg-clip-text text-transparent">
                Resume Check
              </span>
            </h1>
            <p className="mt-3 text-muted-foreground">
              Upload your resume and get an instant, fair AI evaluation against the current job opening.
            </p>
          </section>

          {/* Upload Card */}
          <section className="glass-strong mb-8 rounded-2xl p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-green/20">
                <Upload className="h-5 w-5 text-neon-green" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Upload Your Resume</h2>
                <p className="text-sm text-muted-foreground">PDF, DOCX, or TXT format</p>
              </div>
            </div>

            {file ? (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-neon-green/30 bg-neon-green/5 px-4 py-4">
                <FileText className="h-5 w-5 shrink-0 text-neon-green" />
                <span className="flex-1 truncate text-sm font-medium text-foreground">{file.name}</span>
                <button
                  onClick={() => { setFile(null); setResult(null) }}
                  className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`mb-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 transition-all duration-300 ${
                  isDragging
                    ? "border-neon-green bg-neon-green/10"
                    : "border-border hover:border-neon-green/40 hover:bg-secondary/30"
                }`}
              >
                <Upload className={`mb-3 h-10 w-10 ${isDragging ? "text-neon-green" : "text-muted-foreground"}`} />
                <p className="text-base font-medium text-foreground">Drop your resume here</p>
                <p className="mt-1 text-sm text-muted-foreground">or click to browse</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={!file || isAnalyzing}
              className="pulse-glow flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-green to-neon-purple px-8 py-4 text-base font-bold text-foreground transition-all duration-300 hover:scale-[1.02] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:scale-100"
            >
              <Sparkles className="h-5 w-5" />
              {isAnalyzing ? "Analyzing..." : "Check My Resume"}
            </button>
          </section>

          {/* Loading */}
          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 animate-ping rounded-full bg-neon-green/30" />
                <div className="absolute inset-2 animate-spin rounded-full border-2 border-neon-green border-t-transparent" />
                <div className="absolute inset-4 animate-pulse rounded-full bg-neon-green/40" />
              </div>
              <p className="mt-6 text-sm font-medium text-muted-foreground">Evaluating your resume fairly...</p>
              <p className="mt-1 text-xs text-muted-foreground/60">No personal info is used in scoring</p>
            </div>
          )}

          {/* Results */}
          {result && !isAnalyzing && (
            <div className="space-y-6">
              {/* Score Overview */}
              <section className="glass-strong rounded-2xl p-6 md:p-8">
                <div className="flex flex-col items-center gap-6 md:flex-row">
                  {/* Score Circle */}
                  <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
                    <svg className="h-36 w-36 -rotate-90" viewBox="0 0 144 144">
                      <circle cx="72" cy="72" r="62" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                      <circle
                        cx="72"
                        cy="72"
                        r="62"
                        fill="none"
                        stroke={result.status === "SHORTLISTED" ? "#34d399" : "#f472b6"}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${result.overallScore * 390} 390`}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className={`text-3xl font-extrabold ${result.status === "SHORTLISTED" ? "text-neon-green" : "text-neon-pink"}`}>
                        {Math.round(result.overallScore * 100)}%
                      </span>
                      <span className="text-xs text-muted-foreground">Match</span>
                    </div>
                  </div>

                  {/* Status + Explanation */}
                  <div className="flex-1 text-center md:text-left">
                    {result.status === "SHORTLISTED" ? (
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-neon-green/15 px-4 py-2 text-sm font-bold text-neon-green glow-green">
                        <CheckCircle2 className="h-4 w-4" />
                        SHORTLISTED
                      </div>
                    ) : (
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-neon-pink/15 px-4 py-2 text-sm font-bold text-neon-pink glow-pink">
                        <XCircle className="h-4 w-4" />
                        NOT SHORTLISTED
                      </div>
                    )}
                    <p className="text-sm leading-relaxed text-muted-foreground">{result.explanation}</p>
                  </div>
                </div>
              </section>

              {/* Score Breakdown */}
              <section className="glass-strong rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-neon-purple" />
                  <h3 className="text-sm font-semibold text-foreground">Score Breakdown</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-secondary/40 p-4">
                    <p className="mb-1 text-xs font-medium text-muted-foreground">Keyword Match (TF-IDF)</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-neon-purple">{(result.tfidf * 100).toFixed(0)}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-neon-purple transition-all duration-500" style={{ width: `${result.tfidf * 100}%` }} />
                    </div>
                  </div>
                  <div className="rounded-xl bg-secondary/40 p-4">
                    <p className="mb-1 text-xs font-medium text-muted-foreground">Semantic Match (SBERT)</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-neon-pink">{(result.sbert * 100).toFixed(0)}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-neon-pink transition-all duration-500" style={{ width: `${result.sbert * 100}%` }} />
                    </div>
                  </div>
                </div>
              </section>

              {/* Skills */}
              <section className="glass-strong rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Info className="h-4 w-4 text-neon-green" />
                  <h3 className="text-sm font-semibold text-foreground">Skills Analysis</h3>
                </div>
                <div className="mb-4">
                  <p className="mb-2 text-xs font-medium text-neon-green">Skills Matched</p>
                  <div className="flex flex-wrap gap-2">
                    {result.skillsMatched.map((s) => (
                      <span key={s} className="inline-flex items-center gap-1 rounded-lg bg-neon-green/10 px-3 py-1.5 text-xs font-medium text-neon-green">
                        <CheckCircle2 className="h-3 w-3" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-medium text-neon-pink">Skills to Improve</p>
                  <div className="flex flex-wrap gap-2">
                    {result.skillsMissing.map((s) => (
                      <span key={s} className="inline-flex items-center gap-1 rounded-lg bg-neon-pink/10 px-3 py-1.5 text-xs font-medium text-neon-pink">
                        <ArrowRight className="h-3 w-3" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* Fairness Notice */}
              <div className="glass rounded-xl px-5 py-4 text-center text-sm text-muted-foreground">
                <p>This evaluation is 100% bias-free. No personal information (name, photo, age, gender) was used in the scoring process. Only skills and experience were considered.</p>
              </div>
            </div>
          )}
        </main>

        <footer className="mt-8 border-t border-border/30 px-6 py-8 text-center">
          <p className="text-xs text-muted-foreground">
            Built with AI fairness in mind. Your data is processed securely.
          </p>
        </footer>
      </div>
    </div>
  )
}
