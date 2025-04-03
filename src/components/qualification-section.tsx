"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Building, Scale, Award, CheckCircle } from "lucide-react"
import { AnimatedSection, StaggeredContainer, StaggeredItem } from "./animations"
import { DecoratedHeading } from "./decorated-heading"
import { Link } from "react-router-dom"

export function QualificationSection() {
  const qualifications = [
    {
      icon: GraduationCap,
      title: "Universities & Colleges",
      description: "Process international student applications efficiently with accurate credential evaluations",
      checks: ["High volume processing", "Admissions integration", "Compliance assurance"],
      color: "bg-blue-500",
    },
    {
      icon: Building,
      title: "Community Colleges",
      description: "Streamline transfer credit evaluations for international students",
      checks: ["Transfer credit mapping", "Quick turnaround", "Cost-effective solution"],
      color: "bg-green-500",
    },
    {
      icon: Scale,
      title: "Licensing Boards",
      description: "Verify international qualifications for professional licensing with confidence",
      checks: ["Regulatory compliance", "Detailed documentation", "Standardized process"],
      color: "bg-amber-500",
    },
    {
      icon: Award,
      title: "Immigration Services",
      description: "Support immigration cases with reliable credential evaluations",
      checks: ["Legal documentation", "Fast processing", "Expert verification"],
      color: "bg-purple-500",
    },
  ]

  return (
    <section className="py-20 bg-muted/30 relative">
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <DecoratedHeading subtitle="Is OpenEval Right For You?">Who Benefits Most From Our Platform</DecoratedHeading>
          <p className="text-lg text-muted-foreground">
            OpenEval is designed for organizations that regularly evaluate international credentials
          </p>
        </AnimatedSection>

        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {qualifications.map((item, index) => (
            <StaggeredItem key={index}>
              <Card className="border border-border/40 shadow-sm hover:shadow-md transition-all h-full rounded-lg overflow-hidden">
                <CardContent className="p-8 pt-10 relative">
                  <div
                    className={`absolute top-0 left-6 w-10 h-10 rounded-full ${item.color} transform -translate-y-1/2 orb orb-indicator`}
                  ></div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>

                  <p className="text-muted-foreground mb-6">{item.description}</p>

                  <ul className="space-y-3 mb-6">
                    {item.checks.map((check, i) => (
                      <li key={i} className="flex items-center gap-2 pb-2 border-b border-muted last:border-0">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="outline" className="w-full" asChild>
                    <Link to="#offer">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </StaggeredItem>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  )
}

