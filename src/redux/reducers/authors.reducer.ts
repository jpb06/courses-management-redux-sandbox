import Author from "../../types/author.type";
import { LOAD_AUTHORS_SUCCESS } from "../actions/util/action.types";
import { initialState } from "../root.state";
import { ActionWithPayload } from "../actions/util/generic.actions";

const authorsReducer = (
  state: Array<Author> = initialState.authors,
  action: ActionWithPayload<string, Array<Author>>
) => {
  switch (action.type) {
    /* --------------------------------------------------- */
    case LOAD_AUTHORS_SUCCESS:
      return action.payload;
    /* --------------------------------------------------- */
    default:
      return state;
  }
};

export { authorsReducer };
