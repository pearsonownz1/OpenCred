"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Plus, Filter, MoreVertical, ChevronRight, ChevronLeft, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useEvaluationRequests } from "@/hooks/use-evaluations"
import { useStudent } from "@/hooks/use-students"

interface EvaluationRequest {
  id: string
  studentId: string
  status: string
  evaluationType: string
  institution: string
  countryCode: string
  program: string
  submittedAt: Date
}

export default function EvaluationsPage() {
  const [activeTab, setActiveTab] = useState("All Evaluations")
  const tabs = ["All Evaluations", "Pending", "In Progress", "Completed"]
  const { data: evaluations = [] } = useEvaluationRequests()

  if (!evaluations) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <ClipboardCheck className="h-8 w-8" /> Evaluation Management
        </h1>
      </div>

      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-semibold">Evaluations</h2>
        </div>

        <div className="p-4 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search evaluations..." className="pl-10" />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button className="gap-2" asChild>
              <Link to="/dashboard/evaluations/requests/new">
                <Plus className="h-4 w-4" /> New Evaluation
              </Link>
            </Button>
          </div>
        </div>

        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evaluations.map((evaluation: EvaluationRequest) => (
                <TableRow key={evaluation.id}>
                  <TableCell className="font-medium">{evaluation.studentId}</TableCell>
                  <TableCell>{evaluation.institution}</TableCell>
                  <TableCell>{evaluation.program}</TableCell>
                  <TableCell>{evaluation.countryCode}</TableCell>
                  <TableCell>{formatDate(evaluation.submittedAt.toString())}</TableCell>
                  <TableCell>
                    <StatusBadge status={evaluation.status} />
                  </TableCell>
                  <TableCell>{evaluation.evaluationType}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/dashboard/evaluations/${evaluation.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Evaluation</DropdownMenuItem>
                        <DropdownMenuItem>View Documents</DropdownMenuItem>
                        <DropdownMenuItem>Generate Report</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-4">
            <Button variant="outline" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                2
              </Button>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  let className = ""

  switch (status) {
    case "Completed":
      className = "bg-green-100 text-green-800 hover:bg-green-100"
      break
    case "In Progress":
      className = "bg-blue-100 text-blue-800 hover:bg-blue-100"
      break
    case "Pending":
      className = "bg-amber-100 text-amber-800 hover:bg-amber-100"
      break
  }

  return (
    <Badge variant="outline" className={className}>
      {status}
    </Badge>
  )
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}
