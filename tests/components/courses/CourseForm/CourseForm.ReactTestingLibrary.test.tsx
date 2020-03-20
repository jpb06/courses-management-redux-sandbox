import React from "react";
import { cleanup, render } from "react-testing-library";
import CourseForm, {
  CourseFormProps
} from "../../../../src/components/courses/CourseForm";

afterEach(cleanup);

const renderCourseForm = (args?: any) => {
  const defaultProps: CourseFormProps = {
    course: { slug: "", title: "", authorName: "", category: "" },
    authors: [],
    errors: {},
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    saving: false
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
};

it("Should render Add Course header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Course");
});

it("Save button contains 'Save' when saving is not in progress", () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

it("Save button contains 'Saving...' when saving is in progress", () => {
  const { getByText, debug } = renderCourseForm({ saving: true });
  //debug();
  getByText("Saving...");
});
