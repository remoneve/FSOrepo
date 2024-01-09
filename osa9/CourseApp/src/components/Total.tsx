interface CourseListProps {
  courses: Course[];
}

interface Course {
  name: string;
  exerciseCount: number;
}

const Total = ({courses}: CourseListProps) => {
  const totalExercises = courses.reduce((sum, part) => sum + part.exerciseCount, 0);
  
  return (
    <div>
      <p>
        Number of exercises {totalExercises}
      </p>
    </div>
  );
};

export default Total;