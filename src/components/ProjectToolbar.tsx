import { useState, useEffect } from "react";
import { Modal, Input, Form, Button, Select, message } from "antd";
import { TaskFormValues } from "../interface/project.interface";
import { projects } from "../data/data";

const { Option } = Select;

const ProjectToolbar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | undefined>(undefined);
  const [localTasks, setLocalTasks] = useState<any[]>([]); // State to hold tasks from local storage

  useEffect(() => {
    // Load tasks from local storage
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setLocalTasks(JSON.parse(savedTasks));
    }
  }, []);

  const showModal = () => {
    if (!selectedProject) {
      message.error("Please select a project first!");
      return;
    }
    setIsModalVisible(true);
  };

  const handleOk = (values: TaskFormValues) => {
    const newTask = { ...values, project: selectedProject, id: Date.now() }; // Create a new task with a unique ID
    const updatedTasks = [...localTasks, newTask]; // Add the new task to the existing tasks

    // Save updated tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setLocalTasks(updatedTasks); // Update the local state
    console.log("Task added:", newTask);

    setIsModalVisible(false);
    setSelectedProject(undefined); // Reset selected project after submission
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedProject(undefined); // Reset selected project on cancel
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <data></data>
        <div>
          <Select 
            placeholder="Select a Project" 
            className="w-60 mx-4" 
            onChange={(value) => setSelectedProject(value)}
            value={selectedProject} // Set value to selectedProject
          >
            {projects.map((project) => (
              <Option key={project.id} value={project.name}>
                {project.name}
              </Option>
            ))}
          </Select>
          <Button type="primary" onClick={showModal}>
            + Add Tasks
          </Button>
        </div>
      </div>

      <Modal
        title="Add New Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        style={{ top: 20 }}
      >
        <Form layout="vertical" onFinish={handleOk}>
          <Form.Item
            label="Task Name"
            name="taskName"
            rules={[{ required: true, message: "Please input the task name!" }]}
          >
            <Input placeholder="Enter task name" />
          </Form.Item>

          <Form.Item
            label="Task Description"
            name="taskDescription"
            rules={[{ required: true, message: "Please input the task description!" }]}
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
            <Input type="date" placeholder="Select due date" />
          </Form.Item>

          <Form.Item
            label="Assigned User"
            name="assignedUser"
            rules={[{ required: true, message: "Please input the assigned user!" }]}
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
            <Button 
              type="primary" 
              htmlType="submit"
              disabled={!selectedProject} // Disable button if no project is selected
            >
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProjectToolbar;
