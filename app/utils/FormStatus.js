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
    let res = await api.get(`/api/v1/incidents/${incident_id}/evidences/`);
    let results = res.data.data.results;
    return "pending"
}

export const RootCauseAnalysisStatus = async () => {
    let res = await api.get(`/api/v1/incidents/${incident_id}/causeanalysis/`);
    let results = res.data.data.results[0]
    return "pending"
}

export const LessionLearnedStatus = async () => {
    let res = await api.get(`api/v1/incidents/${incident_id}/learnings/`);
    let results = res.data.data.results
    return "pending"
}