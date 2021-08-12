export const RESTART_ON_REMOUNT = "@@saga-injector/restart-on-remount";
export const DAEMON = "@@saga-injector/daemon";
export const ONCE_TILL_UNMOUNT = "@@saga-injector/once-till-unmount";

const URL = "https://dev-safety.pace-os.com/";

export const SSO_URL = "https://dev-accounts-api.paceos.io";
// local
export const LOCAL_SSO_CLIENT_SECRET =
  "pu0AQUmSRQ6TJY1F5oCra8YyXZ9Unu9P4Mo85weLk0unRireA8W7jUHJ2GIaU0gNyDLxbq5t1Au7E2ybwmBLI8W9atizRqr9wjPh9rChN2GrXnPbDYVSUTINv0M0zaSW";
export const LOCAL_SSO_CLIENT_ID = "ZVbuUG5DsHzMgswa5Kb7zp2nHn0ZKiRSA8U2IGN1";
export const LOCAL_LOGIN_URL =
  "https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=ZVbuUG5DsHzMgswa5Kb7zp2nHn0ZKiRSA8U2IGN1&client_secret=pu0AQUmSRQ6TJY1F5oCra8YyXZ9Unu9P4Mo85weLk0unRireA8W7jUHJ2GIaU0gNyDLxbq5t1Au7E2ybwmBLI8W9atizRqr9wjPh9rChN2GrXnPbDYVSUTINv0M0zaSW&response_type=code";

export const SSO_CLIENT_SECRET =
  "pLYnuvaKXGkdZLaHf6HtlM9QxS3QLVs2gnrOr6hxZJJgS5PWuPsnGKPTwQcahaJ6gjyNDJ2mpktlePjQkEScFd9V3CTzI0Zdo2Yr38LVwSDXHfH7YOi4oacYregPF5Wz";
export const SSO_CLIENT_ID = "yVgvwzSwoYhk0AM2s7XFkr7fbVYK5ZET9JwP5lOo";
// Redirect login api if login is not.
export const LOGIN_URL = `${SSO_URL}/api/v1/user/auth/authorize/?client_id=yVgvwzSwoYhk0AM2s7XFkr7fbVYK5ZET9JwP5lOo&client_secret=pLYnuvaKXGkdZLaHf6HtlM9QxS3QLVs2gnrOr6hxZJJgS5PWuPsnGKPTwQcahaJ6gjyNDJ2mpktlePjQkEScFd9V3CTzI0Zdo2Yr38LVwSDXHfH7YOi4oacYregPF5Wz&response_type=code`;
export const LOGOUT_URL = `${SSO_URL}/user/logout/?client_id=${SSO_CLIENT_ID}`;

export const API_URL = "https://dev-safety-api.paceos.io/";
export const ACCOUNT_API_URL = "https://dev-accounts-api.paceos.io/";
export const access_token = localStorage.getItem("access_token");

export const SELF_API = "https://dev-accounts-api.paceos.io/api/v1/user/self/";

// Header authenticatuon
export const HEADER_AUTH = { Authorization: `Bearer ${access_token}` };

export const INITIAL_NOTIFICATION_FORM = {
  "Incident details": `/app/incident-management/registration/initial-notification/incident-details/${localStorage.getItem(
    "fkincidentId"
  )}`,
  "People affected": `/app/incident-management/registration/initial-notification/peoples-afftected/${localStorage.getItem(
    "fkincidentId"
  )}`,
  "Property affected": `/app/incident-management/registration/initial-notification/property-affected/${localStorage.getItem(
    "fkincidentId"
  )}`,
  "Equipment affected": `/app/incident-management/registration/initial-notification/equipment-affected/${localStorage.getItem(
    "fkincidentId"
  )}`,
  "Environment impact": `/app/incident-management/registration/initial-notification/environment-affected/${localStorage.getItem(
    "fkincidentId"
  )}`,
  "Reporting and notification": `/app/incident-management/registration/initial-notification/reporting-and-notification/${localStorage.getItem(
    "fkincidentId"
  )}`,
};

export const EVIDENCE_FORM = {
  Evidences: `/app/incident-management/registration/evidence/evidence/${localStorage.getItem(
    "fkincidentId"
  )}`,
  "Activity details": `/app/incident-management/registration/evidence/activity-detail/${localStorage.getItem(
    "fkincidentId"
  )}`,
  "Personal and PPE details": `/app/incident-management/registration/evidence/personal-and-ppedetails/${localStorage.getItem(
    "fkincidentId"
  )}`,
  "Additional details": `/app/incident-management/registration/evidence/additional-details/${localStorage.getItem(
    "fkincidentId"
  )}`,
};

