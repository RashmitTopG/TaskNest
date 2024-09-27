import { useNavigate } from "react-router-dom";

export function Logout() {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <button onClick={onLogout}>Log Out</button>
    </div>
  );
}
