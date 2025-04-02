import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

interface AdminDashboardProps {
  adminName?: string;
  adminEmail?: string;
  adminAvatar?: string;
}

const AdminDashboard = ({
  adminName = "Admin User",
  adminEmail = "admin@opencred.edu",
  adminAvatar = "",
}: AdminDashboardProps) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header
          userName={adminName}
          userEmail={adminEmail}
          userAvatar={adminAvatar}
          isAdmin={true}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
