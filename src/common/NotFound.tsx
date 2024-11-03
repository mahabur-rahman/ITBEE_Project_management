import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-400 mb-4">404</h1>
        <p className="text-xl text-red-400 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
