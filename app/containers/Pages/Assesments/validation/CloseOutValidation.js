import validator from "validator";

function CloseOutFlhaValidation(data) {
    let isValid = true;
    const error = {};

    if (data.preUseInspection == null) {
        error.preUseInspection = "Please choose any one";
        isValid = false;
    }

    if (data.warningRibbon == null) {
        error.warningRibbon = "Please choose any one";
        isValid = false;
    }

    if (data.workerWorking == null) {
        error.workerWorking = "Please choose any one";
        isValid = false;
    }

    if (data.workerWorking == "Yes" && data.workerRemarks == null) {
        error.workerRemarks = "Please enter details";
        isValid = false;
    }

    if (data.permitClosedOut == null) {
        error.permitClosedOut = "Please choose any one";
        isValid = false;
    }

    if (data.hazardsRemaining == null) {
        error.hazardsRemaining = "Please choose any one";
        isValid = false;
    }

    if (data.endOfJob == null) {
        error.endOfJob = "Please choose any one";
        isValid = false;
    }

    if (data.anyIncidents == null) {
        error.anyIncidents = "Please choose any one";
        isValid = false;
    }

    if (data.anyIncidents == "Yes" && data.jobCompletionRemarks == null) {
        error.jobCompletionRemarks = "Please enter details";
        isValid = false;
    }

    if (data.creatingIncident == null) {
        error.creatingIncident = "Please choose any one";
        isValid = false;
    }
    console.log(error)
    return { error, isValid };
}

export default CloseOutFlhaValidation;
