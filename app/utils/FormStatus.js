import api from "./axios"
import { checkValue, handelIncidentId } from "./CheckerValue"

let incident_id = handelIncidentId()

const CheckDone = (value) => {
    if (value !== null && value !== undefined && value.toString() !== "") {
        return "done"
    } else {
        return "pending"
    }
}

export const InititlaNotificationStatus = async () => {
    let res = await api.get(`api/v1/incidents/${incident_id}/reports/`);
    let results = res.data.data.results
    let firstForm = results.isEnviromentalImpacted
    let checkDoneOrPending = CheckDone(results)
    return checkDoneOrPending
}

export const InvestigationStatus = async () => {
    let res = await api.get(`/api/v1/incidents/${incident_id}/investigations/`);
    let results = res.data.data.results;
    let lastFrom = results.preEventMitigations
    let checkDoneOrPending = lastFrom !== null ? "done" : "pending"
    return checkDoneOrPending
}

export const EvidenceStatus = async () => {
    const allEvidence = await api.get(`/api/v1/incidents/${incident_id}/activities/`);
    const result = allEvidence.data.data.results[24];
    if (result !== undefined) {
        let lastValue = result.question
        let checkDoneOrPending = CheckDone(lastValue)
        return checkDoneOrPending
    }

}

export const RootCauseAnalysisStatus = async () => {
    let previousData = await api.get(`/api/v1/incidents/${incident_id}/causeanalysis/`);
    let rcaRecommended = previousData.data.data.results[0].rcaRecommended
    if (rcaRecommended !== undefined) {
        if (rcaRecommended == "PACE cause analysis") {
            let paceCause = await api.get(`/api/v1/incidents/${incident_id}/pacecauses/`);
            let paceCauseData = paceCause.data.data.results[0];
        } else if (rcaRecommended == "Cause analysis") {
            let rootCause = await api.get(`/api/v1/incidents/${incident_id}/rootcauses/`);
            let rootCauseData = rootCause.data.data.results[0];
        } else if (rcaRecommended == "Five why analysis") {
            let whyAnalysis = await api.get(`/api/v1/incidents/${incident_id}/fivewhy/`);
            let whyAnalysisData = whyAnalysis.data.data.results[0];
            let checkDoneOrPending = CheckDone(whyAnalysisData)
            return checkDoneOrPending
        }
    }
}

export const LessionLearnedStatus = async () => {
    let res = await api.get(`api/v1/incidents/${incident_id}/learnings/`);
    let results = res.data.data.results
    return "pending"
}