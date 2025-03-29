import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
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
  MessageSquareText,
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
                "w-full justify-start gap-3 px-3 py-2 h-10 text-white/80",
                isActive
                  ? "bg-white/10 text-white"
                  : "hover:bg-white/10 hover:text-white",
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
      icon: <MessageSquareText size={20} />,
      label: "Ask AI",
      path: "/dashboard/ask",
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

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-primary border-r border-white/10 transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[220px]"
      )}
    >
      <div className="flex items-center justify-between p-3">
        <Link to="/dashboard" className="flex items-center">
          <Logo className={cn("text-white", isCollapsed ? "scale-75" : "")} />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={toggleCollapse}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 py-2 px-2 space-y-1 overflow-y-auto">
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

      <div className="p-2 border-t border-white/10">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-white/80 hover:text-white hover:bg-white/10",
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
    </div>
  );
};

export default Sidebar;
