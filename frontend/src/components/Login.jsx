import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);

    try {
      const result = await axios.post("http://localhost:3000/user/login", {
        username,
        password,
      });

      console.log(result);

      if (result.data.success) {
        localStorage.setItem("token", result.data.token);
        window.alert(result.data.message);
        navigate("/todos");
        // Change Later
      } else {
        setError(result.data.message);
      }
    } catch (error) {
      // Safely access errors array, if it exists
      const errors = error.response?.data?.errors;

      if (Array.isArray(errors) && errors.length > 0) {
        const [{ message }] = errors; // Destructure first error message
        window.alert(message || "Login failed");
        setError(message || "An error occurred");
      } else {
        const fallbackMessage =
          error.response?.data?.message || "An unknown error occurred";
        window.alert(fallbackMessage);
        setError(fallbackMessage);
      }

      console.error("Error during login:", error.response?.data);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Log In
        </button>
        <div className="text-center mt-4">
          Don't Have an Account?{" "}
          <span
            className="underline cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </div>
      </form>
    </div>
  );
}
