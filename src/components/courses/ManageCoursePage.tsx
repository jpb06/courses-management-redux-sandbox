import React, { useState } from "react";
import { saveCourse } from "../../redux/actions/save.course.action";
import { toast } from "react-toastify";
import { RouteComponentProps, useHistory } from "react-router-dom";
import CourseForm from "./CourseForm";
import CourseFormErrors, {
  requiredFields
} from "../../types/forms/course.form.errors";
import useFormErrors from "../../hooks/useFormErrors.hook";
import useDataLoadingWithSlug from "../../hooks/useDataLoadingWithSlug.hook";
import Spinner from "../common/Spinner";
import { getCourseBySlug } from "../../types/course.type";
import { useReduxDispatch, useReduxSelector } from "../../hooks/redux.hooks";

export interface ManageCoursePageParams {
  slug: string;
}

const ManageCoursePage: React.FC<RouteComponentProps<
  ManageCoursePageParams
>> = ({ match }) => {
  const history = useHistory();
  const courses = useReduxSelector(state => state.courses);
  const authors = useReduxSelector(state => state.authors);
  const dispatch = useReduxDispatch();

  const [currentCourse, setCurrentCourse] = useDataLoadingWithSlug(
    getCourseBySlug(match.params.slug, courses),
    match.params.slug
  );
  const [errors, isFormValid, setErrors] = useFormErrors<CourseFormErrors>(
    currentCourse,
    requiredFields
  );
  const [saving, setSaving] = useState(false);

  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.currentTarget;

    setCurrentCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? (value ? parseInt(value, 10) : "") : value
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!isFormValid()) return;

    setSaving(true);

    const result = await dispatch(saveCourse(currentCourse));
    if (result.success) {
      history.push("/courses");
      toast.success("Course saved.");
    } else {
      setSaving(false);
      setErrors({ ...errors, onSave: result.message });
    }
  };

  return (match.params.slug && courses.length === 0) || authors.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={currentCourse}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      saving={saving}
    />
  );
};

export default ManageCoursePage;
