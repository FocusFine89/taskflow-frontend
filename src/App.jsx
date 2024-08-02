import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./Components/SideBar";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import HomePage from "./Components/HomePage";
import Habits from "./Components/Habits";
import Tasks from "./Components/Tasks";

function App() {
  return (
    <div className="App d-flex overflow-hidden position-relative">
      <BrowserRouter>
        {localStorage.getItem("token") && <SideBar />}
        <Routes>
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/register" element={<RegisterForm />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
