import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./components/Landing";
import "./App.css";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { AppBar } from "./components/AppBar";
import { Todos } from "./components/Todos";
import { NewHome } from "./components/NewHome";

function App() {
  console.log("App Rerenders");

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todos" element={<Todos />} />
        {token ? (
          <Route path="/" element={<NewHome />} />
        ) : (
          <Route path="/" element={<Landing />} />
        )}
        <Route path="/newHome" element={<NewHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
