import { ErrorOutline } from "@material-ui/icons";
import validator from "validator";

function validate(data) {
  let isValid = true;
  const error = {};
  
  console.log(data)

  if (data.jobTitle == "") {
    error.jobTitle = "Please enter job title";
    isValid = false;
  }

  if (data.jobDetails=="") {
    error.jobDetails = "Please enter job details";
    isValid = false;
  }

  // if (data.permitToWork == "") {
  //   error.permitToWork = "Please specify permit to work";
  //   isValid = false;
  // }

  // if (validator.isEmpty(data.firstAid)) {
  //   error.incidentTitle = "Please enter job details";
  //   isValid = false;
  // }

  // if (validator.isEmpty(data.jhaReviewed)) {
  //   error.incidentTitle = "Please enter job details";
  //   isValid = false;
  // }

  // if (validator.isEmpty(data.jobProcedure)) {
  //   error.incidentTitle = "Please enter job details";
  //   isValid = false;
  // }
   return { error, isValid };
}

export default validate;
