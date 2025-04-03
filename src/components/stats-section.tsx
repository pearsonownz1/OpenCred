"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Clock, CheckCircle, Award, Users } from "lucide-react"
import { StaggeredContainer, StaggeredItem } from "./animations"

export function StatsSection() {
  const stats = [
    {
      icon: Clock,
      value: "75%",
      label: "Faster Evaluation",
      description: "Reduce evaluation time from weeks to minutes",
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
    },
    {
      icon: CheckCircle,
      value: "98.7%",
      label: "Accuracy Rate",
      description: "Verified by credential evaluation experts",
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
    },
    {
      icon: Award,
      value: "200+",
      label: "Countries Supported",
      description: "Comprehensive global education database",
      iconColor: "text-amber-500",
      iconBg: "bg-amber-100",
    },
    {
      icon: Users,
      value: "50+",
      label: "Partner Institutions",
      description: "Universities and organizations trust OpenEval",
      iconColor: "text-purple-500",
      iconBg: "bg-purple-100",
    },
  ]

  return (
    <section className="py-16 bg-muted/20">
      <div className="container">
        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerChildren={0.1}>
          {stats.map((stat, index) => (
            <StaggeredItem key={index}>
              <Card className="border-none shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className={`${stat.iconBg} p-3 rounded-full mb-4`}>
                      <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                    </div>
                    <div>
                      <div className="text-3xl font-bold">{stat.value}</div>
                      <div className="font-medium">{stat.label}</div>
                      <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
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

