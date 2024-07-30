import { Button, Card, Container } from "react-bootstrap";
import "../css/LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Google } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/actions/loginAction";
const LoginForm = () => {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const userObj = {
      email: userEmail,
      password: userPassword,
    };

    await dispatch(loginAction(userObj));

    if (localStorage.getItem("token")) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container className="d-flex justify-content-center align-items-center m-0">
      <Card style={{ width: "30rem", height: "30rem" }}>
        <Card.Body className="text-center my-3 d-flex flex-column">
          <Card.Title className="fs-2 fw-bold">Sign in</Card.Title>
          <input
            type="email"
            placeholder="Email"
            className="my-4 p-2"
            value={userEmail}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-2"
            value={userPassword}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button variant="dark" className="p-2 mb-2" onClick={handleLogin}>
            LOGIN
          </Button>
          <hr />
          <Button variant="danger" className="my-2" disabled>
            <Google className="me-2" size={20} /> SIGN IN WITH GOOGLE
          </Button>
          <Button disabled>
            <Facebook className="me-2" size={20} />
            SIGN IN WHIT FACEBOOK
          </Button>
          <div className="mt-4">
            Don't have an account?
            <Link to={"/auth/register"}>Register here</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginForm;
