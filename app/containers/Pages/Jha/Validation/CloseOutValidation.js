import validator from "validator";

function CloseOutValidator(data) {
  

  const error = {};
  let isValid = true;

  

  if (data.closedByName === null) {
    error.closedByName = "Please select closed by";
    isValid = false;
  }


  // if (data.closedDate === "") {
  //   error.closedDate = "Please select date and time";
  //   isValid = false;
  // }

return { error, isValid };
}

export default CloseOutValidator;