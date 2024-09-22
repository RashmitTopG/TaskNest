import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle errors

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    setError(""); // Reset error state

    try {
      const result = await axios.post("http://localhost:3000/user/signup", {
        firstName,
        lastName,
        username,
        password,
      });

      // console.log(result);

      if (result.data.success) {
        localStorage.setItem("token", result.data.token);
        navigate("/");
      } else {
        setError("Signup failed");
      }

      // Reset input fields
      setFirstName("");
      setLastName("");
      setUserName("");
      setPassword("");
    } catch (error) {
      window.alert(error.response?.data.message || "Signup failed");
      console.error("Error during signup:", error.response?.data);
      setError(error.response?.data.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <form
        onSubmit={handleSubmit} // Call handleSubmit on form submission
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {/* Error message display */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
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
          type="submit" // Keep this to submit the form
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
