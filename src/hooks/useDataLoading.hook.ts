import { loadCourses } from "../redux/actions/load.courses.action";
import { loadAuthors } from "../redux/actions/load.authors.action";
import React from "react";
import { useReduxDispatch, useReduxSelector } from "./redux.hooks";

const useDataLoading = () => {
  const courses = useReduxSelector(state => state.courses);
  const dispatch = useReduxDispatch();

  React.useEffect(() => {
    if (courses.length === 0) {
      dispatch(loadCourses());
      dispatch(loadAuthors());
    }
  }, []);
};

export default useDataLoading;
