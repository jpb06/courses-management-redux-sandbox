import { authors } from "../../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import {
  BEGIN_API_CALL,
  LOAD_AUTHORS_SUCCESS,
  LOAD_AUTHORS_FAILURE
} from "../../../../src/redux/actions/util/action.types";
import { loadAuthors } from "../../../../src/redux/actions/load.authors.action";
import { AnyAction } from "redux";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Authors Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_AUTHORS_SUCCESS when succesfully loading authors", () => {
      fetchMock.mock(process.env.API_URL + "/authors/", {
        body: authors,
        headers: { "content-type": "application/json" }
      });

      const expectedActions = [
        { type: BEGIN_API_CALL },
        { type: LOAD_AUTHORS_SUCCESS, payload: authors }
      ];

      const store = mockStore({ authors: [] });
      const action = (loadAuthors() as unknown) as AnyAction;
      return store.dispatch(action).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("should create BEGIN_API_CALL and LOAD_AUTHORS_FAILURE when failing to load courses", () => {
      fetchMock.mock(process.env.API_URL + "/authors/", 400);

      const expectedActions = [
        { type: BEGIN_API_CALL },
        { type: LOAD_AUTHORS_FAILURE, payload: "" }
      ];

      const store = mockStore({ authors: [] });
      const action = (loadAuthors() as unknown) as AnyAction;
      return store.dispatch(action).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
