import {
  LOAD_AUTHORS_SUCCESS,
  ThunkResult,
  LOAD_AUTHORS_FAILURE,
  ActionResult
} from "./util/action.types";
import { Dispatch } from "react";
import * as AuthorApi from "../../api/author.api";
import { action, notice } from "./util/generic.actions";
import { Action } from "redux";
import { beginApiCall } from "./api.status.action";

const loadAuthors = (): ThunkResult<Promise<ActionResult>> => async (
  dispatch: Dispatch<Action>
) => {
  dispatch(beginApiCall());

  try {
    const authors = await AuthorApi.getAuthors();
    dispatch(action(LOAD_AUTHORS_SUCCESS, authors));

    return { success: true };
  } catch (error) {
    dispatch(action(LOAD_AUTHORS_FAILURE, error.message));

    return { success: false, message: error.message };
  }
};

export { loadAuthors };
