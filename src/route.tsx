import Dashboard from "./pages/Dashboard";
import ViewTask from "./components/ViewTask";
import NotFound from "./common/NotFound";

export const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/view-task", element: <ViewTask /> },
  { path: "/*", element: <NotFound /> },
];