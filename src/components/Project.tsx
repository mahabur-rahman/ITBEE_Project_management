import { useState } from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import ProjectToolbar from "./ProjectToolbar";
import { ProjectType, TaskType } from "../interface/project.interface";
import { useNavigate } from "react-router-dom";
import { projects as initialProjects } from "../data/data";
import { Modal, Form, Input, Select, Collapse } from "antd";

const { Option } = Select;
const { Panel } = Collapse;

const Project = () => {
  const [projects, setProjects] = useState<ProjectType[]>(initialProjects);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<ProjectType | null>(
    null
  );
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  const showModal = (project: ProjectType, task: TaskType) => {
    setCurrentProject(project);
    setCurrentTask(task);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log("Submitting changes for project:", currentProject);
    console.log("Submitting changes for task:", currentTask);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter projects and tasks based on the search term
  const filteredProjects = projects.filter((project) => {
    const isProjectMatch = project.name.toLowerCase().includes(searchTerm);
    const isTaskMatch = project.tasks.some((task) =>
      task.name.toLowerCase().includes(searchTerm)
    );
    return isProjectMatch || isTaskMatch;
  });

  // Handle delete task
  const handleDeleteTask = (projectId: number, taskId: number) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.filter((task) => task.id !== taskId),
        };
      }
      return project;
    });
    setProjects(updatedProjects); // Update state with the new project list
  };

  // Function to get color based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600"; // Red for high priority
      case "Medium":
        return "text-yellow-500"; // Yellow for medium priority
      case "Low":
        return "text-green-400"; // Green for low priority
      default:
        return "text-gray-500"; // Default gray for unknown priority
    }
  };

  return (
    <>
      <div className="p-6">
        <ProjectToolbar />

        {/* Search Input */}
        <Input
          placeholder="Search projects and tasks..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-4"
        />

        <div className="mt-4">
          <Collapse defaultActiveKey={[filteredProjects[0]?.id]}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project: ProjectType) => (
                <Panel header={project.name} key={project.id}>
                  <div className="p-4">
                    {project.tasks.length > 0 ? (
                      <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-2 text-left">Task Name</th>
                            <th className="px-4 py-2 text-left">Description</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Due Date</th>
                            <th className="px-4 py-2 text-left">
                              Assigned User
                            </th>
                            <th className="px-4 py-2 text-left">Priority</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.tasks
                            .filter((task) =>
                              task.name.toLowerCase().includes(searchTerm)
                            ) // Filter tasks based on search term
                            .map((task: TaskType) => (
                              <tr key={task.id}>
                                <td className="px-4 py-2">{task.name}</td>
                                <td className="px-4 py-2">
                                  {task.description}
                                </td>
                                <td className="px-4 py-2">
                                  <span
                                    className={`px-3 py-1 rounded-full text-white font-semibold ${
                                      task.status === "Completed"
                                        ? "bg-green-600"
                                        : task.status === "In Progress"
                                        ? "bg-blue-500"
                                        : task.status === "Todo"
                                        ? "bg-yellow-500"
                                        : task.status === "Review"
                                        ? "bg-purple-500"
                                        : task.status === "Blocked"
                                        ? "bg-red-500"
                                        : "bg-gray-500" // Fallback for other statuses
                                    }`}
                                  >
                                    {task.status}
                                  </span>
                                </td>
                                <td className="px-4 py-2">{task.dueDate}</td>
                                <td className="px-4 py-2">
                                  {task.assignedUser}
                                </td>
                                <td
                                  className={`px-4 py-2 ${getPriorityColor(
                                    task.priority
                                  )}`}
                                >
                                  {task.priority}
                                </td>
                                <td className="px-4 py-2 flex gap-4 text-lg">
                                  <FaEye
                                    className="text-blue-500 cursor-pointer"
                                    title="View Task"
                                    onClick={() =>
                                      navigate(
                                        `/view-task/projectId/${project.id}/taskId/${task.id}`
                                      )
                                    }
                                  />
                                  <FaEdit
                                    className="text-yellow-500 cursor-pointer"
                                    title="Edit Task"
                                    onClick={() => showModal(project, task)}
                                  />
                                  <FaTrashAlt
                                    className="text-red-500 cursor-pointer"
                                    title="Delete Task"
                                    onClick={() => {
                                      handleDeleteTask(project.id, task.id);
                                      console.log("Delete Task", task.id);
                                    }}
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No tasks available for this project.</p>
                    )}
                  </div>
                </Panel>
              ))
            ) : (
              <p>No projects or tasks found.</p>
            )}
          </Collapse>
        </div>
      </div>

      <Modal
        title="Edit Project and Task"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 20 }}
      >
        {currentProject && currentTask && (
          <Form layout="vertical">
            <Form.Item label="Project Name">
              <Input defaultValue={currentProject.name} />
            </Form.Item>
            <Form.Item label="Project Description">
              <Input.TextArea defaultValue={currentProject.description} />
            </Form.Item>
            <Form.Item label="Project Budget">
              <Input type="number" defaultValue={currentProject.budget} />
            </Form.Item>
            <Form.Item label="Project Start Date">
              <Input type="date" defaultValue={currentProject.startDate} />
            </Form.Item>
            <Form.Item label="Project End Date">
              <Input type="date" defaultValue={currentProject.endDate} />
            </Form.Item>
            <Form.Item label="Project Status">
              <Select
                defaultValue={currentProject.status}
                style={{ width: "100%" }}
              >
                <Option value="todo">To Do</Option>
                <Option value="in-progress">In Progress</Option>
                <Option value="completed">Completed</Option>
                <Option value="review">Review</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Task Name">
              <Input defaultValue={currentTask.name} />
            </Form.Item>
            <Form.Item label="Task Description">
              <Input.TextArea defaultValue={currentTask.description} />
            </Form.Item>
            <Form.Item label="Task Priority">
              <Select
                defaultValue={currentTask.priority}
                style={{ width: "100%" }}
              >
                <Option value="High">High</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Low">Low</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Task Status">
              <Select
                defaultValue={currentTask.status}
                style={{ width: "100%" }}
              >
                <Option value="todo">To Do</Option>
                <Option value="in-progress">In Progress</Option>
                <Option value="completed">Completed</Option>
                <Option value="review">Review</Option>
              </Select>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default Project;
