import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  Users,
  FileText,
  ClipboardCheck,
  MessageSquareText,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ShieldCheck,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  items?: { title: string; href: string }[];
}

interface SidebarProps {
  isAdmin?: boolean;
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Students",
      href: "/dashboard/students",
      icon: Users,
    },
    {
      title: "Documents",
      href: "/dashboard/documents",
      icon: FileText,
    },
    {
      title: "Evaluations",
      href: "/dashboard/evaluations",
      icon: ClipboardCheck,
      items: [
        { title: "All Evaluations", href: "/dashboard/evaluations" },
        { title: "New Evaluation", href: "/dashboard/evaluations/new" },
      ],
    },
    {
      title: "Ask AI",
      href: "/dashboard/ask",
      icon: MessageSquareText,
    },
  ];

  const adminItems: NavItem[] = [
    {
      title: "Admin Dashboard",
      href: "/dashboard/admin",
      icon: ShieldCheck,
    },
    {
      title: "Evaluation Requests",
      href: "/dashboard/admin/requests",
      icon: ClipboardCheck,
    },
  ];

  const footerItems: NavItem[] = [
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Help & Resources",
      href: "/dashboard/help",
      icon: HelpCircle,
    },
  ];

  return (
    <div
      className={`bg-[#0F172A] text-white ${
        isCollapsed ? "w-[70px]" : "w-[220px]"
      } transition-all duration-300 flex flex-col h-full`}
    >
      <div className="p-4 flex items-center gap-3 border-b border-white/10">
        <div className="bg-blue-600 rounded-md w-8 h-8 flex items-center justify-center">
          <span className="font-bold text-white">O</span>
        </div>
        {!isCollapsed && <span className="font-bold text-xl">OpenEval</span>}
        <button
          className="ml-auto text-white/60 hover:text-white"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.href ||
                  location.pathname.startsWith(`${item.href}/`)
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
              {!isCollapsed && item.items && (
                <ul className="mt-1 ml-9 space-y-1">
                  {item.items.map((subItem) => (
                    <li key={subItem.href}>
                      <Link
                        to={subItem.href}
                        className={`block py-2 px-3 rounded-md text-sm transition-colors ${
                          location.pathname === subItem.href
                            ? "text-white bg-white/10"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          {/* Admin section */}
          {isAdmin && (
            <>
              <li className="pt-4 pb-1">
                {!isCollapsed && (
                  <div className="px-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                    Admin
                  </div>
                )}
                {isCollapsed && <div className="border-t border-white/10 my-2" />}
              </li>
              {adminItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      location.pathname === item.href ||
                      location.pathname.startsWith(`${item.href}/`)
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>
      </nav>

      <div className="mt-auto border-t border-white/10">
        <ul className="px-2 py-4 space-y-1">
          {footerItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.href
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 px-3 py-2 text-white/60 hover:text-white rounded-md transition-colors hover:bg-white/5"
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
