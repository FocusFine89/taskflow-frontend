import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./Components/SideBar";
import LoginForm from "./Components/LoginForm";
import { useState } from "react";
import RegisterForm from "./Components/RegisterForm";
import HomePage from "./Components/HomePage";

function App() {
  const [user, setUser] = useState(1);

  return (
    <div className="App d-flex overflow-x-hidden">
      <BrowserRouter>
        {user && <SideBar />}
        <Routes>
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/register" element={<RegisterForm />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
