import { RouteObject } from "react-router-dom"
import React, { type ReactElement, type ComponentType, type PropsWithChildren } from "react"
import Home from "@/components/home"
import Dashboard from "@/pages/dashboard"
import AdminDashboard from "@/pages/admin-dashboard"
import Overview from "@/components/dashboard/Overview"
import StudentsPage from "@/pages/dashboard/students"
import DocumentsPage from "@/pages/dashboard/documents"
import EvaluationsPage from "@/pages/dashboard/evaluations"
import AskPage from "@/pages/dashboard/ask"
import SettingsPage from "@/pages/dashboard/settings"
import LoginPage from "@/pages/auth/Login"
import AdminLoginPage from "@/pages/auth/AdminLogin"
import RegisterPage from "@/pages/auth/Register"
import ForgotPasswordPage from "@/pages/auth/ForgotPassword"
import ResetPasswordPage from "@/pages/auth/ResetPassword"
import VerifyEmailPage from "@/pages/auth/VerifyEmail"
import NotFoundPage from "@/pages/NotFound"
import ErrorPage from "@/pages/Error"

interface FormProps {
  onSubmit: (values: any) => void
  onCancel: () => void
}

const handleFormSubmit = (values: any) => {
  console.log('Form submitted:', values)
}

const handleFormCancel = () => {
  console.log('Form cancelled')
}

// Helper function to create route objects with proper typing
function createRoute<P extends object = {}>(
  Component: ComponentType<P>,
  props?: P
): { element: ReactElement } {
  return {
    element: React.createElement(Component, (props || {}) as P)
  }
}

// Create a reusable error element
function createErrorElement(): ReactElement {
  return React.createElement(ErrorPage, {})
}

export const dashboardRoutes: RouteObject[] = [
  {
    index: true,
    ...createRoute<FormProps>(Overview, { onSubmit: handleFormSubmit, onCancel: handleFormCancel }),
  },
  {
    path: "students",
    ...createRoute(StudentsPage),
  },
  {
    path: "documents",
    ...createRoute(DocumentsPage),
  },
  {
    path: "evaluations",
    ...createRoute(EvaluationsPage),
  },
  {
    path: "ask",
    ...createRoute(AskPage),
  },
  {
    path: "settings",
    ...createRoute(SettingsPage),
  },
]

export const authRoutes: RouteObject[] = [
  {
    path: "/login",
    ...createRoute(LoginPage),
    errorElement: createErrorElement(),
  },
  {
    path: "/admin/login",
    ...createRoute(AdminLoginPage),
    errorElement: createErrorElement(),
  },
  {
    path: "/register",
    ...createRoute(RegisterPage),
    errorElement: createErrorElement(),
  },
  {
    path: "/forgot-password",
    ...createRoute(ForgotPasswordPage),
    errorElement: createErrorElement(),
  },
  {
    path: "/reset-password",
    ...createRoute(ResetPasswordPage),
    errorElement: createErrorElement(),
  },
  {
    path: "/verify-email",
    ...createRoute(VerifyEmailPage),
    errorElement: createErrorElement(),
  },
]

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    ...createRoute(Home),
    errorElement: createErrorElement(),
  },
  {
    path: "/dashboard",
    ...createRoute(Dashboard),
    errorElement: createErrorElement(),
    children: dashboardRoutes,
  },
  {
    path: "/dashboard/admin",
    ...createRoute(AdminDashboard),
    errorElement: createErrorElement(),
    children: [
      {
        index: true,
        ...createRoute<FormProps>(Overview, { onSubmit: handleFormSubmit, onCancel: handleFormCancel }),
      },
    ],
  },
  ...authRoutes,
  {
    path: "*",
    ...createRoute(NotFoundPage),
  },
]
