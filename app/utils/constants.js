

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

const getSSOUrl = () => {
  if (window.location.hostname === 'localhost') {
    return "https://dev-accounts-api.paceos.io";
  }
  if (window.location.hostname === 'dev-safety.pace-os.com') {
    return "https://dev-accounts-api.paceos.io";
  }
  if (window.location.hostname === 'stage-safety.pace-os.com.s3-website-eu-west-1.amazonaws.com') {
    return "https://stage-accounts.pace-os.com";
  }
  if (window.location.hostname === 'safety.pace-os.com') {
    return "https://accounts.pace-os.com";
  }

}

export const SSO_URL = getSSOUrl()
// Dev
// "https://dev-accounts-api.paceos.io";
// Production
// "https://accounts.pace-os.com/"

// local
export const LOCAL_SSO_CLIENT_SECRET = 'pLYnuvaKXGkdZLaHf6HtlM9QxS3QLVs2gnrOr6hxZJJgS5PWuPsnGKPTwQcahaJ6gjyNDJ2mpktlePjQkEScFd9V3CTzI0Zdo2Yr38LVwSDXHfH7YOi4oacYregPF5Wz';
export const LOCAL_SSO_CLIENT_ID = 'yVgvwzSwoYhk0AM2s7XFkr7fbVYK5ZET9JwP5lOo';
export const LOCAL_LOGIN_URL =
  "https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=" + LOCAL_SSO_CLIENT_ID + "&client_secret=" + LOCAL_SSO_CLIENT_SECRET + "&response_type=code";

const getSSOClientSecret = () => {
  if (window.location.hostname === 'localhost') {
    return "pu0AQUmSRQ6TJY1F5oCra8YyXZ9Unu9P4Mo85weLk0unRireA8W7jUHJ2GIaU0gNyDLxbq5t1Au7E2ybwmBLI8W9atizRqr9wjPh9rChN2GrXnPbDYVSUTINv0M0zaSW";
  }
  if (window.location.hostname === 'dev-safety.pace-os.com') {
    return "pLYnuvaKXGkdZLaHf6HtlM9QxS3QLVs2gnrOr6hxZJJgS5PWuPsnGKPTwQcahaJ6gjyNDJ2mpktlePjQkEScFd9V3CTzI0Zdo2Yr38LVwSDXHfH7YOi4oacYregPF5Wz";
  }
  if (window.location.hostname === 'stage-safety.pace-os.com.s3-website-eu-west-1.amazonaws.com') {
    return "";
  }
  if (window.location.hostname === 'safety.pace-os.com.s3-website-eu-west-1.amazonaws.com') {
    return "wsmcncXGHar4Sts2WtsDCpleuxhvgSEIgoEFaDHEKKxdcsuOpoa5p3nEj7wa29LGUgaaumUVGIjafw5GMMlVVz3oiSDlGtCjdg4pRdtwMfdzSVTBdpwf89tu6ljdFrfE";
  }
  if (window.location.hostname === 'safety.pace-os.com') {
    return "wsmcncXGHar4Sts2WtsDCpleuxhvgSEIgoEFaDHEKKxdcsuOpoa5p3nEj7wa29LGUgaaumUVGIjafw5GMMlVVz3oiSDlGtCjdg4pRdtwMfdzSVTBdpwf89tu6ljdFrfE";
  }
}
export const SSO_CLIENT_SECRET = getSSOClientSecret()
// Dev
// "4OyOnL5wVipenQ6QpG8fOasjjRSJ2cJwuOUF1sH4yaeGI70flEiwttckHlep0QklG0tS7GyX568wjIpEvR5oYPnseJvjEV3zzlcneOdtGJLs5g24KrwZDzfYu8TohUhw";
// Production
// "qSoMeRfipBJKxO5scwhBD4BtQBG7OQt2QJnLWXYTzWiEjgsWQhBpEBB562RjbSQvjBSkYtA2GSRvrzpAAD4bhi8jqXvsmJSEUyrsewZM3Nb7eAsMI3tZfnfqLValgoHH"

