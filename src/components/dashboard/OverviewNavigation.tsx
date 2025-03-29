import React from "react";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Users,
  FileText,
  Award,
  Clock,
  Settings,
  HelpCircle,
  Bot,
} from "lucide-react";

interface NavigationItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavigationItem = ({
  icon,
  label,
  isActive,
  onClick,
}: NavigationItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full p-3 rounded-lg transition-colors text-white/80",
        isActive
          ? "bg-white/10 text-white font-medium"
          : "hover:bg-white/10 hover:text-white",
      )}
    >
      <div
        className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center",
          isActive ? "bg-white/20" : "bg-white/10",
        )}
      >
        {icon}
      </div>
      <span>{label}</span>
    </button>
  );
};

interface OverviewNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  className?: string;
}

const OverviewNavigation = ({
  activeSection,
  onSectionChange,
  className,
}: OverviewNavigationProps) => {
  return (
    <nav className={cn("space-y-2", className)}>
      <NavigationItem
        icon={<BarChart3 className="h-5 w-5" />}
        label="Overview"
        isActive={activeSection === "overview"}
        onClick={() => onSectionChange("overview")}
      />
      <NavigationItem
        icon={<FileText className="h-5 w-5" />}
        label="Documents"
        isActive={activeSection === "documents"}
        onClick={() => onSectionChange("documents")}
      />
      <NavigationItem
        icon={<Bot className="h-5 w-5" />}
        label="Ask"
        isActive={activeSection === "ask"}
        onClick={() => onSectionChange("ask")}
      />
      <NavigationItem
        icon={<Users className="h-5 w-5" />}
        label="Students"
        isActive={activeSection === "students"}
        onClick={() => onSectionChange("students")}
      />
      <NavigationItem
        icon={<Award className="h-5 w-5" />}
        label="Evaluations"
        isActive={activeSection === "evaluations"}
        onClick={() => onSectionChange("evaluations")}
      />
      <NavigationItem
        icon={<Clock className="h-5 w-5" />}
        label="History"
        isActive={activeSection === "history"}
        onClick={() => onSectionChange("history")}
      />
      <NavigationItem
        icon={<Settings className="h-5 w-5" />}
        label="Settings"
        isActive={activeSection === "settings"}
        onClick={() => onSectionChange("settings")}
      />
      <NavigationItem
        icon={<HelpCircle className="h-5 w-5" />}
        label="Help"
        isActive={activeSection === "help"}
        onClick={() => onSectionChange("help")}
      />
    </nav>
  );
};

export default OverviewNavigation;
