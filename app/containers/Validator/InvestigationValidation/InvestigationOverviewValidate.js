import validator from "validator";

function InvestigationOverviewValidate(data) {
    let isValid = true;
    const error = {};

    if (validator.isEmpty(data.constructionManagerName.toString())) {
        error.constructionManagerName = "This field is empty";
        isValid = false;
    }

    if (validator.isEmpty(data.constructionManagerContactNo.toString())) {
        error.constructionManagerContactNo = "This field is empty";
        isValid = false;
    }

    if (validator.isEmpty(data.hseSpecialistName.toString())) {
        error.hseSpecialistName = "This field is empty";
        isValid = false;
    }

    if (validator.isEmpty(data.hseSpecialistContactNo.toString())) {
        error.hseSpecialistContactNo = "This field is empty";
        isValid = false;
    }

    return { error, isValid };
}

export default InvestigationOverviewValidate;

