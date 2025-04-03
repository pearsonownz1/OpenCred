"use client"

import { Zap, CheckCircle, Shield, Briefcase, Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection, StaggeredContainer, StaggeredItem } from "./animations"
import { DecoratedHeading } from "./decorated-heading"

export function SolutionOverview() {
  const benefits = [
    {
      icon: Zap,
      title: "Speed",
      description: "Reduce evaluation time by up to 75%",
      color: "bg-blue-500",
    },
    {
      icon: CheckCircle,
      title: "Accuracy",
      description: "Ensure consistent results with advanced AI analysis",
      color: "bg-green-500",
    },
    {
      icon: Shield,
      title: "Compliance",
      description: "Stay compliant with educational standards and regulations",
      color: "bg-amber-500",
    },
    {
      icon: Briefcase,
      title: "Efficiency",
      description: "Free your team to focus on high-value tasks",
      color: "bg-purple-500",
    },
  ]

  return (
    <section id="solution" className="py-20 relative">
      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary/20 rounded-full" />
      <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-primary/10 rounded-full" />

      <div className="container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <DecoratedHeading subtitle="The Solution" subtitleIcon={Lightbulb}>
            Meet OpenEval: Your AI-Powered Credential Analysis Platform
          </DecoratedHeading>
          <p className="text-lg text-muted-foreground">
            Our platform combines advanced AI with educational expertise to transform how institutions evaluate
            international credentials.
          </p>
        </AnimatedSection>

        <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <StaggeredItem key={index}>
              <Card className="border border-border/40 shadow-sm hover:shadow-md transition-all rounded-lg overflow-hidden h-full hover:border-primary/20">
                <CardContent className="p-6 pt-8 text-left relative">
                  <div
                    className={`absolute top-0 left-6 w-10 h-10 rounded-full ${benefit.color} transform -translate-y-1/2 orb orb-indicator`}
                  ></div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </StaggeredItem>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  )
}

