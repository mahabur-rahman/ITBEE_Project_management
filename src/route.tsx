import Dashboard from "./pages/Dashboard";
import ViewTask from "./components/ViewTask";
import NotFound from "./common/NotFound";
import GanttChartView from "./components/GanChartView";

export const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/view-task/projectId/:projectId/taskId/:taskId", element: <ViewTask /> },
  { path: "/chart", element: <GanttChartView /> },
  { path: "/*", element: <NotFound /> },
];