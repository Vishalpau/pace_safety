import validator from "validator";

function CloseOutValidator(data) {
    console.log(data);
  

  const error = {};
  let isValid = true;

  

  if (data.closedByName === null) {
    error.closedByName = "Please select closed name";
    isValid = false;
  }


  if (data.closedDate === null) {
    error.closedDate = "Please select date and time";
    isValid = false;
  }

return { error, isValid };
}

export default CloseOutValidator;
