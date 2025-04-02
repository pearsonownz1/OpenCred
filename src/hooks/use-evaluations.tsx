// hooks/use-evaluations.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

interface EvaluationRequest {
  id: string;
  studentId: string;
  status: RequestStatus;
  evaluationType: string;
  institution: string;
  countryCode: string;
  program: string;
  submittedAt: Date;
}

interface EvaluationResult {
  id: string;
  requestId: string;
  aiAnalysis: any;
  humanReview?: any;
  finalResult?: any;
  reviewedBy?: string;
  reviewedAt?: Date;
  reviewNotes?: string;
}

enum RequestStatus {
  SUBMITTED = 'SUBMITTED',
  AI_PROCESSING = 'AI_PROCESSING',
  HUMAN_REVIEW = 'HUMAN_REVIEW',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export const useEvaluationRequests = () => {
  return useQuery({
    queryKey: ['evaluationRequests'],
    queryFn: async () => {
      const { data } = await axios.get<EvaluationRequest[]>(`${API_URL}/evaluations/requests`);
      return data;
    }
  });
};

export const useSubmitEvaluationRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newRequest: Omit<EvaluationRequest, 'id' | 'status' | 'submittedAt'>) => {
      const { data } = await axios.post<EvaluationRequest>(`${API_URL}/evaluation-requests`, newRequest);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['evaluationRequests', data.studentId] });
    },
    onError: (error) => {
      console.error('Error submitting evaluation request:', error);
    }
  });
};

export const useEvaluationResult = (requestId: string) => {
  return useQuery({
    queryKey: ['evaluationResult', requestId],
    queryFn: async () => {
      const { data } = await axios.get<EvaluationResult>(`${API_URL}/evaluation-results/${requestId}`);
      return data;
    }
  });
};

export const useUpdateEvaluationResult = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (updatedResult: Partial<EvaluationResult>) => {
      const { data } = await axios.patch<EvaluationResult>(`${API_URL}/evaluation-results/${updatedResult.id}`, updatedResult);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['evaluationResult', data.requestId] });
    },
    onError: (error) => {
      console.error('Error updating evaluation result:', error);
    }
  });
};

export const useCountryRules = (countryCode: string) => {
  return useQuery({
    queryKey: ['countryRules', countryCode],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/country-rules/${countryCode}`);
      return data;
    }
  });
};