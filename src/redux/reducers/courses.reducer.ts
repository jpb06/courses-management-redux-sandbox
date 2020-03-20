import Course from "../../types/course.type";
import {
  LOAD_COURSES_SUCCESS,
  SAVE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  DELETE_COURSE_OPTIMISTIC
} from "../actions/util/action.types";
import { initialState } from "../root.state";
import { ActionWithPayload } from "../actions/util/generic.actions";

type coursesReducerAction =
  | ActionWithPayload<string, Course>
  | ActionWithPayload<string, Array<Course>>;

const coursesReducer = (
  state: Array<Course> = initialState.courses,
  action: coursesReducerAction
) => {
  const course = <Course>action.payload;
  const courses = <Array<Course>>action.payload;

  switch (action.type) {
    /* --------------------------------------------------- */
    case SAVE_COURSE_SUCCESS:
      return [...state, course];
    /* --------------------------------------------------- */
    case UPDATE_COURSE_SUCCESS:
      return state.map(el => (el.id === course.id ? course : el));
    /* --------------------------------------------------- */
    case LOAD_COURSES_SUCCESS:
      return courses;
    /* --------------------------------------------------- */
    case DELETE_COURSE_OPTIMISTIC:
      return state.filter(el => el.id !== course.id);
    /* --------------------------------------------------- */
    default:
      return state;
  }
};

export { coursesReducer };
