import Author from "./author.type";

export default interface Course {
  id?: number;
  slug: string;
  title: string;
  authorId?: number;
  category: string;
  authorName: string;
}

export interface CourseWithoutAuthorName {
  id?: number;
  slug: string;
  title: string;
  authorId?: number;
  category: string;
}

const NewCourse = { slug: "", title: "", category: "", authorName: "" };

const getCourseBySlug = (slug: string, courses: Array<Course>) => {
  if (slug && courses.length > 0) {
    return courses.find(course => course.slug === slug) || NewCourse;
  } else {
    return NewCourse;
  }
};

const getCoursesWithAuthorName = (
  authors: Array<Author>,
  courses: Array<CourseWithoutAuthorName>
) => {
  if (authors.length === 0) return [];

  return courses.map(course => ({
    ...course,
    authorName:
      authors.find(author => author.id === course.authorId)?.name || "Unknown"
  }));
};

export { NewCourse, getCourseBySlug, getCoursesWithAuthorName };
