"use client"

import { AnimatedSection } from "./animations"
import { DecoratedHeading } from "./decorated-heading"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

export function FaqSection() {
  const faqs = [
    {
      question: "How does AI-powered credential evaluation work?",
      answer:
        "Our AI system analyzes academic documents by comparing them against our comprehensive database of international educational systems. It identifies key information such as institution accreditation, program details, and course content, then applies established evaluation standards to generate US equivalency recommendations. Each evaluation is reviewed by credential experts before finalization.",
    },
    {
      question: "How long does an evaluation typically take?",
      answer:
        "With our AI-powered system, most standard evaluations are completed within minutes. Complex cases requiring additional research or verification may take longer. The dashboard provides real-time status updates for all evaluations in progress.",
    },
    {
      question: "What types of documents can be evaluated?",
      answer:
        "OpenEval can process a wide range of academic documents including diplomas, transcripts, certificates, and degree statements. We support documents from over 200 countries and educational systems worldwide. Documents can be uploaded in PDF, JPG, or PNG formats.",
    },
    {
      question: "How accurate are the evaluations?",
      answer:
        "Our system maintains a 98.7% accuracy rate compared to traditional manual evaluations. All AI-generated evaluations are verified by credential specialists before being finalized to ensure the highest level of accuracy and compliance with international standards.",
    },
    {
      question: "Is my data secure?",
      answer:
        "OpenEval employs enterprise-grade security measures including end-to-end encryption, secure cloud storage, and strict access controls. We are compliant with FERPA, GDPR, and other relevant data protection regulations. All student data and documents are stored securely and only accessible to authorized users.",
    },
    {
      question: "Can I customize the evaluation reports?",
      answer:
        "Yes, OpenEval allows you to customize evaluation reports with your institution's branding, including logos and contact information. You can also select different report formats and choose which sections to include based on your specific requirements.",
    },
  ]

  return (
    <section id="faq" className="py-20 bg-muted/30 relative">
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-primary/20 rounded-full" />
      <div className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-primary/10 rounded-full" />

      <div className="container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <DecoratedHeading subtitle="FAQ" subtitleIcon={HelpCircle}>
            Frequently Asked Questions
          </DecoratedHeading>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about OpenEval's credential evaluation services
          </p>
        </AnimatedSection>

        <Card className="max-w-4xl mx-auto border-none shadow-md">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/40 last:border-0">
                <AccordionTrigger className="py-6 text-lg font-medium hover:text-primary transition-colors px-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Decorative orbs */}
        <div className="absolute -bottom-4 left-1/4 w-8 h-8 rounded-full bg-blue-500/20 orb orb-small"></div>
        <div className="absolute -bottom-8 right-1/3 w-12 h-12 rounded-full bg-orange-500/20 orb orb-medium"></div>
      </div>
    </section>
  )
}

