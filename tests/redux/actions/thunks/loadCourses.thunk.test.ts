import { courses } from "../../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import {
  BEGIN_API_CALL,
  LOAD_COURSES_SUCCESS,
  LOAD_COURSES_FAILURE
} from "../../../../src/redux/actions/util/action.types";
import { loadCourses } from "../../../../src/redux/actions/load.courses.action";
import { AnyAction } from "redux";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Courses Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when succesfully loading courses", () => {
      fetchMock.mock(process.env.API_URL + "/courses/", {
        body: courses,
        headers: { "content-type": "application/json" }
      });

      const expectedActions = [
        { type: BEGIN_API_CALL },
        { type: LOAD_COURSES_SUCCESS, payload: courses }
      ];

      const store = mockStore({ courses: [] });
      const action = (loadCourses() as unknown) as AnyAction;
      return store.dispatch(action).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("should create BEGIN_API_CALL and LOAD_COURSES_FAILURE when failing to load courses", () => {
      fetchMock.mock(process.env.API_URL + "/courses/", 400);

      const expectedActions = [
        { type: BEGIN_API_CALL },
        { type: LOAD_COURSES_FAILURE, payload: "" }
      ];

      const store = mockStore({ courses: [] });
      const action = (loadCourses() as unknown) as AnyAction;
      return store.dispatch(action).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
