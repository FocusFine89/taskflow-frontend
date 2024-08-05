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
import { addTaskProject, getProjects } from "../redux/actions/projectsAction";
import { CheckCircle, Pen, PlusCircle, Trash } from "react-bootstrap-icons";
import {
  completeTask,
  deleteTasks,
  updateTask,
} from "../redux/actions/getAllTasksAction";

const Projects = () => {
  const projects = useSelector((state) => state.projects.content);
  const dispatch = useDispatch();
  const [nomeTaskProject, setNomeTaskProject] = useState("");
  const [dataTaskProject, setDataTaskProject] = useState("");
  const [idTaskProject, setIdTaskProject] = useState(0);
  const [updateNomeTaskProject, setUpdateNomeTaskProject] = useState("");
  const [updateDataTaskProject, setUpdateDataTaskProject] = useState("");
  const [updateIdTaskProject, setUpdateIdTaskProject] = useState(0);
  const [update, setUpdate] = useState(false);
  const [show, setShow] = useState(false);

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

  useEffect(() => {
    dispatch(getProjects());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  return (
    <Container fluid className="container-card ">
      <Row className="mt-3 ms-2">
        {projects.map((project) => {
          return (
            <Col xs={12} md={12} lg={6}>
              <Card
                className="task-card task-card-body border-0 rounded-5 overflow-y-auto"
                key={project.id}
              >
                <div className="d-flex justify-content-between">
                  <Card.Title className="fs-3 text-center mt-3 ms-3">
                    {project.name}
                  </Card.Title>
                  <Button
                    variant="transparent"
                    onClick={() => handleShow(project.id)}
                  >
                    <PlusCircle size={25} />
                  </Button>
                </div>
                <Card.Body className="d-flex justify-content-around">
                  <div className="w-100">
                    <Card.Title>TASK DEL PROGETTO</Card.Title>
                    {project.tasksList
                      .filter((tasklist) => tasklist.done === false)
                      .map((tasklist) => {
                        return (
                          <Card
                            key={tasklist.id}
                            className="my-3 flex-column-reverse"
                          >
                            <div className="m-3 text-end">
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

                            <Card.Body className="d-flex justify-content-between fs-5">
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

                  <div className="w-100 " key={project.id}>
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

                            <Card.Body className="d-flex justify-content-between fs-5">
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
    </Container>
  );
};

export default Projects;
