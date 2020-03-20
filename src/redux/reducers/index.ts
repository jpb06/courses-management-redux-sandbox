import { combineReducers } from "redux";
import { coursesReducer } from "./courses.reducer";
import { authorsReducer } from "./authors.reducer";
import { errorReducer } from "./error.reducer";
import { apiStatusReducer } from "./api.status.reducer";

const rootReducer = combineReducers({
  courses: coursesReducer,
  authors: authorsReducer,
  error: errorReducer,
  apiCallsInProgress: apiStatusReducer
});

export default rootReducer;
