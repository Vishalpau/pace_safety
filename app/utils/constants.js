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

export const HAZARDIOUS_ACTS_SUB_TYPES = ["Supervision",
  "Workpackage",
  "equipmentMachinery",
  "behaviourIssue",
  "safetyIssues",
  "ergonimics",
  "procedures",
  "otheracts"]
export const HAZARDIOUS_CONDITION_SUB_TYPES = [
  "warningSystem",
  "energyTypes",
  "tools",
  "safetyitems",
  "othersconditions"]
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
  "Procedure"
]

export const SUPERVISON = [
  "No supervision at work site",
  "Lack of communication between supervisor & Workers",
  "Lack of Management of Change Processes - (failure to manage change)"
]

export const EQUIMENTMACHINARY = [
  "Operating machinery - mobile equipment without  permission",
  "Operating at excessive speed / over speed / above set limits - without authority",
  "Using a nonfunctioning / defective / out of order machinery / equip",
  "Using equipment beyond limits company policy or manufacturer recommendations",
  "Working on equipment / machinery while in operation",
]


export const SAFETYITEMS = [
  "Misuse of PPE",
  "Failure to conduct risk assessment - JHA / FLHA / workplace observation",
  "Failure to inspect – pre job inspection / FLHA",
  "Failure to activate safety critical devices",
]

export const PROCEDURES = [
  "Failure to follow standards- procedures or guidelines",
  "No or improper securing devices used",
  "Wrong loading - lifting or improper placement techniques used",
]

export const WORKPACKAGE = [
  "Work package incomplete",
  "Work package not available",
]

export const BEHAVIOURISSUES = [
  "Fighting or being bullied at work place",
  "Under the influence of drug or alcohol",
  "Physical or mental stress",
  "Complacent Behavior(worker / supervisor)",
  "Intentional harmfully act",
]

export const ERGONOMICS = [
  "Poor posture",
  "Poor lifting techniques",
  "Repetitious movements",
  "Over reaching",
]

export const WARNINGSYSTEM = [
  "No visual warning signs at point of operation",
  "Warning labels faded not legible",
  "Warning devices not functioning",
  "No caution signs - barriers - guards - traffic signs a & signals",
  "Lack of visual or auditable signs",
]

export const TOOLS = [
  "Wrong tool for the job",
  "Using home made tools",
  "Worn out tools - material  or improperly cared for equipment",
  "Wrong equipment for the job",
]

export const CONDITIONSAFETYITEMS = [
  "Inadequate PPE for specific hazards",
  "Defective PPE",
  "Bypassing safety critical devices",
  "Poor housekeeping - untidy or congested areas",
  "Improper storage – (flammable material close to ignition sources etc.)",
  "Combustible dusts - chemical fumes, mists, smoke",
  "Inadequate ventilation",
  "Poor lighting - wrong type of lighting - glare",
]

export const ENERGIES = [
  "Kinetic Energy",
  "Potential Energy",
  "Thermal Energy",
  "Electrical Energy",
  "Chemical Energy",
  "Nuclear Energy",
  "Radiation Energy",
  "Gravtiational Energy",
  "Pressure",
  "Hydraulic Energy",
  "Pneumatic Energy",
  "Temperature",
  "Sound",
]

export const PERSONAL = [
  "Physical limitation",
  "Not engaged psychological",
  "Personal Stress",
  "Under the influence of illicit substances",
  "Multitasking",
  "Lack of training or knowledge",
  "Lack of competency or skill",
  "Complacent Behavior – no accountability",
  "Adequate skill / knowledge – but  took short cut",
  "Done it wrong previously without consequences",
  "Operational discipline not followed",
  "Company Risk Tolerance",
  "Personal risk Tolerance",
]

export const PERSONALWELNESSFACTORS = [
  "Lack of rest- working long hors(overtime)",
  "Relationship issues",
  "Financial difficulties",
  "Peer pressure",
  "Time Constraints",
  "Personal or family medical issues",
]


export const LEADERSHIP = [
  "Work package incomplete",
  "Work package not available",
  "Fighting or being bullied at work place",
  "Under the influence of drug or alcohol",
  "Physical or mental stress",
  "Complacent Behavior(worker / supervisor)",
  "Intentional harmfully act",
]

export const PROCESSES = [
  "Poor posture",
  "Poor lifting techniques",
  "Repetitious movements",
  "Over reaching",
  "No or improper securing devices used",
  "Wrong loading- lifting or improper placement techniques used",
]

export const MANAGEMENTCONTROL = [
  "Inadequate System",
  "Inadequate standards",
  "Inadequate compilance and standards",
];

export const RCAOPTION = ["Cause analysis", "Pace cause", "Root cause"]