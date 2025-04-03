import React from "react"
import { User, School, FileText, Check } from "lucide-react"

interface Step {
  id: number
  label: string
  icon: "user" | "school" | "document" | "check"
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex flex-col items-center w-full max-w-3xl">
        <div className="flex items-center w-full">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.id ? "bg-[#0F4C81] text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.icon === "user" && <User className="h-5 w-5" />}
                  {step.icon === "school" && <School className="h-5 w-5" />}
                  {step.icon === "document" && <FileText className="h-5 w-5" />}
                  {step.icon === "check" && <Check className="h-5 w-5" />}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    currentStep === step.id ? "text-[#0F4C81]" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 ${currentStep > step.id ? "bg-[#0F4C81]" : "bg-muted"}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
