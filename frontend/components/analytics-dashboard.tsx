"use client"

import { PieChart as PieChartIcon, BarChart3 } from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import type { ResumeResult } from "./results-table"

interface AnalyticsDashboardProps {
  results: ResumeResult[]
}

const COLORS = {
  shortlisted: "#34d399",
  rejected: "#f472b6",
  bar: "#a78bfa",
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-strong rounded-lg px-3 py-2 text-xs text-foreground">
        <p className="font-medium">{label}</p>
        <p className="text-neon-purple">Score: {payload[0].value.toFixed(2)}</p>
      </div>
    )
  }
  return null
}

export function AnalyticsDashboard({ results }: AnalyticsDashboardProps) {
  if (results.length === 0) return null

  const shortlisted = results.filter((r) => r.status === "SHORTLISTED").length
  const rejected = results.filter((r) => r.status === "REJECTED").length

  const pieData = [
    { name: "Shortlisted", value: shortlisted },
    { name: "Rejected", value: rejected },
  ]

  const barData = results.map((r) => ({
    name: r.name.length > 15 ? r.name.slice(0, 15) + "..." : r.name,
    score: r.finalScore,
    status: r.status,
  }))

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-pink/20">
          <BarChart3 className="h-5 w-5 text-neon-pink" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Analytics</h2>
          <p className="text-sm text-muted-foreground">Visual breakdown of screening results</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pie Chart */}
        <div className="glass-strong rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <PieChartIcon className="h-4 w-4 text-neon-purple" />
            <h3 className="text-sm font-semibold text-foreground">Shortlisted vs Rejected</h3>
          </div>
          <div className="flex h-[280px] items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={COLORS.shortlisted} />
                  <Cell fill={COLORS.rejected} />
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value: string) => (
                    <span className="text-xs text-foreground">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Stats row */}
          <div className="mt-2 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-neon-green">{shortlisted}</p>
              <p className="text-xs text-muted-foreground">Shortlisted</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-neon-pink">{rejected}</p>
              <p className="text-xs text-muted-foreground">Rejected</p>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="glass-strong rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-neon-green" />
            <h3 className="text-sm font-semibold text-foreground">Final Scores per Resume</h3>
          </div>
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -10, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#9896a8", fontSize: 11 }}
                  angle={-35}
                  textAnchor="end"
                  height={60}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#9896a8", fontSize: 11 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickLine={false}
                  domain={[0, 1]}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(167, 139, 250, 0.08)" }} />
                <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={50}>
                  {barData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.status === "SHORTLISTED" ? COLORS.shortlisted : COLORS.rejected}
                      fillOpacity={0.85}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
