"use client"

import { Upload, Brain, CheckCircle2, FileOutput, Workflow } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection, StaggeredContainer, StaggeredItem } from "./animations"
import { DecoratedHeading } from "./decorated-heading"

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Documents",
      description:
        "Simply upload student credentials to the platform. Our system accepts various document formats including PDFs, images, and scanned files.",
      color: "bg-blue-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      orb: "bg-blue-500",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description:
        "Our advanced AI analyzes the documents and generates preliminary evaluations by comparing credentials against our comprehensive database.",
      color: "bg-green-500",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      orb: "bg-green-500",
    },
    {
      icon: CheckCircle2,
      title: "Expert Review",
      description:
        "Your team reviews and approves the evaluations. While our AI does the heavy lifting, credential specialists can verify results if needed.",
      color: "bg-orange-500",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      orb: "bg-orange-500",
    },
    {
      icon: FileOutput,
      title: "Generate Reports",
      description:
        "Create and share professional evaluation reports. Customize reports with your institution's branding and deliver them in multiple formats.",
      color: "bg-purple-500",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      orb: "bg-purple-500",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-muted/30 relative">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-primary/20 rounded-full" />
      <div className="absolute top-1/3 right-10 w-6 h-6 bg-primary/10 rounded-full" />
      <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-primary/15 rounded-full" />
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-primary/25 rounded-full" />

      <div className="container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <DecoratedHeading subtitle="Process" subtitleIcon={Workflow}>
            How It Works
          </DecoratedHeading>
          <p className="text-lg text-muted-foreground">
            OpenEval simplifies the credential evaluation process with a streamlined workflow.
          </p>
        </AnimatedSection>

        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <StaggeredItem key={index}>
              <Card className="border-none shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden h-full hover:translate-y-[-5px] duration-300">
                <CardContent className="p-6 pt-10 relative">
                  {/* Prominent circle at the top */}
                  <div
                    className={`absolute top-0 left-6 w-10 h-10 rounded-full ${step.orb} transform -translate-y-1/2 orb orb-indicator`}
                  ></div>
                  <div className="flex justify-between items-start">
                    <div>
                      {/* Pill-shaped step indicator with icon */}
                      <div className="mb-3 inline-flex items-center bg-muted/70 rounded-full px-3 py-1">
                        <div className="bg-muted-foreground/10 rounded-full h-5 w-5 flex items-center justify-center mr-2">
                          <span className="text-xs font-medium text-muted-foreground">{index + 1}</span>
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">Step</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    <div className={`${step.iconBg} p-3 rounded-full flex-shrink-0 ml-4`}>
                      <step.icon className={`h-6 w-6 ${step.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggeredItem>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  )
}

