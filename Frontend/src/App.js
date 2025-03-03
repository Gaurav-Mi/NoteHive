import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Homepage from "./components/Homepage";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Alerts from "./components/Alerts";

function App() {
  return (
    <>
      <Navbar />
      <Alerts />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
