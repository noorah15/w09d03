import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsers,
  setTasks,
  addTaskReducers,
  updateTaskReducers,
} from "./../../reducers/adminTasks";

export default function Tasks() {
  const [user, setUser] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getAllUsers();
    getAllItems();
  }, []);

  useEffect(() => {
    getAllItems();
  }, [user]);

  const getAllUsers = async () => {
    try {
      const userId = localStorage.getItem("ID");
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users`,
        {
          params: { userId },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const data = {
        users: result.data,
      };

      dispatch(setUsers(data));

      //setUsers(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllItems = async () => {
    try {
      const id = localStorage.getItem("ID");
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/task/todosByAdmin/${user}/${id}`,
        {
          params: { id },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const data = {
        items: result.data,
      };

      dispatch(setTasks(data));

      // setItems(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = async () => {
    try {
      const userId = localStorage.getItem("ID");
      const id = localStorage.getItem("ID");
      console.log(state.adminTasks.taskAdd);
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/task/create`,
        { name: state.adminTasks.taskAdd, user: user, userId, id },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      //console.log(result.data);
      getAllItems();
      //setCreateTask(createTask + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async (taskId, userId) => {
    try {
      const id = localStorage.getItem("ID");
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/task/todoUpdate`,
        { taskId, userId, taskName: state.adminTasks.taskUpdate, id },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      getAllItems();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (taskId, userId) => {
    try {
      const id = localStorage.getItem("ID");
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/task/todoDel`,
        {
          data: { userId, taskId, id },
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      getAllItems();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1> Users: </h1>
      <select
        name="user"
        id="user"
        onChange={(e) => {
          console.log(e.target.value);
          setUser(e.target.value);
        }}
      >
        {state.adminTasks.users.map((item) => {
          return <option value={item._id}>{item.email}</option>;
        })}
      </select>

      <h1>add task: </h1>
      <input
        type="text"
        name="task"
        onChange={(e) => {
          const data = {
            taskAdd: e.target.value,
          };
          dispatch(addTaskReducers(data));
        }}
      />
      <button onClick={() => addTask()}> Add </button>

      <h1>Tasks</h1>
      {state.adminTasks.items.map((item) => (
        <>
          <h1>{item.name}</h1>
          <input
            type="text"
            name="task"
            onChange={(e) => {
              const data = {
                taskUpdate: e.target.value,
              };
              dispatch(updateTaskReducers(data));
            }}
          />
          <button onClick={() => updateTask(item._id, item.user)}>
            {" "}
            update{" "}
          </button>
          <button onClick={() => deleteTask(item._id, item.user)}>
            {" "}
            delete{" "}
          </button>
        </>
      ))}
    </div>
  );
}
