import FormHelperText from "@material-ui/core/FormHelperText";

export const RESTART_ON_REMOUNT = "@@saga-injector/restart-on-remount";
export const DAEMON = "@@saga-injector/daemon";
export const ONCE_TILL_UNMOUNT = "@@saga-injector/once-till-unmount";

// let URL = "https://dev-safety.pace-os.com/";
let URL = "http://localhost:3000/";
export const SSO_URL = 'https://dev-accounts-api.paceos.io';
export const LOGIN_URL = `${SSO_URL}/api/v1/user/auth/authorize/?client_id=yVgvwzSwoYhk0AM2s7XFkr7fbVYK5ZET9JwP5lOo&client_secret=pLYnuvaKXGkdZLaHf6HtlM9QxS3QLVs2gnrOr6hxZJJgS5PWuPsnGKPTwQcahaJ6gjyNDJ2mpktlePjQkEScFd9V3CTzI0Zdo2Yr38LVwSDXHfH7YOi4oacYregPF5Wz&response_type=code`;
export const API_URL = 'https://dev-safety-api.paceos.io/';

export const INITIAL_NOTIFICATION_FORM = {
  "Incident details": `/app/incident-management/registration/initial-notification/incident-details/`,
  "Peoples affected": `/app/incident-management/registration/initial-notification/peoples-afftected/`,
  "Property affected": `/app/incident-management/registration/initial-notification/property-affected/`,
  "Equipment affected": `/app/incident-management/registration/initial-notification/eqiptment-affected/`,
  "Environment affected": `/app/incident-management/registration/initial-notification/environment-affected/`,
  "Reporting and notification": `/app/incident-management/registration/initial-notification/reporting-and-notification/`,
};

export const EVIDENCE_FORM = {
  "Evidence": `/app/incident-management/registration/evidence/evidence/`,
  "Activity detail": `/app/incident-management/registration/evidence/activity-detail/`,
  "Personal and Ppedetails": `/app/incident-management/registration/evidence/personal-and-ppedetails/`,
  "Additional detail": `/app/incident-management/registration/evidence/additional-details/`,
};

export const INVESTIGATION_FORM = {
  // "Initial details":`/app/incident-management/registration/investigation/initial-details/`,
  "Investigation overview": `/app/incident-management/registration/investigation/investigation-overview/`,
  "Worker details": `/app/incident-management/registration/investigation/worker-details/`,
  "Property impact details": `/app/incident-management/registration/investigation/property-impact-details/`,
  "Equipment impact details": `/app/incident-management/registration/investigation/equiptment-impact-details/`,
  "Event details": `/app/incident-management/registration/investigation/event-details/`,
  "Action taken": `/app/incident-management/registration/investigation/action-taken/`,
};

export const ROOT_CAUSE_ANALYSIS_FORM = {
  "Details": `/app/incident-management/registration/root-cause-analysis/details/`,
  "Hazardious acts": `/app/incident-management/registration/root-cause-analysis/hazardious-acts/`,
  "Hazardious conditions": `/app/incident-management/registration/root-cause-analysis/hazardious-condtions/`,
  "Cause and action": `/app/incident-management/registration/root-cause-analysis/cause-and-action/`,
  "Basic cause": `/app/incident-management/registration/root-cause-analysis/basic-cause/`,
  "Basic cause and action": `/app/incident-management/registration/root-cause-analysis/basic-cause-and-action/`,
  "Corrective action": `/app/incident-management/registration/root-cause-analysis/management-control/`,
  "Root cause analysis": `/app/incident-management/registration/root-cause-analysis/root-cause-analysis/`,
  "Why analysis": `/app/incident-management/registration/root-cause-analysis/why-analysis/`,
};

export const SUMMERY_FORM = {
  Summary: `/app/incident-management/registration/summary/summary/`,
};

export const LESSION_LEARNED_FORM = {
  "Lession learned": `/app/incident-management/registration/lession-learned/lession-learned/`,
};

export const FORM_HEADER = {
  "Initial notification": `/app/incident-management/registration/initial-notification/incident-details/`,
  Investigation: `/app/incident-management/registration/investigation/initial-details/`,
  "Evidence collection": `/app/incident-management/registration/evidence/evidence/`,
  "Root cause analysis": `/app/incident-management/registration/root-cause-analysis/details/`,
  Summary: `/app/incident-management/registration/summary/summary/`,
  "Lession learned": `/app/incident-management/registration/lession-learned/lession-learned/`,
};
