import { CoursePart } from "../types";
import Part from "./Part";

interface CourseList {
  courses: CoursePart[];
}

const Content = (props: CourseList) => {
  const courses = props.courses;
  return (
    <div>
      {courses.map((course) => 
        (<Part key={course.name} content={course} />))}
    </div>
  );
};

export default Content;