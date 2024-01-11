import { CoursePart } from "../types";

interface Course {
  content: CoursePart
}

const Part = (props: Course) => {
  const content = props.content

  switch (content.kind) {
    case "basic":
      return (
        <div>
          <div>{content.name} {content.exerciseCount}</div>
          <div>{content.description}</div>
          <br/>
        </div>
      )
    case "background":
      return (
      <div>
        <div>{content.name} {content.exerciseCount}</div>
        <div>{content.description}</div>
        <div>Submit to {content.backgroundMaterial}</div>
        <br/>
      </div>
      )
    case "group":
      return (
      <div>
        <div>{content.name} {content.exerciseCount}</div>
        <div>project exercises {content.groupProjectCount}</div>
        <br/>
      </div>
      )
  }
};

export default Part