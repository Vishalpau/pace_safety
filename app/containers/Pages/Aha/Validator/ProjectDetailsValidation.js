import validator from "validator";

function ProjectDetailsValidator(data,projectStructure,levelLenght) {
  

  const error = {};
  let isValid = true;

  if(projectStructure?projectStructure.length<levelLenght:false){
    error.projectStructure = "Please select stage of project";
    isValid = false;
  }

  if (validator.isEmpty(data.description.toString())) {
    error.description = "Please enter description";
    isValid = false;
  }

  if (validator.isEmpty(data.location.toString())) {
    error.location = "Please enter the work location";
    isValid = false;
  }

  if (validator.isEmpty(data.permitToPerform.toString())) {
    error.permitToPerform = "Please choose any one ";
    isValid = false;
  }

  if (data.assessmentDate === null) {
    error.assessmentDate = "Please select date and time";
    isValid = false;
  }

return { error, isValid };
}

export default ProjectDetailsValidator;
