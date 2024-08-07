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
import "../css/Projects.css";
import { useEffect, useState } from "react";
import {
  addTaskProject,
  createProject,
  deleteProjects,
  getProjects,
} from "../redux/actions/projectsAction";
import { CheckCircle, Pen, PlusCircle, Trash } from "react-bootstrap-icons";
import {
  completeTask,
  deleteTasks,
  updateTask,
} from "../redux/actions/getAllTasksAction";

import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { getHabits } from "../redux/actions/habitsAction";

const Projects = () => {
  const projects = useSelector((state) => state.projects.content);
  const dispatch = useDispatch();
  const [nomeTaskProject, setNomeTaskProject] = useState("");
  const [dataTaskProject, setDataTaskProject] = useState("");
  const [idTaskProject, setIdTaskProject] = useState(0);
  const [updateNomeTaskProject, setUpdateNomeTaskProject] = useState("");
  const [updateDataTaskProject, setUpdateDataTaskProject] = useState("");
  const [update, setUpdate] = useState(false);
  const [show, setShow] = useState(false);
  const [nomeProject, setNomeProject] = useState("");

  //Funzione per creare un Project
  const handleCreateProject = async () => {
    const projectObj = {
      name: nomeProject,
    };
    await dispatch(createProject(projectObj));
    setNomeProject("");
    handleClose2();
  };

  //Funzione per eliminare un Progetto
  const handleDeleteProject = (id) => {
    dispatch(deleteProjects(id));
  };

  //Funzioni per il modale di aggiunta e modifica tasks per Projects
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (idTaskProject) => {
    setIdTaskProject(idTaskProject);
    setUpdate(false);
    setShow(true);
  };
  const handleShowUpdate = (nome, data, id) => {
    setUpdate(true);
    setUpdateNomeTaskProject(nome);
    setUpdateDataTaskProject(data);
    setIdTaskProject(id);
    setShow(true);
  };

  //Funzioni per il modale di creazione Progetti
  const [show2, setShow2] = useState(false);
  const handleShow2 = () => {
    setShow2(true);
  };

  const handleClose2 = () => {
    setShow2(false);
  };

  //Funzione per aggiungere una task al progetto
  const handleAddTaskProject = async () => {
    const taskProjectObj = {
      name: nomeTaskProject,
      date: dataTaskProject,
    };
    await dispatch(addTaskProject(taskProjectObj, idTaskProject));
    setNomeTaskProject("");
    setDataTaskProject("");
    setIdTaskProject(0);
    handleClose();
  };

  //Funzione per modificare una Task del progetto
  const handleUpdateTaskProject = async () => {
    const taskObj = {
      name: updateNomeTaskProject,
      date: updateDataTaskProject,
      done: false,
    };
    await dispatch(updateTask(taskObj, idTaskProject));
    setUpdateNomeTaskProject("");
    setUpdateDataTaskProject("");
    setIdTaskProject(0);
    await dispatch(getHabits());
    handleClose();
  };

  //Funzione per checkare come fatta una task di un Project
  const handleCompleteTask = (nome, data, id) => {
    const taskProjectObj = {
      name: nome,
      date: data,
      done: true,
    };
    dispatch(completeTask(taskProjectObj, id));
  };

  //Funzione che mostra una Progress Bar per ogni progetto
  const progressBar = (taskslist, width = 600, height = 10) => {
    const completedTask = taskslist.filter(
      (tasklist) => tasklist.done === true
    ).length;
    const remainingTask = taskslist.filter(
      (tasklist) => tasklist.done === false
    ).length;

    const data = {
      labels: ["Tasks"],
      datasets: [
        {
          label: "Completed",
          data: [completedTask],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          borderSkipped: false,
          borderRadius: 5,
          barPercentage: 0.5,
          categoryPercentage: 10,
        },
      ],
    };
    const options = {
      indexAxis: "y",
      layout: {
        padding: 0,
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          max: completedTask + remainingTask,
          min: 0,
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
          },
          border: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
          },
          border: {
            display: false,
          },
        },
      },
    };

    return <Bar data={data} options={options} width={width} height={height} />;
  };

  useEffect(() => {
    dispatch(getProjects());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid className="container-card ">
      <Row className="mt-3 ms-2">
        <div className="mb-5">
          <Button variant="outline-transparent" onClick={handleShow2}>
            <PlusCircle size={30} />
          </Button>
        </div>
        {projects.map((project) => {
          return (
            <Col xs={12} md={12} lg={6}>
              <Card
                className="task-card task-card-body border-0 rounded-5 overflow-y-auto mb-3"
                key={project.id}
              >
                <div className="d-flex justify-content-between">
                  <Card.Title className="fs-3 text-center mt-3 ms-3">
                    {project.name}
                  </Card.Title>
                  <div className="me-4 mt-3">
                    <Button
                      variant="transparent"
                      onClick={() => handleShow(project.id)}
                    >
                      <PlusCircle size={25} />
                    </Button>
                    <Button
                      variant="transparent"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash size={25} />
                    </Button>
                  </div>
                </div>
                <div className="">{progressBar(project.tasksList)}</div>
                <Card.Body className="">
                  <Row>
                    <Col xs={12} md={12} lg={6}>
                      <div className="">
                        <Card.Title>TASK DEL PROGETTO</Card.Title>
                        {project.tasksList
                          .filter((tasklist) => tasklist.done === false)
                          .map((tasklist) => {
                            return (
                              <Card
                                key={tasklist.id}
                                className="my-3 flex-column-reverse"
                              >
                                <div className="m-3 text-end d-flex justify-content-end">
                                  <Button
                                    variant="outline-success"
                                    className="me-3"
                                    onClick={() =>
                                      handleCompleteTask(
                                        tasklist.name,
                                        tasklist.date,
                                        tasklist.id
                                      )
                                    }
                                  >
                                    <CheckCircle size={20} />
                                  </Button>

                                  <Button
                                    variant="outline-danger"
                                    className="me-3"
                                    onClick={() =>
                                      dispatch(deleteTasks(tasklist.id))
                                    }
                                  >
                                    {" "}
                                    <Trash size={20} />{" "}
                                  </Button>

                                  <Button
                                    variant="outline-warning"
                                    onClick={() =>
                                      handleShowUpdate(
                                        tasklist.name,
                                        tasklist.date,
                                        tasklist.id
                                      )
                                    }
                                  >
                                    {" "}
                                    <Pen size={20} />{" "}
                                  </Button>
                                </div>

                                <Card.Body className="fs-5">
                                  <div>
                                    <Card.Text className="fw-bold">
                                      {tasklist.name}
                                    </Card.Text>
                                    <Card.Text className="fs-6">
                                      {" "}
                                      <Badge bg="secondary">
                                        {tasklist.date}
                                      </Badge>{" "}
                                    </Card.Text>
                                    {tasklist.done && (
                                      <Card.Text className="fs-6 text-success">
                                        done
                                      </Card.Text>
                                    )}
                                  </div>
                                </Card.Body>
                              </Card>
                            );
                          })}
                      </div>
                    </Col>
                    <Col xs={12} md={12} lg={6}>
                      <div key={project.id}>
                        <Card.Title>TASK DEL PROGETTO FINITE</Card.Title>
                        {project.tasksList
                          .filter((tasklist) => tasklist.done === true)
                          .map((tasklist) => {
                            return (
                              <Card
                                key={tasklist.id}
                                className="my-3 flex-column-reverse "
                              >
                                <div className="m-3 text-end">
                                  <Button
                                    variant="outline-danger"
                                    className="me-3"
                                    onClick={() =>
                                      dispatch(deleteTasks(tasklist.id))
                                    }
                                  >
                                    {" "}
                                    <Trash size={20} />{" "}
                                  </Button>
                                </div>

                                <Card.Body className=" fs-5">
                                  <div>
                                    <Card.Text className="fw-bold">
                                      {tasklist.name}
                                    </Card.Text>
                                    <Card.Text className="fs-6">
                                      {" "}
                                      <Badge bg="secondary">
                                        {tasklist.date}
                                      </Badge>{" "}
                                    </Card.Text>
                                    {tasklist.done && (
                                      <Card.Text className="fs-6 text-success">
                                        done
                                      </Card.Text>
                                    )}
                                  </div>
                                </Card.Body>
                              </Card>
                            );
                          })}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
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
              value={!update ? nomeTaskProject : updateNomeTaskProject}
              onChange={(e) => {
                !update
                  ? setNomeTaskProject(e.target.value)
                  : setUpdateNomeTaskProject(e.target.value);
              }}
            />

            <Form.Control
              type="date"
              className="py-1"
              value={!update ? dataTaskProject : updateDataTaskProject}
              onChange={(e) => {
                !update
                  ? setDataTaskProject(e.target.value)
                  : setUpdateDataTaskProject(e.target.value);
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
            onClick={!update ? handleAddTaskProject : handleUpdateTaskProject}
          >
            SAVE
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modale per la creazione dei Project*/}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>CREA UN PROGETTO</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column pb-0">
          <FloatingLabel
            controlId="floatingInput"
            label="Nome Progetto"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Nome Progetto"
              className="mb-3"
              value={nomeProject}
              onChange={(e) => {
                setNomeProject(e.target.value);
              }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="danger" onClick={handleClose2}>
            CLOSE
          </Button>
          <Button variant="success" onClick={handleCreateProject}>
            SAVE
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Projects;
