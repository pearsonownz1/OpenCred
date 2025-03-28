import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Users,
  FileText,
  Award,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const NavItem = ({
  icon,
  label,
  path,
  isActive,
  isCollapsed,
}: NavItemProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={path}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 px-3 py-2 h-10",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
                isCollapsed && "justify-center px-2",
              )}
            >
              {icon}
              {!isCollapsed && <span>{label}</span>}
            </Button>
          </Link>
        </TooltipTrigger>
        {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <Users size={20} />,
      label: "Students",
      path: "/dashboard/students",
    },
    {
      icon: <FileText size={20} />,
      label: "Documents",
      path: "/dashboard/documents",
    },
    {
      icon: <Award size={20} />,
      label: "Evaluations",
      path: "/dashboard/evaluations",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/dashboard/settings",
    },
    {
      icon: <HelpCircle size={20} />,
      label: "Help & Resources",
      path: "/dashboard/help",
    },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-background border-r transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">OC</span>
            </div>
            <span className="font-semibold text-lg">OpenCred</span>
          </div>
        )}
        {isCollapsed && (
          <div className="h-8 w-8 mx-auto rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">OC</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto", isCollapsed && "mx-auto mt-2")}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={
              currentPath === item.path ||
              currentPath.startsWith(`${item.path}/`)
            }
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <div className="p-4 border-t">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50",
                  isCollapsed && "justify-center px-2",
                )}
              >
                <LogOut size={20} />
                {!isCollapsed && <span>Sign Out</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">Sign Out</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default Sidebar;
