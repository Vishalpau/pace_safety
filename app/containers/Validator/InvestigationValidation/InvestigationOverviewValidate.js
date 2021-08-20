import validator from "validator";

function InvestigationOverviewValidate(data) {
    let isValid = true;
    const error = {};

    if (validator.isEmpty(data.constructionManagerName.toString())) {
        error.constructionManagerName = "please enter construction manager name";
        isValid = false;
    } else if (data.constructionManagerName.length > 46) {
        error.constructionManagerName = "Less than 45 character allowed in Construction manager name";
    }

    if (validator.isEmpty(data.constructionManagerContactNo.toString())) {
        error.constructionManagerContactNo = "please enter construction manager contact number";
        isValid = false;
    }
    else if (data.constructionManagerContactNo.length > 21) {
        error.constructionManagerContactNo = "Less than 20 character allowed in Construction Manager contact number";
    }

    if (validator.isEmpty(data.hseSpecialistName.toString())) {
        error.hseSpecialistName = "please enter hse specialist name";
        isValid = false;
    } else if (data.hseSpecialistName.length > 46) {
        error.hseSpecialistName = "Less than 45 character allowed in hse specialist name";
    }

    if (validator.isEmpty(data.hseSpecialistContactNo.toString())) {
        error.hseSpecialistContactNo = "please enter hse specialist contact number";
        isValid = false;
    }
    else if (data.hseSpecialistContactNo.length > 21) {
        error.hseSpecialistContactNo = "Less than 20 character allowed in hse specialist contact number";
    }
    console.log(error)
    return { error, isValid };
}

export default InvestigationOverviewValidate;

