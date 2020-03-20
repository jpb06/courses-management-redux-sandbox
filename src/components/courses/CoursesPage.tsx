import * as React from "react";
import Course, { getCoursesWithAuthorName } from "../../types/course.type";
import CoursesList from "./CoursesList";
import { deleteCourse } from "../../redux/actions/delete.course.action";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { useReduxSelector, useReduxDispatch } from "../../hooks/redux.hooks";
import useDataLoading from "../../hooks/useDataLoading.hook";
import useErrorNotifier from "../../hooks/useErrorNotifier.hook";

interface CoursesPageProps {}

const CoursesPage: React.FC<CoursesPageProps> = () => {
  const courses = useReduxSelector(state =>
    getCoursesWithAuthorName(state.authors, state.courses)
  );
  const loading = useReduxSelector(state => state.apiCallsInProgress > 0);

  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = React.useState(
    false
  );

  const dispatch = useReduxDispatch();

  useDataLoading();
  useErrorNotifier();

  const redirect = () => setRedirectToAddCoursePage(true);

  const handleDeleteCourse = (course: Course) => {
    toast.success("Course deleted");
    dispatch(deleteCourse(course));
  };

  return (
    <>
      {redirectToAddCoursePage && <Redirect to="/course" />}
      <h2>Courses</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-course"
            onClick={redirect}
          >
            Add course
          </button>
          <CoursesList courses={courses} onDeleteClick={handleDeleteCourse} />
        </>
      )}
    </>
  );
};

export default CoursesPage;
