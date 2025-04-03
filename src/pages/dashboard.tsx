import React from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function Dashboard() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/dashboard/admin");

  return <DashboardLayout isAdmin={isAdmin} />;
}
