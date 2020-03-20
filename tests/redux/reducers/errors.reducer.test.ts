import { errorReducer } from "../../../src/redux/reducers/error.reducer";
import {
  LOAD_AUTHORS_FAILURE,
  LOAD_COURSES_FAILURE,
  SAVE_COURSE_FAILURE
} from "../../../src/redux/actions/util/action.types";
import { action } from "../../../src/redux/actions/util/generic.actions";

describe("Errors reducer actions", () => {
  it("Should return an error when passed LOAD_AUTHORS_FAILURE", () => {
    const errorAction = action(LOAD_AUTHORS_FAILURE, "Load authors error");
    const newState = errorReducer(null, errorAction);

    expect(newState?.message).toBe("Load authors error");
  });

  it("Should return an error when passed LOAD_COURSES_FAILURE", () => {
    const errorAction = action(LOAD_COURSES_FAILURE, "Load courses error");
    const newState = errorReducer(null, errorAction);

    expect(newState?.message).toBe("Load courses error");
  });

  it("Should return an error when passed SAVE_COURSE_FAILURE", () => {
    const errorAction = action(SAVE_COURSE_FAILURE, "save course error");
    const newState = errorReducer(null, errorAction);

    expect(newState?.message).toBe("save course error");
  });
});
