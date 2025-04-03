import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  items?: { title: string; href: string }[];
}

interface AppSidebarProps {
  isAdmin?: boolean;
}

export function AppSidebar({ isAdmin = false }: AppSidebarProps) {
  const location = useLocation();
  const { signOut } = useAuth();

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
        {
          title: "All Evaluations",
          href: "/dashboard/evaluations",
        },
        {
          title: "New Evaluation",
          href: "/dashboard/evaluations/requests/new",
        },
      ],
    },
    {
      title: "Ask AI",
      href: "/dashboard/ask",
      icon: MessageSquareText,
    },
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
      items: [
        {
          title: "All Requests",
          href: "/dashboard/admin/requests",
        },
        {
          title: "Pending Reviews",
          href: "/dashboard/admin/requests/pending",
        },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon" className="bg-[#0F172A]">
      <SidebarHeader className="p-4 flex items-center gap-3">
        <div className="bg-blue-600 rounded-md w-8 h-8 flex items-center justify-center">
          <span className="font-bold text-white">O</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/60">Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <Collapsible
                key={item.href}
                asChild
                defaultOpen={location.pathname.startsWith(item.href)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  {item.items ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          <item.icon className="h-5 w-5" />
                          <span className="group-data-[collapsible=icon]/sidebar:hidden">{item.title}</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]/sidebar:hidden" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className="flex items-center gap-2 rounded-md px-9 py-2 text-sm hover:bg-white/5 hover:text-white group-data-[collapsible=icon]/sidebar:hidden"
                            data-active={location.pathname === subItem.href}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.href}
                        data-active={location.pathname === item.href}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="group-data-[collapsible=icon]/sidebar:hidden">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-white/60">Admin</SidebarGroupLabel>
            <SidebarMenu>
              {adminItems.map((item) => (
                <Collapsible
                  key={item.href}
                  asChild
                  defaultOpen={location.pathname.startsWith(item.href)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    {item.items ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            <item.icon className="h-5 w-5" />
                            <span className="group-data-[collapsible=icon]/sidebar:hidden">{item.title}</span>
                            <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]/sidebar:hidden" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              className="flex items-center gap-2 rounded-md px-9 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white group-data-[collapsible=icon]/sidebar:hidden"
                              data-active={location.pathname === subItem.href}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </>
                    ) : (
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.href}
                          data-active={location.pathname === item.href}
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="group-data-[collapsible=icon]/sidebar:hidden">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenuButton
          onClick={signOut}
          className="w-full justify-start gap-3"
        >
          <LogOut className="h-5 w-5" />
          <span className="group-data-[collapsible=icon]/sidebar:hidden">Sign Out</span>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
