import { useMemo } from "react";
import { useLocation } from "react-router-dom";

interface BreadcrumbItem {
  title: string;
  href?: string;
}

const routeTitles: Record<string, string> = {
  dashboard: "Dashboard",
  students: "Students",
  documents: "Documents",
  evaluations: "Evaluations",
  "new-evaluation": "New Evaluation",
  ask: "Ask AI",
  settings: "Settings",
  help: "Help & Resources",
  admin: "Admin Dashboard",
  requests: "Evaluation Requests",
};

export function useBreadcrumbs() {
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    const asPathWithoutQuery = location.pathname.split("?")[0];
    const asPathNestedRoutes = asPathWithoutQuery
      .split("/")
      .filter((v) => v.length > 0);

    const crumbList: BreadcrumbItem[] = [];
    let path = "";

    // Always include Dashboard as the first item
    crumbList.push({
      title: "Dashboard",
      href: "/dashboard",
    });

    // Generate the rest of the breadcrumbs
    asPathNestedRoutes.forEach((subpath, idx) => {
      if (subpath === "dashboard") return; // Skip dashboard since we already added it

      path += `/${subpath}`;
      
      const title = routeTitles[subpath] || subpath;
      
      // Don't add href to the last item
      const isLast = idx === asPathNestedRoutes.length - 1;
      
      crumbList.push({
        title,
        href: isLast ? undefined : path,
      });
    });

    return crumbList;
  }, [location.pathname]);

  return breadcrumbs;
}
