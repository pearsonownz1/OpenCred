"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="hero">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20 pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-primary/20 rounded-full" />
      <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-primary/30 rounded-full" />
      <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-primary/10 rounded-full" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              AI-Powered Credential Evaluation
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="relative z-10 hover:text-primary transition-colors duration-300">
              Transform International Credential Evaluation with AI
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Empower your institution with automated evaluations that deliver accurate US equivalency assessments in
            minutes, not weeks
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" className="gap-2" asChild>
              <Link to="/dashboard">
                Get Started <ArrowRight size={16} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/dashboard">Take Tour</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
