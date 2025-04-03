import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={true} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
