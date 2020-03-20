import { ThunkAction } from "redux-thunk";
import { RootState } from "../../root.state";
import { ApplicationError } from "../../../types/application.error.type";

export const SAVE_COURSE_FAILURE = "SAVE_COURSE_FAILURE";
export const SAVE_COURSE_SUCCESS = "SAVE_COURSE_SUCCESS";
export const UPDATE_COURSE_SUCCESS = "UPDATE_COURSE_SUCCESS";
export const LOAD_COURSES_FAILURE = "LOAD_AUTHORS_FAILURE";
export const LOAD_COURSES_SUCCESS = "LOAD_COURSES_SUCCESS";
export const LOAD_AUTHORS_FAILURE = "LOAD_AUTHORS_FAILURE";
export const LOAD_AUTHORS_SUCCESS = "LOAD_AUTHORS_SUCCESS";
export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const DELETE_COURSE_FAILURE = "DELETE_COURSE_FAILURE";
export const CLEAR_ERROR = "CLEAR_ERROR";

// By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
// API call. But since we're doing an optimistic delete, we're hiding loading state.
// So this action name deliberately omits the "_SUCCESS" suffix.
// If it had one, our apiCallsInProgress counter would be decremented below zero
// because we're not incrementing the number of apiCallInProgress when the delete request begins.
export const DELETE_COURSE_OPTIMISTIC = "DELETE_COURSE_OPTIMISTIC";

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, any>;

export interface ActionResult extends ApplicationError {
  success: boolean;
}
