import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentList from "@/components/dashboard/students/StudentList";
import StudentForm from "@/components/dashboard/students/StudentForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users } from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  country: string;
  program: string;
  status: "Pending" | "In Progress" | "Completed";
  lastUpdated: string;
}

const StudentsPage = () => {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState<
    string | undefined
  >();
  const [activeTab, setActiveTab] = useState("all");

  // Mock students data
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      country: "India",
      program: "Computer Science",
      status: "In Progress",
      lastUpdated: "2023-06-15",
    },
    {
      id: "2",
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      country: "Brazil",
      program: "Business Administration",
      status: "Completed",
      lastUpdated: "2023-05-22",
    },
    {
      id: "3",
      name: "Ahmed Hassan",
      email: "ahmed.hassan@example.com",
      country: "Egypt",
      program: "Medicine",
      status: "Pending",
      lastUpdated: "2023-06-10",
    },
    {
      id: "4",
      name: "Li Wei",
      email: "li.wei@example.com",
      country: "China",
      program: "Engineering",
      status: "In Progress",
      lastUpdated: "2023-06-01",
    },
    {
      id: "5",
      name: "Sofia Petrov",
      email: "sofia.petrov@example.com",
      country: "Russia",
      program: "Law",
      status: "Pending",
      lastUpdated: "2023-06-18",
    },
  ]);

  // Filter students based on active tab
  const filteredStudents =
    activeTab === "all"
      ? students
      : students.filter((student) => {
          if (activeTab === "pending") return student.status === "Pending";
          if (activeTab === "inProgress")
            return student.status === "In Progress";
          if (activeTab === "completed") return student.status === "Completed";
          return true;
        });

  const handleAddStudent = () => {
    setIsEditMode(false);
    setCurrentStudentId(undefined);
    setIsFormOpen(true);
  };

  const handleEditStudent = (id: string) => {
    setIsEditMode(true);
    setCurrentStudentId(id);
    setIsFormOpen(true);
  };

  const handleViewDetails = (id: string) => {
    // In a real application, this would navigate to a detailed view
    console.log(`View details for student ${id}`);
  };

  const handleDeleteStudent = (id: string) => {
    // In a real application, this would show a confirmation dialog
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleFormSubmit = (data: any) => {
    // In a real application, this would send data to an API
    console.log("Form submitted:", data);

    // Mock implementation for UI demonstration
    if (isEditMode && currentStudentId) {
      // Update existing student
      setStudents(
        students.map((student) =>
          student.id === currentStudentId
            ? {
                ...student,
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                program: data.programOfStudy || student.program,
              }
            : student,
        ),
      );
    } else {
      // Add new student
      const newStudent: Student = {
        id: `${students.length + 1}`,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        country: data.nationality || "Not specified",
        program: data.programOfStudy || "Not specified",
        status: "Pending",
        lastUpdated: new Date().toISOString().split("T")[0],
      };
      setStudents([...students, newStudent]);
    }

    setIsFormOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Users className="mr-2 h-7 w-7" /> Student Management
          </h1>
        </div>

        <div className="mb-6">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all">All Students</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="inProgress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <StudentList
                students={filteredStudents}
                onAddStudent={handleAddStudent}
                onEditStudent={handleEditStudent}
                onViewDetails={handleViewDetails}
                onDeleteStudent={handleDeleteStudent}
              />
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <StudentList
                students={filteredStudents}
                onAddStudent={handleAddStudent}
                onEditStudent={handleEditStudent}
                onViewDetails={handleViewDetails}
                onDeleteStudent={handleDeleteStudent}
              />
            </TabsContent>
            <TabsContent value="inProgress" className="mt-4">
              <StudentList
                students={filteredStudents}
                onAddStudent={handleAddStudent}
                onEditStudent={handleEditStudent}
                onViewDetails={handleViewDetails}
                onDeleteStudent={handleDeleteStudent}
              />
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <StudentList
                students={filteredStudents}
                onAddStudent={handleAddStudent}
                onEditStudent={handleEditStudent}
                onViewDetails={handleViewDetails}
                onDeleteStudent={handleDeleteStudent}
              />
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-4xl p-0">
            <StudentForm
              studentId={currentStudentId}
              isEdit={isEditMode}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default StudentsPage;