const getSSOClientId = () => {
  if (window.location.hostname === 'localhost') {
    return "ZVbuUG5DsHzMgswa5Kb7zp2nHn0ZKiRSA8U2IGN1";
  }
  if (window.location.hostname === 'dev-safety.pace-os.com') {
    return "yVgvwzSwoYhk0AM2s7XFkr7fbVYK5ZET9JwP5lOo";
  }
  if (window.location.hostname === 'stage-safety.pace-os.com.s3-website-eu-west-1.amazonaws.com') {
    return "";
  }
  if (window.location.hostname === 'safety.pace-os.com.s3-website-eu-west-1.amazonaws.com') {
    return "bls6JqU6D6T2FlbSZdwzu7qV38KoTcSIWM6O7e8Q";
  }
  if (window.location.hostname === 'safety.pace-os.com') {
    return "bls6JqU6D6T2FlbSZdwzu7qV38KoTcSIWM6O7e8Q";
  }
}
export const SSO_CLIENT_ID = getSSOClientId()
// Dev
// "OM6yGoy2rZX5q6dEvVSUczRHloWnJ5MeusAQmPfq";
// Production
// "jk4vO5RRIi4SqNaLRPpBrAGNbv1KxaO6wetU70qm"

// Redirect login api if login is not.
export const LOGIN_URL = `${SSO_URL}/api/v1/user/auth/authorize/?client_id=${SSO_CLIENT_ID}&client_secret=${SSO_CLIENT_SECRET}&response_type=code`;
export const LOGOUT_URL = `${SSO_URL}/user/logout/?client_id=${SSO_CLIENT_ID}`;


const getUrl = () => {
  if (localStorage.getItem('userDetails') != null && localStorage.getItem('projectName') != null) {
    let user = JSON.parse(localStorage.getItem('userDetails'))
    let comp = JSON.parse(localStorage.getItem('company')).fkCompanyId
    let apiDomain = user
      .companies
      .filter(company => company.companyId == comp)[0]
      .subscriptions
      .filter(subscription => subscription.appCode == "safety")[0]
      .hostings[0].apiDomain


    // api.defaults.baseURL = apiDomain

  }

  return ""
}

export const API_URL = getUrl()


export const ACCOUNT_API_URL = getSSOUrl() + '/'
// Dev
// "https://dev-accounts-api.paceos.io/"
// Production
// "https://accounts.pace-os.com/"


export const access_token = localStorage.getItem("access_token");
export const access_token_action = localStorage.getItem("access_token_action");
export const API_VERSION = "api/v1/"
export const SELF_API = ACCOUNT_API_URL + "api/v1/user/self/";

// Header authenticatuon
export const HEADER_AUTH = { Authorization: `Bearer ${access_token}` };

// Header authenticatuon
export const HEADER_AUTH_ACTION = { Authorization: `Bearer ${access_token_action}` };

// Menu file constants
export const APPCODE = "safety"
export const adminUser_Dev = "Supervisor"
export const adminUser_Prod = "Safety Admin"

// comment constant
export const COMMENT = "Comments"

// user details
export const projectId =
  JSON.parse(localStorage.getItem("projectName")) !== null
    ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
    : null;

export const companyId =
  JSON.parse(localStorage.getItem("company")) !== null
    ? JSON.parse(localStorage.getItem("company")).fkCompanyId
    : null;

export const userId = JSON.parse(localStorage.getItem('userDetails')) !== null
  ? JSON.parse(localStorage.getItem('userDetails')).id
  : null;

export const userName = JSON.parse(localStorage.getItem('userDetails')) !== null
  ? JSON.parse(localStorage.getItem('userDetails')).name
  : null;

export const INITIAL_NOTIFICATION_FORM = {
  'Incident details': `/incident/${localStorage.getItem('fkincidentId')}/modify/`,
  'People affected': `/incident/${localStorage.getItem('fkincidentId')}/modify/peoples-afftected/`,
  'Property/Material affected': `/incident/${localStorage.getItem('fkincidentId')}/modify/property-affected/`,
  'Equipment affected': `/incident/${localStorage.getItem('fkincidentId')}/modify/equipment-affected/`,
  'Environment impact': `/incident/${localStorage.getItem('fkincidentId')}/modify/environment-affected/`,
  'Reporting and notification': `/incident/${localStorage.getItem('fkincidentId')}/modify/reporting-and-notification/`,
};

