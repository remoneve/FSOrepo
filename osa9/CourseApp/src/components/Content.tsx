interface CourseListProps {
  courses: Course[];
}

interface Course {
  name: string;
  exerciseCount: number;
}

const CoursePartItem = ({name, exerciseCount}: Course) => {
  return (
    <p>
      {name} {exerciseCount}
    </p>
  );
};

const Content = ({courses}: CourseListProps) => {
  return (
    <div>
      {courses.map(({name, exerciseCount}) => 
      (<CoursePartItem key={name} name={name} exerciseCount={exerciseCount}/>))}
    </div>
  );
};

export default Content;