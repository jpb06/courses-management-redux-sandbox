import fetchMock from "fetch-mock";
import { courses, authors } from "../../../../tools/mockData";
import {
  BEGIN_API_CALL,
  LOAD_AUTHORS_SUCCESS,
  LOAD_COURSES_SUCCESS
} from "../../../../src/redux/actions/util/action.types";
import { mountComponent } from "./ManageCoursePage.helper";
import { mockAuthorsCall, mockCoursesCall } from "../../../api/mock.calls";

describe("ManageCoursePage", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("on mount", () => {
    it("dispatch load actions to store (courses & authors) if there is a slug", async () => {
      mockAuthorsCall();
      mockCoursesCall();

      const [, store] = mountComponent("react-auth0-authentication-security");
      await new Promise(r => setTimeout(r, 100));
      const actions = store.getActions();
      const expectedActions = [
        { type: BEGIN_API_CALL },
        { type: BEGIN_API_CALL },
        { type: LOAD_AUTHORS_SUCCESS, payload: authors },
        { type: LOAD_COURSES_SUCCESS, payload: courses }
      ];
      expect(actions).toEqual(expectedActions);
    });

    it("only fetches authors if there is no slug and no data loaded", async () => {
      mockAuthorsCall();

      const [, store] = mountComponent();
      await new Promise(r => setTimeout(r, 100));
      const expectedActions = [
        { type: BEGIN_API_CALL },
        { type: LOAD_AUTHORS_SUCCESS, payload: authors }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    it("doesn't dispatch any action if authors are already loaded and there is no slug", async () => {
      const [, store] = mountComponent(undefined, { authors });
      await new Promise(r => setTimeout(r, 100));

      expect(store.getActions()).toEqual([]);
    });

    it("only fetches courses if there is a slug and authors are already loaded", async () => {
      mockCoursesCall();

      const [, store] = mountComponent("react-auth0-authentication-security", {
        authors
      });
      await new Promise(r => setTimeout(r, 100));
      const expectedActions = [
        { type: BEGIN_API_CALL },
        { type: LOAD_COURSES_SUCCESS, payload: courses }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
