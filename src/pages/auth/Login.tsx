import React from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-bold text-blue-600">OpenEval</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account to continue</p>
        </div>

        <LoginForm />

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Are you an admin?{" "}
            <Link to="/admin/login" className="text-blue-600 hover:underline">
              Admin login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}