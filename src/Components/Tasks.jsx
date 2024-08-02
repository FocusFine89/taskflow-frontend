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
import { CheckCircle, Pen, PlusCircle, Trash } from "react-bootstrap-icons";
import "../css/Tasks.css";

const Tasks = () => {
  const tasks = useSelector((state) => state.tasks.content);
  const dispatch = useDispatch();
  //tasks
  const [idTask, setIdTask] = useState(0);
  const [nomeTask, setNomeTask] = useState("");
  const [dataTask, setDataTask] = useState("");
  //Funzione per aggiungere Task
  const handleAddTask = async () => {
    const taskObj = {
      name: nomeTask,
      date: dataTask,
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
  //Funzione per completare le task
  const handleCompleteTask = (nome, data, id) => {
    const doneTask = {
      name: nome,
      date: data,
      done: true,
    };
    dispatch(completeTask(doneTask, id));
  };

  //update
  const [update, setUpdate] = useState(false);
  const [updateNameTask, setUpdateNameTask] = useState("");
  const [updateDataTask, setUpdateDataTask] = useState("");

  //Modale
  const [show, setShow] = useState(false);
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
  const currentDate = (num = 0) => {
    const date = new Date();
    const year = date.getFullYear();
    const day = String(date.getDate() + num).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const currentDay = `${year}-${month}-${day}`;
    return currentDay;
  };

  //Funzioni per ottenere i giorni della settimana corrente
  const lunedi = () => {
    const date = new Date();
    const day = date.getDay(),
      diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const martedi = () => {
    const date = new Date();
    const day = date.getDay(),
      diff = date.getDate() - day + (day === 0 ? -5 : 2);
    return new Date(date.setDate(diff));
  };

  const mercoledi = () => {
    const date = new Date();
    const day = date.getDay(),
      diff = date.getDate() - day + (day === 0 ? -4 : 3);
    return new Date(date.setDate(diff));
  };

  const giovedi = () => {
    const date = new Date();
    const day = date.getDay(),
      diff = date.getDate() - day + (day === 0 ? -3 : 4);
    return new Date(date.setDate(diff));
  };

  const venerdi = () => {
    const date = new Date();
    const day = date.getDay(),
      diff = date.getDate() - day + (day === 0 ? -2 : 5);
    return new Date(date.setDate(diff));
  };

  const sabato = () => {
    const date = new Date();
    const day = date.getDay(),
      diff = date.getDate() - day + (day === 0 ? -1 : 6);
    return new Date(date.setDate(diff));
  };

  const domenica = () => {
    const date = new Date();
    const day = date.getDay(),
      diff = date.getDate() - day + (day === 0 ? 0 : 7);
    return new Date(date.setDate(diff));
  };

  //Funzione per formattare la data (dentro date va passata la data che ritornano le funzioni sopra)
  function formatDate(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <Container fluid className="container-card">
      <Row className="mt-3">
        <Col xs={12} md={12} lg={4}>
          <Card className="mb-4  border-0 overflow-auto taskPage-card rounded-5">
            <Card.Body className="task-card-body">
              <Card.Title className="fs-4 d-flex flex-row justify-content-between">
                LUNEDÍ{" "}
                <Button variant="transparent" onClick={handleShow} className="">
                  <PlusCircle size={25} />
                </Button>
              </Card.Title>
              {tasks
                .filter(
                  (task) =>
                    task.date === formatDate(lunedi()) && task.done === false
                )
                .map((task) => {
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
                          <Card.Text className="fw-bold">{task.name}</Card.Text>
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
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={12} lg={4}>
          <Card className="mb-4  border-0 overflow-auto taskPage-card rounded-5">
            <Card.Body className="task-card-body">
              <Card.Title className="fs-4 d-flex flex-row justify-content-between">
                MARTEDÍ{" "}
                <Button variant="transparent" onClick={handleShow} className="">
                  <PlusCircle size={25} />
                </Button>
              </Card.Title>
              {tasks
                .filter(
                  (task) =>
                    task.date === formatDate(martedi()) && task.done === false
                )
                .map((task) => {
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
                          <Card.Text className="fw-bold">{task.name}</Card.Text>
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
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={12} lg={4}>
          <Card className="mb-4  border-0 overflow-auto taskPage-card rounded-5">
            <Card.Body className="task-card-body">
              <Card.Title className="fs-4 d-flex flex-row justify-content-between">
                MERCOLEDÍ{" "}
                <Button variant="transparent" onClick={handleShow} className="">
                  <PlusCircle size={25} />
                </Button>
              </Card.Title>
              {tasks
                .filter(
                  (task) =>
                    task.date === formatDate(mercoledi()) && task.done === false
                )
                .map((task) => {
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
                          <Card.Text className="fw-bold">{task.name}</Card.Text>
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
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={12} lg={4}>
          <Card className="mb-4  border-0 overflow-auto taskPage-card rounded-5">
            <Card.Body className="task-card-body">
              <Card.Title className="fs-4 d-flex flex-row justify-content-between">
                GIOVEDÍ{" "}
                <Button variant="transparent" onClick={handleShow} className="">
                  <PlusCircle size={25} />
                </Button>
              </Card.Title>
              {tasks
                .filter(
                  (task) =>
                    task.date === formatDate(giovedi()) && task.done === false
                )
                .map((task) => {
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
                          <Card.Text className="fw-bold">{task.name}</Card.Text>
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
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={12} lg={4}>
          <Card className="mb-4  border-0 overflow-auto taskPage-card rounded-5 ">
            <Card.Body className="task-card-body">
              <Card.Title className="fs-4 d-flex flex-row justify-content-between">
                VENERDÍ{" "}
                <Button variant="transparent" onClick={handleShow} className="">
                  <PlusCircle size={25} />
                </Button>
              </Card.Title>
              {tasks
                .filter(
                  (task) =>
                    task.date === formatDate(venerdi()) && task.done === false
                )
                .map((task) => {
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
                          <Card.Text className="fw-bold">{task.name}</Card.Text>
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
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={12} lg={4}>
          <Card className="mb-4  border-0 overflow-auto taskPage-card rounded-5">
            <Card.Body className="task-card-body">
              <Card.Title className="fs-4 d-flex flex-row justify-content-between">
                SABATO{" "}
                <Button variant="transparent" onClick={handleShow} className="">
                  <PlusCircle size={25} />
                </Button>
              </Card.Title>
              {tasks
                .filter(
                  (task) =>
                    task.date === formatDate(sabato()) && task.done === false
                )
                .map((task) => {
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
                          <Card.Text className="fw-bold">{task.name}</Card.Text>
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
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={12} lg={4}>
          <Card className="mb-4  border-0 overflow-auto taskPage-card rounded-5">
            <Card.Body className="task-card-body">
              <Card.Title className="fs-4 d-flex flex-row justify-content-between">
                DOMENICA{" "}
                <Button variant="transparent" onClick={handleShow} className="">
                  <PlusCircle size={25} />
                </Button>
              </Card.Title>
              {tasks
                .filter(
                  (task) =>
                    task.date === formatDate(domenica()) && task.done === false
                )
                .map((task) => {
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
                          <Card.Text className="fw-bold">{task.name}</Card.Text>
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
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={12} lg={4}>
          <Card className="mb-4  border-0 overflow-auto taskPage-card rounded-5">
            <Card.Body className="task-card-body">
              <Card.Title className="fs-4 d-flex flex-row justify-content-between">
                TUTTE LE TASK FATTE{" "}
                <Button variant="transparent" onClick={handleShow} className="">
                  <PlusCircle size={25} />
                </Button>
              </Card.Title>
              {tasks
                .filter((task) => task.done === true)
                .map((task) => {
                  return (
                    <Card key={task.id} className="my-3 flex-column-reverse">
                      <div className="m-3 text-end">
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
                      </div>

                      <Card.Body className="d-flex justify-content-between fs-5">
                        <div>
                          <Card.Text className="fw-bold">{task.name}</Card.Text>
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
              value={!update ? dataTask : updateDataTask}
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

export default Tasks;
