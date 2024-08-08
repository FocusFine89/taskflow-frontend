import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import "../css/habits.css";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, Pen, PlusCircle, Trash } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import {
  addHabit,
  checkHabits,
  deleteHabit,
  getHabits,
  updateHabit,
} from "../redux/actions/habitsAction";
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
import { Bar } from "react-chartjs-2";
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
const Habits = () => {
  const habits = useSelector((state) => state.habits.content);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [nomeHabit, setNomeHabit] = useState("");
  const [updateHabitName, setUpdateHabitName] = useState("");
  const [idHabit, setIdHabit] = useState(0);

  //Funzioni per il modale
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setUpdate(false);
    setShow(true);
  };

  const handleShowUpdate = (nomeHabit, id) => {
    setUpdate(true);
    setUpdateHabitName(nomeHabit);
    setIdHabit(id);
    setShow(true);
  };

  //Funzione per creare Habits
  const handleAddHabit = async () => {
    const habitObj = {
      name: nomeHabit,
    };
    await dispatch(addHabit(habitObj));
    setNomeHabit("");
    handleClose();
  };

  //Funzione per modificare Habits
  const handleUpdateHabit = () => {
    const habitObj = {
      name: updateHabitName,
    };
    dispatch(updateHabit(habitObj, idHabit));
    handleClose();
  };

  //Funzione di check per gli Habits

  const handleCheckHabits = (id) => {
    const habitObj = {
      daysDone: 1,
    };
    dispatch(checkHabits(habitObj, id));
  };

  //funzione per il chart delle Habits
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

  useEffect(() => {
    dispatch(getHabits());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container fluid className="container-card">
      <Row className="mt-3">
        <Col xs={12} md={12} lg={6} className="mb-3   ">
          <Card className="border-0">
            <Card.Body className="task-card-body rounded-5">
              <div className="d-flex justify-content-between">
                <Card.Title className="fs-3">HABITS TRACKER</Card.Title>
                <Button variant="trasparent" onClick={handleShow}>
                  {" "}
                  <PlusCircle size={25} />{" "}
                </Button>
              </div>

              {habits.map((habit) => {
                return (
                  <Card className="p-3 mt-3 d-flex flex-column" key={habit.id}>
                    <Card.Text className="fs-4">{habit.name}</Card.Text>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="outline-success"
                        className="me-3 button-size "
                        onClick={() => {
                          handleCheckHabits(habit.id);
                        }}
                      >
                        {" "}
                        <CheckCircle size={20} />
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="me-3 button-size "
                        onClick={() => {
                          dispatch(deleteHabit(habit.id));
                        }}
                      >
                        {" "}
                        <Trash size={20} />{" "}
                      </Button>
                      <Button
                        variant="outline-warning"
                        className="button-size "
                        onClick={() => {
                          handleShowUpdate(habit.name, habit.id);
                        }}
                      >
                        {" "}
                        <Pen size={20} />{" "}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </Card.Body>
          </Card>
        </Col>
        {/* Grafico degli Habits */}
        <Col xs={12} md={12} lg={6} className="d-xs-none d-lg-block">
          <Card className="border-0 habits-card h-50">
            <Card.Body className="task-card-body rounded-5">
              {barChartHabits()}{" "}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modale per aggiungere e modficare le Habits*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            {!update ? "AGGIUNGI HABIT" : "MODIFICA HABIT"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column pb-0">
          <FloatingLabel
            controlId="floatingInput"
            label="Nome Habit"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Nome Habits"
              className="mb-3"
              value={!update ? nomeHabit : updateHabitName}
              onChange={(e) => {
                !update
                  ? setNomeHabit(e.target.value)
                  : setUpdateHabitName(e.target.value);
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
            onClick={!update ? handleAddHabit : handleUpdateHabit}
          >
            SAVE
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Habits;
