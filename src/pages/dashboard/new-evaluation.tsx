import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ChevronLeft, ArrowLeft, Info, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StudentLookupForm } from "@/components/evaluations/requests/student-lookup-form"
import { StudentForm, type StudentFormValues } from "@/components/evaluations/requests/student-form"
import {
  EvaluationDetailsForm,
  type EvaluationDetailsFormValues,
} from "@/components/evaluations/requests/evaluation-details-form"
import {
  DocumentUploadForm,
  type DocumentUploadFormValues,
} from "@/components/evaluations/requests/document-upload-form"
import { StepIndicator } from "@/components/evaluations/requests/step-indicator"
import { useToast } from "@/components/ui/use-toast"
import type { Student } from "@/types/evaluation"

// Define the steps
const steps = [
  { id: 1, label: "Student", icon: "user" as const },
  { id: 2, label: "Details", icon: "school" as const },
  { id: 3, label: "Documents", icon: "document" as const },
  { id: 4, label: "Review", icon: "check" as const },
]

interface FormData {
  student: {
    firstName: string
    lastName: string
    email: string
  }
  evaluation: {
    institution: string
    country: string
    program: string
    evaluationType: string
  }
  documents: {
    transcript: File | null
    diploma: File | null
    additionalDocuments: File | null
  }
}

export default function NewEvaluationRequestPage() {
  const [step, setStep] = useState(1)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showNewStudentForm, setShowNewStudentForm] = useState(false)
  const [newStudentEmail, setNewStudentEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    student: {
      firstName: "",
      lastName: "",
      email: "",
    },
    evaluation: {
      institution: "",
      country: "",
      program: "",
      evaluationType: "",
    },
    documents: {
      transcript: null,
      diploma: null,
      additionalDocuments: null,
    },
  })

  const handleStudentFound = (student: Student) => {
    setSelectedStudent(student)
    setShowNewStudentForm(false)
    const [firstName, ...lastNameParts] = student.name.split(" ")
    setFormData((prev) => ({
      ...prev,
      student: {
        firstName,
        lastName: lastNameParts.join(" "),
        email: student.email,
      },
    }))
    handleNext()
  }

  const handleCreateNewStudent = (email: string) => {
    setNewStudentEmail(email)
    setShowNewStudentForm(true)
  }

  const handleStudentFormSubmit = (data: StudentFormValues) => {
    setFormData((prev) => ({
      ...prev,
      student: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      },
    }))
    handleNext()
  }

  const handleEvaluationDetailsSubmit = (data: EvaluationDetailsFormValues) => {
    setFormData((prev) => ({
      ...prev,
      evaluation: {
        institution: data.institution,
        country: data.country,
        program: data.program,
        evaluationType: data.evaluationType,
      },
    }))
    handleNext()
  }

  const handleDocumentUploadSubmit = (data: DocumentUploadFormValues) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        transcript: data.transcript,
        diploma: data.diploma,
        additionalDocuments: data.additionalDocuments,
      },
    }))
    handleNext()
  }

  const handleSkipDocuments = () => {
    handleNext()
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // In a real app, we would submit the form data to the server
      // const response = await submitEvaluationRequest(formData)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call

      toast({
        title: "Success",
        description: "Your evaluation request has been submitted successfully.",
      })
      navigate("/dashboard/evaluations")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit evaluation request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const getStepInfo = () => {
    switch (step) {
      case 1:
        return {
          title: "Student Information",
          description: "First, we'll need to identify the student for this evaluation request. You can either look up an existing student by email or create a new student record.",
          points: [
            "Search for existing students by email",
            "Create new student records if needed",
            "All student information is securely stored",
          ],
        }
      case 2:
        return {
          title: "Evaluation Details",
          description: "Provide information about the academic institution and program that needs to be evaluated.",
          points: [
            "Enter institution name and country",
            "Specify program details",
            "Choose evaluation type",
          ],
        }
      case 3:
        return {
          title: "Required Documents",
          description: "Upload the necessary documents for the evaluation process. You can skip this step and add documents later.",
          points: [
            "Academic transcript (optional)",
            "Diploma/degree certificate (optional)",
            "Additional supporting documents (optional)",
          ],
        }
      case 4:
        return {
          title: "Review Information",
          description: "Review all the information before submitting the evaluation request.",
          points: [
            "Verify student details",
            "Check evaluation information",
            "Confirm uploaded documents",
          ],
        }
      default:
        return {
          title: "",
          description: "",
          points: [],
        }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard/evaluations" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ChevronLeft className="h-4 w-4" />
            Back to Evaluations
          </Link>
          <h1 className="text-2xl font-semibold">New Evaluation Request</h1>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <StepIndicator steps={steps} currentStep={step} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Student Information</CardTitle>
                  <CardDescription>
                    {showNewStudentForm
                      ? "Fill in the student details to create a new record"
                      : "Search for an existing student or create a new one"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!showNewStudentForm ? (
                    <StudentLookupForm onStudentFound={handleStudentFound} onCreateNew={handleCreateNewStudent} />
                  ) : (
                    <StudentForm
                      defaultValues={{
                        email: newStudentEmail,
                        firstName: "",
                        lastName: "",
                      }}
                      onSubmit={handleStudentFormSubmit}
                    />
                  )}
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Evaluation Details</CardTitle>
                  <CardDescription>
                    Provide information about the academic program and type of evaluation needed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EvaluationDetailsForm
                    defaultValues={{
                      institution: formData.evaluation.institution,
                      country: formData.evaluation.country,
                      program: formData.evaluation.program,
                      evaluationType: formData.evaluation.evaluationType,
                    }}
                    onSubmit={handleEvaluationDetailsSubmit}
                  />
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Document Upload</CardTitle>
                  <CardDescription>
                    Upload the required documents for evaluation. You can also skip this step and upload documents later.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DocumentUploadForm
                    defaultValues={{
                      transcript: formData.documents.transcript,
                      diploma: formData.documents.diploma,
                      additionalDocuments: formData.documents.additionalDocuments,
                    }}
                    onSubmit={handleDocumentUploadSubmit}
                    onSkip={handleSkipDocuments}
                  />
                </CardContent>
              </Card>
            )}

            {step === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review & Submit</CardTitle>
                  <CardDescription>
                    Review your evaluation request details before submitting
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="font-medium">Student Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Name</p>
                        <p>{formData.student.firstName} {formData.student.lastName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Email</p>
                        <p>{formData.student.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Evaluation Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Institution</p>
                        <p>{formData.evaluation.institution}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Country</p>
                        <p>{formData.evaluation.country}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Program</p>
                        <p>{formData.evaluation.program}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Evaluation Type</p>
                        <p>{formData.evaluation.evaluationType}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Documents</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Academic Transcript</p>
                        <p>{formData.documents.transcript ? formData.documents.transcript.name : "Not uploaded"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Diploma/Certificate</p>
                        <p>{formData.documents.diploma ? formData.documents.diploma.name : "Not uploaded"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Additional Documents</p>
                        <p>
                          {formData.documents.additionalDocuments
                            ? formData.documents.additionalDocuments.name
                            : "Not uploaded"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleBack} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Evaluation Request"}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          {/* Info Section */}
          <div className="lg:col-span-1">
            <Card className="bg-muted border-none sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#0F4C81]">
                  <Info className="h-5 w-5" />
                  {getStepInfo().title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground">{getStepInfo().description}</p>
                <div className="space-y-3">
                  {getStepInfo().points.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 mt-2 rounded-full bg-[#0F4C81]" />
                      <p className="text-sm">{point}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
