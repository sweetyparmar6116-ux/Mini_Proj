"use client"

import { useState, useRef, type DragEvent } from "react"
import { FileText, Upload, X, Zap, FileUp, Type } from "lucide-react"

interface UploadSectionProps {
  onAnalyze: (jobDescription: string, jdFile: File | null, files: File[]) => void
  isAnalyzing: boolean
}

type JdMode = "paste" | "upload"

export function UploadSection({ onAnalyze, isAnalyzing }: UploadSectionProps) {
  const [jdMode, setJdMode] = useState<JdMode>("paste")
  const [jobDescription, setJobDescription] = useState("")
  const [jdFile, setJdFile] = useState<File | null>(null)
  const [jdDragging, setJdDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const jdFileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files).filter((f) =>
      ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"].includes(f.type) ||
      f.name.endsWith(".pdf") || f.name.endsWith(".docx") || f.name.endsWith(".txt")
    )
    setFiles((prev) => [...prev, ...droppedFiles])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  /* JD file drag & drop */
  const handleJdDragOver = (e: DragEvent) => {
    e.preventDefault()
    setJdDragging(true)
  }
  const handleJdDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setJdDragging(false)
  }
  const handleJdDrop = (e: DragEvent) => {
    e.preventDefault()
    setJdDragging(false)
    const dropped = Array.from(e.dataTransfer.files).find((f) =>
      f.name.endsWith(".pdf") || f.name.endsWith(".docx") || f.name.endsWith(".txt")
    )
    if (dropped) setJdFile(dropped)
  }
  const handleJdFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setJdFile(e.target.files[0])
  }

  const hasJd = jdMode === "paste" ? jobDescription.trim().length > 0 : jdFile !== null

  const handleSubmit = () => {
    if (hasJd && files.length > 0) {
      onAnalyze(jobDescription, jdFile, files)
    }
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-8" id="upload">
      <div className="glass-strong rounded-2xl p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-purple/20">
            <FileText className="h-5 w-5 text-neon-purple" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Upload & Analyze</h2>
            <p className="text-sm text-muted-foreground">Provide a job description and upload resumes</p>
          </div>
        </div>

        {/* Job Description with mode toggle */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Job Description</label>
            <div className="flex items-center rounded-lg bg-secondary/60 p-0.5">
              <button
                type="button"
                onClick={() => setJdMode("paste")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  jdMode === "paste"
                    ? "bg-neon-purple/20 text-neon-purple"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Type className="h-3 w-3" />
                Paste Text
              </button>
              <button
                type="button"
                onClick={() => setJdMode("upload")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  jdMode === "upload"
                    ? "bg-neon-purple/20 text-neon-purple"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileUp className="h-3 w-3" />
                Upload File
              </button>
            </div>
          </div>

          {jdMode === "paste" ? (
            <textarea
              id="job_description"
              name="job_description"
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here... e.g., Looking for a senior full-stack developer with 5+ years experience in React, Node.js, and AWS..."
              className="w-full resize-none rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-all duration-300 focus:border-neon-purple/50 focus:outline-none focus:ring-2 focus:ring-neon-purple/20"
            />
          ) : (
            <>
              {jdFile ? (
                <div className="flex items-center gap-3 rounded-xl border border-neon-purple/30 bg-neon-purple/5 px-4 py-4">
                  <FileText className="h-5 w-5 shrink-0 text-neon-purple" />
                  <span className="flex-1 truncate text-sm font-medium text-foreground">{jdFile.name}</span>
                  <button
                    onClick={() => setJdFile(null)}
                    className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
                    aria-label="Remove JD file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={handleJdDragOver}
                  onDragLeave={handleJdDragLeave}
                  onDrop={handleJdDrop}
                  onClick={() => jdFileInputRef.current?.click()}
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 transition-all duration-300 ${
                    jdDragging
                      ? "border-neon-purple bg-neon-purple/10"
                      : "border-border hover:border-neon-purple/40 hover:bg-secondary/30"
                  }`}
                >
                  <FileUp className={`mb-2 h-7 w-7 ${jdDragging ? "text-neon-purple" : "text-muted-foreground"}`} />
                  <p className="text-sm font-medium text-foreground">
                    Drop a JD file here
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    PDF, DOCX, or TXT
                  </p>
                  <input
                    ref={jdFileInputRef}
                    type="file"
                    name="job_description_file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleJdFileChange}
                    className="hidden"
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* File Upload Area */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Resumes (PDF, DOCX, TXT)
          </label>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-all duration-300 ${
              isDragging
                ? "border-neon-purple bg-neon-purple/10"
                : "border-border hover:border-neon-purple/40 hover:bg-secondary/30"
            }`}
          >
            <Upload className={`mb-3 h-8 w-8 ${isDragging ? "text-neon-purple" : "text-muted-foreground"}`} />
            <p className="text-sm font-medium text-foreground">
              Drag & drop resumes here
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              or click to browse files
            </p>
            <input
              ref={fileInputRef}
              type="file"
              name="resumes"
              multiple
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="glass flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground"
              >
                <FileText className="h-4 w-4 text-neon-pink" />
                <span className="max-w-[140px] truncate">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="ml-1 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleSubmit}
          disabled={!hasJd || files.length === 0 || isAnalyzing}
          className="pulse-glow flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink px-8 py-4 text-base font-bold text-foreground transition-all duration-300 hover:scale-[1.02] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:scale-100"
        >
          <Zap className="h-5 w-5" />
          {isAnalyzing ? "Analyzing..." : "Analyze Resumes"}
        </button>
      </div>
    </section>
  )
}
