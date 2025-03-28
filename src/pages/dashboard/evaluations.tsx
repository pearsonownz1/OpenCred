import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import EvaluationList from "@/components/dashboard/evaluations/EvaluationList";
import EvaluationForm from "@/components/dashboard/evaluations/EvaluationForm";
import ReportViewer from "@/components/dashboard/evaluations/ReportViewer";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const EvaluationsPage = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvaluationId, setSelectedEvaluationId] = useState<
    string | null
  >(null);
  const [isReportViewerOpen, setIsReportViewerOpen] = useState(false);

  const handleNewEvaluation = () => {
    setIsFormOpen(true);
  };

  const handleFormSubmit = (values: any) => {
    // In a real implementation, this would submit the form data to the server
    console.log("Form submitted:", values);
    setIsFormOpen(false);
    setActiveTab("list");
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
  };

  const handleViewEvaluation = (id: string) => {
    setSelectedEvaluationId(id);
    setActiveTab("details");
  };

  const handleViewReport = (id: string) => {
    setSelectedEvaluationId(id);
    setIsReportViewerOpen(true);
  };

  const handleDownloadReport = (id: string) => {
    // In a real implementation, this would download the report
    console.log("Downloading report for evaluation:", id);
  };

  return (
    <div className="container mx-auto p-6 bg-background min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Credential Evaluations</h1>
        <Button onClick={handleNewEvaluation}>
          <Plus className="mr-2 h-4 w-4" />
          New Evaluation
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="list">All Evaluations</TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedEvaluationId}>
            Evaluation Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <EvaluationList
            onViewEvaluation={handleViewEvaluation}
            onViewReport={handleViewReport}
            onDownloadReport={handleDownloadReport}
          />
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          {selectedEvaluationId && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Evaluation Details</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleViewReport(selectedEvaluationId)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View Report
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDownloadReport(selectedEvaluationId)}
                  >
                    Download Report
                  </Button>
                </div>
              </div>

              {/* Placeholder for evaluation details */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Student Information</h3>
                    <div className="p-4 border rounded-md">
                      <p className="text-sm font-medium">Name: John Smith</p>
                      <p className="text-sm">ID: STU-2023-001</p>
                      <p className="text-sm">Email: john.smith@example.com</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Institution</h3>
                    <div className="p-4 border rounded-md">
                      <p className="text-sm font-medium">
                        University of London
                      </p>
                      <p className="text-sm">Country: United Kingdom</p>
                      <p className="text-sm">Program: Bachelor of Science</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Documents</h3>
                  <div className="p-4 border rounded-md">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Transcript.pdf</span>
                      </li>
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Degree_Certificate.pdf</span>
                      </li>
                      <li className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Course_Descriptions.pdf</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Evaluation Progress</h3>
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Status:</span>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        In Progress
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                    <p className="text-sm mt-2">
                      AI analysis in progress. Estimated completion: 2 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* New Evaluation Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl p-0">
          <EvaluationForm onSubmit={handleFormSubmit} />
        </DialogContent>
      </Dialog>

      {/* Report Viewer Dialog */}
      <Dialog open={isReportViewerOpen} onOpenChange={setIsReportViewerOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
          <ReportViewer
            reportId={selectedEvaluationId || undefined}
            onApprove={(id) => {
              console.log("Report approved:", id);
              setIsReportViewerOpen(false);
            }}
            onReject={(id) => {
              console.log("Report rejected:", id);
              setIsReportViewerOpen(false);
            }}
            onEdit={(id) => {
              console.log("Editing report:", id);
            }}
            onDownload={handleDownloadReport}
            onShare={(id) => {
              console.log("Sharing report:", id);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EvaluationsPage;
