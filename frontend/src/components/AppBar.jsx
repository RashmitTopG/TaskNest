import { useNavigate } from "react-router-dom";
import { Logout } from "./Logout";

export function AppBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="bg-blue-600 p-4 shadow-lg flex justify-between items-center">
      <div className="space-x-4">
        <button
          onClick={() => (token ? navigate("/newHome") : navigate("/"))}
          className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Landing Page
        </button>
        {token ? (
          <button
            onClick={() => {
              navigate("/todos");
            }}
            className="text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Todos
          </button>
        ) : null}
      </div>

      {!token ? (
        <div className="space-x-4">
          <button
            onClick={() => navigate("/signup")}
            className="text-white bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Signup Page
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-white bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-300"
          >
            Login Page
          </button>
        </div>
      ) : null}

      {token ? <Logout /> : null}
    </div>
  );
}
