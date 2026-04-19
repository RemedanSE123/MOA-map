"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Home, Search, Book, FileText } from "lucide-react"
import Image from "next/image"

interface TopNavigationProps {
  title?: string
  subtitle?: string
}

export function TopNavigation({ title = "Agricultural Data Portal", subtitle }: TopNavigationProps) {
  const [dateStr, setDateStr] = useState("")
  const [timeStr, setTimeStr] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const dateOptions: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
      setDateStr(now.toLocaleDateString("en-US", dateOptions))
      setTimeStr(now.toLocaleTimeString("en-US", timeOptions))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="relative w-full h-16 md:h-[4.5rem] overflow-hidden border-b border-emerald-200/40 bg-gradient-to-r from-emerald-950 via-emerald-800 to-emerald-700 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
      <div className="pointer-events-none absolute right-0 top-[-50px] h-40 w-40 rounded-full bg-emerald-200/20 blur-3xl" />
      <div className="relative z-10 h-full flex items-center justify-between px-4 md:px-6">
      {/* Left Section - Branding */}
      <div className="flex items-center space-x-3 md:space-x-4 flex-shrink-0">
        <div className="h-10 w-10 rounded-xl bg-white/15 ring-1 ring-white/40 backdrop-blur-md flex items-center justify-center shadow-lg">
          <Image src="/moe.webp" alt="Logo" width={32} height={32} className="rounded-none" />
        </div>
        <div className="min-w-0">
          <h1 className="text-sm md:text-lg lg:text-xl font-bold text-white tracking-tight truncate">
            {title || "Ministry of Agriculture - Ethiopia"}
          </h1>
          {subtitle && (
            <p className="text-xs text-emerald-50/90 flex items-center space-x-2">
              <Shield className="h-3 w-3 flex-shrink-0 text-emerald-100" />
              <span className="hidden sm:inline truncate">{subtitle}</span>
            </p>
          )}
        </div>
      </div>

      {/* Center Section - Search (Desktop Only) */}
      <div className="flex-1 max-w-md mx-4 md:mx-8 hidden lg:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
          <Input
            placeholder="Search regions, crops, weather data..."
            className="pl-10 h-10 rounded-xl border-white/30 bg-white/12 text-white placeholder:text-white/60 focus:border-white/70 focus:ring-2 focus:ring-white/25 transition-all duration-200"
          />
        </div>
      </div>

      {/* Right Section - Home Icon, User Manual, Documentation, Date & Time */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 rounded-xl border border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            title="Home"
          >
            <Home className="h-4 w-4" />
          </Button>

          <a
            href="/User Manual.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 rounded-xl border border-white/30 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 hover:text-white transition-colors"
            title="User Manual"
          >
            <Book className="h-4 w-4" />
          </a>

          <a
            href="http://196.189.234.104/moa-docs/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 rounded-xl border border-white/30 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 hover:text-white transition-colors"
            title="Documentation"
          >
            <FileText className="h-4 w-4" />
          </a>

          <div className="hidden xl:flex flex-col items-center justify-center text-xs font-medium text-white/90 bg-white/10 border border-white/30 rounded-lg px-3 py-1.5 backdrop-blur-md">
            <div>{dateStr}</div>
            <div className="mt-0.5 font-mono text-white">{timeStr}</div>
          </div>

          {/* Medium screens - show only time */}
          <div className="hidden lg:flex xl:hidden text-xs font-medium text-white/90 bg-white/10 border border-white/30 rounded-md px-2 py-1">
            <div className="font-mono">{timeStr}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