export const INITIAL_NOTIFICATION_FORM_NEW = {
  'Incident details': '/incident/new/',
  'People affected': `/incident/${localStorage.getItem('fkincidentId')}/peoples-afftected/new/`,
  'Property affected': `/incident/${localStorage.getItem('fkincidentId')}/property-affected/new/`,
  'Equipment affected': `/incident/${localStorage.getItem('fkincidentId')}/equipment-affected/new/`,
  'Environment impact': `/incident/${localStorage.getItem('fkincidentId')}/environment-affected/new/`,
  'Reporting and notification': `/incident/${localStorage.getItem('fkincidentId')}/reporting-and-notification/new/`,
};

export const EVIDENCE_FORM = {
  Evidences: `/app/incident-management/registration/evidence/evidence/${localStorage.getItem(
    'fkincidentId'
  )}`,
  'Activity details': `/app/incident-management/registration/evidence/activity-detail/${localStorage.getItem(
    'fkincidentId'
  )}`,
  'Personal and PPE details': `/app/incident-management/registration/evidence/personal-and-ppedetails/${localStorage.getItem(
    'fkincidentId'
  )}`,
  'Additional details': `/app/incident-management/registration/evidence/additional-details/${localStorage.getItem(
    'fkincidentId'
  )}`,
};

export const INVESTIGATION_FORM = {
  'Investigation overview':
    '/app/incident-management/registration/investigation/investigation-overview/',
  'Severity consequences':
    '/app/incident-management/registration/investigation/severity-consequences/',
  'Worker details':
    `/app/incident-management/registration/investigation/worker-details/0/${localStorage.getItem('fkincidentId')}`,
  'Event details':
    '/app/incident-management/registration/investigation/event-details/',

};

export const ROOT_CAUSE_ANALYSIS_FORM = {
  'RCA Details':
    '/app/incident-management/registration/root-cause-analysis/details/',
  'Hazardous acts':
    '/app/incident-management/registration/root-cause-analysis/hazardious-acts/',
  'Hazardous conditions':
    '/app/incident-management/registration/root-cause-analysis/hazardious-condtions/',
  'Corrective actions':
    '/app/incident-management/registration/root-cause-analysis/cause-and-action/',
  'Basic cause':
    '/app/incident-management/registration/root-cause-analysis/basic-cause/',
  'Management control':
    '/app/incident-management/registration/root-cause-analysis/pace-management/',
  'Preventive actions':
    '/app/incident-management/registration/root-cause-analysis/basic-cause-and-action/',
  'Additional information':
    '/app/incident-management/registration/root-cause-analysis/management-control/',
  'Cause analysis':
    '/app/incident-management/registration/root-cause-analysis/root-cause-analysis/',
  'Five Why analysis':
    '/app/incident-management/registration/root-cause-analysis/why-analysis/',
};

export const DETAILS = {
  'RCA Details':
    '/app/incident-management/registration/root-cause-analysis/details/',
};

export const SUMMERY_FORM = {
  Summary: '/incident/details/',
};

export const LESSION_LEARNED_FORM = {
  'Lessons learnt':
    '/app/incident-management/registration/lession-learned/lession-learned/',
};
export const CLOSE_OUT_FORM = {
  'Close out':
    '/app/incident-management/registration/close-out/',
};

export const FORM_HEADER = {
  'Initial Notification':
    '/app/incident-management/registration/initial-notification/incident-details/',
  Investigation:
    '/app/incident-management/registration/investigation/initial-details/',
  'Evidence Collection':
    '/app/incident-management/registration/evidence/evidence/',
  'Cause analysis':
    '/app/incident-management/registration/root-cause-analysis/details/',
  Summary: '/app/incident-management/registration/summary/summary/',
  'Lession Learned':
    '/app/incident-management/registration/lession-learned/lession-learned/',
};

