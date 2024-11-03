import NotFound from "./common/NotFound";
import AddTask from "./components/AddTask";
import ViewTask from "./components/ViewTask";
import Dashboard from "./pages/Dashboard";

export const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/view-task", element: <ViewTask /> },
  { path: "/add-task", element: <AddTask /> },
  { path: "/*", element: <NotFound /> },
];