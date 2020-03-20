import {
  LOAD_COURSES_SUCCESS,
  ThunkResult,
  LOAD_COURSES_FAILURE,
  ActionResult
} from "./util/action.types";
import { Dispatch } from "react";
import * as CourseApi from "../../api/course.api";
import { action, notice } from "./util/generic.actions";
import { Action } from "redux";
import { beginApiCall } from "./api.status.action";

const loadCourses = (): ThunkResult<Promise<ActionResult>> => async (
  dispatch: Dispatch<Action>
) => {
  dispatch(beginApiCall());

  try {
    const courses = await CourseApi.getCourses();
    dispatch(action(LOAD_COURSES_SUCCESS, courses));

    return { success: true };
  } catch (error) {
    dispatch(action(LOAD_COURSES_FAILURE, error.message));

    return { success: false, message: error.message };
  }
};

export { loadCourses };
