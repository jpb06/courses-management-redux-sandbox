import React from "react";
import Course from "../../types/course.type";
import { Link } from "react-router-dom";

interface CoursesListItemProps {
  course: Course;
  onDeleteClick: (course: Course) => void;
}

const CoursesListItem: React.FC<CoursesListItemProps> = ({
  course,
  onDeleteClick
}) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onDeleteClick(course);
  };

  return (
    <tr key={course.id}>
      <td>
        <a
          className="btn btn-light"
          href={"http://pluralsight.com/courses/" + course.slug}
        >
          Watch
        </a>
      </td>
      <td>
        <Link to={"/course/" + course.slug}>{course.title}</Link>
      </td>
      <td>{course.authorName}</td>
      <td>{course.category}</td>
      <td>
        <button className="btn btn-danger" onClick={handleClick}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CoursesListItem;
