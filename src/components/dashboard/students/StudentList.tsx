import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Plus,
  FileText,
  Edit,
  Trash2,
  UserPlus,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Student {
  id: string;
  name: string;
  email: string;
  country: string;
  program: string;
  status: "Pending" | "In Progress" | "Completed";
  lastUpdated: string;
}

interface StudentListProps {
  students?: Student[];
  onAddStudent?: () => void;
  onEditStudent?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onDeleteStudent?: (id: string) => void;
}

const StudentList = ({
  students = [
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
  ],
  onAddStudent = () => console.log("Add student clicked"),
  onEditStudent = (id) => console.log(`Edit student ${id}`),
  onViewDetails = (id) => console.log(`View details for student ${id}`),
  onDeleteStudent = (id) => console.log(`Delete student ${id}`),
}: StudentListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.program.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Students</h2>
        <Button onClick={onAddStudent} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search students..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.country}</TableCell>
                  <TableCell>{student.program}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}
                    >
                      {student.status}
                    </span>
                  </TableCell>
                  <TableCell>{student.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onViewDetails(student.id)}
                          className="cursor-pointer"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onEditStudent(student.id)}
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDeleteStudent(student.id)}
                          className="cursor-pointer text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-gray-500"
                >
                  No students found. Try adjusting your search or add a new
                  student.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={currentPage === 2}
                onClick={() => setCurrentPage(2)}
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default StudentList;
