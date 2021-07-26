import validator from "validator";

function validate(data) {
  let isValid = true;
  const error = {};
  


  if (validator.isEmpty(data.incidentType)) {
    error.incidentType = "Please select incident type";
    isValid = false;
  }

  if (validator.isEmpty(data.incidentTitle)) {
    error.incidentTitle = "Please enter incident title";
    isValid = false;
  }
  if (data.incidentOccuredOn === null) {
    error.incidentOccuredOn = "Please select date and time";
    isValid = false;
  }
 

  if (validator.isEmpty(data.contractor)) {
    error.contractor = "Please select contractor name";
    isValid = false;
  } 



  if (validator.isEmpty(data.isPersonAffected)) {
    error.isPersonAffected = "Please choose person affected";
    isValid = false;
  }

  if (validator.isEmpty(data.isPropertyDamaged)) {
    error.isPropertyDamaged = "Please choose property affected";
    isValid = false;
  }

  if (validator.isEmpty(data.isEquipmentDamaged)) {
    error.isEquipmentDamaged = "Please choose equipment affected";
    isValid = false;
  }

  if (validator.isEmpty(data.isEnviromentalImpacted)) {
    error.isEnviromentalImpacted = "Please choose enviornment affected";
    isValid = false;
  }
  return { error, isValid };
}

export default validate;
