const Courses = ({courses}) => {
    const Header = () => {
      return (
        <div>
          <h1>Web development curriculum</h1>
        </div>
      )
    }
    
    const Content = (props) => {
      const Part = ({part}) => {
        return (
        <p>{part.name} {part.exercises}</p>
        )
      }
  
      const Total = (props) => {
        const exercises = props.parts.map(part => part.exercises)
        
        const sum = exercises.reduce(function (pointer1, pointer2) {
          return pointer1 + pointer2;
        }, 0); 
  
        return (
          <b>total of {sum} exercises</b>
        )
      }
  
      return (
        <div>
          <h3>{props.name}</h3>
          {props.course.map(part => <Part key={part.id} part={part}/>)}
          <Total parts={props.course}/>
        </div>
      )
    }
  
    return (
      <div>
        <Header/>
        {courses.map(course => <Content key={course.id} course={course.parts} name={course.name}/>)}
      </div>
    )
  }

export default Courses