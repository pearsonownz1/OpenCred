import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import components
import { EvaluationDetailsCard } from "@/components/evaluations/evaluation-details-card"
import { EvaluationTimeline } from "@/components/evaluations/evaluation-timeline"
import { DocumentList } from "@/components/evaluations/document-list"
import { CountryRules } from "@/components/evaluations/country-rules"
import { EvaluationNotes } from "@/components/evaluations/evaluation-notes"
import { StudentCard } from "@/components/evaluations/student-card"
import { InstitutionCard } from "@/components/evaluations/institution-card"
import { ActionButtons } from "@/components/evaluations/action-buttons"
import type { Evaluation } from "@/types/evaluation"

// Sample evaluation data based on the provided structure
const evaluationData: Evaluation = {
  id: "723f008c-5eaa-43c2-880c-406c45b41752",
  studentId: "8fee357c-62df-4d20-970d-d794590348e0",
  status: "SUBMITTED",
  submittedAt: "2025-03-30T15:51:39.130Z",
  evaluationType: "Document-by-Document",
  institution: "Goldner LLC",
  countryCode: "Germany",
  program: "Master",
  createdAt: "2025-03-30T15:51:39.130Z",
  updatedAt: "2025-03-30T15:51:39.130Z",
  assignedTo: "Dr. Williams",
  student: {
    id: "8fee357c-62df-4d20-970d-d794590348e0",
    name: "Mr. Bert Christiansen DVM",
    email: "Katheryn_Bechtelar@yahoo.com",
    createdAt: "2025-03-30T15:51:39.074Z",
    updatedAt: "2025-03-30T15:51:39.074Z",
  },
  documents: [
    {
      id: "fc23f0e1-33d2-4435-99a4-70fb553dfdf9",
      filename: "transcript.pdf",
      originalName: "transcript.pdf",
      path: "/documents/transcript.pdf",
      type: "TRANSCRIPT",
      mimetype: "application/pdf",
      size: 1241898,
      parsedData: {
        content:
          "Comptus inventore utilis laboriosam. Adiuvo uxor auxilium mollitia cruciamentum voluptatibus vomica eligendi. Crapula adficio caveo cruciamentum crastinus.",
      },
      evaluationRequestId: "723f008c-5eaa-43c2-880c-406c45b41752",
      createdAt: "2025-03-30T15:51:39.131Z",
      updatedAt: "2025-03-30T15:51:39.131Z",
    },
    {
      id: "gc23f0e1-33d2-4435-99a4-70fb553dfdf0",
      filename: "diploma.pdf",
      originalName: "diploma.pdf",
      path: "/documents/diploma.pdf",
      type: "DIPLOMA",
      mimetype: "application/pdf",
      size: 2483796,
      parsedData: {
        content:
          "This certifies that Bert Christiansen has successfully completed all requirements for the degree of Master of Science in Computer Science from Goldner LLC University.",
      },
      evaluationRequestId: "723f008c-5eaa-43c2-880c-406c45b41752",
      createdAt: "2025-03-30T15:51:39.131Z",
      updatedAt: "2025-03-30T15:51:39.131Z",
    },
  ],
  country: {
    id: "60ed2a20-2489-4c60-ab61-a5503e21f46c",
    country: "Germany",
    rules: JSON.stringify({
      educationSystem:
        "Germany has a well-structured education system with primary education (Grundschule), secondary education (Gymnasium, Realschule, Hauptschule), and tertiary education (universities, universities of applied sciences).",
      gradingScale:
        "German universities typically use a 1-5 grading scale, where 1.0 is the highest grade and 4.0 is the minimum passing grade. 5.0 is a failing grade.",
      degreeEquivalence:
        "German Bachelor's degrees (3-4 years) are generally equivalent to U.S. Bachelor's degrees. German Master's degrees (1-2 years) are generally equivalent to U.S. Master's degrees. German doctoral degrees are generally equivalent to U.S. doctoral degrees.",
    }),
    createdAt: "2025-03-30T15:11:41.220Z",
    updatedAt: "2025-03-30T15:11:41.220Z",
  },
  estimatedCompletionDate: "2025-04-15T00:00:00.000Z",
  progress: 35,
  notes: "Student has provided all required documents. Initial review shows consistent academic performance.",
  timeline: [
    {
      id: 1,
      status: "SUBMITTED",
      date: "2025-03-30T15:51:39.130Z",
      user: "System",
    },
    {
      id: 2,
      status: "ASSIGNED",
      date: "2025-03-31T09:15:22.130Z",
      user: "Admin",
    },
    {
      id: 3,
      status: "IN_PROGRESS",
      date: "2025-03-31T10:30:45.130Z",
      user: "Dr. Williams",
    },
  ],
}

export default function EvaluationDetailPage() {
  const { id } = useParams()
  const [evaluation, setEvaluation] = useState<Evaluation>(evaluationData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, we would fetch the evaluation data based on the ID
    // For now, we'll just simulate a loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading evaluation information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/dashboard/evaluations" className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Evaluation Details</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Generate Report</Button>
          <Button>Update Status</Button>
        </div>
      </div>

      {/* Status Card */}
      <EvaluationDetailsCard evaluation={evaluation} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Card */}
          {evaluation.progress && evaluation.timeline && evaluation.estimatedCompletionDate && (
            <EvaluationTimeline
              progress={evaluation.progress}
              timeline={evaluation.timeline}
              estimatedCompletionDate={evaluation.estimatedCompletionDate}
            />
          )}

          {/* Tabs for Documents, Country Info, and Notes */}
          <Tabs defaultValue="documents">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="country">Country Information</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            {/* Documents Tab */}
            <TabsContent value="documents" className="mt-4">
              <DocumentList documents={evaluation.documents} />
            </TabsContent>

            {/* Country Information Tab */}
            <TabsContent value="country" className="mt-4">
              <CountryRules country={evaluation.country} />
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="mt-4">
              {evaluation.notes && <EvaluationNotes notes={evaluation.notes} />}
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Student Card */}
          <StudentCard student={evaluation.student} />

          {/* Institution Card */}
          <InstitutionCard
            institution={evaluation.institution}
            program={evaluation.program}
            country={evaluation.country.country}
          />

          {/* Actions Card */}
          <ActionButtons />
        </div>
      </div>
    </div>
  )
}
