import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentList from "@/components/dashboard/students/StudentList";
import StudentForm from "@/components/dashboard/students/StudentForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, X } from "lucide-react";
import { useStudents } from "@/hooks/use-students";

interface Student {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const StudentDetails = ({ studentId, onClose }: { studentId: string | undefined; onClose: () => void }) => {
  const { data: student } = useStudents(studentId);

  if (!student) return null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Student Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Created At:</strong> {new Date(student.createdAt).toLocaleDateString()}</p>
        <p><strong>Updated At:</strong> {new Date(student.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

const StudentsPage = () => {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState("all");
  const { data: students, isLoading } = useStudents();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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
    setCurrentStudentId(id);
    setIsDetailsOpen(true);
  };

  const handleDeleteStudent = (id: string) => {
    console.log(`Delete student ${id}`);
  };

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);
    setIsFormOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
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
            <TabsList className="grid w-full max-w-md">
              <TabsTrigger value="all">All Students</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <StudentList
                students={students}
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

        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-2xl">
            <StudentDetails
              studentId={currentStudentId}
              onClose={() => setIsDetailsOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default StudentsPage;
