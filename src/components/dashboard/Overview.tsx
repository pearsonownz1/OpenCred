import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Users,
  FileText,
  Award,
  Clock,
  ArrowRight,
  Plus,
  Search,
  TrendingUp,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useOverviewData } from "@/hooks/useOverviewData";
import OverviewNavigation from "./OverviewNavigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EvaluationForm from "@/components/dashboard/evaluations/EvaluationForm";

interface OverviewProps {}

const Overview = ({}: OverviewProps) => {
  const [activeSection, setActiveSection] = useState("summary");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const data = useOverviewData();

  const handleFormSubmit = (values: any) => {
    // In a real implementation, this would submit the form data to the server
    console.log("Form submitted:", values);
    setIsFormOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Evaluation
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Students
                </p>
                <h3 className="text-3xl font-bold">
                  {data.stats.totalStudents}
                </h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +5.2% this month
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Documents
                </p>
                <h3 className="text-3xl font-bold">
                  {data.stats.totalDocuments}
                </h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12.3% this month
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Completed Evaluations
                </p>
                <h3 className="text-3xl font-bold">
                  {data.stats.completedEvaluations}
                </h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +3.7% this month
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Pending Evaluations
                </p>
                <h3 className="text-3xl font-bold">
                  {data.stats.pendingEvaluations}
                </h3>
                <p className="text-xs text-amber-500 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" /> Requires attention
                </p>
              </div>
              <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Status</CardTitle>
              <CardDescription>
                Distribution of evaluations by status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.evaluationsByType}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {data.evaluationsByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip
                      formatter={(value, name) => [value, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document Activity</CardTitle>
              <CardDescription>
                Document uploads and downloads over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.documentsByMonth}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar
                      dataKey="uploads"
                      name="Uploads"
                      fill="#8884d8"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="downloads"
                      name="Downloads"
                      fill="#82ca9d"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions across the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      activity.type === "evaluation"
                        ? "bg-green-100 text-green-600"
                        : activity.type === "document"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {activity.type === "evaluation" && (
                      <Award className="h-5 w-5" />
                    )}
                    {activity.type === "document" && (
                      <FileText className="h-5 w-5" />
                    )}
                    {activity.type === "student" && (
                      <Users className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {activity.description}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <span>{activity.user}</span>
                      <span className="mx-2">•</span>
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <button className="text-sm text-primary font-medium flex items-center hover:underline">
              View all activity
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </CardFooter>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center justify-between p-3 rounded-lg border border-input hover:bg-accent hover:text-accent-foreground transition-colors">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                    <Users className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Add New Student</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>

              <button className="flex items-center justify-between p-3 rounded-lg border border-input hover:bg-accent hover:text-accent-foreground transition-colors">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                    <Upload className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Upload Documents</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>

              <button className="flex items-center justify-between p-3 rounded-lg border border-input hover:bg-accent hover:text-accent-foreground transition-colors">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                    <Award className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Start Evaluation</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>

              <button className="flex items-center justify-between p-3 rounded-lg border border-input hover:bg-accent hover:text-accent-foreground transition-colors">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3">
                    <Download className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Download Reports</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Evaluation Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 my-4">
          <EvaluationForm 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Overview;
