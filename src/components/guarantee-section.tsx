"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, ArrowRight } from "lucide-react"
import { AnimatedSection } from "./animations"
import { DecoratedHeading } from "./decorated-heading"
import { Link } from "react-router-dom"

export function GuaranteeSection() {
  return (
    <section className="py-20 bg-muted/30 relative">
      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <Card className="max-w-4xl mx-auto border-primary/20 shadow-lg">
          <CardContent className="p-8 md:p-12"> 
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-primary/10 p-8 rounded-full">
                  <ShieldCheck className="h-24 w-24 text-primary" />
                </div>
              </div>

              <div className="md:w-2/3">
                <AnimatedSection>
                  <DecoratedHeading subtitle="Risk-Free" align="left">
                    Our 30-Day Money-Back Guarantee
                  </DecoratedHeading>

                  <p className="text-lg mb-6">
                    We're confident that OpenEval will transform your credential evaluation process. If you're not
                    completely satisfied within the first 30 days, we'll refund your subscription fee—no questions
                    asked.
                  </p>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-medium">1</span>
                      </div>
                      <span>Try OpenEval risk-free for 30 days</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-medium">2</span>
                      </div>
                      <span>Implement it in your workflow</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-medium">3</span>
                      </div>
                      <span>If you're not satisfied, get a full refund</span>
                    </li>
                  </ul>

                  <Button size="lg" className="group" asChild>
                    <Link to="#faq">
                      Get Started Today
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </AnimatedSection>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

