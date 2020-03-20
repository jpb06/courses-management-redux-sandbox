import fetchMock from "fetch-mock";
import { authors, courses } from "../../tools/mockData";
import { savedCourse } from "../components/courses/ManageCoursePage/ManageCoursePage.helper";
import { deletedCourse } from "../components/courses/CoursesPage/CoursesPage.helper";

const mockAuthorsCall = () => {
  fetchMock.getOnce(process.env.API_URL + "/authors/", {
    body: authors,
    headers: { "content-type": "application/json" }
  });
};

const mockCoursesCall = () => {
  fetchMock.getOnce(process.env.API_URL + "/courses/", {
    body: courses,
    headers: { "content-type": "application/json" }
  });
};

const mockSaveCourseCall = () => {
  fetchMock.postOnce(process.env.API_URL + "/courses/", {
    body: savedCourse,
    headers: { "content-type": "application/json" }
  });
};

const mockSaveCourseCallFailure = () => {
  fetchMock.postOnce(process.env.API_URL + "/courses/", 400);
};

const mockDeleteCourseCall = () => {
  fetchMock.deleteOnce(process.env.API_URL + "/courses/", {
    body: deletedCourse,
    headers: { "content-type": "application/json" }
  });
};

const mockDeleteCourseWithoutIdCall = () => {
  fetchMock.deleteOnce(process.env.API_URL + "/courses/", {
    body: { ...deletedCourse, id: undefined },
    headers: { "content-type": "application/json" }
  });
};

const mockDeleteCourseCallFailure = () => {
  fetchMock.deleteOnce(process.env.API_URL + "/courses/", 400);
};

export {
  mockAuthorsCall,
  mockCoursesCall,
  mockSaveCourseCall,
  mockSaveCourseCallFailure,
  mockDeleteCourseCall,
  mockDeleteCourseWithoutIdCall,
  mockDeleteCourseCallFailure
};
