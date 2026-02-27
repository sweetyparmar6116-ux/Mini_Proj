"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { UploadSection } from "@/components/upload-section"
import { type ResumeResult } from "@/components/results-table"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import {
  LogOut,
  Briefcase,
  BarChart3,
  CheckCircle2,
  XCircle,
  Filter,
  Eye,
  X,
  FileText,
} from "lucide-react"

function generateMockResults(files: File[]): ResumeResult[] {
  return files
    .map((file) => {
      const tfidf = Math.random() * 0.6 + 0.2
      const sbert = Math.random() * 0.6 + 0.2
      const finalScore = tfidf * 0.4 + sbert * 0.6
      return {
        name: file.name,
        tfidf,
        sbert,
        finalScore,
        status: (finalScore >= 0.45 ? "SHORTLISTED" : "REJECTED") as "SHORTLISTED" | "REJECTED",
      }
    })
    .sort((a, b) => b.finalScore - a.finalScore)
}

type StatusFilter = "all" | "SHORTLISTED" | "REJECTED"

export default function HRDashboard() {
  const router = useRouter()
  const [results, setResults] = useState<ResumeResult[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [previewResume, setPreviewResume] = useState<ResumeResult | null>(null)

  const handleAnalyze = useCallback(
    (_jobDescription: string, _jdFile: File | null, files: File[]) => {
      setIsAnalyzing(true)
      setResults([])
      setStatusFilter("all")

      setTimeout(() => {
        const mockResults = generateMockResults(files)
        setResults(mockResults)
        setIsAnalyzing(false)

        const el = document.getElementById("results")
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 2000)
    },
    []
  )

  const filteredResults =
    statusFilter === "all"
      ? results
      : results.filter((r) => r.status === statusFilter)

  const shortlistedCount = results.filter((r) => r.status === "SHORTLISTED").length
  const rejectedCount = results.filter((r) => r.status === "REJECTED").length

  return (
    <div className="gradient-bg relative min-h-screen overflow-hidden">
      <div className="orb left-[-10%] top-[10%] h-[400px] w-[400px] bg-neon-purple/40" />
      <div className="orb right-[-8%] top-[40%] h-[350px] w-[350px] bg-neon-pink/30" style={{ animationDelay: "5s" }} />
      <div className="orb bottom-[10%] left-[20%] h-[300px] w-[300px] bg-neon-green/20" style={{ animationDelay: "10s" }} />

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="glass sticky top-0 z-50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
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
              <div className="glass hidden items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-neon-purple md:flex">
                <Briefcase className="h-4 w-4" />
                HR Dashboard
              </div>
              <a href="#upload" className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:block">Upload</a>
              <a href="#results" className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:block">Results</a>
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

        <main>
          {/* Header */}
          <section className="mx-auto max-w-5xl px-4 pt-16 pb-4 text-center">
            <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {"HR "}
              <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                Screening
              </span>
              {" Dashboard"}
            </h1>
            <p className="mt-3 text-muted-foreground">
              Upload a job description and resumes to get AI-powered, bias-free rankings.
            </p>
          </section>

          <UploadSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

          {/* Loading */}
          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 animate-ping rounded-full bg-neon-purple/30" />
                <div className="absolute inset-2 animate-spin rounded-full border-2 border-neon-purple border-t-transparent" />
                <div className="absolute inset-4 animate-pulse rounded-full bg-neon-purple/40" />
              </div>
              <p className="mt-6 text-sm font-medium text-muted-foreground">Analyzing resumes with AI...</p>
              <p className="mt-1 text-xs text-muted-foreground/60">Running TF-IDF and SBERT scoring</p>
            </div>
          )}

          {/* Results with filters */}
          <div id="results">
            {results.length > 0 && (
              <section className="mx-auto w-full max-w-5xl px-4 py-8">
                <div className="glass-strong rounded-2xl p-6 md:p-8">
                  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-green/20">
                        <BarChart3 className="h-5 w-5 text-neon-green" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground">Screening Results</h2>
                        <p className="text-sm text-muted-foreground">
                          {results.length} resume{results.length !== 1 ? "s" : ""} analyzed
                        </p>
                      </div>
                    </div>

                    {/* Filter buttons */}
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <button
                        onClick={() => setStatusFilter("all")}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                          statusFilter === "all"
                            ? "bg-neon-purple/20 text-neon-purple"
                            : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        All ({results.length})
                      </button>
                      <button
                        onClick={() => setStatusFilter("SHORTLISTED")}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                          statusFilter === "SHORTLISTED"
                            ? "bg-neon-green/20 text-neon-green"
                            : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Shortlisted ({shortlistedCount})
                      </button>
                      <button
                        onClick={() => setStatusFilter("REJECTED")}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                          statusFilter === "REJECTED"
                            ? "bg-neon-pink/20 text-neon-pink"
                            : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Rejected ({rejectedCount})
                      </button>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto rounded-xl">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="px-4 py-3 font-semibold text-muted-foreground">Resume</th>
                          <th className="px-4 py-3 text-center font-semibold text-muted-foreground">TF-IDF</th>
                          <th className="px-4 py-3 text-center font-semibold text-muted-foreground">SBERT</th>
                          <th className="px-4 py-3 text-center font-semibold text-muted-foreground">Final Score</th>
                          <th className="px-4 py-3 text-center font-semibold text-muted-foreground">Status</th>
                          <th className="px-4 py-3 text-center font-semibold text-muted-foreground">Preview</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredResults.map((result, index) => (
                          <tr
                            key={`${result.name}-${index}`}
                            className={`border-b border-border/20 transition-colors duration-200 ${
                              result.status === "SHORTLISTED" ? "hover:bg-neon-green/5" : "hover:bg-neon-pink/5"
                            }`}
                          >
                            <td className="px-4 py-4 font-medium text-foreground">{result.name}</td>
                            <td className="px-4 py-4 text-center text-muted-foreground">{result.tfidf.toFixed(2)}</td>
                            <td className="px-4 py-4 text-center text-muted-foreground">{result.sbert.toFixed(2)}</td>
                            <td className="px-4 py-4 text-center">
                              <span className={`inline-block rounded-lg px-3 py-1 text-xs font-bold ${
                                result.status === "SHORTLISTED"
                                  ? "bg-neon-green/15 text-neon-green"
                                  : "bg-neon-pink/15 text-neon-pink"
                              }`}>
                                {result.finalScore.toFixed(2)}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-center">
                              {result.status === "SHORTLISTED" ? (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-neon-green/15 px-3 py-1 text-xs font-bold text-neon-green">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  SHORTLISTED
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-neon-pink/15 px-3 py-1 text-xs font-bold text-neon-pink">
                                  <XCircle className="h-3.5 w-3.5" />
                                  REJECTED
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-4 text-center">
                              <button
                                onClick={() => setPreviewResume(result)}
                                className="rounded-lg bg-neon-purple/10 p-2 text-neon-purple transition-all hover:bg-neon-purple/20"
                                aria-label={`Preview ${result.name}`}
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredResults.length === 0 && (
                      <p className="py-8 text-center text-sm text-muted-foreground">
                        No results matching the current filter.
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}

            <AnalyticsDashboard results={results} />
          </div>
        </main>

        <footer className="mt-16 border-t border-border/30 px-6 py-8 text-center">
          <p className="text-xs text-muted-foreground">
            Built with AI fairness in mind. No identifying information is used in the scoring process.
          </p>
        </footer>
      </div>

      {/* Bias-Removed Resume Preview Modal */}
      {previewResume && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 p-4 backdrop-blur-sm">
          <div className="glass-strong relative w-full max-w-lg rounded-2xl p-6">
            <button
              onClick={() => setPreviewResume(null)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-purple/20">
                <FileText className="h-5 w-5 text-neon-purple" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Bias-Removed Preview</h3>
                <p className="text-xs text-muted-foreground">Personal info has been redacted</p>
              </div>
            </div>

            <div className="rounded-xl bg-secondary/30 p-5">
              {/* Redacted header */}
              <div className="mb-4 border-b border-border/30 pb-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-3 w-28 rounded bg-muted-foreground/20" />
                  <span className="text-xs text-muted-foreground">(Name redacted)</span>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <div className="h-2.5 w-32 rounded bg-muted-foreground/15" />
                    <span className="text-[10px] text-muted-foreground">(Email hidden)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2.5 w-20 rounded bg-muted-foreground/15" />
                    <span className="text-[10px] text-muted-foreground">(Phone hidden)</span>
                  </div>
                </div>
              </div>

              {/* Skills section (visible) */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neon-purple">Skills & Technologies</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  React, Node.js, TypeScript, Python, SQL, Docker, AWS, REST APIs, Git, CI/CD, Agile Development, System Design
                </p>
              </div>

              {/* Experience section (visible) */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neon-purple">Experience</p>
                <div className="text-sm leading-relaxed text-muted-foreground">
                  <p className="mb-1 font-medium text-foreground">Senior Developer -- 3 years</p>
                  <p>Built scalable web applications, managed team of 5 developers, implemented CI/CD pipelines, reduced deploy time by 60%.</p>
                </div>
              </div>

              {/* Education (partially visible) */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neon-purple">Education</p>
                <p className="text-sm text-muted-foreground">B.S. Computer Science -- 2019</p>
              </div>
            </div>

            {/* Scores */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-secondary/40 p-3 text-center">
                <p className="text-xs text-muted-foreground">TF-IDF</p>
                <p className="text-lg font-bold text-neon-purple">{previewResume.tfidf.toFixed(2)}</p>
              </div>
              <div className="rounded-xl bg-secondary/40 p-3 text-center">
                <p className="text-xs text-muted-foreground">SBERT</p>
                <p className="text-lg font-bold text-neon-pink">{previewResume.sbert.toFixed(2)}</p>
              </div>
              <div className="rounded-xl bg-secondary/40 p-3 text-center">
                <p className="text-xs text-muted-foreground">Final</p>
                <p className={`text-lg font-bold ${previewResume.status === "SHORTLISTED" ? "text-neon-green" : "text-neon-pink"}`}>
                  {previewResume.finalScore.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
