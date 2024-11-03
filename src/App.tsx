import React from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useRoutes } from "react-router-dom";
import { routes } from "./route";

interface Project {
  name: string;
  description: string;
  budget: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Planning";
}

const projects: Project[] = [
  {
    name: "Project Alpha",
    description: "Redesign of the client web portal.",
    budget: "$120,000",
    startDate: "Jan 10, 2024",
    endDate: "Jun 10, 2024",
    status: "Active",
  },
  {
    name: "Project D",
    description: "Project D description.",
    budget: "$67,106",
    startDate: "Jul 1, 2024",
    endDate: "Nov 1, 2025",
    status: "Active",
  },
  {
    name: "Project E",
    description: "Project E description.",
    budget: "$114,294",
    startDate: "Sep 1, 2024",
    endDate: "Dec 1, 2025",
    status: "Active",
  },
  {
    name: "Project F",
    description: "Project F description.",
    budget: "$85,386",
    startDate: "Jul 1, 2024",
    endDate: "Feb 1, 2025",
    status: "Planning",
  },
  {
    name: "Project G",
    description: "Project G description.",
    budget: "$136,531",
    startDate: "Oct 1, 2024",
    endDate: "May 1, 2025",
    status: "Planning",
  },
  {
    name: "Project H",
    description: "Project H description.",
    budget: "$112,547",
    startDate: "Oct 1, 2024",
    endDate: "Apr 1, 2025",
    status: "Planning",
  },
];

const ProjectTable: React.FC = () => {
  const router = useRoutes(routes);
  return (
    <>

    {router}
      <div className="p-6">
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search projects..."
            className="border border-gray-300 rounded-md p-2 w-60"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            + Manage Tasks
          </button>
        </div>
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
              {projects.map((project, index) => (
                <tr
                  key={index}
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
    </>
  );
};

export default ProjectTable;
