import { useState, useEffect, ChangeEvent } from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import ProjectToolbar from "./ProjectToolbar";
import {
  ProjectType,
  TaskFormValues,
  TaskType,
} from "../interface/project.interface";
import { useNavigate } from "react-router-dom";
import { projects as initialProjects } from "../data/data";
import { Modal, Form, Input, Select, Collapse, message } from "antd";

const { Option } = Select;
const { Panel } = Collapse;

const Project = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectType[]>(() => {
    const storedProjects = localStorage.getItem("projects");
    return storedProjects ? JSON.parse(storedProjects) : initialProjects;
  });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<ProjectType | null>(
    null
  );
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const showModal = (project: ProjectType, task: TaskType) => {
    setCurrentProject(project);
    setCurrentTask(task);
    setIsModalVisible(true);
  };

  const handleOk = async (values: TaskFormValues) => {
    if (currentProject && currentTask) {
      const updatedProject: ProjectType = {
        ...currentProject,
        ...values.project,
      };

      const updatedTask: TaskType = {
        ...currentTask,
        ...values.task,
      };

      const updatedProjects = projects.map((project) => {
        if (project.id === updatedProject.id) {
          return {
            ...updatedProject,
            tasks: project.tasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            ),
          };
        }
        return project;
      });

      setProjects(updatedProjects);
      setIsModalVisible(false);
      message.success("Project and Task updated successfully!");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredProjects = projects.filter((project) => {
    const isProjectMatch = project.name.toLowerCase().includes(searchTerm);
    const isTaskMatch = project.tasks.some((task) =>
      task.name.toLowerCase().includes(searchTerm)
    );
    return isProjectMatch || isTaskMatch;
  });

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
    setProjects(updatedProjects);
    message.success("Task deleted successfully!");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-400";
      default:
        return "text-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "text-red-600";
      case "Todo":
        return "text-yellow-500";
      case "Completed":
        return "text-green-400";
      case "Review":
        return "text-green-900";
      default:
        return "text-gray-500";
    }
  };

  const handleProjectSelect = (projectId: number) => {
    setSelectedProjectId(projectId);
  };

  const addTaskToProject = (newTask: TaskType) => {
    if (selectedProjectId === null) {
      message.warning("Please select a project first!");
      return;
    }

    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id === selectedProjectId) {
          return { ...project, tasks: [...project.tasks, newTask] };
        }
        return project;
      })
    );
  };

  return (
    <>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        <ProjectToolbar
          addTask={addTaskToProject}
          onProjectSelect={handleProjectSelect}
        />

        <Input
          placeholder="Search projects and tasks..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full mb-4"
        />

        <div className="mt-4">
          <Collapse defaultActiveKey={[filteredProjects[0]?.id]}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project: ProjectType) => (
                <Panel header={project.name} key={project.id}>
                  <div className="p-2 overflow-x-auto">
                    {project.tasks.length > 0 ? (
                      <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-2 py-1 text-left">Task Name</th>
                            <th className="px-2 py-1 text-left">Description</th>
                            <th className="px-2 py-1 text-left">Status</th>
                            <th className="px-2 py-1 text-left">Due Date</th>
                            <th className="px-2 py-1 text-left">Assigned User</th>
                            <th className="px-2 py-1 text-left">Priority</th>
                            <th className="px-2 py-1 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.tasks
                            .filter((task) =>
                              task.name.toLowerCase().includes(searchTerm)
                            )
                            .map((task: TaskType) => (
                              <tr key={task.id}>
                                <td className="px-2 py-1">{task.name}</td>
                                <td className="px-2 py-1">{task.description}</td>
                                <td className="px-2 py-1">
                                  <span
                                    className={`px-2 py-1 rounded-full font-semibold ${getStatusColor(
                                      task.status
                                    )}`}
                                  >
                                    {task.status}
                                  </span>
                                </td>
                                <td className="px-2 py-1">{task.dueDate}</td>
                                <td className="px-2 py-1">{task.assignedUser}</td>
                                <td className={`px-2 py-1 ${getPriorityColor(task.priority)}`}>
                                  {task.priority}
                                </td>
                                <td className="flex gap-2 px-2 py-1 text-lg">
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
        onCancel={handleCancel}
        footer={null}
        style={{ top: 20 }}
      >
        {currentProject && currentTask && (
          <Form layout="vertical" onFinish={handleOk}>
            <Form.Item
              label="Project Name"
              name={["project", "name"]}
              initialValue={currentProject.name}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Project Description"
              name={["project", "description"]}
              initialValue={currentProject.description}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Project Budget"
              name={["project", "budget"]}
              initialValue={currentProject.budget}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Project Start Date"
              name={["project", "startDate"]}
              initialValue={currentProject.startDate}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              label="Task Name"
              name={["task", "name"]}
              initialValue={currentTask.name}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Task Description"
              name={["task", "description"]}
              initialValue={currentTask.description}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Task Status"
              name={["task", "status"]}
              initialValue={currentTask.status}
            >
              <Select>
                <Option value="Todo">Todo</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Completed">Completed</Option>
                <Option value="Review">Review</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Task Due Date"
              name={["task", "dueDate"]}
              initialValue={currentTask.dueDate}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              label="Assigned User"
              name={["task", "assignedUser"]}
              initialValue={currentTask.assignedUser}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Task Priority"
              name={["task", "priority"]}
              initialValue={currentTask.priority}
            >
              <Select>
                <Option value="High">High</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Low">Low</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Update Project and Task
              </button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default Project;
