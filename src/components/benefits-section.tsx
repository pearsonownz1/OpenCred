"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Zap, Shield, Users } from "lucide-react"
import { AnimatedSection, StaggeredContainer, StaggeredItem } from "./animations"
import { DecoratedHeading } from "./decorated-heading"

export function BenefitsSection() {
  const benefits = [
    {
      icon: Zap,
      title: "Faster Evaluations",
      description: "Reduce evaluation time by up to 75%, processing credentials in minutes instead of weeks",
      color: "bg-blue-500",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: CheckCircle,
      title: "Higher Accuracy",
      description: "Achieve 98.7% accuracy with AI-powered analysis verified by credential experts",
      color: "bg-green-500",
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Shield,
      title: "Reduced Risk",
      description: "Minimize compliance issues with standardized evaluation processes and detailed documentation",
      color: "bg-amber-500",
      iconColor: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      icon: Users,
      title: "Better Student Experience",
      description: "Provide faster admissions decisions and transparent credential evaluation processes",
      color: "bg-purple-500",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 relative">
      {/* Background decorations */}
      <div className="absolute top-40 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <DecoratedHeading subtitle="Key Benefits">Why Choose OpenEval?</DecoratedHeading>
          <p className="text-lg text-muted-foreground">
            Our platform delivers tangible benefits that transform how your institution handles international
            credentials.
          </p>
        </AnimatedSection>

        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <StaggeredItem key={index}>
              <Card className="border-none shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden h-full hover:translate-y-[-5px] duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={`${benefit.bgColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                    <benefit.icon className={`h-6 w-6 ${benefit.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground flex-grow">{benefit.description}</p>
                </CardContent>
              </Card>
            </StaggeredItem>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  )
}

