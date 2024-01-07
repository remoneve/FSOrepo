interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Total = (props: ContentProps) => {
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
  
  return (
    <div>
      <p>
        Number of exercises {totalExercises}
      </p>
    </div>
  )
}

export default Total