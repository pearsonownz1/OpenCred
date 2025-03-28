import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Download,
  Share2,
  History,
  MessageSquare,
  Edit,
  Eye,
  FileText,
  MoreHorizontal,
} from "lucide-react";

interface DocumentViewerProps {
  document?: {
    id: string;
    name: string;
    type: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    versions?: Array<{
      id: string;
      createdAt: string;
      createdBy: string;
    }>;
    comments?: Array<{
      id: string;
      text: string;
      createdAt: string;
      createdBy: string;
    }>;
  };
  onClose?: () => void;
  onDownload?: (documentId: string) => void;
  onShare?: (documentId: string) => void;
}

const DocumentViewer = ({
  document = {
    id: "doc-123",
    name: "International Transcript.pdf",
    type: "pdf",
    url: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&q=80",
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-06-15T10:30:00Z",
    versions: [
      { id: "v1", createdAt: "2023-06-15T10:30:00Z", createdBy: "John Doe" },
      { id: "v2", createdAt: "2023-06-16T14:45:00Z", createdBy: "Jane Smith" },
    ],
    comments: [
      {
        id: "c1",
        text: "This transcript needs verification",
        createdAt: "2023-06-15T11:30:00Z",
        createdBy: "John Doe",
      },
      {
        id: "c2",
        text: "I've verified the course equivalencies",
        createdAt: "2023-06-16T15:45:00Z",
        createdBy: "Jane Smith",
      },
    ],
  },
  onClose = () => {},
  onDownload = () => {},
  onShare = () => {},
}: DocumentViewerProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("document");

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleDownload = () => {
    onDownload(document.id);
  };

  const handleShare = () => {
    onShare(document.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col bg-white">
        <DialogHeader className="border-b pb-2">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              {document.name}
            </DialogTitle>
            <div className="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>More options</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Last updated: {formatDate(document.updatedAt)}
          </div>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="w-full justify-start border-b px-6">
            <TabsTrigger value="document" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Document
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <History className="h-4 w-4" />
              Version History
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              Comments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="document" className="flex-1 overflow-auto p-6">
            <div className="bg-gray-100 rounded-lg h-full flex items-center justify-center">
              {document.type === "pdf" ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <img
                    src={document.url}
                    alt={document.name}
                    className="max-w-full max-h-full object-contain rounded shadow-md"
                  />
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" /> View Full Screen
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-4 w-4" /> Annotate
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8">
                  <FileText className="h-16 w-16 mx-auto text-gray-400" />
                  <p className="mt-4 text-gray-600">
                    Preview not available for this file type
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={handleDownload}
                  >
                    Download to View
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="flex-1 overflow-auto p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Version History</h3>
              <div className="border rounded-lg divide-y">
                {document.versions?.map((version) => (
                  <div
                    key={version.id}
                    className="p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">Version {version.id}</p>
                      <p className="text-sm text-gray-500">
                        Updated by {version.createdBy} on{" "}
                        {formatDate(version.createdAt)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Restore
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="flex-1 overflow-auto p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Comments</h3>
              <div className="border rounded-lg divide-y">
                {document.comments?.map((comment) => (
                  <div key={comment.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{comment.createdBy}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                    <p className="mt-1 text-gray-700">{comment.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <textarea
                  className="w-full border rounded-md p-2 h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a comment..."
                />
                <div className="mt-2 flex justify-end">
                  <Button>Add Comment</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="border-t pt-2">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
