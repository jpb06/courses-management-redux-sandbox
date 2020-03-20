import { coursesReducer } from "../../../src/redux/reducers/courses.reducer";
import Course from "../../../src/types/course.type";
import {
  SAVE_COURSE_SUCCESS,
  DELETE_COURSE_OPTIMISTIC,
  UPDATE_COURSE_SUCCESS,
  LOAD_COURSES_SUCCESS
} from "../../../src/redux/actions/util/action.types";
import { action } from "../../../src/redux/actions/util/generic.actions";

const initialState: Array<Course> = [
  {
    id: 1,
    authorId: 1,
    title: "Course 1",
    authorName: "Author 1",
    category: "Something cool",
    slug: "course-1"
  },
  {
    id: 2,
    authorId: 1,
    title: "Course 2",
    authorName: "Author 1",
    category: "Something cool",
    slug: "course-2"
  }
];

describe("Courses reducer actions", () => {
  it("Should add course when passed SAVE_COURSE_SUCCESS", () => {
    const newCourse: Course = {
      title: "Yolo",
      authorName: "Some guy",
      category: "Something",
      slug: "yolo"
    };

    const coursesAction = action(SAVE_COURSE_SUCCESS, newCourse);
    const newState = coursesReducer(initialState, coursesAction);

    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual("Course 1");
    expect(newState[1].title).toEqual("Course 2");
    expect(newState[2].title).toEqual("Yolo");
  });

  it("Should update course when passed UPDATE_COURSE_SUCCESS", () => {
    const coursesAction = action(UPDATE_COURSE_SUCCESS, {
      ...initialState[0],
      title: "Super fun times"
    });
    const newState = coursesReducer(initialState, coursesAction);

    expect(newState.length).toEqual(2);
    expect(newState[0].title).toEqual("Super fun times");
    expect(newState[1].title).toEqual("Course 2");
  });

  it("Should return all courses when passed LOAD_COURSES_SUCCESS", () => {
    const updatedState = initialState.concat({
      id: 3,
      title: "Course 3",
      authorName: "Author 1",
      category: "Something cool",
      slug: "course-3"
    });

    const coursesAction = action(LOAD_COURSES_SUCCESS, updatedState);
    const newState = coursesReducer(initialState, coursesAction);

    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual("Course 1");
    expect(newState[1].title).toEqual("Course 2");
    expect(newState[2].title).toEqual("Course 3");
  });

  it("Should delete course when passed DELETE_COURSE_OPTIMISTIC", () => {
    const coursesAction = action(DELETE_COURSE_OPTIMISTIC, initialState[0]);
    const newState = coursesReducer(initialState, coursesAction);

    expect(newState.length).toEqual(1);
    expect(newState[0].title).toEqual("Course 2");
  });
});
