import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addTasks,
  completeTask,
  deleteTasks,
  getTasks,
} from "../redux/actions/getAllTasksAction";
import { CheckCircle, Pen, PlusCircle, Trash } from "react-bootstrap-icons";
import "../css/HomePage.css";

import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
Chart.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.content);

  //Modifica task done
  const handleCompleteTask = (nome, data, id) => {
    const doneTask = {
      name: nome,
      date: data,
      done: true,
    };
    dispatch(completeTask(doneTask, id));
  };

  //Funzioni per il modale di creazione Task
  const [show, setShow] = useState(false);
  const [nomeTask, setNomeTask] = useState("");
  const [dataTask, setDataTask] = useState(null);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  //Funzione per aggiungere Task
  const handleAddTask = async () => {
    const taskObj = {
      name: nomeTask,
      date: dataTask,
    };
    console.log();
    await dispatch(addTasks(taskObj));
    setNomeTask("");
    setDataTask(null);
    handleClose();
  };

  //Funzione che filtra le task fatte
  const filteredTask = () => {
    const completedTasks = tasks.filter((task) => task.done === true).length;
    const pendingTasks = tasks.filter((task) => task.done === false).length;

    const data = {
      labels: ["Completed", "Pending"],
      datasets: [
        {
          data: [completedTasks, pendingTasks],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"],
          borderWidth: 1,
        },
      ],
    };
    return <Doughnut data={data} />;
  };

  //Lo useEffect al caricamento del componente fa una get sulla lista delle Task per tenerla aggiornata
  useEffect(() => {
    dispatch(getTasks());
    console.log(tasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid className="container-card">
      <Row>
        <Col xs={12} md={12} lg={4} className="mt-3">
          <Card className="task-card border-0 overflow-auto">
            <Card.Body className="task-card-body">
              <Card.Title className="fs-3 fw-bold d-flex justify-content-between">
                Tasks per oggi{" "}
                <Button variant="transparent" onClick={handleShow}>
                  <PlusCircle size={25} />
                </Button>
              </Card.Title>
              <Card.Text>
                {tasks.length > 0 &&
                  tasks.map((task) => {
                    return (
                      <Card key={task.id} className="my-3 flex-column-reverse">
                        <div className="m-3 text-end">
                          <Button
                            variant="outline-success"
                            onClick={() => {
                              handleCompleteTask(task.name, task.date, task.id);
                            }}
                            className="me-3"
                          >
                            <CheckCircle size={20} />
                          </Button>

                          <Button
                            variant="outline-danger"
                            className="me-3"
                            onClick={() => {
                              dispatch(deleteTasks(task.id));
                            }}
                          >
                            {" "}
                            <Trash size={20} />{" "}
                          </Button>

                          <Button variant="outline-warning">
                            {" "}
                            <Pen size={20} />{" "}
                          </Button>
                        </div>

                        <Card.Body className="d-flex justify-content-between fs-5">
                          <div>
                            <Card.Text className="fw-bold">
                              {task.name}
                            </Card.Text>
                            <Card.Text className="fs-6">
                              {" "}
                              <Badge bg="secondary">{task.date}</Badge>{" "}
                            </Card.Text>
                            {task.done && (
                              <Card.Text className="fs-6 text-success">
                                done
                              </Card.Text>
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    );
                  })}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={12} lg={4}>
          <Card className="task-card task-card-body border-0 mt-3">
            <Card.Body>{filteredTask()}</Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modale per la creazione di Task */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>AGGIUNGI TASKS</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column pb-0">
          <FloatingLabel
            controlId="floatingInput"
            label="Nome Task"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Nome Task"
              className="mb-3"
              value={nomeTask}
              onChange={(e) => {
                setNomeTask(e.target.value);
              }}
            />

            <Form.Control
              type="date"
              className="py-1"
              value={dataTask}
              onChange={(e) => {
                setDataTask(e.target.value);
              }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="danger" onClick={handleClose}>
            CLOSE
          </Button>
          <Button variant="success" onClick={handleAddTask}>
            SAVE
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HomePage;
