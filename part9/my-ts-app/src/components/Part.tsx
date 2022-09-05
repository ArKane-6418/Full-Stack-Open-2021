import { CoursePart } from "../types";

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case "normal":
      return (
        <div>
          <h3>
            <span>Course name:</span>{" "} <span>{coursePart.name}</span>
          </h3>
          <div>
            <span>Number of exercises:</span>{" "} <span>{coursePart.exerciseCount}</span>
            <br/>
            <span>Course description:</span>{" "} <span>{coursePart.description}</span>
          </div>
        </div>
      );
    
    case "groupProject":
      return (
        <div>
          <h3>
            <span>Course name:</span>{" "} <span>{coursePart.name}</span>
          </h3>
          <div>
            <span>Number of exercises:</span>{" "} <span>{coursePart.exerciseCount}</span>
            <br/>
            <span>Number of group projects:</span>{" "} <span>{coursePart.groupProjectCount}</span>
          </div>
        </div>
      );
    
    case "submission":
      return (
        <div>
          <h3>
            <span>Course name:</span>{" "} <span>{coursePart.name}</span>
          </h3>
          <div>
            <span>Number of exercises:</span>{" "} <span>{coursePart.exerciseCount}</span>
            <br/>
            <span>Course description:</span>{" "} <span>{coursePart.description}</span>
            <br/>
            <span>Exercise submission link:</span>{" "} <span>{coursePart.exerciseSubmissionLink}</span>
          </div>
        </div>
      );
    
    case "special":
      return (
        <div>
          <h3>
            <span>Course name:</span>{" "} <span>{coursePart.name}</span>
          </h3>
          <div>
            <span>Number of exercises</span>{" "} <span>{coursePart.exerciseCount}</span>
            <br/>
            <span>Course description</span>{" "} <span>{coursePart.description}</span>
            <br/>
            <span>Required skills</span>{" "} <span>{coursePart.requirements.map((requirement, index) => (<span key={index}>{requirement}, </span>))}</span>
          </div>
        </div>
      );
  }
};

export default Part;