import { useState } from "react";
import { Modal, Input, Form, Button, Select, message } from "antd";
import { projects } from "../data/data";
import { TaskType } from "../interface/project.interface";
import { Link } from "react-router-dom";

const { Option } = Select;

interface ProjectToolbarProps {
  addTask: (task: TaskType) => void;
  onProjectSelect: (projectId: number) => void;
}

const ProjectToolbar = ({ addTask, onProjectSelect }: ProjectToolbarProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [form] = Form.useForm();

  const showModal = () => {
    if (!selectedProject) {
      message.error("Please select a project first!");
      return;
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const projectIndex = projects.findIndex((p) => p.id === selectedProject);

      if (projectIndex !== -1) {
        const taskExists = projects[projectIndex].tasks.some(
          (task) => task.name === values.name
        );

        if (taskExists) {
          message.error(
            "A task with this name already exists in the selected project!"
          );
          return;
        }

        const existingTaskIds = projects[projectIndex].tasks.map(
          (task) => task.id
        );
        const newTaskId =
          existingTaskIds.length > 0 ? Math.max(...existingTaskIds) + 1 : 1;

        const newTask = { ...values, id: newTaskId };

        projects[projectIndex].tasks.push(newTask);

        addTask(newTask);

        localStorage.setItem("projects", JSON.stringify(projects));

        setIsModalVisible(false);
        form.resetFields();
      } else {
        message.error("Selected project not found!");
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between mb-4 md:flex-row">
        <div className="flex justify-center mb-4 md:mb-0">
          <Link
            to="/chart"
            className="px-6 py-3 font-semibold text-white transition duration-300 ease-in-out transform bg-red-500 rounded-lg shadow-md hover:bg-red-600 hover:scale-105"
          >
            Chart View
          </Link>
        </div>

        <div className="flex flex-col items-center md:flex-row">
          <Select
            placeholder="Select a Project"
            className="w-full mx-0 mb-2 md:mx-4 md:mb-0 md:w-60"
            onChange={(value) => {
              setSelectedProject(value);
              if (value !== null) {
                onProjectSelect(value);
              }
            }}
            value={selectedProject}
          >
            {projects.map((project) => (
              <Option key={project.id} value={project.id}>
                {project.name}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            onClick={showModal}
            className="w-full md:w-auto"
          >
            + Add Tasks
          </Button>
        </div>
      </div>

      <Modal
        title="Add New Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Task Name"
            name="name"
            rules={[{ required: true, message: "Please input the task name!" }]}
          >
            <Input placeholder="Enter task name" />
          </Form.Item>

          <Form.Item
            label="Task Description"
            name="description"
            rules={[
              { required: true, message: "Please input the task description!" },
            ]}
          >
            <Input.TextArea placeholder="Enter task description" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select placeholder="Select task status">
              <Option value="To Do">To Do</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
              <Option value="Review">Review</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[{ required: true, message: "Please select a due date!" }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            label="Assigned User"
            name="assignedUser"
            rules={[
              { required: true, message: "Please input the assigned user!" },
            ]}
          >
            <Input placeholder="Enter assigned user" />
          </Form.Item>

          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true, message: "Please select a priority!" }]}
          >
            <Select placeholder="Select task priority">
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={handleOk}>
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProjectToolbar;
