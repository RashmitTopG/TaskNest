import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./components/Landing";
import "./App.css";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { AppBar } from "./components/AppBar";
import { Todos } from "./components/Todos";
import { NewHome } from "./components/NewHome";
import { TodoRender } from "./context";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <TodoRender>
        <AppBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/" element={token ? <NewHome /> : <Landing />} />
          <Route path="/newHome" element={<NewHome />} />
        </Routes>
      </TodoRender>
    </BrowserRouter>
  );
}

export default App;
