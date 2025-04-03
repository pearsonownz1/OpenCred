"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedSection, StaggeredContainer, StaggeredItem } from "./animations"
import { DecoratedHeading } from "./decorated-heading"
import { MessageSquare } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "OpenEval has transformed our international admissions process. What used to take weeks now takes minutes, and the accuracy is remarkable.",
      author: "Dr. Sarah Johnson",
      role: "Director of International Admissions",
      organization: "Pacific State University",
      avatar: "SJ",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "As an immigration attorney, I need reliable credential evaluations. OpenEval provides consistent, detailed reports that stand up to scrutiny in legal proceedings.",
      author: "Michael Chen",
      role: "Immigration Attorney",
      organization: "Chen & Associates",
      avatar: "MC",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "The analytics dashboard gives us valuable insights into our evaluation patterns and helps us identify areas for improvement in our admissions process.",
      author: "Dr. Amara Patel",
      role: "Dean of Admissions",
      organization: "Westlake College",
      avatar: "AP",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20 relative">
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-primary/15 rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-primary/20 rounded-full" />

      <div className="container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <DecoratedHeading subtitle="Testimonials" subtitleIcon={MessageSquare}>
            What Our Clients Say
          </DecoratedHeading>
          <p className="text-lg text-muted-foreground">
            Hear from institutions that have transformed their credential evaluation process with OpenEval.
          </p>
        </AnimatedSection>

        <StaggeredContainer className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <StaggeredItem key={index}>
              <Card className="border-none shadow-sm hover:shadow-md transition-all h-full rounded-3xl overflow-hidden hover:translate-y-[-5px] duration-300">
                <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  <Avatar className="h-16 w-16 mb-6">
                    <AvatarImage src={testimonial.image} alt={testimonial.author} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">{testimonial.avatar}</AvatarFallback>
                  </Avatar>

                  <p className="text-lg mb-6 flex-grow">{testimonial.quote}</p>

                  <div className="mt-auto">
                    <h4 className="font-semibold text-lg">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.organization}</p>
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

