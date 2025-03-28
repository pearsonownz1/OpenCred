import { useState, useEffect } from "react";

export interface OverviewStats {
  totalStudents: number;
  totalDocuments: number;
  completedEvaluations: number;
  pendingEvaluations: number;
}

export interface Activity {
  id: string;
  type: "evaluation" | "document" | "student";
  description: string;
  timestamp: string;
  user: string;
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}

export interface OverviewData {
  stats: OverviewStats;
  recentActivities: Activity[];
  evaluationsByType: ChartData[];
  documentsByMonth: {
    name: string;
    uploads: number;
    downloads: number;
  }[];
  studentsByStatus: ChartData[];
}

export const useOverviewData = () => {
  const [data, setData] = useState<OverviewData>({
    stats: {
      totalStudents: 124,
      totalDocuments: 356,
      completedEvaluations: 87,
      pendingEvaluations: 12,
    },
    recentActivities: [
      {
        id: "1",
        type: "evaluation",
        description: "Completed evaluation for Maria Garcia",
        timestamp: "2 hours ago",
        user: "John Smith",
      },
      {
        id: "2",
        type: "document",
        description: "Uploaded transcript for Ahmed Hassan",
        timestamp: "3 hours ago",
        user: "Sarah Johnson",
      },
      {
        id: "3",
        type: "student",
        description: "Added new student profile for Li Wei",
        timestamp: "5 hours ago",
        user: "David Chen",
      },
      {
        id: "4",
        type: "evaluation",
        description: "Started evaluation for Carlos Rodriguez",
        timestamp: "Yesterday",
        user: "Emily Wilson",
      },
      {
        id: "5",
        type: "document",
        description: "Shared documents with external reviewer",
        timestamp: "Yesterday",
        user: "Michael Brown",
      },
    ],
    evaluationsByType: [
      { name: "Completed", value: 87, color: "#4ade80" },
      { name: "In Progress", value: 12, color: "#facc15" },
      { name: "Pending", value: 23, color: "#fb7185" },
    ],
    documentsByMonth: [
      { name: "Jan", uploads: 30, downloads: 20 },
      { name: "Feb", uploads: 40, downloads: 25 },
      { name: "Mar", uploads: 45, downloads: 30 },
      { name: "Apr", uploads: 55, downloads: 40 },
      { name: "May", uploads: 65, downloads: 50 },
      { name: "Jun", uploads: 75, downloads: 60 },
    ],
    studentsByStatus: [
      { name: "Active", value: 85, color: "#4ade80" },
      { name: "Pending", value: 24, color: "#facc15" },
      { name: "Inactive", value: 15, color: "#fb7185" },
    ],
  });

  // In a real application, you would fetch this data from an API
  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      // In a real app, you would fetch data here
      // For now, we're using the static data initialized above
    };

    fetchData();
  }, []);

  return data;
};
