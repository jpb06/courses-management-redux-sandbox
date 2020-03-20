import React from "react";
import { shallow } from "enzyme";
import CourseForm, {
  CourseFormProps
} from "../../../../src/components/courses/CourseForm";

const renderCourseForm = (args?: any) => {
  const defaultProps: CourseFormProps = {
    course: { slug: "", title: "", authorName: "", category: "" },
    authors: [],
    onChange: jest.fn(),
    onSubmit: jest.fn()
  };

  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
};

it("Renders a form and a header", () => {
  const wrapper = renderCourseForm();

  // console.log(wrapper.debug());
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Course");
});

it("Save button contains 'Save' when saving is not in progress", () => {
  const wrapper = renderCourseForm();

  expect(wrapper.find("button").text()).toEqual("Save");
});

it("Save button contains 'Saving...' when saving is in progress", () => {
  const wrapper = renderCourseForm({ saving: true });

  expect(wrapper.find("button").text()).toEqual("Saving...");
});

it("displays global errors when there is some", () => {
  const wrapper = renderCourseForm({ errors: { onSave: "Big bad error" } });

  expect(wrapper.find("form .alert.alert-danger").text()).toEqual(
    "Big bad error"
  );
});
