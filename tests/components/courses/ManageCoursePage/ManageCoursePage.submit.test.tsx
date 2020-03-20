import {
  mountComponent,
  defaultStoreState,
  savedCourse
} from "./ManageCoursePage.helper";
import { act } from "react-dom/test-utils";
import {
  BEGIN_API_CALL,
  SAVE_COURSE_SUCCESS,
  SAVE_COURSE_FAILURE
} from "../../../../src/redux/actions/util/action.types";
import {
  mockSaveCourseCall,
  mockSaveCourseCallFailure
} from "../../../api/mock.calls";
import fetchMock from "fetch-mock";

describe("ManageCoursePage", () => {
  describe("on submit", () => {
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

    it("creates a new course", async () => {
      mockSaveCourseCall();

      const [wrapper, store] = mountComponent("", defaultStoreState);

      const titleInput = wrapper.find('TextInput[id="title"]').props() as any;
      act(() =>
        titleInput.handleChange({
          currentTarget: {
            name: "title",
            value: "Super yolo"
          }
        })
      );
      const authorInput = wrapper
        .find('SelectInput[id="authorId"]')
        .props() as any;
      act(() =>
        authorInput.handleChange({
          currentTarget: {
            name: "authorId",
            value: "1"
          }
        })
      );
      const categoryInput = wrapper
        .find('TextInput[id="category"]')
        .props() as any;
      act(() =>
        categoryInput.handleChange({
          currentTarget: {
            name: "category",
            value: "awesome"
          }
        })
      );
      wrapper.update();

      wrapper.find("form").simulate("submit");

      await new Promise(r => setTimeout(r, 100));
      const actions = store.getActions();
      const expectedActions = [
        { type: BEGIN_API_CALL },
        { type: SAVE_COURSE_SUCCESS, payload: savedCourse }
      ];
      expect(actions).toEqual(expectedActions);
    });

    it("errors on creating a new course (API related)", async () => {
      mockSaveCourseCallFailure();

      const [wrapper, store] = mountComponent("", defaultStoreState);
      //console.log(wrapper.debug());
      const titleInput = wrapper.find('TextInput[id="title"]').props() as any;
      act(() =>
        titleInput.handleChange({
          currentTarget: {
            name: "title",
            value: "Super yolo"
          }
        })
      );
      const authorInput = wrapper
        .find('SelectInput[id="authorId"]')
        .props() as any;
      act(() =>
        authorInput.handleChange({
          currentTarget: {
            name: "authorId",
            value: "1"
          }
        })
      );
      const categoryInput = wrapper
        .find('TextInput[id="category"]')
        .props() as any;
      act(() =>
        categoryInput.handleChange({
          currentTarget: {
            name: "category",
            value: "awesome"
          }
        })
      );
      wrapper.find("form").simulate("submit");

      await new Promise(r => setTimeout(r, 100));
      const actions = store.getActions();
      const expectedActions = [
        { type: BEGIN_API_CALL },
        {
          type: SAVE_COURSE_FAILURE,
          payload: ""
        }
      ];
      expect(actions).toEqual(expectedActions);
    });
  });
});
