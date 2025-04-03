"use client"

import { GraduationCap, Building, Scale, Award, Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection, StaggeredContainer, StaggeredItem } from "./animations"
import { DecoratedHeading } from "./decorated-heading"

export function InstitutionSolutions() {
  const solutions = [
    {
      icon: GraduationCap,
      title: "Universities & Colleges",
      description:
        "Streamline international student admissions with automated credential evaluations that maintain high standards while reducing processing time.",
      category: "HIGHER EDUCATION",
      color: "bg-green-500",
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Building,
      title: "Community Colleges",
      description:
        "Efficiently process transfer credits and international credentials for student transitions with consistent and reliable evaluations.",
      category: "EDUCATION",
      color: "bg-orange-500",
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: Scale,
      title: "Law Firms",
      description:
        "Conduct thorough credential evaluations for immigration cases with assured compliance and detailed documentation for legal proceedings.",
      category: "LEGAL",
      color: "bg-blue-500",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Award,
      title: "Licensing Boards",
      description:
        "Verify international qualifications for professional licensing with reliable evaluations that meet regulatory requirements.",
      category: "REGULATORY",
      color: "bg-green-500",
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  return (
    <section id="solutions" className="py-20 relative">
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-primary/20 rounded-full" />

      <div className="container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <DecoratedHeading subtitle="Tailored Solutions" subtitleIcon={Briefcase}>
            Solutions for Different Institutions
          </DecoratedHeading>
          <p className="text-lg text-muted-foreground">
            OpenEval adapts to the unique needs of various organizations dealing with international credentials.
          </p>
        </AnimatedSection>

        <StaggeredContainer className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <StaggeredItem key={index}>
              <Card className="border border-border/40 shadow-sm hover:shadow-md transition-all h-full rounded-lg overflow-hidden">
                <CardContent className="p-8 pt-10 relative">
                  <div
                    className={`absolute top-0 left-6 w-10 h-10 rounded-full ${solution.color} transform -translate-y-1/2 orb orb-indicator`}
                  ></div>
                  <div className="text-sm font-medium text-muted-foreground mb-2">{solution.category}</div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4">{solution.title}</h3>
                      <p className="text-muted-foreground">{solution.description}</p>
                    </div>
                    <div className={`${solution.bgColor} p-3 rounded-full flex-shrink-0 ml-4`}>
                      <solution.icon className={`h-6 w-6 ${solution.iconColor}`} />
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

