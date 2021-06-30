import FormHelperText from "@material-ui/core/FormHelperText";

export const RESTART_ON_REMOUNT = "@@saga-injector/restart-on-remount";
export const DAEMON = "@@saga-injector/daemon";
export const ONCE_TILL_UNMOUNT = "@@saga-injector/once-till-unmount";

const URL = "https://dev-safety.pace-os.com/";
export const SSO_URL = "https://dev-accounts-api.paceos.io";
export const LOGIN_URL = `${SSO_URL}/api/v1/user/auth/authorize/?client_id=yVgvwzSwoYhk0AM2s7XFkr7fbVYK5ZET9JwP5lOo&client_secret=pLYnuvaKXGkdZLaHf6HtlM9QxS3QLVs2gnrOr6hxZJJgS5PWuPsnGKPTwQcahaJ6gjyNDJ2mpktlePjQkEScFd9V3CTzI0Zdo2Yr38LVwSDXHfH7YOi4oacYregPF5Wz&response_type=code`;
export const API_URL = "https://dev-safety-api.paceos.io/";

export const INITIAL_NOTIFICATION_FORM = {
  "Incident Details":
    "/app/incident-management/registration/initial-notification/incident-details/",
  "People Affected":
    "/app/incident-management/registration/initial-notification/peoples-afftected/",
  "Property Affected":
    "/app/incident-management/registration/initial-notification/property-Affected/",
  "Equipment Affected":
    "/app/incident-management/registration/initial-notification/eqiptment-Affected/",
  "Environment Affected":
    "/app/incident-management/registration/initial-notification/environment-Affected/",
  "Reporting and Notification":
    "/app/incident-management/registration/initial-notification/reporting-and-notification/",
};

export const EVIDENCE_FORM = {
  Evidence: "/app/incident-management/registration/evidence/evidence/",
  "Activity Detail":
    "/app/incident-management/registration/evidence/activity-detail/",
  "Personal and PPE Details":
    "/app/incident-management/registration/evidence/personal-and-ppedetails/",
  "Additional Details":
    "/app/incident-management/registration/evidence/additional-details/",
};

export const INVESTIGATION_FORM = {
  // "Initial details":`/app/incident-management/registration/investigation/initial-details/`,
  "Investigation Overview":
    "/app/incident-management/registration/investigation/investigation-overview/",
  "Worker Details":
    "/app/incident-management/registration/investigation/worker-details/",
  "Property Impact Details":
    "/app/incident-management/registration/investigation/property-impact-details/",
  "Equipment Impact Details":
    "/app/incident-management/registration/investigation/Equipment-impact-details/",
  "Event Details":
    "/app/incident-management/registration/investigation/event-details/",
  "Action Taken":
    "/app/incident-management/registration/investigation/action-taken/",
};

export const ROOT_CAUSE_ANALYSIS_FORM = {
  Details: "/app/incident-management/registration/root-cause-analysis/details/",
  "Hazardious Acts":
    "/app/incident-management/registration/root-cause-analysis/hazardious-acts/",
  "Hazardious Conditions":
    "/app/incident-management/registration/root-cause-analysis/hazardious-condtions/",
  "Cause and Action":
    "/app/incident-management/registration/root-cause-analysis/cause-and-action/",
  "Basic Cause":
    "/app/incident-management/registration/root-cause-analysis/basic-cause/",
  "Basic Cause and Action":
    "/app/incident-management/registration/root-cause-analysis/basic-cause-and-action/",
  "Corrective Action":
    "/app/incident-management/registration/root-cause-analysis/management-control/",
  "Root Cause Analysis":
    "/app/incident-management/registration/root-cause-analysis/root-cause-analysis/",
  "Why Analysis":
    "/app/incident-management/registration/root-cause-analysis/why-analysis/",
};

export const SUMMERY_FORM = {
  Summary: "/app/incident-management/registration/summary/summary/",
};

export const LESSION_LEARNED_FORM = {
  "Lession Learned":
    "/app/incident-management/registration/lession-learned/lession-learned/",
};

export const FORM_HEADER = {
  "Initial Notification":
    "/app/incident-management/registration/initial-notification/incident-details/",
  Investigation:
    "/app/incident-management/registration/investigation/initial-details/",
  "Evidence Collection":
    "/app/incident-management/registration/evidence/evidence/",
  "Root Cause Analysis":
    "/app/incident-management/registration/root-cause-analysis/details/",
  Summary: "/app/incident-management/registration/summary/summary/",
  "Lession Learned":
    "/app/incident-management/registration/lession-learned/lession-learned/",
};
