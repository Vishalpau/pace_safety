import { is } from "immutable";
import validator from "validator";

function LessionLearnedValidator(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.team.toString())) {
    error.team = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.teamLearning.toString())) {
    error.teamLearning = "This field is empty";
    isValid = false;
  }

  // const result =

  // console.log('roor',error, isValid)
  return { error, isValid };
}

export default LessionLearnedValidator;
