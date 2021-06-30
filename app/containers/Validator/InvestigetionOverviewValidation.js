import validator from "validator";

function investigationoverviewvalidate(data) {
  console.log(data);

  const error = {};

  if (validator.isEmpty(data.constructionManagerName.toString())) {
    error.constructionManagerName = "This Field is Empty";
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

  if (validator.isEmpty(data.actualseveritylevel.toString())) {
    error.actualseveritylevel = "This Field is Empty";
  }

  if (validator.isEmpty(data.potentialseveritylevel.toString())) {
    error.potentialseveritylevel = "This Field is Empty";
  }
  return { error };
}

export default initialdetailvalidate;
