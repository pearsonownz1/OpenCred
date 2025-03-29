import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DocumentList from "@/components/dashboard/documents/DocumentList";
import { DocumentUploader } from "@/components/dashboard/documents/DocumentUploader";
import DocumentViewer from "@/components/dashboard/documents/DocumentViewer";
import { Plus, Upload, FileText } from "lucide-react";
import { Card } from 'antd';
import DocumentEvaluation from '@/components/dashboard/documents/DocumentEvaluation';
import EvaluationResults from '@/components/dashboard/documents/EvaluationResults';

interface DocumentsPageProps {
  studentId?: string;
}

const DocumentsPage = ({ studentId }: DocumentsPageProps) => {
  const [activeTab, setActiveTab] = useState("all-documents");
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [showUploader, setShowUploader] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<any>(null);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);

  const handleUploadComplete = (document: any) => {
    setCurrentDocument(document);
    setEvaluationResult(null);
    setShowUploader(false);
    setActiveTab("all-documents");
    // In a real app, you would refresh the document list here
  };

  const handleViewDocument = (documentId: string) => {
    setSelectedDocument(documentId);
    setShowViewer(true);
  };

  const handleCloseViewer = () => {
    setShowViewer(false);
    setSelectedDocument(null);
  };

  const handleEvaluationComplete = (result: any) => {
    setEvaluationResult(result);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Document Management</h1>
          <div className="flex space-x-3">
            <Button
              onClick={() => setShowUploader(true)}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Documents
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Folder
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="all-documents">All Documents</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>

          <TabsContent value="all-documents" className="mt-0">
            <DocumentList />
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No recent documents
                </h3>
                <p className="text-gray-500 text-center max-w-md mb-6">
                  Documents you've recently viewed or edited will appear here
                  for quick access.
                </p>
                <Button
                  onClick={() => setShowUploader(true)}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload Documents
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shared" className="mt-0">
            <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No shared documents
                </h3>
                <p className="text-gray-500 text-center max-w-md mb-6">
                  Documents shared with you by other users will appear here.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("all-documents")}
                >
                  View All Documents
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Document Uploader Modal */}
      {showUploader && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Upload Documents</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUploader(false)}
              >
                ✕
              </Button>
            </div>
            <div className="p-4">
              <DocumentUploader
                studentId={studentId}
                onUploadComplete={handleUploadComplete}
              />
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer */}
      {showViewer && (
        <DocumentViewer
          onClose={handleCloseViewer}
          onDownload={(id) => console.log(`Downloading document ${id}`)}
          onShare={(id) => console.log(`Sharing document ${id}`)}
        />
      )}

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Document Evaluation</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <DocumentUploader onUploadComplete={handleUploadComplete} />
            
            {currentDocument && (
              <DocumentEvaluation
                documentId={currentDocument.id}
                evaluationId={currentDocument.evaluationId}
                documentType={currentDocument.type}
                onEvaluationComplete={handleEvaluationComplete}
              />
            )}
          </div>

          <div>
            {evaluationResult && (
              <EvaluationResults result={evaluationResult} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
