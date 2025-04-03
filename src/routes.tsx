import { useRoutes } from "react-router-dom";
import { UserProvider } from "./providers/use-provider";
import { appRoutes } from "./config/routes";

export function AppRoutes() {
  const routes = useRoutes(appRoutes);
  
  return (
    <UserProvider>
      {routes}
    </UserProvider>
  );
}