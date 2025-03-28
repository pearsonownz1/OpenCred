import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Upload, File, X, Check, AlertCircle } from "lucide-react";

interface FileWithPreview extends File {
  preview?: string;
  id: string;
  progress: number;
  status: "uploading" | "complete" | "error";
}

interface DocumentUploaderProps {
  onUploadComplete?: (files: FileWithPreview[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  studentId?: string;
}

const DocumentUploader = ({
  onUploadComplete = () => {},
  maxFiles = 10,
  acceptedFileTypes = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"],
  studentId = "student-123",
}: DocumentUploaderProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (newFiles: File[]) => {
    if (files.length + newFiles.length > maxFiles) {
      // Show error or notification that max files exceeded
      return;
    }

    const filesToAdd = newFiles.map((file) => {
      // Create a unique ID for each file
      const fileWithPreview = file as FileWithPreview;
      fileWithPreview.id = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      fileWithPreview.progress = 0;
      fileWithPreview.status = "uploading";

      // Create preview URL for images
      if (file.type.startsWith("image/")) {
        fileWithPreview.preview = URL.createObjectURL(file);
      }

      return fileWithPreview;
    });

    setFiles((prevFiles) => [...prevFiles, ...filesToAdd]);

    // Simulate upload progress for each file
    filesToAdd.forEach((file) => {
      simulateFileUpload(file);
    });
  };

  const simulateFileUpload = (file: FileWithPreview) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        updateFileStatus(file.id, "complete", 100);

        // Check if all files are complete
        const updatedFiles = [...files, file].map((f) =>
          f.id === file.id ? { ...f, progress: 100, status: "complete" } : f,
        );

        if (updatedFiles.every((f) => f.status === "complete")) {
          onUploadComplete(updatedFiles);
        }
      } else {
        updateFileStatus(file.id, "uploading", progress);
      }
    }, 300);
  };

  const updateFileStatus = (
    fileId: string,
    status: "uploading" | "complete" | "error",
    progress: number,
  ) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === fileId ? { ...file, status, progress } : file,
      ),
    );
  };

  const removeFile = (fileId: string) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.id !== fileId);
      return updatedFiles;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Upload Documents
        </h2>
        <p className="text-sm text-gray-500">
          Upload credential documents for evaluation. Accepted file types:{" "}
          {acceptedFileTypes.join(", ")}
        </p>

        {/* Drag and drop area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm font-medium text-gray-700 mb-1">
            Drag and drop your files here or click to browse
          </p>
          <p className="text-xs text-gray-500">
            Maximum {maxFiles} files, up to 10MB each
          </p>
          <Input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedFileTypes.join(",")}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Uploaded Files ({files.length}/{maxFiles})
            </h3>
            <div className="space-y-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex-shrink-0 mr-3">
                    <File className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center mt-1">
                      <Progress
                        value={file.progress}
                        className="h-1.5 flex-1 mr-2"
                      />
                      <span className="text-xs text-gray-500">
                        {Math.round(file.progress)}%
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {file.status === "complete" ? (
                      <div className="rounded-full bg-green-100 p-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    ) : file.status === "error" ? (
                      <div className="rounded-full bg-red-100 p-1">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(file.id);
                        }}
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-end space-x-3 mt-4">
          <Button variant="outline" onClick={() => setFiles([])}>
            Clear All
          </Button>
          <Button
            disabled={
              files.length === 0 ||
              !files.every((file) => file.status === "complete")
            }
            onClick={() => onUploadComplete(files)}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploader;
