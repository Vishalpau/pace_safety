import validator from "validator";

function ApprovalValidator(data , action) {
  

  const error = {};
  let isValid = true;

  

  if (data.wrpApprovalUser === "") {
    if(action.length === 0)
    error.action = "If not approved then create a action.";
    isValid = false;
  }


  // if (data.closedDate === "") {
  //   error.closedDate = "Please select date and time";
  //   isValid = false;
  // }

return { error, isValid };
}

export default ApprovalValidator;