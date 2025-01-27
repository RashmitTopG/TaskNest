import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../context";

export function Logout() {
  const navigate = useNavigate();
  const { setRender } = useContext(TodoContext);

  const onLogout = () => {
    localStorage.removeItem("token");
    setRender((prev) => !prev);
    navigate("/");
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
      >
        Log Out
      </button>
    </div>
  );
}
