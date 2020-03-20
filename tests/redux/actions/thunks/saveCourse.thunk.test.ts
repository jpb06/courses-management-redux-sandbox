import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import {
  BEGIN_API_CALL,
  SAVE_COURSE_FAILURE,
  SAVE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS
} from "../../../../src/redux/actions/util/action.types";
import { AnyAction } from "redux";
import Course from "../../../../src/types/course.type";
import { saveCourse } from "../../../../src/redux/actions/save.course.action";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const course: Course = {
  authorId: 1,
  authorName: "That guy",
  title: "Some cool name",
  category: "That category",
  slug: "some-cool-name"
};

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Save Course Thunk", () => {
    it("should create BEGIN_API_CALL and SAVE_COURSE_SUCCESS when succesfully saving a course", () => {
      fetchMock.postOnce(
        process.env.API_URL + "/courses/",
        {
          headers: { "content-type": "application/json" },
          body: { ...course, id: 1 }
        },
        {
          headers: { "content-type": "application/json" },
          body: course
        }
      );

      const expectedActions = [
        { type: BEGIN_API_CALL },
        { type: SAVE_COURSE_SUCCESS, payload: { ...course, id: 1 } }
      ];

      const store = mockStore({ courses: [] });
      const action = (saveCourse(course) as unknown) as AnyAction;
      return store.dispatch(action).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("should create BEGIN_API_CALL and UPDATE_COURSE_SUCCESS when succesfully updating a course", () => {
      const courseToUpdate = { ...course, id: 1, title: "Updated title" };

      fetchMock.putOnce(
        process.env.API_URL + "/courses/" + courseToUpdate.id,
        {
          headers: { "content-type": "application/json" },
          body: courseToUpdate
        },
        {
          headers: { "content-type": "application/json" },
          body: courseToUpdate
        }
      );

      const expectedActions = [
        { type: BEGIN_API_CALL },
        {
          type: UPDATE_COURSE_SUCCESS,
          payload: courseToUpdate
        }
      ];

      const store = mockStore({ courses: [] });
      const action = (saveCourse(courseToUpdate) as unknown) as AnyAction;
      return store.dispatch(action).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("should create BEGIN_API_CALL and SAVE_COURSE_FAILURE when failing to save a course", () => {
      fetchMock.post(process.env.API_URL + "/courses/", 400, {
        body: course,
        headers: { "content-type": "application/json" }
      });

      const expectedActions = [
        { type: BEGIN_API_CALL },
        { type: SAVE_COURSE_FAILURE, payload: "" }
      ];

      const store = mockStore({ courses: [] });
      const action = (saveCourse(course) as unknown) as AnyAction;
      return store.dispatch(action).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
