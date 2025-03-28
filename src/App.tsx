import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./pages/dashboard";
import Overview from "./components/dashboard/Overview";
import StudentsPage from "./pages/dashboard/students";
import DocumentsPage from "./pages/dashboard/documents";
import EvaluationsPage from "./pages/dashboard/evaluations";
import SettingsPage from "./pages/dashboard/settings";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="evaluations" element={<EvaluationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
