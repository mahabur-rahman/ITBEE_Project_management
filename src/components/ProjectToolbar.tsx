import { useNavigate } from 'react-router-dom';
const ProjectToolbar = () => {
  const navigate = useNavigate()


  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search projects..."
          className="border border-gray-300 rounded-md p-2 w-60"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => navigate('/add-task')}>
          + Add Tasks
        </button>
      </div>
    </>
  );
};

export default ProjectToolbar;
