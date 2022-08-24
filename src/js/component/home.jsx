import React, { useState, useEffect, useRef } from "react";
import Task from "./Task.jsx";

//create your first component
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const taskNumber = useRef();
  const [text, setText] = useState("");
  const [labelError, setLabelError] = useState("Add a task here...");

  //Get TODO's from API
  fetch("http://assets.breatheco.de/apis/fake/todos/user/hayder10")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var tasks = [];
      data.forEach((value) => {
        !value.done ? tasks.push(value.label) : null;
      });
      setTasks(tasks);
      taskNumber.current = tasks.length;
    })
    .catch((error) => {
      console.log(error);
    });

  //POST Task to API
  const postTasks = () => {
    var arrayToSend = [];
    tasks.map((value) => {
      arrayToSend.push({
        label: value,
        done: false,
      });
    });

    //Fetch PUT
    fetch("http://assets.breatheco.de/apis/fake/todos/user/hayder10", {
      method: "PUT",
      body: JSON.stringify(arrayToSend),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  
  const Sendinfo = () => {
    if (text !== "") {
      console.log("submitted");
      console.log(text);
      var new_tasks = tasks;
      new_tasks.push(text);
      setText("");
      setTasks(new_tasks);
      postTasks();
	  setLabelError("Add a task here...")
    } else {
      console.log("Error! Add a task first!");
	  setLabelError("Error, please add a task next time")
    }
  };

  const handleClick = (index) => {
    tasks.splice(index, 1);
    setTasks([...tasks]);
    var arrayToSend = [];
    tasks.map((value) => {
      arrayToSend.push({
        label: value,
        done: false,
      });
    });

    //Fetch PUT
    fetch("http://assets.breatheco.de/apis/fake/todos/user/hayder10", {
      method: "PUT",
      body: JSON.stringify(arrayToSend),
      headers: {
        "Content-Type": "application/json",
      },
    });
    taskNumber.current = tasks.length;
  };

  return (
    <div className="body">
      <div className="paper">
        <div className="inputBox">
          <input
            className="form-control"
            id="inputTask"
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder={labelError}
          ></input>
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary mb-3 mt-2"
              onClick={Sendinfo}
            >
              Send Task
            </button>
          </div>
        </div>
        {tasks.length !== 0 ? (
          tasks.map((item, index) => (
            <Task
              text={item}
              key={index}
              onClick={() => {
                handleClick(index);
              }}
            />
          ))
        ) : (
          <div className="emptyTask">Waiting for task</div>
        )}
        {tasks.length !== 0 ? (
          <div className="footer">{taskNumber.current} tasks left...</div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
