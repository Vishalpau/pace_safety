import validator from "validator";

function ActionTrackerValidator(data) {
  
  const error = {};
  let isValid = true;

  if (data.actionTitle === undefined) {
    error.actionTitle = "Please enter action title";
    isValid = false;
  }

  if (data.assignTo == 0) {
    error.assignTo = "Please select the assignee";
    isValid = false;
  }
  if(data.actionTitle != undefined){
    if(data.actionTitle.length > 255){
        error.actionTitle = "Please enter less than 255 character" 
        isValid = false;
     }
  }


return { error, isValid };
}

export default ActionTrackerValidator;