export const INVESTIGATION_FORM = {
  "Investigation overview":
    "/app/incident-management/registration/investigation/investigation-overview/",
  "Severity consequences":
    "/app/incident-management/registration/investigation/severity-consequences/",
  "Worker details": `/app/incident-management/registration/investigation/worker-details/0/${localStorage.getItem(
    "fkincidentId"
  )}`,
  "Event details":
    "/app/incident-management/registration/investigation/event-details/",
  "Action taken":
    "/app/incident-management/registration/investigation/action-taken/",
};

export const ROOT_CAUSE_ANALYSIS_FORM = {
  "RCA Details":
    "/app/incident-management/registration/root-cause-analysis/details/",
  "Hazardous acts":
    "/app/incident-management/registration/root-cause-analysis/hazardious-acts/",
  "Hazardous conditions":
    "/app/incident-management/registration/root-cause-analysis/hazardious-condtions/",
  "Corrective actions":
    "/app/incident-management/registration/root-cause-analysis/cause-and-action/",
  "Basic cause":
    "/app/incident-management/registration/root-cause-analysis/basic-cause/",
  "Management control":
    "/app/incident-management/registration/root-cause-analysis/pace-management/",
  "Preventive actions":
    "/app/incident-management/registration/root-cause-analysis/basic-cause-and-action/",
  "Additional information":
    "/app/incident-management/registration/root-cause-analysis/management-control/",
  "Cause analysis":
    "/app/incident-management/registration/root-cause-analysis/root-cause-analysis/",
  "Five Why analysis":
    "/app/incident-management/registration/root-cause-analysis/why-analysis/",
};

export const SUMMERY_FORM = {
  Summary: "/app/incident-management/registration/summary/summary/",
};

export const LESSION_LEARNED_FORM = {
  "Lessons learnt":
    "/app/incident-management/registration/lession-learned/lession-learned/",
};
export const CLOSE_OUT_FORM = {
  "Close out":
    "/app/incident-management/registration/close-out/",
};

export const FORM_HEADER = {
  "Initial Notification":
    "/app/incident-management/registration/initial-notification/incident-details/",
  Investigation:
    "/app/incident-management/registration/investigation/initial-details/",
  "Evidence Collection":
    "/app/incident-management/registration/evidence/evidence/",
  "Cause analysis":
    "/app/incident-management/registration/root-cause-analysis/details/",
  Summary: "/app/incident-management/registration/summary/summary/",
  "Lession Learned":
    "/app/incident-management/registration/lession-learned/lession-learned/",
};

export const HAZARDIOUS_ACTS_SUB_TYPES = [
  "Supervision",
  "workPackage",
  "equipmentMachinery",
  "behaviourIssue",
  "safetyIssues",
  "ergonimics",
  "procedures",
  "otherActs",
];

export const HAZARDIOUS_CONDITION_SUB_TYPES = [
  "warningSystem",
  "energyTypes",
  "tools",
  "safetyItems",
  "othersConditions",
];

export const BASIC_CAUSE_SUB_TYPES = [
  "personal",
  "wellnessFactors",
  "othersHumanFactors",
  "leadership",
  "processes",
  "othersJobFactors",
];

export const PACE_MANAGEMENT_CONTROL_SUB_TYPES = [
  "ProActiveManagement",
  "Assessments",
  "Compilance",
  "Engagement",
];

// option in root cause and anlysis

export const SUPERVISON = [
  "No Supervision at Work Site",
  "Lack of Communication Between Supervisor & Workers",
  "Lack of Management of Change Processes - (Failure to Manage Change)",
];

export const EQUIMENTMACHINARY = [
  "Operating Machinery - Mobile Equipment Without  Permission",
  "Operating at Excessive Speed / Over speed / Above Set Limits - Without Authority",
  "Using a Non functioning / Defective / Out of Order Machinery / Equip",
  "Using Equipment Beyond Limits Company Policy or Manufacturer Recommendations",
  "Working on Equipment / Machinery While in Operation",
];

export const SAFETYITEMS = [
  "Misuse of PPE",
  "Failure to Conduct Risk Assessment - JHA / FLHA / Workplace Observation",
  "Failure to Inspect – Pre Job Inspection / FLHA",
  "Failure to Activate Safety Critical Devices",
];

export const PROCEDURES = [
  "Failure to Follow Standards- Procedures or Guidelines",
  "No or Improper Securing Devices Used",
  "Wrong Loading - Lifting or Improper Placement Techniques Used",
];

export const WORKPACKAGE = [
  "Work Package Incomplete",
  "Work Package Not Available",
];

