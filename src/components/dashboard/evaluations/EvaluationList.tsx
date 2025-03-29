import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  FileText,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import EvaluationForm from "./EvaluationForm";

type EvaluationStatus = "pending" | "in-progress" | "completed" | "rejected";

interface Evaluation {
  id: string;
  studentName: string;
  studentId: string;
  documentName: string;
  institution: string;
  submittedDate: string;
  status: EvaluationStatus;
}

const statusStyles = {
  pending: {
    label: "Pending",
    variant: "secondary" as const,
    icon: <Clock className="mr-1 h-3 w-3" />,
  },
  "in-progress": {
    label: "In Progress",
    variant: "default" as const,
    icon: <Loader2 className="mr-1 h-3 w-3 animate-spin" />,
  },
  completed: {
    label: "Completed",
    variant: "default" as const,
    icon: <CheckCircle className="mr-1 h-3 w-3" />,
  },
  rejected: {
    label: "Rejected",
    variant: "destructive" as const,
    icon: <AlertCircle className="mr-1 h-3 w-3" />,
  },
};

interface EvaluationListProps {
  evaluations?: Evaluation[];
  onViewEvaluation?: (id: string) => void;
  onViewReport?: (id: string) => void;
  onDownloadReport?: (id: string) => void;
}

const EvaluationList = ({
  evaluations = mockEvaluations,
  onViewEvaluation = () => {},
  onViewReport = () => {},
  onDownloadReport = () => {},
}: EvaluationListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<EvaluationStatus | "all">(
    "all",
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormSubmit = (values: any) => {
    // In a real implementation, this would submit the form data to the server
    console.log("Form submitted:", values);
    setIsFormOpen(false);
  };

  const filteredEvaluations = evaluations.filter((evaluation) => {
    const matchesSearch =
      evaluation.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.documentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      evaluation.institution.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || evaluation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Evaluation Requests</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <FileText className="mr-2 h-4 w-4" />
          New Evaluation
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search evaluations..."
            className="w-full rounded-md border border-input pl-8 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {statusFilter === "all"
                ? "All Statuses"
                : statusStyles[statusFilter].label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>
              All Statuses
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
              {statusStyles["pending"].icon} Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>
              {statusStyles["in-progress"].icon} In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
              {statusStyles["completed"].icon} Completed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>
              {statusStyles["rejected"].icon} Rejected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Document</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvaluations.length > 0 ? (
              filteredEvaluations.map((evaluation) => (
                <TableRow key={evaluation.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{evaluation.studentName}</p>
                      <p className="text-xs text-muted-foreground">
                        ID: {evaluation.studentId}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{evaluation.documentName}</TableCell>
                  <TableCell>{evaluation.institution}</TableCell>
                  <TableCell>{evaluation.submittedDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={statusStyles[evaluation.status].variant}
                      className="flex w-fit items-center"
                    >
                      {statusStyles[evaluation.status].icon}
                      {statusStyles[evaluation.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onViewEvaluation(evaluation.id)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {evaluation.status === "completed" && (
                          <>
                            <DropdownMenuItem
                              onClick={() => onViewReport(evaluation.id)}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Report
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDownloadReport(evaluation.id)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download Report
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No evaluations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* New Evaluation Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 my-4">
          <EvaluationForm 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Mock data for default display
const mockEvaluations: Evaluation[] = [
  {
    id: "eval-001",
    studentName: "John Smith",
    studentId: "STU-2023-001",
    documentName: "Bachelor's Degree - University of London",
    institution: "Oxford University",
    submittedDate: "2023-10-15",
    status: "completed",
  },
  {
    id: "eval-002",
    studentName: "Maria Garcia",
    studentId: "STU-2023-042",
    documentName: "Master's Degree - Madrid University",
    institution: "Harvard Law School",
    submittedDate: "2023-10-18",
    status: "in-progress",
  },
  {
    id: "eval-003",
    studentName: "Ahmed Hassan",
    studentId: "STU-2023-078",
    documentName: "Bachelor's Degree - Cairo University",
    institution: "Stanford University",
    submittedDate: "2023-10-20",
    status: "pending",
  },
  {
    id: "eval-004",
    studentName: "Li Wei",
    studentId: "STU-2023-103",
    documentName: "PhD Certificate - Beijing University",
    institution: "MIT",
    submittedDate: "2023-10-12",
    status: "rejected",
  },
  {
    id: "eval-005",
    studentName: "Sofia Petrov",
    studentId: "STU-2023-156",
    documentName: "Master's Degree - Moscow State University",
    institution: "Yale University",
    submittedDate: "2023-10-22",
    status: "pending",
  },
];

export default EvaluationList;
