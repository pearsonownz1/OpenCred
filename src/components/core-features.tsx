"use client"

import { Brain, FileText, Users, Lock, BarChart3, FileOutput, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection, StaggeredContainer, StaggeredItem } from "./animations"
import { DecoratedHeading } from "./decorated-heading"

export function CoreFeatures() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Evaluation",
      description:
        "Our advanced AI analyzes international credentials and generates accurate US equivalency reports in minutes",
    },
    {
      icon: FileText,
      title: "Document Management",
      description:
        "Securely store, organize, and access all student documents with our intuitive document management system",
    },
    {
      icon: Users,
      title: "Collaboration Tools",
      description: "Work together seamlessly with team members on evaluations with real-time collaboration features",
    },
    {
      icon: Lock,
      title: "Secure & Compliant",
      description: "Rest easy knowing all data is encrypted and our platform meets the highest security standards",
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Gain insights into evaluation trends and processing times with comprehensive analytics",
    },
    {
      icon: FileOutput,
      title: "Custom Reports",
      description: "Generate branded, professional reports that can be easily shared with students and institutions",
    },
  ]

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-muted/30 relative">
      {/* Background decorations */}
      <div className="absolute top-40 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <DecoratedHeading subtitle="Core Features" subtitleIcon={Sparkles}>
            Powerful Features for Seamless Evaluation
          </DecoratedHeading>
          <p className="text-lg text-muted-foreground">
            OpenEval combines cutting-edge AI with intuitive tools designed specifically for credential evaluation
            professionals.
          </p>
        </AnimatedSection>

        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <StaggeredItem key={index}>
              <Card className="border-none shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden h-full hover:translate-y-[-5px] duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground flex-grow">{feature.description}</p>
                </CardContent>
              </Card>
            </StaggeredItem>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  )
}

