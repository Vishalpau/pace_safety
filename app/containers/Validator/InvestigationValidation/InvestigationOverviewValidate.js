import validator from "validator";

function InvestigationOverviewValidate(data) {
    console.log(data);
    let isValid = true;
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

    console.log(error);
    return { error, isValid };
}

export default InvestigationOverviewValidate;