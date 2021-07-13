export const RESTART_ON_REMOUNT = "@@saga-injector/restart-on-remount";
export const DAEMON = "@@saga-injector/daemon";
export const ONCE_TILL_UNMOUNT = "@@saga-injector/once-till-unmount";

const URL = "https://dev-safety.pace-os.com/";
export const SSO_URL = "https://dev-accounts-api.paceos.io";
export const SSO_CLIENT_SECRET =
  "pLYnuvaKXGkdZLaHf6HtlM9QxS3QLVs2gnrOr6hxZJJgS5PWuPsnGKPTwQcahaJ6gjyNDJ2mpktlePjQkEScFd9V3CTzI0Zdo2Yr38LVwSDXHfH7YOi4oacYregPF5Wz";
export const SSO_CLIENT_ID = "yVgvwzSwoYhk0AM2s7XFkr7fbVYK5ZET9JwP5lOo";
// Redirect login api if login is not.
export const LOGIN_URL = `${SSO_URL}/api/v1/user/auth/authorize/?client_id=yVgvwzSwoYhk0AM2s7XFkr7fbVYK5ZET9JwP5lOo&client_secret=pLYnuvaKXGkdZLaHf6HtlM9QxS3QLVs2gnrOr6hxZJJgS5PWuPsnGKPTwQcahaJ6gjyNDJ2mpktlePjQkEScFd9V3CTzI0Zdo2Yr38LVwSDXHfH7YOi4oacYregPF5Wz&response_type=code`;

export const API_URL = "https://dev-safety-api.paceos.io/";
export const ACCOUNT_API_URL = "https://dev-accounts-api.paceos.io/";
export const access_token = localStorage.getItem("access_token") || 'GIgqhTAr8BLUZuq7exBqrpdptGUzGs';

export const INITIAL_NOTIFICATION_FORM = {
  "Incident details":
    "/app/incident-management/registration/initial-notification/incident-details/",
  "People affected":
    "/app/incident-management/registration/initial-notification/peoples-afftected/",
  "Property affected":
    "/app/incident-management/registration/initial-notification/property-affected/",
  "Equipment affected":
    "/app/incident-management/registration/initial-notification/equipment-affected/",
  "Environment affected":
    "/app/incident-management/registration/initial-notification/environment-affected/",
  "Reporting and notification":
    "/app/incident-management/registration/initial-notification/reporting-and-notification/",
};

export const EVIDENCE_FORM = {
  Evidences: "/app/incident-management/registration/evidence/evidence/",
  "Activity details":
    "/app/incident-management/registration/evidence/activity-detail/",
  "Personal and PPE details":
    "/app/incident-management/registration/evidence/personal-and-ppedetails/",
  "Additional details":
    "/app/incident-management/registration/evidence/additional-details/",
};

export const INVESTIGATION_FORM = {
  "Investigation overview":
    "/app/incident-management/registration/investigation/investigation-overview/",
  "Severity consequences":
    "/app/incident-management/registration/investigation/severity-consequences/",
  "Worker details":
    "/app/incident-management/registration/investigation/worker-details/",
  "Event details":
    "/app/incident-management/registration/investigation/event-details/",
  "Action taken":
    "/app/incident-management/registration/investigation/action-taken/",
};

export const ROOT_CAUSE_ANALYSIS_FORM = {
  Details: "/app/incident-management/registration/root-cause-analysis/details/",
  "Hazardous acts":
    "/app/incident-management/registration/root-cause-analysis/hazardious-acts/",
  "Hazardous conditions":
    "/app/incident-management/registration/root-cause-analysis/hazardious-condtions/",
  "Cause and action":
    "/app/incident-management/registration/root-cause-analysis/cause-and-action/",
  "Basic cause":
    "/app/incident-management/registration/root-cause-analysis/basic-cause/",
  "Basic cause and action":
    "/app/incident-management/registration/root-cause-analysis/basic-cause-and-action/",
  "Corrective actions":
    "/app/incident-management/registration/root-cause-analysis/management-control/",
  "Root cause analysis":
    "/app/incident-management/registration/root-cause-analysis/root-cause-analysis/",
  "5 Why analysis":
    "/app/incident-management/registration/root-cause-analysis/why-analysis/",
};

export const SUMMERY_FORM = {
  Summary: "/app/incident-management/registration/summary/summary/",
};

export const LESSION_LEARNED_FORM = {
  "Lession learned":
    "/app/incident-management/registration/lession-learned/lession-learned/",
};

export const FORM_HEADER = {
  "Initial Notification":
    "/app/incident-management/registration/initial-notification/incident-details/",
  Investigation:
    "/app/incident-management/registration/investigation/initial-details/",
  "Evidence Collection":
    "/app/incident-management/registration/evidence/evidence/",
  "Root cause analysis":
    "/app/incident-management/registration/root-cause-analysis/details/",
  Summary: "/app/incident-management/registration/summary/summary/",
  "Lession Learned":
    "/app/incident-management/registration/lession-learned/lession-learned/",
};

export const BASIC_CAUSE_SUB_TYPE = [
  "Perosonal",
  "Wellness factors",
  "Other human factors",
  "Leadership",
  "Processes",
  "Others job factors",
];

export const HAZARDIOUS_ACTS_SUB_TYPES = [
  "Supervision",
  "Workpackage",
  "equipmentMachinery",
  "behaviourIssue",
  "safetyIssues",
  "ergonimics",
  "procedures",
  "otheracts",
];

export const ACTS_SUB_TYPES = [
  "Supervision",
  "Work package",
  "Equipment machinery",
  "Behaviour issue",
  "Safety issues",
  "Ergonimics",
  "Procedures",
  "Other acts",
];

export const HAZARDIOUS_CONDITION_SUB_TYPES = [
  "warningSystem",
  "energyTypes",
  "tools",
  "safetyitems",
  "othersconditions",
];

export const CONDITION_SUB_TYPES = [
  "Warning system",
  "Energy types",
  "Tools",
  "Safety items",
  "Others conditions",
];

export const BASIC_CAUSE_SUB_TYPES = [
  "personal",
  "wellnessFactors",
  "othershumanfactors",
  "leadership",
  "processes",
  "othersjobfactors",
];

// option in root cause and anlysis

export const HAZARDIOUS_ACTS = [
  "Supervison",
  "Workpackage",
  "Equimentmachinary",
  "Behaviousissues",
  "Safetyitems",
  "Ergonomics",
  "Procedure",
];

export const SUPERVISON = [
  "No Supervision at Work Site",
  "Lack of Communication Between Supervisor & Workers",
  "Lack of Management of Change Processes - (Failure to Manage Change)",
];

export const EQUIMENTMACHINARY = [
  "Operating Machinery - Mobile Equipment Without  Permission",
  "Operating at Excessive Speed / Over speed / Above Set Limits - Without Authority",
  "Using a Nonfunctioning / Defective / Out of Order Machinery / Equip",
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
  "Combustible Dusts - Chemical Fumes, Mists, Smoke",
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
  "Pace cause analysis",
  "Root cause analysis",
];

export const HIGHESTPOTENTIALIMPACTOR = [
  "Health and safety",
  "Environment",
  "Regulatory",
  "Reputaion",
  "Financial",
];
