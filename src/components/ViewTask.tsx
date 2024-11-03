import { projects } from "../data/data";

const ViewTasks = () => {
  return (
    <>
    
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">View Project Tasks</h1>
      <div className="space-y-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p className="text-gray-600">{project.description}</p>
            <p className="text-gray-500">Status: {project.status}</p>
            <p className="text-gray-500">Budget: {project.budget}</p>
            <p className="text-gray-500">
              Duration: {project.startDate} - {project.endDate}
            </p>
            <h3 className="text-lg font-medium mt-4">Tasks:</h3>
            <ul className="mt-2 space-y-4">
              {project.tasks.map((task) => (
                <li key={task.id} className="border rounded-md p-4 bg-gray-100">
                  <h4 className="font-semibold">{task.name}</h4>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-gray-500">Status: {task.status}</p>
                  <p className="text-gray-500">Priority: {task.priority}</p>
                  <p className="text-gray-500">Due Date: {task.dueDate}</p>
                  <p className="text-gray-500">Assigned to: {task.assignedUser}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ViewTasks;
