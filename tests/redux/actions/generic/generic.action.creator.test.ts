import { courses } from "../../../../tools/mockData";
import {
  SAVE_COURSE_SUCCESS,
  LOAD_COURSES_SUCCESS
} from "../../../../src/redux/actions/util/action.types";
import { action } from "../../../../src/redux/actions/util/generic.actions";

describe("ActionWithPayload", () => {
  it("should create a SAVE_COURSE_SUCCESS action", () => {
    //arrange
    const course = courses[0];
    const expectedAction = {
      type: SAVE_COURSE_SUCCESS,
      payload: course
    };

    //act
    const createdAction = action(SAVE_COURSE_SUCCESS, course);

    //assert
    expect(createdAction).toEqual(expectedAction);
  });

  it("should create a LOAD_COURSES_SUCCESS action", () => {
    //arrange
    const expectedAction = {
      type: LOAD_COURSES_SUCCESS,
      payload: courses
    };

    //act
    const createdAction = action(LOAD_COURSES_SUCCESS, courses);

    //assert
    expect(createdAction).toEqual(expectedAction);
  });
});
