import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Download,
  Eye,
  Share2,
  Trash2,
  FileText,
  FileImage,
  FileArchive,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "image" | "archive" | "spreadsheet";
  size: string;
  student: string;
  uploadDate: string;
  status: "verified" | "pending" | "rejected";
}

const getDocumentIcon = (type: Document["type"]) => {
  switch (type) {
    case "pdf":
      return <FileText className="h-5 w-5 text-blue-500" />;
    case "image":
      return <FileImage className="h-5 w-5 text-green-500" />;
    case "archive":
      return <FileArchive className="h-5 w-5 text-amber-500" />;
    case "spreadsheet":
      return <FileSpreadsheet className="h-5 w-5 text-emerald-500" />;
  }
};

const getStatusBadge = (status: Document["status"]) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  switch (status) {
    case "verified":
      return (
        <span className={`${baseClasses} bg-green-100 text-green-800`}>
          Verified
        </span>
      );
    case "pending":
      return (
        <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
          Pending
        </span>
      );
    case "rejected":
      return (
        <span className={`${baseClasses} bg-red-100 text-red-800`}>
          Rejected
        </span>
      );
  }
};

const DocumentList = ({
  documents = mockDocuments,
}: {
  documents?: Document[];
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"list" | "grid">("list");

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.student.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Documents</h1>
          <Button>
            <FileText className="mr-2 h-4 w-4" /> Upload New Document
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents or students..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" /> Download All
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" /> Share Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {viewType === "list" ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {getDocumentIcon(doc.type)}
                          <span className="font-medium">{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{doc.student}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" /> Share
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-10 text-muted-foreground"
                    >
                      No documents found. Try adjusting your search or upload a
                      new document.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getDocumentIcon(doc.type)}
                      <span className="font-medium truncate max-w-[150px]">
                        {doc.name}
                      </span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" /> Share
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Student: {doc.student}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{doc.uploadDate}</span>
                    <span>{doc.size}</span>
                  </div>
                  <div className="mt-3">{getStatusBadge(doc.status)}</div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                No documents found. Try adjusting your search or upload a new
                document.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Mock data for demonstration
const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Transcript_JohnDoe.pdf",
    type: "pdf",
    size: "2.4 MB",
    student: "John Doe",
    uploadDate: "2023-05-15",
    status: "verified",
  },
  {
    id: "2",
    name: "Diploma_Certificate.pdf",
    type: "pdf",
    size: "1.8 MB",
    student: "Sarah Johnson",
    uploadDate: "2023-05-12",
    status: "pending",
  },
  {
    id: "3",
    name: "ID_Photo.jpg",
    type: "image",
    size: "0.8 MB",
    student: "Michael Brown",
    uploadDate: "2023-05-10",
    status: "verified",
  },
  {
    id: "4",
    name: "Supporting_Documents.zip",
    type: "archive",
    size: "5.2 MB",
    student: "Emily Wilson",
    uploadDate: "2023-05-08",
    status: "rejected",
  },
  {
    id: "5",
    name: "Course_Records.xlsx",
    type: "spreadsheet",
    size: "1.1 MB",
    student: "David Lee",
    uploadDate: "2023-05-05",
    status: "verified",
  },
  {
    id: "6",
    name: "Recommendation_Letter.pdf",
    type: "pdf",
    size: "0.9 MB",
    student: "Jessica Martinez",
    uploadDate: "2023-05-03",
    status: "pending",
  },
];

export default DocumentList;
