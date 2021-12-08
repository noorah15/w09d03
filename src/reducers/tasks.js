const instialState = {
  items: [],
  taskAdd: "",
  taskUpdate: "",
};

const tasks = (state = instialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SETTASKS":
      const { items } = payload;
      return { ...state, items };
    case "ADDTASK":
      const { taskAdd } = payload;
      return { ...state, taskAdd };

    case "UPDATETASK":
      const { taskUpdate } = payload;
      return { ...state, taskUpdate };

    default:
      return state;
  }
};

export default tasks;

export const setTasks = (data) => {
  return {
    type: "SETTASKS",
    payload: data,
  };
};

export const addTaskReducers = (data) => {
  return {
    type: "ADDTASK",
    payload: data,
  };
};

export const updateTaskReducers = (data) => {
  return {
    type: "UPDATETASK",
    payload: data,
  };
};