export const HAZARDIOUS_ACTS_SUB_TYPES = [
  'Supervision',
  'workPackage',
  'equipmentMachinery',
  'behaviourIssue',
  'safetyIssues',
  'ergonimics',
  'procedures',
  'otherActs',
];

export const HAZARDIOUS_CONDITION_SUB_TYPES = [
  'warningSystem',
  'energyTypes',
  'tools',
  'safetyItems',
  'othersConditions',
];

export const BASIC_CAUSE_SUB_TYPES = [
  'personal',
  'wellnessFactors',
  'othersHumanFactors',
  'leadership',
  'processes',
  'otherIssues',
  'othersJobFactors',
];

export const PACE_MANAGEMENT_CONTROL_SUB_TYPES = [
  'ProActiveManagement',
  'Assessments',
  'Compilance',
  'Engagement',
];

// hide array

export const FIVEWHYHIDE = [
  'Hazardous acts',
  'Hazardous conditions',
  'Corrective actions',
  'Basic cause',
  'Management control',
  'Preventive actions',
  'Additional information',
  'Cause analysis',
];

export const PACEHIDE = [
  'Cause analysis', 'Five Why analysis'
];

export const ROOTHIDE = [
  'Hazardous acts',
  'Hazardous conditions',
  'Corrective actions',
  'Basic cause',
  'Management control',
  'Preventive actions',
  'Additional information',
  'Five Why analysis'
];

// option in root cause and anlysis

export const SUPERVISON = [
  'No Supervision at Work Site',
  'Lack of Communication Between Supervisor & Workers',
  'Lack of Management of Change Processes - (Failure to Manage Change)',
];

export const EQUIMENTMACHINARY = [
  'Operating Machinery - Mobile Equipment Without  Permission',
  'Operating at Excessive Speed / Over speed / Above Set Limits - Without Authority',
  'Using a Non functioning / Defective / Out of Order Machinery / Equip',
  'Using Equipment Beyond Limits Company Policy or Manufacturer Recommendations',
  'Working on Equipment / Machinery While in Operation',
];

export const SAFETYITEMS = [
  'Misuse of PPE',
  'Failure to Conduct Risk Assessment - JHA / FLHA / Workplace Observation',
  'Failure to Inspect – Pre Job Inspection / FLHA',
  'Failure to Activate Safety Critical Devices',
];

export const PROCEDURES = [
  'Failure to Follow Standards- Procedures or Guidelines',
  'No or Improper Securing Devices Used',
  'Wrong Loading - Lifting or Improper Placement Techniques Used',
];

export const WORKPACKAGE = [
  'Work Package Incomplete',
  'Work Package Not Available',
];

export const BEHAVIOURISSUES = [
  'Fighting or Being Bullied at Work Place',
  'Under the Influence of Drug or Alcohol',
  'Physical or Mental Stress',
  'Complacent Behavior(Worker/Supervisor)',
  'Intentional Harmfully Act',
];

export const ERGONOMICS = [
  'Poor Posture',
  'Poor Lifting Techniques',
  'Repetitious Movements',
  'Over Reaching',
];

export const WARNINGSYSTEM = [
  'No Visual Warning Signs at Point of Operation',
  'Warning Labels Faded not Legible',
  'Warning Devices not Functioning',
  'No Caution Signs - Barriers - Guards - Traffic Signs & Signals',
  'Lack of Visual or  Audible signs',
];

export const TOOLS = [
  'Wrong Tool for the Job',
  'Using Home Made Tools',
  'Worn Out Tools - Material  or Improperly Cared for Equipment',
  'Wrong Equipment for the Job',
];

export const CONDITIONSAFETYITEMS = [
  'Inadequate PPE for Specific Hazards',
  'Defective PPE',
  'Bypassing Safety Critical Devices',
  'Poor Housekeeping - Untidy or Congested Areas',
  'Improper Storage – (Flammable Material Close to Ignition Sources etc.)',
  'Combustible Dusts - Chemical Fumes- Mists- Smoke',
  'Inadequate Ventilation',
  'Poor Lighting - Wrong Type of Lighting - Glare',
];

