import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import InterviewSetup from "./pages/InterviewSetup";
import InterviewPage from "./pages/InterviewPage";
import Result from "./pages/Result";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/interview/setup" element={<InterviewSetup />} />

      <Route path="/interview/:id" element={<InterviewPage />} />

      <Route path="/result/:id" element={<Result />} />
    </Routes>
  );
}

export default App;
