import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./components/Landing";
import "./App.css";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { AppBar } from "./components/AppBar";

function App() {
  console.log("App Rerenders");
  return (
    <BrowserRouter>
      {/* <AppBar /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
