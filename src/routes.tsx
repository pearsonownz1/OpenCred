import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./pages/dashboard";
import AdminDashboard from "./pages/admin-dashboard";
import Overview from "./components/dashboard/Overview";
import StudentsPage from "./pages/dashboard/students";
import DocumentsPage from "./pages/dashboard/documents";
import EvaluationsPage from "./pages/dashboard/evaluations";
import AskPage from "./pages/dashboard/ask";
import LoginPage from "./pages/auth/Login";
import AdminLoginPage from "./pages/auth/AdminLogin";
import RegisterPage from "./pages/auth/Register";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import VerifyEmailPage from "./pages/auth/VerifyEmail";
import NotFoundPage from "./pages/NotFound";
import ErrorPage from "./pages/Error";
import { UserProvider } from "./providers/use-provider";

const handleFormSubmit = (values: any) => {
  console.log('Form submitted:', values);
};

const handleFormCancel = () => {
  console.log('Form cancelled');
};

export function AppRoutes() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
        <Route path="/dashboard" element={<Dashboard />} errorElement={<ErrorPage />}>
          <Route index element={<Overview onSubmit={handleFormSubmit} onCancel={handleFormCancel} />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="evaluations" element={<EvaluationsPage />} />
          <Route path="ask" element={<AskPage />} />
        </Route>
        <Route path="/dashboard/admin" element={<AdminDashboard />} errorElement={<ErrorPage />}>
          <Route index element={<Overview onSubmit={handleFormSubmit} onCancel={handleFormCancel} />} />
        </Route>
        <Route path="/login" element={<LoginPage />} errorElement={<ErrorPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} errorElement={<ErrorPage />} />
        <Route path="/register" element={<RegisterPage />} errorElement={<ErrorPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} errorElement={<ErrorPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} errorElement={<ErrorPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} errorElement={<ErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </UserProvider>
  );
}