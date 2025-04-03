"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface DecoratedHeadingProps {
  children: ReactNode
  subtitle?: string
  subtitleIcon?: LucideIcon
  className?: string
  align?: "center" | "left" | "right"
  tag?: "h1" | "h2" | "h3"
}

export function DecoratedHeading({
  children,
  subtitle,
  subtitleIcon: SubtitleIcon,
  className = "",
  align = "center",
  tag = "h2",
}: DecoratedHeadingProps) {
  const alignmentClasses = {
    center: "text-center mx-auto",
    left: "text-left",
    right: "text-right ml-auto",
  }

  const HeadingTag = tag as keyof JSX.IntrinsicElements

  return (
    <div className={`relative ${alignmentClasses[align]} ${className}`}>
      {subtitle && (
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center bg-orange-50 text-orange-600 rounded-full px-6 py-2 text-base font-medium">
            {SubtitleIcon && <SubtitleIcon className="h-4 w-4 mr-2" />}
            {subtitle}
          </div>
        </div>
      )}

      <HeadingTag className="text-4xl md:text-5xl font-bold mb-6 relative inline-block group">
        <span className="relative z-10 hover:text-primary transition-colors duration-300">{children}</span>
        <motion.span
          className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Decorative elements - Orbs */}
        <span className="absolute -top-6 -left-6 w-4 h-4 rounded-full bg-primary/10 hidden md:block orb orb-accent" />
        <span className="absolute -bottom-6 -right-6 w-3 h-3 rounded-full bg-primary/20 hidden md:block orb orb-secondary" />
      </HeadingTag>
    </div>
  )
}

