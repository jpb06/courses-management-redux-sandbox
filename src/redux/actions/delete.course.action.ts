import {
  DELETE_COURSE_OPTIMISTIC,
  ThunkResult,
  ActionResult,
  DELETE_COURSE_FAILURE
} from "./util/action.types";
import { Dispatch } from "react";
import * as CourseApi from "../../api/course.api";
import { action, notice } from "./util/generic.actions";
import { Action } from "redux";
import Course from "../../types/course.type";

const deleteCourse = (
  course: Course
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  if (!course.id) return;

  // Doing optimistic delete, so not dispatching begin/end api call
  // actions, or apiCallError action since we're not showing the loading status for this.
  dispatch(action(DELETE_COURSE_OPTIMISTIC, course));

  try {
    const result = await CourseApi.deleteCourse(course.id);
    return result;
  } catch (error) {
    dispatch(action(DELETE_COURSE_FAILURE, error.message));
    return { success: false, message: error.message };
  }
};

export { deleteCourse };
