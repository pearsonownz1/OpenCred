"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"
import { AnimatedSection, StaggeredContainer, StaggeredItem } from "./animations"
import { DecoratedHeading } from "./decorated-heading"
import React from "react";
import { Link } from "react-router-dom";

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$299",
      description: "Perfect for small institutions with limited evaluation needs",
      features: [
        "Up to 50 evaluations per month",
        "Basic AI-powered analysis",
        "Standard document storage",
        "Email support",
        "Standard reports",
      ],
      highlighted: false,
      buttonText: "Get Started",
    },
    {
      name: "Professional",
      price: "$499",
      description: "Ideal for mid-sized institutions with regular evaluation needs",
      features: [
        "Up to 200 evaluations per month",
        "Advanced AI-powered analysis",
        "Unlimited document storage",
        "Priority email & phone support",
        "Custom branded reports",
        "API access",
        "Integration with student systems",
      ],
      highlighted: true,
      buttonText: "Most Popular",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large institutions with high-volume evaluation needs",
      features: [
        "Unlimited evaluations",
        "Premium AI-powered analysis",
        "Unlimited document storage",
        "24/7 dedicated support",
        "Custom branded reports",
        "Full API access",
        "Custom integrations",
        "Dedicated account manager",
        "On-site training",
      ],
      highlighted: false,
      buttonText: "Contact Sales",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 relative">
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <DecoratedHeading subtitle="Pricing Plans">Simple, Transparent Pricing</DecoratedHeading>
          <p className="text-lg text-muted-foreground">
            Choose the plan that's right for your institution's needs and budget
          </p>
        </AnimatedSection>

        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <StaggeredItem key={index}>
              <Card
                className={`border h-full flex flex-col ${plan.highlighted ? "border-primary shadow-lg relative" : "border-border/40 shadow-sm"}`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-sm font-medium py-1 px-4 rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader className={`pb-6 ${plan.highlighted ? "bg-primary/5" : ""}`}>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground ml-1">/month</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 pb-2 border-b border-muted last:border-0">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button
                    className={`w-full ${plan.highlighted ? "" : "variant-outline"}`}
                    variant={plan.highlighted ? "default" : "outline"}
                    asChild
                  >
                    <Link to="#guarantee">
                      {plan.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </StaggeredItem>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  )
}
