import validator from "validator";

function EquipmentValidate(data) {
  console.log(data);
  let isValid = true;
  const error = {};

  // if (validator.isEmpty(data.detailpropertyaffected)){
  //     error.detailpropertyaffected = "This Field is Empty"
  //     isValid = false
  // }else{
  //     isValid = true
  // }

  for (let i = 0; i < data.length; i++) {
    if (validator.isEmpty(data[i].equipmentType.toString())) {
      error[`equipmentType${[i]}`] = "This Field is Empty";
      isValid = false;
    }

    if (validator.isEmpty(data[i].equipmentOtherType.toString())) {
      error[`equipmentOtherType${[i]}`] = "This Field is Empty";
      isValid = false;
    }

    if (validator.isEmpty(data[i].equipmentDeatils.toString())) {
      error[`equipmentDeatils${[i]}`] = "This Field is Empty";
      isValid = false;
    }
  }

  // if (validator.isEmpty(data.describeactiontaken)){
  //     error.describeactiontaken = "This Field is Empty"
  //     isValid = false
  // }

  console.log(error);
  return { error, isValid };
}

export default EquipmentValidate;
