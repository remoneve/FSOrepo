interface UserListProps {
  users: User[];
}

interface User {
  name: string;
  excerciseCount: number;
}

const CoursePartItem = (props: User) => {
  return (
    <p>
      {props.name} {props.excerciseCount}
    </p>
  )
}

const UsersList = (props: UserListProps) => {
  return (
    <div>
      {props.users.map(({name, excerciseCount}) => 
      (<CoursePartItem name={name} excerciseCount={excerciseCount}/>))}
    </div>
  )
}

export default UsersList