import validator from "validator";

function JobDetailsValidate(data, projectStructure) {


    const error = {};
    let isValid = true;

    const breakdownValue = JSON.parse(localStorage.getItem('projectName')).projectName.breakdown
    for (let i = 0; i < breakdownValue.length; i++) {
        var element = projectStructure[i]
        console.log({ element: element })
        if (projectStructure[i] === undefined) {
            error[`projectStructure${[i]}`] = `Please select ${breakdownValue[i].structure[0].name}`;
            isValid = false;
        }
    }

    if (validator.isEmpty(data.jobTitle.toString())) {
        error.jobTitle = "Please enter the job title";
        isValid = false;
    }

    if (validator.isEmpty(data.location.toString())) {
        error.location = "Please enter the work location";
        isValid = false;
    }

    if (data.jhaAssessmentDate == null) {
        error.jhaAssessmentDate = "Please enter the jha assessment date";
        isValid = false;
    }

    if (validator.isEmpty(data.description.toString())) {
        error.description = "Please enter description";
        isValid = false;
    }

    if (validator.isEmpty(data.permitToPerform.toString())) {
        error.permitToPerform = "Please choose any one ";
        isValid = false;
    }

    if (data.assessmentDate === null) {
        error.assessmentDate = "Please select date and time";
        isValid = false;
    }

    return { error, isValid };
}

export default JobDetailsValidate;