import { useState } from "react";
import { Modal, Input, Form, Button, Select } from "antd";
import { TaskFormValues } from "../interface/project.interface";

const { Option } = Select;

const ProjectToolbar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values: TaskFormValues) => {
    console.log("Task added:", values);

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search projects..."
          className="border border-gray-300 rounded-md p-2 w-60"
        />
        <Button type="primary" onClick={showModal}>
          + Add Tasks
        </Button>
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
              <Option value="Pending">Pending</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
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
            <Button type="primary" htmlType="submit">
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProjectToolbar;
