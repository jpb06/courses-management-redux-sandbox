import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Provider as ReduxProvider } from "react-redux";
import thunk from "redux-thunk";
import CoursesPage from "./../../../../src/components/courses/CoursesPage";
import { courses, authors } from "../../../../tools/mockData";
import * as ReduxHooks from "../../../../src/hooks/redux.hooks";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import { RootState } from "../../../../src/redux/root.state";
import Course from "../../../../src/types/course.type";
import { BrowserRouter as Router } from "react-router-dom";

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useHistory: () => ({
//     push: jest.fn()
//   })
// }));

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore<RootState>(middleware);

const defaultStoreState = {
  courses: courses.map(c => ({
    ...c,
    authorName: authors.find(a => a.id === c.authorId)?.name || ""
  })),
  authors: authors,
  error: null,
  apiCallsInProgress: 0
};
const deletedCourse: Course = {
  ...courses[0],
  authorName: "Cory House"
};

const mountComponent = (
  storeState?: any
): [
  ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>,
  MockStoreEnhanced<RootState, {}>
] => {
  const initialState: RootState = {
    courses: [],
    authors: [],
    error: null,
    apiCallsInProgress: 0
  };
  const finalState = { ...initialState, ...storeState };

  const store = mockStore(finalState);

  jest
    .spyOn(ReduxHooks, "useReduxSelector")
    .mockImplementation((selectorFunction: any) =>
      selectorFunction(finalState)
    );

  jest
    .spyOn(ReduxHooks, "useReduxDispatch")
    .mockImplementation(() => store.dispatch);

  const defaultProps = {
    deleteCourse: jest.fn()
  } as any;
  const wrapper = mount(
    <ReduxProvider store={store}>
      <Router>
        <CoursesPage {...defaultProps} />
      </Router>
    </ReduxProvider>
  );
  return [wrapper, store];
};

export { mountComponent, defaultStoreState, deletedCourse };
