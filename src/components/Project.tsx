import { useState } from "react";
import { projects as initialProjects } from "../data/data"; // Import the initial projects data
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import ProjectToolbar from "./ProjectToolbar";
import { Modal, Form, Input, Collapse } from "antd";
import { ProjectType, TaskType } from "../interface/project.interface";
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;

const Project = () => {
  const [projects, setProjects] = useState<ProjectType[]>(initialProjects); // Set initial projects state
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<ProjectType | null>(null);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);

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

  // Function to delete a task
  const deleteTask = (projectId: number, taskId: number) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        // Filter out the task to be deleted
        const updatedTasks = project.tasks.filter((task) => task.id !== taskId);
        return { ...project, tasks: updatedTasks };
      }
      return project; // Return other projects unchanged
    });

    setProjects(updatedProjects); // Update the state with the new projects array
    console.log("Task deleted:", taskId);
  };

  return (
    <>
      <div className="p-6">
        <ProjectToolbar />

        <div className="mt-4">
          <Collapse defaultActiveKey={[projects[0]?.id]}>
            {projects?.map((project: ProjectType) => (
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
                          <th className="px-4 py-2 text-left">Assigned User</th>
                          <th className="px-4 py-2 text-left">Priority</th>
                          <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {project.tasks.map((task: TaskType) => (
                          <tr key={task.id}>
                            <td className="px-4 py-2">{task.name}</td>
                            <td className="px-4 py-2">{task.description}</td>
                            <td className="px-4 py-2">
                              <span
                                className={`px-3 py-1 rounded-full text-white font-semibold ${
                                  task.status === "Completed"
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                                }`}
                              >
                                {task.status}
                              </span>
                            </td>
                            <td className="px-4 py-2">{task.dueDate}</td>
                            <td className="px-4 py-2">{task.assignedUser}</td>
                            <td className="px-4 py-2">{task.priority}</td>
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
                                onClick={() => deleteTask(project.id, task.id)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-red-400 font-semibold">No tasks available for this project.</p>
                  )}
                </div>
              </Panel>
            ))}
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
              <Input defaultValue={currentProject.status} />
            </Form.Item>
            <Form.Item label="Task Name">
              <Input defaultValue={currentTask.name} />
            </Form.Item>
            <Form.Item label="Task Description">
              <Input.TextArea defaultValue={currentTask.description} />
            </Form.Item>
            <Form.Item label="Task Priority">
              <Input defaultValue={currentTask.priority} />
            </Form.Item>
            <Form.Item label="Task Status">
              <Input defaultValue={currentTask.status} />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default Project;
