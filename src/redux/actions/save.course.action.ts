import Course from "../../types/course.type";
import {
  SAVE_COURSE_SUCCESS,
  ThunkResult,
  SAVE_COURSE_FAILURE,
  UPDATE_COURSE_SUCCESS,
  ActionResult
} from "./util/action.types";
import { Dispatch } from "react";
import * as CourseApi from "../../api/course.api";
import { action, notice } from "./util/generic.actions";
import { Action } from "redux";
import { beginApiCall } from "./api.status.action";

const saveCourse = (
  course: Course
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(beginApiCall());

  try {
    const persistedCourse = await CourseApi.saveCourse(course);
    const type = course.id ? UPDATE_COURSE_SUCCESS : SAVE_COURSE_SUCCESS;

    dispatch(action(type, persistedCourse));

    return { success: true };
  } catch (error) {
    dispatch(action(SAVE_COURSE_FAILURE, error.message));

    return { success: false, message: error.message };
  }
};

export { saveCourse };
