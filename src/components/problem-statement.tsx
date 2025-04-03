"use client"

import { Clock, AlertTriangle, BarChart, ShieldAlert, HelpCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection, StaggeredContainer, StaggeredItem } from "./animations"
import { DecoratedHeading } from "./decorated-heading"

export function ProblemStatement() {
  const challenges = [
    {
      icon: Clock,
      title: "Time-consuming manual processes",
      description: "Traditional evaluation methods require hours of manual document review and research.",
    },
    {
      icon: AlertTriangle,
      title: "Inconsistent evaluation standards",
      description: "Different evaluators may reach different conclusions about the same credentials.",
    },
    {
      icon: BarChart,
      title: "Backlog during peak admission seasons",
      description: "Application surges create bottlenecks that delay admissions decisions.",
    },
    {
      icon: ShieldAlert,
      title: "Risk of compliance issues",
      description: "Maintaining compliance with changing educational standards and regulations is challenging.",
    },
  ]

  return (
    <section id="problem" className="py-20 bg-muted/50 relative">
      {/* Background decorations */}
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-primary/30 rounded-full" />
      <div className="absolute bottom-1/4 left-20 w-5 h-5 bg-primary/20 rounded-full" />

      <div className="container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <DecoratedHeading subtitleIcon={HelpCircle}>Why International Credential Evaluation Matters</DecoratedHeading>
          <p className="text-lg text-muted-foreground">
            Educational institutions and organizations face significant challenges when evaluating international
            credentials, impacting admissions efficiency and student experiences.
          </p>
        </AnimatedSection>

        <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((challenge, index) => (
            <StaggeredItem key={index}>
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow rounded-3xl overflow-hidden hover:translate-y-[-5px] duration-300">
                <CardContent className="p-6">
                  <challenge.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
                  <p className="text-muted-foreground">{challenge.description}</p>
                </CardContent>
              </Card>
            </StaggeredItem>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  )
}

