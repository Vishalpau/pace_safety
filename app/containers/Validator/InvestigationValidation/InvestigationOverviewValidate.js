import validator from "validator";

function InvestigationOverviewValidate(data) {
    let isValid = true;
    const error = {};

    if (validator.isEmpty(data.constructionManagerName.toString())) {
        error.constructionManagerName = "Please fill construction manager name";
        isValid = false;
    }

    if (validator.isEmpty(data.constructionManagerContactNo.toString())) {
        error.constructionManagerContactNo = "Please fill construction manager contact number";
        isValid = false;
    }

    if (validator.isEmpty(data.hseSpecialistName.toString())) {
        error.hseSpecialistName = "Please fill hse specialist contact number";
        isValid = false;
    }

    if (validator.isEmpty(data.hseSpecialistContactNo.toString())) {
        error.hseSpecialistContactNo = "Please fill hse specialist contact number";
        isValid = false;
    }

    return { error, isValid };
}

export default InvestigationOverviewValidate;

