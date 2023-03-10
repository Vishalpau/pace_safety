import validator from "validator";

function EquipmentValidate(data) {
 
  let isValid = true;
  const error = {};

  // if (validator.isEmpty(data.detailpropertyaffected)){
  //     error.detailpropertyaffected = "This field is empty"
  //     isValid = false
  // }else{
  //     isValid = true
  // }

  for (let i = 0; i < data.length; i++) {
    if (validator.isEmpty(data[i].equipmentType.toString())) {
      error[`equipmentType${[i]}`] = "Please select equipment type.";
      isValid = false;
    }

    if (data[i].equipmentOtherType.length>55) {
      error[`equipmentOtherType${[i]}`] = "Please enter less than  55 character";
      isValid = false;
    }

    if (validator.isEmpty(data[i].equipmentDeatils.toString())) {

      error[`equipmentDeatils${[i]}`] = "Please enter equipment details.";

      isValid = false;
    }
  }

  // if (validator.isEmpty(data.describeactiontaken)){
  //     error.describeactiontaken = "This field is empty"
  //     isValid = false
  // }


  return { error, isValid };
}

export default EquipmentValidate;
