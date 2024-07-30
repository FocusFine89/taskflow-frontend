import { useEffect, useState } from "react";
import {
  Alert,
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

import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { getHabits } from "../redux/actions/habitsAction";
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.content);
  const navigate = useNavigate();
  const habits = useSelector((state) => state.habits.content);

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
    setDataTask("");
    handleClose();
  };

  //Funzione per il Chart delle Task
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

  //Funzione per il Chart delle Habits
  const barChartHabits = () => {
    const habitsDays = habits.map((habit) => habit.daysDone);
    const habitsName = habits.map((habit) => habit.name);

    const data = {
      labels: habitsName,
      datasets: [
        {
          label: "Giorni completati",
          data: habitsDays,
          borderWidth: 1,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
        },
      ],
    };
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Habits day Tracker",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
    return <Bar data={data} options={options} />;
  };

  //Lo useEffect al caricamento del componente fa una get sulla lista delle Task per tenerla aggiornata
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth/register");
    }
    dispatch(getTasks());
    console.log(tasks);
    dispatch(getHabits());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid className="container-card">
      <Row>
        <Col xs={12} md={12} lg={3} className="mt-3">
          <Card className="task-card border-0 overflow-auto">
            <Card.Body className="task-card-body">
              <Card.Title className="fs-3 fw-bold d-flex justify-content-between">
                Tasks per oggi{" "}
                <Button variant="transparent" onClick={handleShow}>
                  <PlusCircle size={25} />
                </Button>
              </Card.Title>
              <Card.Text>
                {/* Task ancora da fare per oggi */}
                {/* TODO aggiungere il filtro per filtrare le task con la data di oggi e anche senza data */}
                {tasks.length > 0 &&
                  tasks
                    .filter((task) => task.done === false)
                    .map((task) => {
                      return (
                        <Card
                          key={task.id}
                          className="my-3 flex-column-reverse"
                        >
                          <div className="m-3 text-end">
                            <Button
                              variant="outline-success"
                              onClick={() => {
                                handleCompleteTask(
                                  task.name,
                                  task.date,
                                  task.id
                                );
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
        {/* Grafico delle Tasks */}
        <Col xs={12} md={12} lg={3}>
          <Card className="task-card task-card-body border-0 mt-3 d-flex justify-content-center">
            <Card.Body>{filteredTask()}</Card.Body>
          </Card>
        </Col>
        {/* Recent Activities */}
        <Col xs={12} md={12} lg={4}>
          <Card className="mt-3 task-card task-card-body border-0 overflow-y-auto">
            <Card.Body>
              <Card.Title className="fw-bold fs-3">Tasks Recenti</Card.Title>
              {tasks
                .filter((task) => task.done === true)
                .map((task) => {
                  return (
                    <div className="d-flex flex-row justify-content-between my-3">
                      <Card className="p-1 card-recent-activities me-3">
                        <Card.Text className="fw-bold fs-5 p-2 ">
                          {task.name}
                        </Card.Text>
                        <Card.Text className="text-success ms-2">
                          {task.done && "done"}
                        </Card.Text>
                      </Card>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          dispatch(deleteTasks(task.id));
                        }}
                      >
                        {" "}
                        <Trash size={20} />{" "}
                      </Button>
                    </div>
                  );
                })}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <hr />
      {/* Parte Habits */}
      <Row>
        <Col xs={12} md={12} lg={6} className="mb-3">
          <Card className="border-0 ">
            <Card.Body className="task-card-body">
              <Card.Title className="fw-bold fs-3">Habits Tracker</Card.Title>
              {habits.map((habit) => {
                return (
                  <Card className="p-3" key={habit.id}>
                    <Card.Text className="fs-4">{habit.name}</Card.Text>
                  </Card>
                );
              })}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={12} lg={4} className="d-xs-none d-lg-block">
          <Card className="border-0 task-card-body">
            <Card.Body>{barChartHabits()} </Card.Body>
          </Card>
        </Col>
      </Row>
      <hr />

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
