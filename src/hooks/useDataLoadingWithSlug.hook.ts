import { useState } from "react";
import { loadCourses } from "../redux/actions/load.courses.action";
import { loadAuthors } from "../redux/actions/load.authors.action";
import Course from "../types/course.type";
import React from "react";
import { useReduxDispatch, useReduxSelector } from "./redux.hooks";

const useDataLoadingWithSlug = (
  course: Course,
  slug: string
): [Course, React.Dispatch<React.SetStateAction<Course>>] => {
  const [currentCourse, setCurrentCourse] = useState<Course>(course);

  const authors = useReduxSelector(state => state.authors);
  const courses = useReduxSelector(state => state.courses);
  const dispatch = useReduxDispatch();

  React.useEffect(() => {
    if (authors.length === 0) {
      dispatch(loadAuthors());
    }

    if (slug && courses.length === 0) {
      dispatch(loadCourses());
    } else {
      setCurrentCourse(course);
    }
  }, [course]);

  return [currentCourse, setCurrentCourse];
};

export default useDataLoadingWithSlug;
