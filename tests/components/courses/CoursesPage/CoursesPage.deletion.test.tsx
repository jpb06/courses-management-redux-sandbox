import {
  DELETE_COURSE_OPTIMISTIC,
  DELETE_COURSE_FAILURE
} from "../../../../src/redux/actions/util/action.types";
import fetchMock from "fetch-mock";
import {
  mountComponent,
  defaultStoreState,
  deletedCourse
} from "./CoursesPage.helper";
import {
  mockDeleteCourseCall,
  mockDeleteCourseCallFailure,
  mockDeleteCourseWithoutIdCall
} from "../../../api/mock.calls";

describe("CoursesPage", () => {
  describe("on deletion", () => {
    const originalError = console.error;

    beforeAll(() => {
      console.error = jest.fn();
    });

    afterAll(() => {
      console.error = originalError;
    });

    afterEach(() => {
      fetchMock.restore();
    });

    it("deletes a course", async () => {
      mockDeleteCourseCall();

      const [wrapper, store] = mountComponent(defaultStoreState);

      wrapper
        .find(".btn-danger")
        .first()
        .simulate("click");

      await new Promise(r => setTimeout(r, 100));
      const actions = store.getActions();
      const expectedActions = [
        { type: DELETE_COURSE_OPTIMISTIC, payload: deletedCourse }
      ];
      expect(actions).toEqual(expectedActions);
    });

    it("errors on deleting a course (API related)", async () => {
      mockDeleteCourseCallFailure();

      const [wrapper, store] = mountComponent(defaultStoreState);

      wrapper
        .find(".btn-danger")
        .first()
        .simulate("click");

      await new Promise(r => setTimeout(r, 100));
      const actions = store.getActions();
      const expectedActions = [
        { type: DELETE_COURSE_OPTIMISTIC, payload: deletedCourse },
        { type: DELETE_COURSE_FAILURE, payload: "" }
      ];
      expect(actions).toEqual(expectedActions);
    });

    it("should do nothing if the chosen course has no id", async () => {
      mockDeleteCourseWithoutIdCall();

      const [wrapper, store] = mountComponent({
        ...defaultStoreState,
        courses: [
          {
            id: undefined,
            title: "Securing React Apps with Auth0",
            slug: "react-auth0-authentication-security",
            authorId: 1,
            authorName: "Cory House",
            category: "JavaScript"
          }
        ]
      });

      wrapper
        .find(".btn-danger")
        .first()
        .simulate("click");

      await new Promise(r => setTimeout(r, 100));
      const actions = store.getActions();
      const expectedActions: any = [];
      expect(actions).toEqual(expectedActions);
    });
  });
});
