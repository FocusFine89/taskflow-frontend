import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./Components/SideBar";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import HomePage from "./Components/HomePage";
import Habits from "./Components/Habits";
import Tasks from "./Components/Tasks";
import Projects from "./Components/Projects";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const updateToken = () => {
    setToken(localStorage.getItem("token"));
  };

  const handleLogin = () => {
    setToken(localStorage.getItem("token"));
  };

  useEffect(() => {
    // Ascolta i cambiamenti al localStorage
    window.addEventListener("storage", updateToken);

    return () => {
      window.removeEventListener("storage", updateToken);
    };
  }, []);

  return (
    <div className="App d-flex overflow-hidden position-relative">
      <BrowserRouter>
        {token ? <SideBar onLogout={() => setToken(null)} /> : null}
        <Routes>
          <Route
            path="/auth/login"
            element={<LoginForm onLogin={handleLogin} />}
          />
          <Route path="/auth/register" element={<RegisterForm />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
