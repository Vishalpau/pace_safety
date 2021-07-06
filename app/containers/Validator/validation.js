import validator from "validator";

function validate(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.projectname)) {
    error.projectname = "This field is empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.unitname)) {
    error.unitname = "This field is empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.incidenttype)) {
    error.incidenttype = "This field is empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (data.incidentdate === null) {
    error.incidentdate = "This field is empty";
    isValid = false;
  }

  if (validator.isEmpty(data.title)) {
    error.title = "This field is empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.description)) {
    error.description = "This field is empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.immediateactiontaken)) {
    error.immediateactiontaken = "This field is empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.location)) {
    error.location = "This field is empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.contractor)) {
    error.contractor = "This field is empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.subcontractor)) {
    error.subcontractor = "This field is empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.personaffected)) {
    error.personaffected = "This field is empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.propertyaffected)) {
    error.propertyaffected = "This field is empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.equiptmenteffected)) {
    error.equiptmenteffected = "This field is empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.environmentaffected)) {
    error.environmentaffected = "This field is empty";
    isValid = false;
  } else {
    isValid = true;
  }

  return { error, isValid };
}

export default validate;