export const ENERGIES = [
  'Kinetic Energy',
  'Potential Energy',
  'Thermal Energy',
  'Electrical Energy',
  'Chemical Energy',
  'Nuclear Energy',
  'Radiation Energy',
  'Gravitational energy',
  'Pressure',
  'Hydraulic Energy',
  'Pneumatic Energy',
  'Temperature',
  'Sound',
];

export const PERSONAL = [
  'Physical Limitation',
  'Not Engaged Psychological',
  'Personal Stress',
  'Under the Influence of Illicit Substances',
  'Multitasking',
  'Lack of Training or Knowledge',
  'Lack of Competency or Skill',
  'Complacent Behavior – No Accountability',
  'Adequate Skill/Knowledge – But  took Short Cut',
  'Done it Wrong Previously Without Consequences',
  'Operational Discipline Not Followed',
  'Company Risk Tolerance',
  'Personal Risk Tolerance',
];

export const PERSONALWELNESSFACTORS = [
  'Lack of Rest- Working Long Hours (Overtime)',
  'Relationship Issues',
  'Financial Difficulties',
  'Peer Pressure',
  'Time Constraints',
  'Personal or Family Medical Issues',
];

export const LEADERSHIP = [
  'Work Package Incomplete',
  'Work Package Not Available',
  'Fighting or Being Bullied at Work Place',
  'Under the Influence of Drug or Alcohol',
  'Physical or Mental Stress',
  'Complacent Behavior(Worker / Supervisor)',
  'Intentional Harmfully Act',
];

export const PROCESSES = [
  'Poor Posture',
  'Poor Lifting Techniques',
  'Repetitious Movements',
  'Over Reaching',
  'No or Improper Securing Devices Used',
  'Wrong Loading- Lifting or Improper Placement Techniques Used',
];

export const OTHERISSUES = [
  'Equipment wear and tear',
  'Poor quality tools – wear & tear',
  'Wrong calibration',
  'Lack of quality or safety audits & Inspections',
  'Failed to follow corrective actions from previous incidents',
  'Abuse or misuse – Cultural issue',
];

export const MANAGEMENTCONTROL = [
  'Inadequate System',
  'Inadequate Standards',
  'Inadequate Compilance and Standards',
];

export const RCAOPTION = [
  'Five why analysis',
  'PACE cause analysis',
  'Cause analysis',
];

export const HIGHESTPOTENTIALIMPACTOR = [
  'Health and safety',
  'Environment',
  'Regulatory',
  'Reputaion',
  'Financial',
];

export const PROACTIVEMANAGEMENT = [
  'Poor understanding of company Values, Mission and Vision',
  'Improvement required in Company policies, Standards, procedures & guidance',
  'Improvement required in organizational readiness(Lack of Competent People & Processes)',
  'Inadequate technology and processes',
  'Lack of timely and factual data based decisions',
  'Improvement required in communication processes',
  'Improvement required in work management system - Work permits, work direction',
];

export const ASSESSMENTS = [
  'Lack of  Quality control and HSE  audits, inspections',
  'Lack of knowledge and competency assessments',
  'Lack of management system audits',
  'Corrective actions reverse analysis – effectiveness assessment',
  'Lack of Risk Assessment processes',
];

export const COMPILANCE = [
  'Not following company policies and standards',
  'Not meeting regulatory requirements',
  'Not following the manufacturer recommendations',
  'Lack of Operational Discipline – non compliance with procedures, polices etc.',
];

export const ENGAGEMENT = [
  'Leadership engagement needs improvement',
  'Poor reward and recognition',
  'Delay / withholding information',
];

// AHA Route
export const AHA = {
  'Project Details': '/app/pages/aha/assessments/project-details',
  'Project Area Hazards': '/app/pages/aha/assessments/project-area-hazards',
  Assessment: '/app/pages/aha/assessments/assessment',
  'Documents & Notifications': '/app/pages/aha/assessments/DocumentsNotifications'
};