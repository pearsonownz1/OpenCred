import React from "react";
import { useNavigate } from "react-router-dom";
import SettingsTabs from "@/components/dashboard/settings/SettingsTabs";

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col h-full">
        <main className="flex-1">
          <div className="container mx-auto">
            <SettingsTabs />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
