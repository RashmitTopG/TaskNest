import { useNavigate } from "react-router-dom";
import { Logout } from "./Logout";

export function AppBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div>
      <button onClick={() => (token ? navigate("/newHome") : navigate("/"))}>
        Landing Page
      </button>
      {token ? (
        <button
          onClick={() => {
            navigate("/todos");
          }}
        >
          Todos
        </button>
      ) : null}
      {!token ? (
        <div>
          <button onClick={() => navigate("/signup")}>Signup Page</button>
          <button onClick={() => navigate("/login")}>Login Page</button>
        </div>
      ) : null}

      {token ? <Logout /> : null}
    </div>
  );
}
