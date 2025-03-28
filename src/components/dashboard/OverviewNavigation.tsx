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
        "flex items-center gap-3 w-full p-3 rounded-lg transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <div
        className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center",
          isActive ? "bg-primary/20" : "bg-muted",
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
  const sections = [
    {
      id: "summary",
      label: "Summary",
      icon: <BarChart3 size={18} />,
    },
    {
      id: "students",
      label: "Students",
      icon: <Users size={18} />,
    },
    {
      id: "documents",
      label: "Documents",
      icon: <FileText size={18} />,
    },
    {
      id: "evaluations",
      label: "Evaluations",
      icon: <Award size={18} />,
    },
    {
      id: "pending",
      label: "Pending Tasks",
      icon: <Clock size={18} />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={18} />,
    },
    {
      id: "help",
      label: "Help & Resources",
      icon: <HelpCircle size={18} />,
    },
  ];

  return (
    <div
      className={cn(
        "w-64 bg-card rounded-lg border border-border p-4 space-y-2",
        className,
      )}
    >
      <h3 className="font-medium text-sm text-muted-foreground mb-4">
        OVERVIEW
      </h3>
      {sections.map((section) => (
        <NavigationItem
          key={section.id}
          icon={section.icon}
          label={section.label}
          isActive={activeSection === section.id}
          onClick={() => onSectionChange(section.id)}
        />
      ))}
    </div>
  );
};

export default OverviewNavigation;
