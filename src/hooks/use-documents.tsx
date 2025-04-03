import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"

interface Document {
  id: string
  name: string
  type: string
  student: string
  uploadDate: string
  size: string
  status: "Verified" | "Pending" | "Rejected"
}

const sampleDocuments: Document[] = [
  {
    id: "1",
    name: "Transcript_JohnSmith.pdf",
    type: "Transcript",
    student: "John Smith",
    uploadDate: "2023-06-15",
    size: "2.4 MB",
    status: "Verified",
  },
  {
    id: "2",
    name: "Diploma_MariaGarcia.pdf",
    type: "Diploma",
    student: "Maria Garcia",
    uploadDate: "2023-05-22",
    size: "3.1 MB",
    status: "Verified",
  },
  {
    id: "3",
    name: "Transcript_AhmedHassan.pdf",
    type: "Transcript",
    student: "Ahmed Hassan",
    uploadDate: "2023-06-10",
    size: "1.8 MB",
    status: "Pending",
  },
  {
    id: "4",
    name: "Certificate_LiWei.pdf",
    type: "Certificate",
    student: "Li Wei",
    uploadDate: "2023-06-01",
    size: "1.2 MB",
    status: "Verified",
  },
  {
    id: "5",
    name: "Transcript_SofiaPetrov.pdf",
    type: "Transcript",
    student: "Sofia Petrov",
    uploadDate: "2023-06-18",
    size: "2.7 MB",
    status: "Pending",
  },
]

async function getDocuments() {
  // In a real app, you would fetch from Supabase
  // const { data, error } = await supabase.from("documents").select("*")
  // if (error) throw error
  // return data
  return sampleDocuments
}

export function useDocuments() {
  return useQuery({
    queryKey: ["documents"],
    queryFn: getDocuments,
  })
}
