import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to Our App
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          The best place to manage your tasks and improve your productivity.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="text-lg bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out shadow-md"
        >
          Click Here to Login
        </button>
      </div>
    </div>
  );
}
