import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DocumentUploader } from '../documents/DocumentUploader';
import { uploadDocument } from '@/services/documentService';

interface DocumentData {
  type: 'diploma' | 'transcript';
  file: File;
  parsedData?: any;
  evaluation?: any;
}

export default function EvaluationForm() {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    student: '',
    evaluationType: 'Document-by-Document',
    institution: '',
    country: '',
    program: '',
    additionalNotes: '',
  });

  const handleDocumentUpload = async (type: 'diploma' | 'transcript', file: File) => {
    setIsProcessing(true);
    try {
      // Upload the document
      const uploadedFile = await uploadDocument(file);
      
      // Call OpenAI to parse the document
      const parsedData = await fetch('/api/parse-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: type,
          filePath: uploadedFile.path
        })
      }).then(res => res.json());

      // Get US equivalency evaluation
      const evaluation = await fetch('/api/evaluate-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: type,
          parsedData
        })
      }).then(res => res.json());

      setDocuments(prev => [...prev, {
        type,
        file,
        parsedData,
        evaluation
      }]);

      // Auto-fill form data based on parsed information
      if (parsedData) {
        setFormData(prev => ({
          ...prev,
          institution: parsedData.institution || prev.institution,
          program: parsedData.program || prev.program,
          country: parsedData.country || prev.country,
        }));
      }
    } catch (error) {
      console.error('Error processing document:', error);
      // Handle error appropriately
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">New Credential Evaluation</h2>
        <p className="text-sm text-muted-foreground">
          Upload and analyze academic documents for evaluation
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Label>Diploma</Label>
          <DocumentUploader
            onUploadComplete={(files) => {
              if (files[0]) handleDocumentUpload('diploma', files[0]);
            }}
            acceptedFileTypes={['.pdf', '.jpg', '.jpeg', '.png']}
            maxFiles={1}
          />
          {documents.find(d => d.type === 'diploma')?.parsedData && (
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Parsed Information</h3>
              <pre className="text-sm">
                {JSON.stringify(documents.find(d => d.type === 'diploma')?.parsedData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Label>Transcript</Label>
          <DocumentUploader
            onUploadComplete={(files) => {
              if (files[0]) handleDocumentUpload('transcript', files[0]);
            }}
            acceptedFileTypes={['.pdf', '.jpg', '.jpeg', '.png']}
            maxFiles={1}
          />
          {documents.find(d => d.type === 'transcript')?.parsedData && (
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Parsed Information</h3>
              <pre className="text-sm">
                {JSON.stringify(documents.find(d => d.type === 'transcript')?.parsedData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>Institution</Label>
            <Input
              value={formData.institution}
              onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
              placeholder="University name"
            />
          </div>

          <div>
            <Label>Program/Degree</Label>
            <Input
              value={formData.program}
              onChange={(e) => setFormData(prev => ({ ...prev, program: e.target.value }))}
              placeholder="Bachelor of Science"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Country</Label>
            <Input
              value={formData.country}
              onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
              placeholder="Select country"
            />
          </div>

          <div>
            <Label>Evaluation Type</Label>
            <Select
              value={formData.evaluationType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, evaluationType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Document-by-Document">Document-by-Document</SelectItem>
                <SelectItem value="Course-by-Course">Course-by-Course</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <Label>Additional Notes</Label>
        <Textarea
          value={formData.additionalNotes}
          onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
          placeholder="Any additional information or special instructions"
          className="h-32"
        />
      </div>

      {documents.some(d => d.evaluation) && (
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">US Equivalency Evaluation</h3>
          <div className="space-y-4">
            {documents.map((doc, index) => doc.evaluation && (
              <div key={index}>
                <h4 className="font-medium">{doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}</h4>
                <pre className="text-sm mt-2">
                  {JSON.stringify(doc.evaluation, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button disabled={isProcessing || documents.length === 0}>
          {isProcessing ? 'Processing...' : 'Submit Evaluation'}
        </Button>
      </div>
    </div>
  );
}
