import validator from "validator";
import {checkACL} from '../../../utils/helper'

function CorrectiveActionValidator(data ,action,button) {
  
console.log(action.length);
  const error = {};
  let isValid = true;
  if(button === "submit"){
    if (data.reviewedByName === null) {
      error.reviewedByName = "Select the reviewedBy";
      isValid = false;
    }
    
    if(data.reviewedOn > new Date()){
      error.reviewedOn = "Select correct time";
      isValid = false;
    }

    if (data.reviewedOn === null) {
      error.reviewedOn = "Select date and time";
      isValid = false;
    }

  }
  
  if(checkACL('action_tracker', 'view_actions')) {
    if (data.isCorrectiveActionTaken === null) {
      error.isCorrectiveActionTaken = "Select any one";
      isValid = false;
    }
    
    if (data.isCorrectiveActionTaken === "Yes") {

    if(action.length == 0){
      error.action = "create atleast one action";
      isValid = false;
    }
  }
}
  console.log(error)
return { error, isValid };
}

export default CorrectiveActionValidator;
