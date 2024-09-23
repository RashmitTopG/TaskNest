import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function AppBar() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Landing Page
      </button>

      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        Signup Page
      </button>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Login Page
      </button>
      {/* <button onClick={navigate("/todos")}>Todos</button> */}
    </div>
  );
}
