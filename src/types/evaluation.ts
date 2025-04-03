export interface Student {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface Document {
  id: string
  filename: string
  originalName: string
  path: string
  type: string
  mimetype: string
  size: number
  parsedData?: {
    content: string
  }
  evaluationRequestId: string
  createdAt: string
  updatedAt: string
}

export interface Country {
  id: string
  country: string
  rules: string
  createdAt: string
  updatedAt: string
}

export interface TimelineEvent {
  id: number
  status: string
  date: string
  user: string
}

export interface Evaluation {
  id: string
  studentId: string
  status: string
  submittedAt: string
  evaluationType: string
  institution: string
  countryCode: string
  program: string
  createdAt: string
  updatedAt: string
  assignedTo: string
  student: Student
  documents: Document[]
  country: Country
  estimatedCompletionDate?: string
  progress?: number
  notes?: string
  timeline?: TimelineEvent[]
}
