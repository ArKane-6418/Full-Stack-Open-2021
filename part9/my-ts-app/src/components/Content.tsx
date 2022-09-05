import Part from "./Part";
import { CoursePart } from "../types";
const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  // With TypeScript, we can use a method called exhaustive type checking. 
  // Its basic principle is that if we encounter an unexpected value, we call a function that accepts a value with the type never and also has the return type never.
  // Basic format
  
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
 
  const parts = courseParts.map((coursePart) => {
    switch (coursePart.type) {
      case "normal":
        return <Part key={coursePart.name} coursePart={coursePart}/>;
      case "groupProject":
        return <Part key={coursePart.name} coursePart={coursePart}/>;
      case "submission":
        return <Part key={coursePart.name} coursePart={coursePart}/>;
      case "special":
        return <Part key={coursePart.name} coursePart={coursePart}/>;
      default:
        return assertNever(coursePart);
    }
  });

  return (
    <div>
      {parts}
    </div>
  )
};

export default Content;
