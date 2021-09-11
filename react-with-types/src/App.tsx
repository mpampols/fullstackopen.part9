import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartDescriptionBase extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartDescriptionBase {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescriptionBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartDescriptionBase {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
};  


const Part = ({key, part}: {key: string, part: CoursePart}) => {
  switch (part.type) {
    case "normal":
      return (
        <div key={key}>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p>{part.description}</p>
        </div>
      )
    case "groupProject":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p>Group project count {part.groupProjectCount}</p>
        </div>
      )
    case "submission":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p>{part.description}</p>
          <p>Link {part.exerciseSubmissionLink}</p>
        </div>
      )
    case "special":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p>{part.description}</p>
          <p>required skills {part.requirements.map(
            (skill, i) =>  {
              if (i === part.requirements.length - 1) {
                return <span key={i}>{skill}</span>
              } else {
                return <span key={i}>{skill}, </span>
              }
            })}
          </p>
        </div>
      )
    default:
      return assertNever(part);
  }
}

/**
 * Helper function for exhaustive type checking
 */
 const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = ({name}: {name: string}) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({courseParts}: {courseParts: Array<CoursePart>}) => {
  return (
    <div>
      {courseParts.map(part => <Part key={part.name} part={part} />)}
    </div>
  )
}

const Total = ({courseParts}: {courseParts: Array<{name: string, exerciseCount: number}>}) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

export default App;