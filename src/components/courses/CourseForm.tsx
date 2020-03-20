import React from "react";
import Course from "../../types/course.type";
import Author from "../../types/author.type";
import CourseFormErrors from "../../types/forms/course.form.errors";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

export interface CourseFormProps {
  course: Course;
  authors: Array<Author>;
  onChange: (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  saving?: boolean;
  errors?: CourseFormErrors;
}

const CourseForm: React.FC<CourseFormProps> = ({
  course,
  authors,
  onChange,
  onSubmit,
  saving = false,
  errors = {}
}) => (
  <form onSubmit={onSubmit}>
    <h2>{course.id ? "Edit" : "Add"} Course</h2>
    {errors.onSave && (
      <div className="alert alert-danger" role="alert">
        {errors.onSave}
      </div>
    )}
    <TextInput
      id="title"
      label="Title"
      name="title"
      error={errors.title}
      value={course.title}
      handleChange={onChange}
    />

    <SelectInput
      id="authorId"
      label="Author"
      name="authorId"
      value={course.authorId}
      handleChange={onChange}
      options={authors.map(author => ({ value: author.id, text: author.name }))}
      error={errors.authorId}
    />

    <TextInput
      id="category"
      label="Category"
      name="category"
      error={errors.category}
      value={course.category}
      handleChange={onChange}
    />

    <button type="submit" disabled={saving} className="btn btn-primary">
      {saving ? "Saving..." : "Save"}
    </button>
  </form>
);

export default CourseForm;
