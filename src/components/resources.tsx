"use client"

import { Button } from "@/components/ui/button"
import { FileText, BookOpen, HelpCircle, Mail, BookMarked } from "lucide-react"
import Link from "next/link"
import { AnimatedSection } from "./animations"
import { DecoratedHeading } from "./decorated-heading"

export function Resources() {
  const resources = [
    {
      icon: FileText,
      title: "User Manual",
      description: "Complete user manual with detailed instructions",
      link: "#",
      linkText: "View Manual",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: BookOpen,
      title: "API Documentation",
      description: "Technical documentation for API integration",
      link: "#",
      linkText: "View API Docs",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: HelpCircle,
      title: "Knowledge Base",
      description: "Searchable database of articles and solutions",
      link: "#",
      linkText: "Browse Articles",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
  ]

  return (
    <section id="resources" className="py-20 relative">
      {/* Background decorations */}
      <div className="absolute top-40 left-10 w-4 h-4 bg-primary/20 rounded-full" />
      <div className="absolute bottom-20 right-10 w-6 h-6 bg-primary/15 rounded-full" />

      <div className="container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-10">
          <DecoratedHeading subtitle="Resources" subtitleIcon={BookMarked}>
            Documentation
          </DecoratedHeading>
          <p className="text-lg text-muted-foreground">Comprehensive documentation for OpenEval</p>
        </AnimatedSection>

        <div className="max-w-6xl mx-auto rounded-xl border border-border/30 p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="border border-border/30 rounded-lg p-6 flex flex-col items-center text-center"
              >
                <div className={`${resource.iconBg} p-3 rounded-full mb-4`}>
                  <resource.icon className={`h-6 w-6 ${resource.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-muted-foreground mb-6">{resource.description}</p>
                <Button variant="outline" asChild className="mt-auto">
                  <Link href={resource.link}>{resource.linkText}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Support section */}
        <div className="max-w-6xl mx-auto bg-muted/30 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Need Additional Help?</h3>
              <p className="text-muted-foreground">
                Our support team is available Monday through Friday, 9am-5pm EST to assist with any questions or issues
                you may have.
              </p>
            </div>
            <Button className="shrink-0" asChild>
              <Link href="#">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

