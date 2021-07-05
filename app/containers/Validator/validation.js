import validator from "validator";

function validate(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  if (validator.isEmpty(data.projectname)) {
    error.projectname = "This Field is Empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.unitname)) {
    error.unitname = "This Field is Empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.incidenttype)) {
    error.incidenttype = "This Field is Empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (data.incidentdate === null) {
    error.incidentdate = "This Field is Empty";
    isValid = false;
  }

  if (validator.isEmpty(data.title)) {
    error.title = "This Field is Empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.description)) {
    error.description = "This Field is Empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.immediateactiontaken)) {
    error.immediateactiontaken = "This Field is Empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.location)) {
    error.location = "This Field is Empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.contractor)) {
    error.contractor = "This Field is Empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.subcontractor)) {
    error.subcontractor = "This Field is Empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.personaffected)) {
    error.personaffected = "This Field is Empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.propertyaffected)) {
    error.propertyaffected = "This Field is Empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.equiptmenteffected)) {
    error.equiptmenteffected = "This Field is Empty";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.environmentaffected)) {
    error.environmentaffected = "This Field is Empty";
    isValid = false;
  } else {
    isValid = true;
  }

  return { error, isValid };
}

export default validate;
