import { CoursePart } from "../types";

interface Course {
  content: CoursePart;
}

const Part = (props: Course) => {
  const content = props.content;

  switch (content.kind) {
  case "basic":
    return (
      <div>
        <div><b>{content.name} {content.exerciseCount}</b></div>
        <div><i>{content.description}</i></div>
        <br/>
      </div>
    );
  case "background":
    return (
      <div>
        <div><b>{content.name} {content.exerciseCount}</b></div>
        <div><i>{content.description}</i></div>
        <div>Submit to {content.backgroundMaterial}</div>
        <br/>
      </div>
    );
  case "group":
    return (
      <div>
        <div><b>{content.name} {content.exerciseCount}</b></div>
        <div>project exercises {content.groupProjectCount}</div>
        <br/>
      </div>
    );
  case "special":
    return (
      <div>
        <div><b>{content.name} {content.exerciseCount}</b></div>
        <div><i>{content.description}</i></div>
        <div>required skills: {content.requirements.join(', ')}</div>
        <br/>
      </div>
    );
  };
};

export default Part;