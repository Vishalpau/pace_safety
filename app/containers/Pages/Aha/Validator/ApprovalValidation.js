import validator from "validator";

function ApprovalValidator(data , action) {
  

  const error = {};
  let isValid = true;

  

  if (data.wrpApprovalUser === "" && data.sapApprovalUser === null) {
    if(action.length === 0){
      error.action = "If not approved then create a action.";
      isValid = false;
    }
  }

return { error, isValid };
}

export default ApprovalValidator;
