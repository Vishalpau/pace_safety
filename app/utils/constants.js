import FormHelperText from '@material-ui/core/FormHelperText';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

let URL = "http://localhost:3000/"

export const INITIAL_NOTIFICATION_FORM ={
    "Incident details":`${URL}app/incident-management/registration/initial-notification/incident-details/`,
    "Peoples affected":`${URL}app/incident-management/registration/initial-notification/peoples-afftected/`,
    "Property affected":`${URL}app/incident-management/registration/initial-notification/property-affected/`,
    "Equipment affected":`${URL}app/incident-management/registration/initial-notification/eqiptment-affected/`,
    "Environment affected":`${URL}app/incident-management/registration/initial-notification/environment-affected/`,
    "Reporting and notification":`${URL}app/incident-management/registration/initial-notification/reporting-and-notification/`,   
}

export const EVIDENCE_FORM = {
    "Evidence":`${URL}app/incident-management/registration/evidence/evidence/`,
    "Activity detail":`${URL}app/incident-management/registration/evidence/activity-detail/`,
    "Personal and Ppedetails":`${URL}app/incident-management/registration/evidence/personal-and-ppedetails/`,
    "Additional detail":`${URL}app/incident-management/registration/evidence/additional-details/`
}

export const INVESTIGATION_FORM = {
    // "Initial details":`${URL}app/incident-management/registration/investigation/initial-details/`,
    "Investigation overview":`${URL}app/incident-management/registration/investigation/investigation-overview/`,
    "Worker details":`${URL}app/incident-management/registration/investigation/worker-details/`,
    "Property impact details":`${URL}app/incident-management/registration/investigation/property-impact-details/`,
    "Equipment impact details":`${URL}app/incident-management/registration/investigation/equiptment-impact-details/`,
    "Event details":`${URL}app/incident-management/registration/investigation/event-details/`,
    "Action taken":`${URL}app/incident-management/registration/investigation/action-taken/` 
}


export const ROOT_CAUSE_ANALYSIS_FORM = {
    "Details":`${URL}app/incident-management/registration/root-cause-analysis/details/`,
    "Hazardious acts":`${URL}app/incident-management/registration/root-cause-analysis/hazardious-acts/`,
    "Hazardious conditions":`${URL}app/incident-management/registration/root-cause-analysis/hazardious-condtions/`,
    "Cause and action":`${URL}app/incident-management/registration/root-cause-analysis/cause-and-action/`,
    "Basic cause":`${URL}app/incident-management/registration/root-cause-analysis/basic-cause/`,
    "Basic cause and action":`${URL}app/incident-management/registration/root-cause-analysis/basic-cause-and-action/`,
    "Corrective action":`${URL}app/incident-management/registration/root-cause-analysis/management-control/`,
    "Root cause analysis":`${URL}app/incident-management/registration/root-cause-analysis/root-cause-analysis/`,
    "Why analysis":`${URL}app/incident-management/registration/root-cause-analysis/why-analysis/`
}

export const SUMMERY_FORM = {
    "Summary":`${URL}app/incident-management/registration/summary/summary/`,
}

export const LESSION_LEARNED_FORM = {
    "Lession learned":`${URL}app/incident-management/registration/lession-learned/lession-learned/`,
}


export const FORM_HEADER = {
    "Initial notification":`${URL}app/incident-management/registration/initial-notification/incident-details/`,
    "Investigation": `${URL}app/incident-management/registration/investigation/initial-details/`,
    "Evidence collection":`${URL}app/incident-management/registration/evidence/evidence/`,
    "Root cause analysis": `${URL}app/incident-management/registration/root-cause-analysis/details/`,
    "Summary":`${URL}app/incident-management/registration/summary/summary/`,
    "Lession learned":`${URL}app/incident-management/registration/lession-learned/lession-learned/`
}