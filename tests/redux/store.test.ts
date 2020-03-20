import { AnyAction } from "redux";
import { saveCourse } from "./../../src/redux/actions/save.course.action";
import Course from "../../src/types/course.type";
import fetchMock from "fetch-mock";
import configureStore from "./../../src/redux/configure.store";

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("Should handle creating courses", async () => {
    const store = configureStore();
    const course: Course = {
      title: "Yolo",
      authorName: "Some guy",
      category: "Something",
      slug: "yolo"
    };
    fetchMock.post(process.env.API_URL + "/courses/", {
      body: course,
      headers: { "content-type": "application/json" }
    });

    const action = (saveCourse(course) as unknown) as AnyAction;
    await store.dispatch(action);
    const createdCourse = store.getState().courses[0];
    expect(createdCourse).toEqual(course);
  });
});
