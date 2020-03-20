import React from "react";
import renderer from "react-test-renderer";
import CourseForm from "../../../../src/components/courses/CourseForm";
import { courses, authors } from "../../../../tools/mockData";

it("Sets submit button label to 'saving...' when saving is true", () => {
  const tree = renderer.create(
    <CourseForm
      course={{ ...courses[0], authorName: authors[0].name }}
      authors={authors}
      onChange={jest.fn()}
      onSubmit={jest.fn()}
      errors={{}}
      saving
    />
  );

  expect(tree).toMatchSnapshot();
});

it("Sets submit button label to 'save' when saving is false", () => {
  const tree = renderer.create(
    <CourseForm
      course={{ ...courses[0], authorName: authors[0].name }}
      authors={authors}
      onChange={jest.fn()}
      onSubmit={jest.fn()}
      errors={{}}
      saving={false}
    />
  );

  expect(tree).toMatchSnapshot();
});
