import { useParams } from "react-router-dom";
import { ProjectType, TaskType } from "../interface/project.interface";

const ViewTasks: React.FC = () => {
  const { projectId, taskId } = useParams<{
    projectId: string;
    taskId: string;
  }>();

  if (!projectId || !taskId) {
    return <p className="text-red-600">Project ID and Task ID are required.</p>;
  }

  const storedProjects = localStorage.getItem("projects");
  const projects: ProjectType[] = storedProjects
    ? JSON.parse(storedProjects)
    : [];

  const project: ProjectType | undefined = projects.find(
    (proj) => proj.id === parseInt(projectId)
  );

  const task: TaskType | undefined = project
    ? project.tasks.find((t) => t.id === parseInt(taskId))
    : undefined;

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="relative mb-8 text-4xl font-bold text-center text-gray-800">
        <span className="absolute inset-0 transform -skew-y-3 rounded-md opacity-50 bg-gradient-to-r from-blue-500 to-green-500"></span>
        <span className="relative">View Project Tasks</span>
      </h1>

      {project ? (
        <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-3xl font-semibold text-gray-700">
            {project.name}
          </h2>
          <p className="mb-2 text-gray-600">
            <strong>Description:</strong> {project.description}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Status:</strong>{" "}
            <span className="font-medium">{project.status}</span>
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Budget:</strong> {project.budget}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Start Date:</strong> {project.startDate}
          </p>
          <p className="mb-6 text-gray-600">
            <strong>End Date:</strong> {project.endDate}
          </p>

          {task ? (
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-2xl font-medium text-gray-800">
                Task Details
              </h3>
              <p className="mb-2 text-gray-600">
                <strong>Task ID:</strong> {task.id}
              </p>
              <p className="mb-2 text-gray-600">
                <strong>Task Name:</strong>{" "}
                <span className="font-medium">{task.name}</span>
              </p>
              <p className="text-gray-600">
                <strong>Description:</strong> {task.description}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong> {task.status}
              </p>
              <p className="text-gray-600">
                <strong>Priority:</strong> {task.priority}
              </p>
              <p className="text-gray-600">
                <strong>Due Date:</strong> {task.dueDate}
              </p>
              <p className="text-gray-600">
                <strong>Assigned User:</strong> {task.assignedUser}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-red-600">No task found with ID {taskId}.</p>
          )}
        </div>
      ) : (
        <p className="text-red-600">No project found with ID {projectId}.</p>
      )}
    </div>
  );
};

export default ViewTasks;
