import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./Components/SideBar";
import LoginForm from "./Components/LoginForm";
import { useState } from "react";
import RegisterForm from "./Components/RegisterForm";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App d-flex overflow-x-hidden">
      <BrowserRouter>
        {user && <SideBar />}
        <Routes>
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/register" element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
