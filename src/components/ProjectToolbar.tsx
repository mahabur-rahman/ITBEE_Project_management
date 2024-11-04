import { useState } from "react";
import { Modal, Input, Form, Button, Select, message } from "antd";
import { projects } from "../data/data";

const { Option } = Select;

const ProjectToolbar = ({ addTask, onProjectSelect }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
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
      const newTask = { ...values, id: Date.now(), project: selectedProject };
      addTask(newTask);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div></div>
        <div>
          <Select
            placeholder="Select a Project"
            className="mx-4 w-60"
            onChange={(value) => {
              setSelectedProject(value);
              onProjectSelect(value);
            }}
            value={selectedProject}
          >
            {projects.map((project) => (
              <Option key={project.id} value={project.id}>
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
