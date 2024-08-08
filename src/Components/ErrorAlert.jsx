import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ErrorAlert = () => {
  const error = useSelector((state) => state.error.content);
  return (
    <Alert variant="danger" className="mt-4 p-5 fs-3">
      {error}{" "}
      <Link
        to="/auth/login"
        onClick={() => localStorage.removeItem("token")}
      ></Link>
    </Alert>
  );
};

export default ErrorAlert;
