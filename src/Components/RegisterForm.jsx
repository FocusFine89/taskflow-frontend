import { Button, Card, Container } from "react-bootstrap";
import { Facebook, Google } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import "../css/LoginForm.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerAction } from "../redux/actions/registerAction";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const registerHandle = async () => {
    const userObj = {
      name: name,
      surname: surname,
      email: email,
      password: password,
    };
    await dispatch(registerAction(userObj));
    navigate("/auth/login");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center m-0">
      <Card style={{ width: "30rem", height: "38rem" }}>
        <Card.Body className="text-center my-3 d-flex flex-column">
          <Card.Title className="fs-2 fw-bold">Sign up</Card.Title>
          <input
            type="text"
            placeholder="Name"
            className="my-4 p-2"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Surname"
            className="mb-4 p-2"
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            className="mb-4 p-2"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-2"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button variant="dark" className="p-2 mb-2" onClick={registerHandle}>
            REGISTER
          </Button>
          <hr />
          <Button variant="danger" className="my-2" disabled>
            <Google className="me-2" size={20} /> SIGN UP WITH GOOGLE
          </Button>
          <Button disabled>
            <Facebook className="me-2" size={20} />
            SIGN UP WITH FACEBOOK
          </Button>
          <div className="mt-4">
            Do you already have an account?
            <Link to={"/auth/login"}>Sign in here</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterForm;
