import validator from "validator";

function investigationoverviewvalidate(data) {
  console.log(data);

  const error = {};

  if (validator.isEmpty(data.constructionManagerName.toString())) {
    error.constructionManagerName = "This field is empty";
  }

  if (validator.isEmpty(data.unitconstructionmanagercontact.toString())) {
    error.unitconstructionmanagercontact = "This field is empty";
  }

  if (validator.isEmpty(data.unithsespecialistname.toString())) {
    error.unithsespecialistname = "This field is empty";
  }

  if (validator.isEmpty(data.unithsespecialistcontactno.toString())) {
    error.unithsespecialistcontactno = "This field is empty";
  }

  if (validator.isEmpty(data.actualseveritylevel.toString())) {
    error.actualseveritylevel = "This field is empty";
  }

  if (validator.isEmpty(data.potentialseveritylevel.toString())) {
    error.potentialseveritylevel = "This field is empty";
  }
  return { error };
}

export default initialdetailvalidate;
