interface TotalProps {
  courseParts: Part[]
}

interface Part {
  name: string,
  excerciseCount: number,
}

const Total = (props: TotalProps) => {
  const totalExercises = props.reduce((sum, part) => sum + part.exerciseCount, 0);
  
  return (
    <div>
      <p>
        Number of exercises {totalExercises}
      </p>
    </div>
  )
}

export default Total