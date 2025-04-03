import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import AuthLayout from "@/components/auth/AuthLayout";

export default function AdminLoginPage() {
  return (
    <AuthLayout>
      <LoginForm isAdmin={true} />
    </AuthLayout>
  );
}
