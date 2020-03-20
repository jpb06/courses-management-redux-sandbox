import React from "react";
import Course from "../../types/course.type";
import CoursesListItem from "./CoursesListItem";

interface CoursesListProps {
  courses: Array<Course>;
  onDeleteClick: (course: Course) => void;
}

const CoursesList: React.FC<CoursesListProps> = ({
  courses,
  onDeleteClick
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {courses.map(course => (
          <CoursesListItem
            key={course.id}
            course={course}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CoursesList;
