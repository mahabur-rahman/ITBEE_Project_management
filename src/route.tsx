import NotFound from "./common/NotFound";
import Project from "./components/Project";

export const routes = [
  { path: "/", element: <Project /> },
  { path: "/*", element: <NotFound /> },
];