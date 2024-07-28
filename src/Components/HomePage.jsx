import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteTasks, getTasks } from "../redux/actions/getAllTasksAction";
import { Trash } from "react-bootstrap-icons";
const HomePage = () => {
  const [userToken, setUserToken] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.content);

  useEffect(() => {
    setUserToken(localStorage.getItem("token"));
    dispatch(getTasks());
    console.log(tasks);
  }, [dispatch]);

  return (
    <Container className="m-5">
      <Card style={{ width: "25rem" }} className="tasks-card">
        <Card.Body>
          <Card.Title>Tasks per Oggi</Card.Title>
          <Card.Text>
            {tasks.length > 0 &&
              tasks.map((task) => {
                return (
                  <Card key={task.id} className="my-3">
                    <Card.Body className="d-flex justify-content-between fs-5">
                      <Card.Text>{task.name}</Card.Text>
                      {/* <Card.Text>{task.date}</Card.Text> */}
                      <Button
                        variant="danger"
                        onClick={() => dispatch(deleteTasks(task.id))}
                      >
                        <Trash />
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HomePage;
