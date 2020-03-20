import { mountComponent } from "./CoursesPage.helper";
import fetchMock from "fetch-mock";
import { mockAuthorsCall, mockCoursesCall } from "../../../api/mock.calls";
import {
  BEGIN_API_CALL,
  LOAD_AUTHORS_SUCCESS,
  LOAD_COURSES_SUCCESS
} from "../../../../src/redux/actions/util/action.types";
import { authors, courses } from "../../../../tools/mockData";

describe("CoursesPage", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("on mount", () => {
    it("dispatch load actions to store (courses & authors)", async () => {
      mockAuthorsCall();
      mockCoursesCall();

      const [, store] = mountComponent();
      await new Promise(r => setTimeout(r, 100));
      const actions = store.getActions();
      const expectedActions = [
        { type: BEGIN_API_CALL },
        { type: BEGIN_API_CALL },
        { type: LOAD_COURSES_SUCCESS, payload: courses },
        { type: LOAD_AUTHORS_SUCCESS, payload: authors }
      ];
      expect(actions).toEqual(expectedActions);
    });

    it("doesn't dispatch any action if authors & courses are already loaded", async () => {
      const [, store] = mountComponent({ courses, authors });
      await new Promise(r => setTimeout(r, 100));

      expect(store.getActions()).toEqual([]);
    });

    it("should show loading screen when api calls are in progress", async () => {
      mockAuthorsCall();
      mockCoursesCall();

      const [wrapper] = mountComponent({ apiCallsInProgress: 3 });

      const spinner = wrapper.find("Spinner");

      expect(spinner.length).toBe(1);
    });

    it("should show the courses list when courses are loaded", async () => {
      const [wrapper] = mountComponent({ courses, authors });
      let redirect = wrapper.find("Redirect");
      expect(redirect.length).toBe(0);

      wrapper.find(".add-course").simulate("click");

      wrapper.update();

      redirect = wrapper.find("Redirect");

      expect(redirect.length).toBe(1);
      expect(
        redirect.filterWhere(item => {
          return item.prop("to") === "/course";
        }).length
      ).toBe(1);
    });
  });
});
