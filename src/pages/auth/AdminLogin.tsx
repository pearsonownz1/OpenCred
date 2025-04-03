import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm isAdmin={true} />
    </div>
  );
}
