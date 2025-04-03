import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useAuth } from "@/hooks/use-auth";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}

const NavItem = ({
  icon,
  label,
  path,
  isActive,
  isCollapsed,
  onClick,
}: NavItemProps) => {
  const content = (
    <div
      className={cn(
        "group flex items-center rounded-lg px-3 py-2 hover:bg-accent",
        isActive && "bg-accent"
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center",
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
        )}
      >
        {icon}
      </div>
      {!isCollapsed && (
        <span
          className={cn(
            "ml-3",
            isActive ? "font-medium text-foreground" : "text-muted-foreground group-hover:text-foreground"
          )}
        >
          {label}
        </span>
      )}
    </div>
  );

  if (onClick) {
    return content;
  }

  return <Link to={path}>{content}</Link>;
};

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const navItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Overview",
      path: "/dashboard",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Students",
      path: "/dashboard/students",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Documents",
      path: "/dashboard/documents",
    },
    {
      icon: <Award className="h-5 w-5" />,
      label: "Evaluations",
      path: "/dashboard/evaluations",
    },
    {
      icon: <MessageSquareText className="h-5 w-5" />,
      label: "Ask",
      path: "/dashboard/ask",
    },
  ];

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border bg-background transition-all",
        isCollapsed ? "w-[4.5rem]" : "w-64",
        className
      )}
    >
      <div className="flex h-20 items-center border-b border-border px-4">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          {!isCollapsed && <span className="font-semibold">OpenEval</span>}
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <TooltipProvider key={item.path} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <NavItem
                      {...item}
                      isActive={location.pathname === item.path}
                      isCollapsed={isCollapsed}
                    />
                  </div>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </div>

      <div className="border-t border-border p-4">
        <nav className="flex flex-col gap-1">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <NavItem
                    icon={<Settings className="h-5 w-5" />}
                    label="Settings"
                    path="/settings"
                    isActive={location.pathname === "/settings"}
                    isCollapsed={isCollapsed}
                  />
                </div>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">Settings</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <NavItem
                    icon={<HelpCircle className="h-5 w-5" />}
                    label="Help"
                    path="/help"
                    isActive={location.pathname === "/help"}
                    isCollapsed={isCollapsed}
                  />
                </div>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">Help</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <NavItem
                    icon={<LogOut className="h-5 w-5" />}
                    label="Sign Out"
                    path=""
                    isActive={false}
                    isCollapsed={isCollapsed}
                    onClick={handleSignOut}
                  />
                </div>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">Sign Out</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="mt-2 w-full"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
