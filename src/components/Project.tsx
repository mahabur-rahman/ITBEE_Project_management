import { projects } from "../data/data"
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';


const Project = () => {
  return (
    <>
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
              {projects.map((project) => (
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
  )
}

export default Project
