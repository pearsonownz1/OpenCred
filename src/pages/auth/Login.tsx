import React from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import AuthLayout from "@/components/auth/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />

      <div className="text-center mt-6 space-y-2">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
        <p className="text-sm text-muted-foreground">
          Are you an admin?{" "}
          <Link to="/admin/login" className="text-primary hover:underline font-medium">
            Admin login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}