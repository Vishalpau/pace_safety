import validator from "validator";

function validate(data) {
  let isValid = true;
  const error = {};
  
  if (data.fkProjectId == 0) {
    error.fkProjectId = "Please select project name";
    isValid = false;
  }

  // if (validator.isEmpty(data.unitname)){
  //     error.unitname = "this filed is empty"
  //     isValid = false
  // }else{
  //     isValid = true
  // }

  if (validator.isEmpty(data.incidentType)) {
    error.incidentType = "Please select incident type";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.incidentTitle)) {
    error.incidentTitle = "Please enter incident title";
    isValid = false;
  } else {
    isValid = true;
  }
  
  if (data.incidentOccuredOn === null) {
    error.incidentOccuredOn = "Please select date and time";
    isValid = false;
  } else {
    isValid = true;
  }
  // if (validator.isEmpty(data.description)){
  //     error.description = "this filed is empty"
  //     isValid = false
  // }else{
  //     isValid = true
  // }

  // if (validator.isEmpty(data.immediateactiontaken)){
  //     error.immediateactiontaken = "this filed is empty"
  //     isValid = false
  // }else{
  //     isValid = true
  // }

  // if (validator.isEmpty(data.location)){
  //     error.location = "this filed is empty"
  //     isValid = false
  // }else{
  //     isValid = true
  // }

  if (validator.isEmpty(data.contractor)) {
    error.contractor = "Please select contractor name";
    isValid = false;
  } else {
    isValid = true;
  }

  // if (validator.isEmpty(data.subcontractor)){
  //     error.subcontractor = "this filed is empty"
  //     isValid = false
  // }else{
  //     isValid = true
  // }

  if (validator.isEmpty(data.isPersonAffected)) {
    error.isPersonAffected = "Please choose person affected";
    isValid = false;
  } else {
    isValid = true;
  }
  
  if (validator.isEmpty(data.isPropertyDamaged)) {
    error.isPropertyDamaged = "Please choose property affected";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.isEquipmentDamaged)) {
    error.isEquipmentDamaged = "Please choose equipment affected";
    isValid = false;
  } else {
    isValid = true;
  }

  if (validator.isEmpty(data.isEnviromentalImpacted)) {
    error.isEnviromentalImpacted = "Please choose enviornment affected";
    isValid = false;
  } else {
    isValid = true;
  }
  return { error, isValid };
}

export default validate;
