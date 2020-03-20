import {
  getCourseBySlug,
  getCoursesWithAuthorName
} from "../../src/types/course.type";
import { courses, authors } from "../../tools/mockData";

const coursesWithAuthorNames = getCoursesWithAuthorName(authors, courses);

describe("Course type", () => {
  describe("getCourseBySlug", () => {
    it("Should return an empty course when slug is not found", async () => {
      const course = getCourseBySlug("yolo", coursesWithAuthorNames);

      expect(course).toStrictEqual({
        slug: "",
        title: "",
        category: "",
        authorName: ""
      });
    });

    it("Should return the correct course based on its slug", async () => {
      const course = getCourseBySlug(
        "writing-clean-code-humans",
        coursesWithAuthorNames
      );

      const { authorName, ...bareCourse } = course;

      expect(bareCourse).toStrictEqual(courses[6]);
    });
  });

  describe("getCoursesWithAuthorName", () => {
    it("Should return an empty array if there is no authors", async () => {
      const emptyArray = getCoursesWithAuthorName([], courses);

      expect(emptyArray).toStrictEqual([]);
    });

    it("Should return a course with its related author name", async () => {
      const coursesWithAuthorNames = getCoursesWithAuthorName(authors, [
        {
          id: 1,
          title: "Securing React Apps with Auth0",
          slug: "react-auth0-authentication-security",
          authorId: 1,
          category: "JavaScript"
        }
      ]);

      expect(coursesWithAuthorNames).toStrictEqual([
        {
          id: 1,
          title: "Securing React Apps with Auth0",
          slug: "react-auth0-authentication-security",
          authorId: 1,
          authorName: "Cory House",
          category: "JavaScript"
        }
      ]);
    });

    it("Should return a course with an unknown author name when the related author could no be found", async () => {
      const coursesWithAuthorNames = getCoursesWithAuthorName(authors, [
        {
          id: 1,
          title: "Securing React Apps with Auth0",
          slug: "react-auth0-authentication-security",
          authorId: 99,
          category: "JavaScript"
        }
      ]);

      expect(coursesWithAuthorNames).toStrictEqual([
        {
          id: 1,
          title: "Securing React Apps with Auth0",
          slug: "react-auth0-authentication-security",
          authorId: 99,
          authorName: "Unknown",
          category: "JavaScript"
        }
      ]);
    });
  });
});
