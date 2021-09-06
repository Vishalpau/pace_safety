import { ErrorOutline } from "@material-ui/icons";
import validator from "validator";

function validate(data,projectStructure,levelLenght) {
  let isValid = true;
  const error = {};
  
  if(projectStructure?projectStructure.length<levelLenght:false){
    error.projectStructure = "Please select stage of project";
    isValid = false;
  }

  if (validator.isEmpty(data.incidentType)) {
    error.incidentType = "Please select incident type";
    isValid = false;
  }

  if (validator.isEmpty(data.incidentTitle)) {
    error.incidentTitle = "Please enter incident title";
    isValid = false;
  }
  if (data.incidentTitle.length > 255) {
    error.incidentTitle = "Please enter less than 255 charecter";
    isValid = false;
  }
  if (data.incidentOccuredOn === null) {
    error.incidentOccuredOn = "Please select date and time";
    isValid = false;
  }
 
 if (data.incidentLocation.length > 45) {
  error.incidentLocation = "Please enter less than 45 charecter";
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
