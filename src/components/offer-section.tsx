"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Package } from "lucide-react"
import { AnimatedSection } from "./animations"
import { DecoratedHeading } from "./decorated-heading"
import React from "react";
import { Link } from "react-router-dom";

export function OfferSection() {
  const features = [
    "AI-powered credential analysis",
    "Unlimited document storage",
    "Custom branded reports",
    "Integration with your systems",
    "Priority support",
    "Regular updates and improvements",
  ]

  return (
    <section className="py-20 bg-primary/10 relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/5"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-primary/5"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-primary/5"></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 rounded-full bg-primary/5"></div>
      </div>

      <div className="container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <DecoratedHeading subtitle="Special Offer" subtitleIcon={Package}>
            Transform Your Credential Evaluation Process Today
          </DecoratedHeading>
          <p className="text-xl text-muted-foreground mb-8">
            Get started with OpenEval and experience the difference AI-powered credential evaluation can make
          </p>
        </AnimatedSection>

        <Card className="max-w-4xl mx-auto border border-primary/20 shadow-md">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Complete Platform Access</h3>
                <p className="mb-6 opacity-90">
                  Everything you need to streamline your international credential evaluation process
                </p>

                <ul className="space-y-3 mb-8">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/10 rounded-xl p-6 md:p-8 text-center">
                <div className="mb-4">
                  <span className="text-sm uppercase tracking-wider opacity-80">Starting at</span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold">$499</span>
                    <span className="text-xl opacity-80">/month</span>
                  </div>
                  <p className="text-sm opacity-80 mb-6">Billed annually</p>
                </div>

                <Button size="lg" className="w-full mb-4 group" asChild>
                  <Link to="#pricing">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <p className="text-sm opacity-80">14-day free trial, no credit card required</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
