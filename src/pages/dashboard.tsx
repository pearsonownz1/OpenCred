import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

interface DashboardProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  notificationCount?: number;
}

const Dashboard = ({
  userName = "John Doe",
  userEmail = "john.doe@university.edu",
  userAvatar = "",
  notificationCount = 3,
}: DashboardProps) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          userName={userName}
          userEmail={userEmail}
          userAvatar={userAvatar}
          notificationCount={notificationCount}
        />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
