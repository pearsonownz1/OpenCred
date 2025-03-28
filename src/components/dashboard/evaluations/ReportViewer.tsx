import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Check,
  X,
  FileText,
  Share2,
  History,
  Edit,
  Eye,
} from "lucide-react";

interface CourseEquivalency {
  originalCourse: string;
  originalCredits: number;
  usEquivalent: string;
  usCredits: number;
  rationale: string;
}

interface ReportData {
  id: string;
  studentName: string;
  studentId: string;
  institution: string;
  country: string;
  program: string;
  evaluationDate: string;
  status: "draft" | "pending" | "approved" | "rejected";
  summary: string;
  gpaEquivalent: string;
  degreeEquivalent: string;
  courseEquivalencies: CourseEquivalency[];
  creditsEarned: number;
  creditsRequired: number;
  recommendedAction: string;
  evaluator: string;
  notes: string;
  versionHistory: {
    version: number;
    date: string;
    changedBy: string;
    changes: string;
  }[];
}

interface ReportViewerProps {
  reportId?: string;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDownload?: (id: string) => void;
  onShare?: (id: string) => void;
}

const ReportViewer: React.FC<ReportViewerProps> = ({
  reportId = "12345",
  onApprove = () => {},
  onReject = () => {},
  onEdit = () => {},
  onDownload = () => {},
  onShare = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration
  const reportData: ReportData = {
    id: reportId,
    studentName: "Maria Rodriguez",
    studentId: "S2023-4567",
    institution: "Universidad Nacional Autónoma de México",
    country: "Mexico",
    program: "Bachelor of Science in Computer Engineering",
    evaluationDate: "2023-06-15",
    status: "pending",
    summary:
      "The student has completed a 4-year Bachelor of Science program in Computer Engineering at a well-respected institution in Mexico. The program is equivalent to a US Bachelor of Science degree in Computer Engineering.",
    gpaEquivalent: "3.7/4.0",
    degreeEquivalent: "Bachelor of Science in Computer Engineering",
    courseEquivalencies: [
      {
        originalCourse: "Matemáticas Avanzadas",
        originalCredits: 6,
        usEquivalent: "Advanced Mathematics",
        usCredits: 4,
        rationale:
          "Course content and learning outcomes align with US equivalent.",
      },
      {
        originalCourse: "Programación Orientada a Objetos",
        originalCredits: 8,
        usEquivalent: "Object-Oriented Programming",
        usCredits: 3,
        rationale:
          "Course covers all essential OOP concepts with additional practical components.",
      },
      {
        originalCourse: "Sistemas Operativos",
        originalCredits: 6,
        usEquivalent: "Operating Systems",
        usCredits: 3,
        rationale:
          "Course content matches US equivalent with similar lab components.",
      },
      {
        originalCourse: "Redes de Computadoras",
        originalCredits: 6,
        usEquivalent: "Computer Networks",
        usCredits: 3,
        rationale:
          "Course covers all essential networking concepts with practical applications.",
      },
      {
        originalCourse: "Inteligencia Artificial",
        originalCredits: 8,
        usEquivalent: "Artificial Intelligence",
        usCredits: 4,
        rationale:
          "Advanced course with comprehensive coverage of AI concepts and applications.",
      },
    ],
    creditsEarned: 120,
    creditsRequired: 128,
    recommendedAction:
      "Accept for admission to Master's program with prerequisite of 8 additional credits in specialized courses.",
    evaluator: "AI Evaluation System v2.1",
    notes:
      "Student has strong academic background with particular strengths in programming and mathematics. The few missing credits can be easily addressed through additional coursework.",
    versionHistory: [
      {
        version: 1,
        date: "2023-06-15",
        changedBy: "AI Evaluation System",
        changes: "Initial evaluation generated",
      },
      {
        version: 2,
        date: "2023-06-16",
        changedBy: "Dr. James Wilson",
        changes: "Updated course equivalencies and added notes",
      },
    ],
  };

  const getStatusBadge = (status: ReportData["status"]) => {
    const statusConfig = {
      draft: { variant: "secondary", label: "Draft" },
      pending: { variant: "outline", label: "Pending Review" },
      approved: { variant: "default", label: "Approved" },
      rejected: { variant: "destructive", label: "Rejected" },
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  return (
    <div className="w-full h-full bg-background p-6 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Credential Evaluation Report</h1>
          <p className="text-muted-foreground">ID: {reportData.id}</p>
        </div>
        <div className="flex space-x-2">
          {reportData.status === "pending" && (
            <>
              <Button variant="outline" onClick={() => onReject(reportData.id)}>
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button onClick={() => onApprove(reportData.id)}>
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </>
          )}
          <Button variant="outline" onClick={() => onEdit(reportData.id)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" onClick={() => onShare(reportData.id)}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="secondary" onClick={() => onDownload(reportData.id)}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Name
                </dt>
                <dd>{reportData.studentName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  ID
                </dt>
                <dd>{reportData.studentId}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Institution</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Name
                </dt>
                <dd>{reportData.institution}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Country
                </dt>
                <dd>{reportData.country}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Program
                </dt>
                <dd>{reportData.program}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evaluation Status</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Status
                </dt>
                <dd className="mt-1">{getStatusBadge(reportData.status)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Date
                </dt>
                <dd>{reportData.evaluationDate}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Evaluator
                </dt>
                <dd>{reportData.evaluator}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-4">
          <TabsTrigger value="overview">
            <Eye className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="courses">
            <FileText className="mr-2 h-4 w-4" />
            Course Equivalencies
          </TabsTrigger>
          <TabsTrigger value="recommendation">
            <Check className="mr-2 h-4 w-4" />
            Recommendation
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="mr-2 h-4 w-4" />
            Version History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{reportData.summary}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    GPA Equivalent
                  </h4>
                  <p className="text-xl font-bold">
                    {reportData.gpaEquivalent}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Degree Equivalent
                  </h4>
                  <p className="text-xl font-bold">
                    {reportData.degreeEquivalent}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Credits Earned
                  </h4>
                  <p className="text-xl font-bold">
                    {reportData.creditsEarned} / {reportData.creditsRequired}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Equivalencies</CardTitle>
              <CardDescription>
                Mapping of original courses to US equivalents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Original Course</th>
                      <th className="text-left py-3 px-4">Original Credits</th>
                      <th className="text-left py-3 px-4">US Equivalent</th>
                      <th className="text-left py-3 px-4">US Credits</th>
                      <th className="text-left py-3 px-4">Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.courseEquivalencies.map((course, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{course.originalCourse}</td>
                        <td className="py-3 px-4">{course.originalCredits}</td>
                        <td className="py-3 px-4">{course.usEquivalent}</td>
                        <td className="py-3 px-4">{course.usCredits}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {course.rationale}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Recommended Action
                  </h4>
                  <p className="text-sm">{reportData.recommendedAction}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Notes
                  </h4>
                  <p className="text-sm">{reportData.notes}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Add Comment
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Version History</CardTitle>
              <CardDescription>
                Track changes made to this evaluation report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.versionHistory.map((version, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">
                          v{version.version}
                        </Badge>
                        <span className="text-sm font-medium">
                          {version.date}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {version.changedBy}
                      </span>
                    </div>
                    <p className="text-sm">{version.changes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportViewer;
