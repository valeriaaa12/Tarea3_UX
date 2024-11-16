import React, { useState, useEffect } from "react";
import { Container, Form, Button, ListGroup, Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ToDo.css";

const ToDo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date()); 

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval); 
  }, []);

  const handleAddTask = () => {
    if (task) {
      const newTask = { id: new Date().getTime().toString(), text: task, completed: false };
      setTasks([...tasks, newTask]);
      setTask("");
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((item, idx) =>
      idx === index ? { ...item, completed: !item.completed } : item
    );
    setTasks(updatedTasks);
  };

  const handleDeleteAll = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar todas las tareas?")) {
      setTasks([]);
    }
  };

  const handleDeleteCompleted = () => {
    const remainingTasks = tasks.filter((item) => !item.completed);
    setTasks(remainingTasks);
  };

  const onChange = (date) => setDate(date);

  return (
    <Container className="mt-4 p-4">
      <Row>
        <Col
          md={4}
          className="todo-container p-4 border rounded"
          style={{ marginLeft: "-50px",height:"auto",minHeight:"50px" }}
        >
          <h2 className="mb-3 text-pink">To Do List</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formTask">
              <Form.Control
                type="text"
                placeholder="Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </Form.Group>
            <Button id="b" onClick={handleAddTask} className="mb-3">
              Create Task
            </Button>
          </Form>
          <ListGroup>
            {tasks.map((item, index) => (
              <ListGroup.Item key={index} className="d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleToggleComplete(index)}
                  className="me-2"
                />
                <span className={item.completed ? "completed" : ""}>{item.text}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button id="b" onClick={handleDeleteAll} className="mt-3 me-2">
            Delete All Tasks
          </Button>
          <Button id="b" onClick={handleDeleteCompleted} className="mt-3">
            Delete Completed Tasks
          </Button>
        </Col>
        <Col md={4} className="calendar-container p-4 border rounded">
          <h3 className="text-pink">Calendar</h3>
          <div
            style={{
              padding: "10px",
              borderRadius: "8px",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            <Calendar
              id="calendar"
              onChange={onChange}
              value={date}
              tileClassName="calendar-tile"
              style={{ fontSize: "0.9rem" }}
            />
          </div>
          <div
            className="time-container p-4 mt-4 border rounded"
            style={{
              textAlign: "center",
            }}
          >
            <h3 className="text-pink text-center">Time</h3>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                padding: "10px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                textAlign: "center",
                color: "pink",
              }}
            >
              {time.toLocaleTimeString()}
            </div>
          </div>
        </Col>
      </Row>
    </Container>

  );
};

export default ToDo;
