import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Provider as ReduxProvider } from "react-redux";
import thunk from "redux-thunk";
import ManageCoursePage from "../../../../src/components/courses/ManageCoursePage";
import { courses, authors } from "../../../../tools/mockData";
import * as ReduxHooks from "../../../../src/hooks/redux.hooks";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import { RootState } from "../../../../src/redux/root.state";
import Course from "../../../../src/types/course.type";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn()
  })
}));

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
const savedCourse: Course = {
  id: 20,
  title: "Super yolo",
  category: "awesome",
  authorId: 1,
  authorName: "Cory House",
  slug: "super-yolo"
};

const mountComponent = (
  slug?: string,
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

  //let useEffect: any;
  // const mockUseEffect = () => {
  //   useEffect.mockImplementationOnce((f: any) => f());
  // };

  //useEffect = jest.spyOn(React, "useEffect");
  //mockUseEffect(); // important to do it twice
  //mockUseEffect();

  jest
    .spyOn(ReduxHooks, "useReduxSelector")
    .mockImplementation((selectorFunction: any) =>
      selectorFunction(finalState)
    );

  jest
    .spyOn(ReduxHooks, "useReduxDispatch")
    .mockImplementation(() => store.dispatch);

  const defaultProps = {
    match: { params: { slug: slug } }
  } as any;
  const wrapper = mount(
    <ReduxProvider store={store}>
      <ManageCoursePage {...defaultProps} />
    </ReduxProvider>
  );
  return [wrapper, store];
};

export { mountComponent, defaultStoreState, savedCourse };
