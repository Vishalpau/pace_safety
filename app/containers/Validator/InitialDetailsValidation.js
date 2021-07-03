import validator from "validator";

function initialdetailvalidate(data) {
  console.log(data);

  const error = {};

  if (validator.isEmpty(data.unitconstructionmanagername.toString())) {
    error.unitconstructionmanagername = "This Field is Empty";
  }

  if (validator.isEmpty(data.unitconstructionmanagercontact.toString())) {
    error.unitconstructionmanagercontact = "This Field is Empty";
  }

  if (validator.isEmpty(data.unithsespecialistname.toString())) {
    error.unithsespecialistname = "This Field is Empty";
  }

  if (validator.isEmpty(data.unithsespecialistcontactno.toString())) {
    error.unithsespecialistcontactno = "This Field is Empty";
  }


  return { error };
}

export default initialdetailvalidate;
