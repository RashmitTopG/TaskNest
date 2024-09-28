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
    <div>
      <button onClick={onLogout}>Log Out</button>
    </div>
  );
}
