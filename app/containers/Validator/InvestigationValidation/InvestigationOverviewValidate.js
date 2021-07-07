import validator from "validator";

function InvestigationOverviewValidate(data) {
    console.log(data);
    let isValid = true;
    const error = {};

    if (validator.isEmpty(data.constructionManagerName)) {
        error.constructionManagerName = "This field is empty";
    }

    if (validator.isEmpty(data.constructionManagerContactNo.toString() && data.constructionManagerContactNo.toString().length !== 10)) {
        error.constructionManagerContactNo = "This field is empty";
    }

    if (validator.isEmpty(data.hseSpecialistName)) {
        error.hseSpecialistName = "This field is empty";
    }

    if (validator.isEmpty(data.hseSpecialistContactNo)) {
        error.hseSpecialistContactNo = "This field is empty";
    }

    console.log(error);
    return { error, isValid };
}

export default InvestigationOverviewValidate;