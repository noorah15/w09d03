import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import signIn from "./login";
import tasks from "./tasks";
import adminTasks from "./adminTasks";

const reducers = combineReducers({ signIn, tasks, adminTasks });

const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();
