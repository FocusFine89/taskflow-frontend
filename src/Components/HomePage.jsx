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
  updateTask,
} from "../redux/actions/getAllTasksAction";
import {
  Check,
  CheckCircle,
  Pen,
  PlusCircle,
  Trash,
} from "react-bootstrap-icons";
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
import { checkHabits, getHabits } from "../redux/actions/habitsAction";
import { getProjects } from "../redux/actions/projectsAction";
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
  const [idTask, setIdTask] = useState(0);
  const [update, setUpdate] = useState(false);
  const projects = useSelector((state) => state.projects.content);

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
  // eslint-disable-next-line no-unused-vars
  const [dataTask, setDataTask] = useState("");
  const [updateNameTask, setUpdateNameTask] = useState("");
  const [updateDataTask, setUpdateDataTask] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setUpdate(false);
    setShow(true);
  };

  const handleShowUpdate = (nome, data, id) => {
    setUpdate(true);
    setUpdateNameTask(nome);
    setUpdateDataTask(data);
    setIdTask(id);
    setShow(true);
  };

  //Funzione che ricava la data di oggi nel formato (yyyy-dd-mm)
  const currentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const currentDay = `${year}-${month}-${day}`;
    return currentDay;
  };

  //Funzione per aggiungere Task
  const handleAddTask = async () => {
    const taskObj = {
      name: nomeTask,
      date: currentDate(),
    };
    console.log();
    await dispatch(addTasks(taskObj));
    setNomeTask("");
    // setDataTask("");
    handleClose();
  };

  //Funzione per modificare le Task
  const handleUpdateTask = async () => {
    const taskObj = {
      name: updateNameTask,
      date: updateDataTask,
      done: false,
    };
    await dispatch(updateTask(taskObj, idTask));
    setUpdateNameTask("");
    setUpdateDataTask("");
    setIdTask(0);
    handleClose();
  };

  //Funzione per il Chart delle Task
  const filteredTask = () => {
    const completedTasks = tasks.filter((task) => task.done === true).length;
    const pendingTasks = tasks.filter(
      (task) =>
        task.done === false && (!task.date || task.date === currentDate())
    ).length;

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

  //Funzione per aggiungere 1 giorno alla Habit fatta
  const [habitDaysDone, setHabitsDaysDone] = useState(0);
  const handleCheckHabits = (id) => {
    setHabitsDaysDone(1);
    const habitObj = {
      daysDone: habitDaysDone,
    };
    dispatch(checkHabits(habitObj, id));
  };

  //Lo useEffect al caricamento del componente fa una get sulla lista delle Task, Habits e Projects per tenerle aggiornate
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth/register");
    }
    dispatch(getTasks());
    console.log(tasks);
    dispatch(getHabits());
    dispatch(getProjects());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid className="container-card">
      <Row>
        <Col xs={12} md={12} lg={3} className="mt-3">
          <Card className="task-card border-0 overflow-auto">
            <Card.Body className="task-card-body rounded-5 rounded-end-0">
              <Card.Title className="fs-3 d-flex justify-content-between">
                TASK PER OGGI{" "}
                <Button variant="transparent" onClick={handleShow}>
                  <PlusCircle size={25} />
                </Button>
              </Card.Title>
              <Card.Text>
                {/* Task ancora da fare per oggi */}
                {tasks.length > 0 &&
                  tasks
                    .filter(
                      (task) =>
                        task.done === false &&
                        (!task.date || task.date === currentDate())
                    )
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

                            <Button
                              variant="outline-warning"
                              onClick={() => {
                                handleShowUpdate(task.name, task.date, task.id);
                              }}
                            >
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
          <Card className="task-card task-card-body border-0 mt-3 d-flex justify-content-center rounded-5">
            <Card.Body>{filteredTask()}</Card.Body>
          </Card>
        </Col>
        {/* Recent Activities */}
        <Col xs={12} md={12} lg={4}>
          <Card className="mt-3 task-card task-card-body border-0 overflow-y-auto rounded-5">
            <Card.Body className="">
              <Card.Title className=" fs-3">TASK RECENTI</Card.Title>
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
        <Col
          xs={12}
          md={12}
          lg={6}
          className="mb-3 habits-card overflow-y-auto"
        >
          <Card className="border-0 ">
            <Card.Body className="task-card-body rounded-5">
              <Card.Title className="fs-3">HABITS TRACKER</Card.Title>
              {habits.map((habit) => {
                return (
                  <Card
                    className="p-3 mt-3 d-flex flex-row justify-content-between"
                    key={habit.id}
                  >
                    <Card.Text className="fs-4">{habit.name}</Card.Text>
                    <Button
                      variant="outline-success"
                      onClick={() => {
                        handleCheckHabits(habit.id);
                      }}
                    >
                      {" "}
                      <Check size={20} />{" "}
                    </Button>
                  </Card>
                );
              })}
            </Card.Body>
          </Card>
        </Col>
        {/* Grafico degli Habits */}
        <Col xs={12} md={12} lg={4} className="d-xs-none d-lg-block">
          <Card className="border-0 habits-card">
            <Card.Body className="task-card-body rounded-5">
              {barChartHabits()}{" "}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <hr />
      {/* Parte dei Projects */}
      <Row>
        <Col xs={12} md={12} lg={6} className="mb-5">
          <Card className="habits-card overflow-y-auto border-0 rounded-5 rounded-end-0">
            <Card.Body className="task-card-body">
              <Card.Title className=" fs-3">PROJECTS MANAGMENT</Card.Title>
              <Row>
                {projects.slice(0, 2).map((project) => {
                  return (
                    <Col xs={12} md={12} lg={6} className="mt-3">
                      <Card key={project.id}>
                        <Card.Title className="fw-bold fs-4 p-3 text-center">
                          {project.name}
                        </Card.Title>
                        <Card.Body>
                          {project.tasksList
                            .filter((task) => task.done === false)
                            .map((taskProject) => {
                              return (
                                <Card className="p-3 mb-2 d-flex flex-row justify-content-between">
                                  {taskProject.name}
                                  <Button
                                    variant="outline-success"
                                    onClick={() => {
                                      handleCompleteTask(
                                        taskProject.name,
                                        taskProject.date,
                                        taskProject.id
                                      );
                                    }}
                                  >
                                    {" "}
                                    <CheckCircle size={20} />{" "}
                                  </Button>
                                </Card>
                              );
                            })}
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modale per la creazione e modifica di Task */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            {!update ? "AGGIUNGI TASKS" : "MODIFICA TASK"}
          </Modal.Title>
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
              value={!update ? nomeTask : updateNameTask}
              onChange={(e) => {
                !update
                  ? setNomeTask(e.target.value)
                  : setUpdateNameTask(e.target.value);
              }}
            />

            <Form.Control
              type="date"
              className="py-1"
              value={!update ? currentDate() : updateDataTask}
              onChange={(e) => {
                !update
                  ? setDataTask(e.target.value)
                  : setUpdateDataTask(e.target.value);
              }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="danger" onClick={handleClose}>
            CLOSE
          </Button>
          <Button
            variant="success"
            onClick={!update ? handleAddTask : handleUpdateTask}
          >
            SAVE
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HomePage;
