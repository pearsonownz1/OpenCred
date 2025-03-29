import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_ENDPOINTS } from '@/config/api';
import { useToast } from "@/components/ui/use-toast";

interface DocumentEvaluationProps {
  documentId?: string;
  evaluationId?: string;
  documentType?: string;
  onEvaluationComplete?: (result: any) => void;
}

const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'IN', label: 'India' },
  { value: 'CN', label: 'China' },
  { value: 'JP', label: 'Japan' },
  { value: 'KR', label: 'South Korea' },
  { value: 'SG', label: 'Singapore' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'IT', label: 'Italy' },
  { value: 'ES', label: 'Spain' },
  { value: 'BR', label: 'Brazil' },
  { value: 'MX', label: 'Mexico' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'EG', label: 'Egypt' },
  { value: 'SA', label: 'Saudi Arabia' },
];

const EVALUATION_TYPES = [
  { value: 'Document-by-Document', label: 'Document by Document' },
  { value: 'Course-by-Course', label: 'Course by Course' },
];

const DocumentEvaluation: React.FC<DocumentEvaluationProps> = ({
  documentId,
  evaluationId,
  documentType = 'transcript',
  onEvaluationComplete
}) => {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState<string>('');
  const [institution, setInstitution] = useState<string>('');
  const [evaluationType, setEvaluationType] = useState<string>('Document-by-Document');
  const { toast } = useToast();

  const handleEvaluate = async () => {
    if (!documentId || !country || !institution) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide both country and institution.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.DOCUMENTS.EVALUATE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId,
          documentType,
          country,
          institution,
          evaluationType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to evaluate document');
      }

      const evaluationResult = await response.json();
      
      toast({
        title: "Success",
        description: "Document has been successfully evaluated.",
      });

      if (onEvaluationComplete) {
        onEvaluationComplete(evaluationResult);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Evaluation Failed",
        description: error instanceof Error ? error.message : 'An error occurred during evaluation',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Country of Institution
          </label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Institution Name
          </label>
          <Input
            placeholder="Enter institution name"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Evaluation Type
          </label>
          <Select value={evaluationType} onValueChange={setEvaluationType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select evaluation type" />
            </SelectTrigger>
            <SelectContent>
              {EVALUATION_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleEvaluate}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Evaluating..." : "Evaluate Document"}
        </Button>
      </div>
    </div>
  );
};

export default DocumentEvaluation; 