export const BEHAVIOURISSUES = [
  "Fighting or Being Bullied at Work Place",
  "Under the Influence of Drug or Alcohol",
  "Physical or Mental Stress",
  "Complacent Behavior(Worker/Supervisor)",
  "Intentional Harmfully Act",
];

export const ERGONOMICS = [
  "Poor Posture",
  "Poor Lifting Techniques",
  "Repetitious Movements",
  "Over Reaching",
];

export const WARNINGSYSTEM = [
  "No Visual Warning Signs at Point of Operation",
  "Warning Labels Faded not Legible",
  "Warning Devices not Functioning",
  "No Caution Signs - Barriers - Guards - Traffic Signs & Signals",
  "Lack of Visual or  Audible signs",
];

export const TOOLS = [
  "Wrong Tool for the Job",
  "Using Home Made Tools",
  "Worn Out Tools - Material  or Improperly Cared for Equipment",
  "Wrong Equipment for the Job",
];

export const CONDITIONSAFETYITEMS = [
  "Inadequate PPE for Specific Hazards",
  "Defective PPE",
  "Bypassing Safety Critical Devices",
  "Poor Housekeeping - Untidy or Congested Areas",
  "Improper Storage – (Flammable Material Close to Ignition Sources etc.)",
  "Combustible Dusts - Chemical Fumes- Mists- Smoke",
  "Inadequate Ventilation",
  "Poor Lighting - Wrong Type of Lighting - Glare",
];

export const ENERGIES = [
  "Kinetic Energy",
  "Potential Energy",
  "Thermal Energy",
  "Electrical Energy",
  "Chemical Energy",
  "Nuclear Energy",
  "Radiation Energy",
  "Gravitational energy",
  "Pressure",
  "Hydraulic Energy",
  "Pneumatic Energy",
  "Temperature",
  "Sound",
];

export const PERSONAL = [
  "Physical Limitation",
  "Not Engaged Psychological",
  "Personal Stress",
  "Under the Influence of Illicit Substances",
  "Multitasking",
  "Lack of Training or Knowledge",
  "Lack of Competency or Skill",
  "Complacent Behavior – No Accountability",
  "Adequate Skill/Knowledge – But  took Short Cut",
  "Done it Wrong Previously Without Consequences",
  "Operational Discipline Not Followed",
  "Company Risk Tolerance",
  "Personal Risk Tolerance",
];

export const PERSONALWELNESSFACTORS = [
  "Lack of Rest- Working Long Hours (Overtime)",
  "Relationship Issues",
  "Financial Difficulties",
  "Peer Pressure",
  "Time Constraints",
  "Personal or Family Medical Issues",
];

export const LEADERSHIP = [
  "Work Package Incomplete",
  "Work Package Not Available",
  "Fighting or Being Bullied at Work Place",
  "Under the Influence of Drug or Alcohol",
  "Physical or Mental Stress",
  "Complacent Behavior(Worker / Supervisor)",
  "Intentional Harmfully Act",
];

export const PROCESSES = [
  "Poor Posture",
  "Poor Lifting Techniques",
  "Repetitious Movements",
  "Over Reaching",
  "No or Improper Securing Devices Used",
  "Wrong Loading- Lifting or Improper Placement Techniques Used",
];

export const MANAGEMENTCONTROL = [
  "Inadequate System",
  "Inadequate Standards",
  "Inadequate Compilance and Standards",
];

export const RCAOPTION = [
  "Five why analysis",
  "PACE cause analysis",
  "Cause analysis",
];

export const HIGHESTPOTENTIALIMPACTOR = [
  "Health and safety",
  "Environment",
  "Regulatory",
  "Reputaion",
  "Financial",
];

export const PROACTIVEMANAGEMENT = [
  "Poor understanding of company Values, Mission and Vision",
  "Improvement required in Company policies, Standards, procedures & guidance",
  "Improvement required in organizational readiness(Lack of Competent People & Processes)",
  "Inadequate technology and processes",
  "Lack of timely and factual data based decisions",
  "Improvement required in communication processes",
  "Improvement required in work management system - Work permits, work direction",
];

export const ASSESSMENTS = [
  "Lack of  Quality control and HSE  audits, inspections",
  "Lack of knowledge and competency assessments",
  "Lack of management system audits",
  "Corrective actions reverse analysis – effectiveness assessment",
  "Lack of Risk Assessment processes",
];

export const COMPILANCE = [
  "Not following company policies and standards",
  "Not meeting regulatory requirements",
  "Not following the manufacturer recommendations",
  "Lack of Operational Discipline – non compliance with procedures, polices etc.",
];

export const ENGAGEMENT = [
  "Leadership engagement needs improvement",
  "Poor reward and recognition",
  "Delay / withholding information",
];
