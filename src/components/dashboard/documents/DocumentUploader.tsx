import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileUp, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { API_ENDPOINTS } from '@/config/api';
import { useToast } from "@/components/ui/use-toast";

interface DocumentUploaderProps {
  studentId?: string;
  onUploadComplete?: (document: any) => void;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({ studentId, onUploadComplete }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file);
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    console.log('Starting upload process...');
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('type', 'transcript');
    if (studentId) {
      formData.append('studentId', studentId);
    }

    setUploading(true);

    try {
      console.log('Sending request to:', API_ENDPOINTS.DOCUMENTS.UPLOAD);
      const response = await fetch(API_ENDPOINTS.DOCUMENTS.UPLOAD, {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Upload failed with status: ${response.status}`
        );
      }

      const result = await response.json();
      console.log('Upload response:', result);

      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      if (onUploadComplete) {
        console.log('Calling onUploadComplete with document:', result.document);
        onUploadComplete(result.document);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "An error occurred during upload",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
        />
        
        {!selectedFile ? (
          <Button 
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="w-full py-8 flex flex-col items-center gap-2"
          >
            <FileUp className="h-6 w-6" />
            <div className="flex flex-col items-center">
              <span className="font-semibold">Click to upload</span>
              <span className="text-sm text-muted-foreground">
                PDF, JPG or PNG (max. 10MB)
              </span>
            </div>
          </Button>
        ) : (
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span className="text-sm font-medium">{selectedFile.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {selectedFile && (
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className={cn(
              "w-full",
              uploading && "opacity-50 cursor-not-allowed"
            )}
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <Upload className="h-4 w-4 animate-bounce" />
                Uploading...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Document
              </span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
