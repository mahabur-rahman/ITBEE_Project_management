import NotFound from "./common/NotFound";
import Project from "./components/Project";
import ViewTask from "./components/ViewTask";

export const routes = [
  { path: "/", element: <Project /> },
  { path: "/view-task", element: <ViewTask /> },
  { path: "/*", element: <NotFound /> },
];