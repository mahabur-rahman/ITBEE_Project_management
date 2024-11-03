import { useRoutes } from "react-router-dom";
import { routes } from "./route";

const ProjectTable = () => {
  const router = useRoutes(routes);
  return <>{router}</>;
};

export default ProjectTable;
