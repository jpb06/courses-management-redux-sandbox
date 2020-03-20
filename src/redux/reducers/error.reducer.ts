import {
  LOAD_AUTHORS_FAILURE,
  LOAD_COURSES_FAILURE,
  SAVE_COURSE_FAILURE,
  DELETE_COURSE_FAILURE
} from "../actions/util/action.types";
import { ApplicationError } from "../../types/application.error.type";
import { initialState } from "../root.state";
import { ActionWithPayload } from "../actions/util/generic.actions";

const errorReducer = (
  state: ApplicationError | null = initialState.error,
  action: ActionWithPayload<string, string>
) => {
  switch (action.type) {
    /* --------------------------------------------------- */
    case LOAD_AUTHORS_FAILURE:
    case LOAD_COURSES_FAILURE:
    case SAVE_COURSE_FAILURE:
    case DELETE_COURSE_FAILURE:
      return { message: action.payload };
    /* --------------------------------------------------- */
    default:
      return null;
  }
};

export { errorReducer };
