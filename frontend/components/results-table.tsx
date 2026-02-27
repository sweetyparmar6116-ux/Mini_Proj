"use client"

import { CheckCircle2, XCircle, BarChart3 } from "lucide-react"

export interface ResumeResult {
  name: string
  tfidf: number
  sbert: number
  finalScore: number
  status: "SHORTLISTED" | "REJECTED"
}

interface ResultsTableProps {
  results: ResumeResult[]
}

export function ResultsTable({ results }: ResultsTableProps) {
  if (results.length === 0) return null

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="glass-strong rounded-2xl p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
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

        {/* Responsive table wrapper */}
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 font-semibold text-muted-foreground">Resume Name</th>
                <th className="px-4 py-3 text-center font-semibold text-muted-foreground">TF-IDF</th>
                <th className="px-4 py-3 text-center font-semibold text-muted-foreground">SBERT</th>
                <th className="px-4 py-3 text-center font-semibold text-muted-foreground">Final Score</th>
                <th className="px-4 py-3 text-center font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr
                  key={`${result.name}-${index}`}
                  className={`border-b border-border/20 transition-colors duration-200 ${
                    result.status === "SHORTLISTED"
                      ? "hover:bg-neon-green/5"
                      : "hover:bg-neon-pink/5"
                  }`}
                >
                  <td className="px-4 py-4 font-medium text-foreground">
                    {result.name}
                  </td>
                  <td className="px-4 py-4 text-center text-muted-foreground">
                    {result.tfidf.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-center text-muted-foreground">
                    {result.sbert.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-block rounded-lg px-3 py-1 text-xs font-bold ${
                        result.status === "SHORTLISTED"
                          ? "bg-neon-green/15 text-neon-green"
                          : "bg-neon-pink/15 text-neon-pink"
                      }`}
                    >
                      {result.finalScore.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {result.status === "SHORTLISTED" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-neon-green/15 px-3 py-1 text-xs font-bold text-neon-green glow-green">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        SHORTLISTED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-neon-pink/15 px-3 py-1 text-xs font-bold text-neon-pink glow-pink">
                        <XCircle className="h-3.5 w-3.5" />
                        REJECTED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
