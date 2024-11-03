import { useState } from "react";
import { projects } from "../data/data";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import ProjectToolbar from "./ProjectToolbar";
import { Modal, Form, Input } from "antd";
import { ProjectType } from "../interface/project.interface";

const Project = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<ProjectType | null>(
    null
  );

  const showModal = (project: ProjectType) => {
    setCurrentProject(project);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="p-6">
        <ProjectToolbar />

        <div className="overflow-hidden rounded-lg shadow-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-gray-700 font-semibold">
                  Name
                </th>
                <th className="text-left px-6 py-3 text-gray-700 font-semibold">
                  Description
                </th>
                <th className="text-left px-6 py-3 text-gray-700 font-semibold">
                  Budget
                </th>
                <th className="text-left px-6 py-3 text-gray-700 font-semibold">
                  Start Date
                </th>
                <th className="text-left px-6 py-3 text-gray-700 font-semibold">
                  End Date
                </th>
                <th className="text-left px-6 py-3 text-gray-700 font-semibold">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-gray-700 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project: ProjectType) => (
                <tr
                  key={project.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{project.name}</td>
                  <td className="px-6 py-4">{project.description}</td>
                  <td className="px-6 py-4">{project.budget}</td>
                  <td className="px-6 py-4">{project.startDate}</td>
                  <td className="px-6 py-4">{project.endDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white font-semibold ${
                        project.status === "Active"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-4 text-lg">
                    <FaEye
                      className="text-blue-500 cursor-pointer"
                      title="View"
                    />
                    <FaEdit
                      className="text-yellow-500 cursor-pointer"
                      title="Edit"
                      onClick={() => showModal(project)}
                    />
                    <FaTrashAlt
                      className="text-red-500 cursor-pointer"
                      title="Delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        title="Edit Project"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 20 }}
      >
        {currentProject && (
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input defaultValue={currentProject.name} />
            </Form.Item>
            <Form.Item label="Description">
              <Input.TextArea defaultValue={currentProject.description} />
            </Form.Item>
            <Form.Item label="Budget">
              <Input type="number" defaultValue={currentProject.budget} />
            </Form.Item>
            <Form.Item label="Start Date">
              <Input type="date" defaultValue={currentProject.startDate} />
            </Form.Item>
            <Form.Item label="End Date">
              <Input type="date" defaultValue={currentProject.endDate} />
            </Form.Item>
            <Form.Item label="Status">
              <Input defaultValue={currentProject.status} />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default Project;
