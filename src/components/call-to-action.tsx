"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Calendar } from "lucide-react"
import React from "react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "./animations"
import { Card, CardContent } from "@/components/ui/card"

export function CallToAction() {
  const benefits = ["Faster evaluation process", "Improved accuracy & consistency", "Reduced operational costs"]

  return (
    <section className="py-20 bg-primary text-primary-foreground relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/5"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/5"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-white/5"></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 rounded-full bg-white/5"></div>
      </div>

      <div className="container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block group">
            <span className="relative z-10">Ready to Transform Your Credential Evaluation Process?</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </h2>
          <p className="text-xl opacity-90 mb-10">Join leading institutions already benefiting from OpenEval</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="gap-2 hover:scale-105 transition-transform" asChild>
              <Link to="/dashboard">
                Start Free Trial <ArrowRight size={16} />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10 hover:scale-105 transition-transform gap-2"
              asChild
            >
              <Link to="/dashboard">
                <Calendar size={16} /> Schedule Demo
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
