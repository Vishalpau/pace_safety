/* eslint-disable */

import React from 'react';
import Loading from 'dan-components/Loading';
import loadable from '../utils/loadable';

// Landing Page
export const HomePage = loadable(() =>
  import('./LandingPage/HomePage'), {
  fallback: <Loading />,
});
export const SliderPage = loadable(() =>
  import('./LandingPage/SliderPage'), {
  fallback: <Loading />,
});
export const BlogHome = loadable(() =>
  import('./Pages/Blog'), {
  fallback: <Loading />,
});
export const Article = loadable(() =>
  import('./Pages/Blog/Article'), {
  fallback: <Loading />,
});

// Dashboard
export const PersonalDashboard = loadable(() =>
  import('./Dashboard/PersonalDashboard'), {
  fallback: <Loading />,
});
export const CrmDashboard = loadable(() =>
  import('./Dashboard/CrmDashboard'), {
  fallback: <Loading />,
});
export const CryptoDashboard = loadable(() =>
  import('./Dashboard/CryptoDashboard'), {
  fallback: <Loading />,
});

// Widgets
export const Infographics = loadable(() =>
  import('./Widgets/Infographics'), {
  fallback: <Loading />,
});
export const MiniApps = loadable(() =>
  import('./Widgets/MiniApps'), {
  fallback: <Loading />,
});
export const Analytics = loadable(() =>
  import('./Widgets/Analytics'), {
  fallback: <Loading />,
});
export const InfoUpdates = loadable(() =>
  import('./Widgets/InfoUpdates'), {
  fallback: <Loading />,
});
export const Status = loadable(() =>
  import('./Widgets/Status'), {
  fallback: <Loading />,
});

// Layouts
export const AppLayout = loadable(() =>
  import('./Layouts/AppLayout'), {
  fallback: <Loading />,
});
export const Responsive = loadable(() =>
  import('./Layouts/Responsive'), {
  fallback: <Loading />,
});
export const Grid = loadable(() =>
  import('./Layouts/Grid'), {
  fallback: <Loading />,
});

// Tables
export const SimpleTable = loadable(() =>
  import('./Tables/BasicTable'), {
  fallback: <Loading />,
});
export const AdvancedTable = loadable(() =>
  import('./Tables/AdvancedTable'), {
  fallback: <Loading />,
});
export const TreeTable = loadable(() =>
  import('./Tables/TreeTable'), {
  fallback: <Loading />,
});
export const EditableCell = loadable(() =>
  import('./Tables/EditableCell'), {
  fallback: <Loading />,
});
export const TablePlayground = loadable(() =>
  import('./Tables/TablePlayground'), {
  fallback: <Loading />,
});

// Forms
export const ReduxForm = loadable(() =>
  import('./Forms/ReduxForm'), {
  fallback: <Loading />,
});
export const DateTimePicker = loadable(() =>
  import('./Forms/DateTimePicker'), {
  fallback: <Loading />,
});
export const CheckboxRadio = loadable(() =>
  import('./Forms/CheckboxRadio'), {
  fallback: <Loading />,
});
export const Switches = loadable(() =>
  import('./Forms/Switches'), {
  fallback: <Loading />,
});
export const Selectbox = loadable(() =>
  import('./Forms/Selectbox'), {
  fallback: <Loading />,
});
export const Rating = loadable(() =>
  import('./Forms/Rating'), {
  fallback: <Loading />,
});
export const SliderRange = loadable(() =>
  import('./Forms/SliderRange'), {
  fallback: <Loading />,
});
export const Buttons = loadable(() =>
  import('./Forms/Buttons'), {
  fallback: <Loading />,
});
export const ToggleButton = loadable(() =>
  import('./Forms/ToggleButton'), {
  fallback: <Loading />,
});
export const DialButton = loadable(() =>
  import('./Forms/DialButton'), {
  fallback: <Loading />,
});
export const Textbox = loadable(() =>
  import('./Forms/Textbox'), {
  fallback: <Loading />,
});
export const Autocomplete = loadable(() =>
  import('./Forms/Autocomplete'), {
  fallback: <Loading />,
});
export const TextEditor = loadable(() =>
  import('./Forms/TextEditor'), {
  fallback: <Loading />,
});
export const Upload = loadable(() =>
  import('./Forms/Upload'), {
  fallback: <Loading />,
});

// UI Components
export const Badges = loadable(() =>
  import('./UiElements/Badges'), {
  fallback: <Loading />,
});
export const Avatars = loadable(() =>
  import('./UiElements/Avatars'), {
  fallback: <Loading />,
});
export const Accordion = loadable(() =>
  import('./UiElements/Accordion'), {
  fallback: <Loading />,
});
export const List = loadable(() =>
  import('./UiElements/List'), {
  fallback: <Loading />,
});
export const PopoverTooltip = loadable(() =>
  import('./UiElements/PopoverTooltip'), {
  fallback: <Loading />,
});
export const Snackbar = loadable(() =>
  import('./UiElements/Snackbar'), {
  fallback: <Loading />,
});
export const Typography = loadable(() =>
  import('./UiElements/Typography'), {
  fallback: <Loading />,
});
export const Tabs = loadable(() =>
  import('./UiElements/Tabs'), {
  fallback: <Loading />,
});
export const Cards = loadable(() =>
  import('./UiElements/Cards'), {
  fallback: <Loading />,
});
export const ImageGrid = loadable(() =>
  import('./UiElements/ImageGrid'), {
  fallback: <Loading />,
});
export const Progress = loadable(() =>
  import('./UiElements/Progress'), {
  fallback: <Loading />,
});
export const DialogModal = loadable(() =>
  import('./UiElements/DialogModal'), {
  fallback: <Loading />,
});
export const Steppers = loadable(() =>
  import('./UiElements/Steppers'), {
  fallback: <Loading />,
});
export const DrawerMenu = loadable(() =>
  import('./UiElements/DrawerMenu'), {
  fallback: <Loading />,
});
export const Paginations = loadable(() =>
  import('./UiElements/Paginations'), {
  fallback: <Loading />,
});
export const Breadcrumbs = loadable(() =>
  import('./UiElements/Breadcrumbs'), {
  fallback: <Loading />,
});
export const Icons = loadable(() =>
  import('./UiElements/Icons'), {
  fallback: <Loading />,
});
export const IonIcons = loadable(() =>
  import('./UiElements/IonIcons'), {
  fallback: <Loading />,
});
export const SliderCarousel = loadable(() =>
  import('./UiElements/SliderCarousel'), {
  fallback: <Loading />,
});
export const Tags = loadable(() =>
  import('./UiElements/Tags'), {
  fallback: <Loading />,
});
export const Dividers = loadable(() =>
  import('./UiElements/Dividers'), {
  fallback: <Loading />,
});

// Chart
export const LineCharts = loadable(() =>
  import('./Charts/LineCharts'), {
  fallback: <Loading />,
});
export const BarCharts = loadable(() =>
  import('./Charts/BarCharts'), {
  fallback: <Loading />,
});
export const AreaCharts = loadable(() =>
  import('./Charts/AreaCharts'), {
  fallback: <Loading />,
});
export const PieCharts = loadable(() =>
  import('./Charts/PieCharts'), {
  fallback: <Loading />,
});
export const RadarCharts = loadable(() =>
  import('./Charts/RadarCharts'), {
  fallback: <Loading />,
});
export const ScatterCharts = loadable(() =>
  import('./Charts/ScatterCharts'), {
  fallback: <Loading />,
});
export const CompossedCharts = loadable(() =>
  import('./Charts/CompossedCharts'), {
  fallback: <Loading />,
});
export const DoughnutCharts = loadable(() =>
  import('./Charts/DoughnutCharts'), {
  fallback: <Loading />,
});
export const BarDirection = loadable(() =>
  import('./Charts/BarDirection'), {
  fallback: <Loading />,
});
export const LineScatterChart = loadable(() =>
  import('./Charts/LineScatterChart'), {
  fallback: <Loading />,
});
export const AreaFilledChart = loadable(() =>
  import('./Charts/AreaFilledChart'), {
  fallback: <Loading />,
});
export const RadarPolarCharts = loadable(() =>
  import('./Charts/RadarPolarCharts'), {
  fallback: <Loading />,
});

// Pages
export const Login = loadable(() =>
  import('./Pages/Users/Login'), {
  fallback: <Loading />,
});
export const LoginV2 = loadable(() =>
  import('./Pages/Users/LoginV2'), {
  fallback: <Loading />,
});
export const LoginV3 = loadable(() =>
  import('./Pages/Users/LoginV3'), {
  fallback: <Loading />,
});
export const Register = loadable(() =>
  import('./Pages/Users/Register'), {
  fallback: <Loading />,
});
export const RegisterV2 = loadable(() =>
  import('./Pages/Users/RegisterV2'), {
  fallback: <Loading />,
});
export const RegisterV3 = loadable(() =>
  import('./Pages/Users/RegisterV3'), {
  fallback: <Loading />,
});
export const ComingSoon = loadable(() =>
  import('./Pages/ComingSoon'), {
  fallback: <Loading />,
});
export const Profile = loadable(() =>
  import('./Pages/UserProfile'), {
  fallback: <Loading />,
});
export const Timeline = loadable(() =>
  import('./SampleApps/Timeline'), {
  fallback: <Loading />,
});
export const BlankPage = loadable(() =>
  import('./Pages/BlankPage'), {
  fallback: <Loading />,
});
export const Incident = loadable(() =>
  import('./Pages/Incident'), {
  fallback: <Loading />,
})
export const Pricing = loadable(() =>
  import('./Pages/Pricing'), {
  fallback: <Loading />,
});
export const Ecommerce = loadable(() =>
  import('./SampleApps/Ecommerce'), {
  fallback: <Loading />,
});
export const ProductPage = loadable(() =>
  import('./SampleApps/Ecommerce/ProductPage'), {
  fallback: <Loading />,
});
export const CheckoutPage = loadable(() =>
  import('./SampleApps/Ecommerce/CheckoutPage'), {
  fallback: <Loading />,
});
export const Contact = loadable(() =>
  import('./SampleApps/Contact'), {
  fallback: <Loading />,
});
export const ResetPassword = loadable(() =>
  import('./Pages/Users/ResetPassword'), {
  fallback: <Loading />,
});
export const LockScreen = loadable(() =>
  import('./Pages/Users/LockScreen'), {
  fallback: <Loading />,
});
export const Chat = loadable(() =>
  import('./SampleApps/Chat'), {
  fallback: <Loading />,
});
export const Email = loadable(() =>
  import('./SampleApps/Email'), {
  fallback: <Loading />,
});
export const Photos = loadable(() =>
  import('./Pages/Photos'), {
  fallback: <Loading />,
});
export const Calendar = loadable(() =>
  import('./SampleApps/Calendar'), {
  fallback: <Loading />,
});
export const TaskBoard = loadable(() =>
  import('./SampleApps/TaskBoard'), {
  fallback: <Loading />,
});
export const Invoice = loadable(() =>
  import('./SampleApps/Invoice'), {
  fallback: <Loading />,
});

// Maps
export const MapMarker = loadable(() =>
  import('./Maps/MapMarker'), {
  fallback: <Loading />,
});
export const MapDirection = loadable(() =>
  import('./Maps/MapDirection'), {
  fallback: <Loading />,
});
export const SearchMap = loadable(() =>
  import('./Maps/SearchMap'), {
  fallback: <Loading />,
});
export const TrafficIndicator = loadable(() =>
  import('./Maps/TrafficIndicator'), {
  fallback: <Loading />,
});
export const StreetViewMap = loadable(() =>
  import('./Maps/StreetViewMap'), {
  fallback: <Loading />,
});

// Other
export const NotFound = loadable(() =>
  import('./NotFound/NotFound'), {
  fallback: <Loading />,
});
export const NotFoundDedicated = loadable(() =>
  import('./Pages/Standalone/NotFoundDedicated'), {
  fallback: <Loading />,
});
export const Error = loadable(() =>
  import('./Pages/Error'), {
  fallback: <Loading />,
});
export const Maintenance = loadable(() =>
  import('./Pages/Maintenance'), {
  fallback: <Loading />,
});
export const Parent = loadable(() =>
  import('./Parent'), {
  fallback: <Loading />,
});
export const Settings = loadable(() =>
  import('./Pages/Settings'), {
  fallback: <Loading />,
});
export const HelpSupport = loadable(() =>
  import('./Pages/HelpSupport'), {
  fallback: <Loading />,
});

// form initialNotification

export const EnvironmentAffected = loadable(() =>
  import('./Forms/InitialNotification/EnvironmentAffected'), {
  fallback: <Loading />,
});

export const EqiptmentAffected = loadable(() =>
  import('./Forms/InitialNotification/EqiptmentAffected'), {
  fallback: <Loading />,
});

export const IncidentDetails = loadable(() =>
  import('./Forms/InitialNotification/IncidentDetails'), {
  fallback: <Loading />,
});


export const PeoplesAfftected = loadable(() =>
  import('./Forms/InitialNotification/PeoplesAfftected'), {
  fallback: <Loading />,
});

export const PropertyAffected = loadable(() =>
  import('./Forms/InitialNotification/PropertyAffected'), {
  fallback: <Loading />,
});

export const ReportingAndNotification = loadable(() =>
  import('./Forms/InitialNotification/ReportingAndNotification'), {
  fallback: <Loading />,
});


// form Evidence

export const ActivityDetail = loadable(() =>
  import('./Forms/Evidence/ActivityDetail'), {
  fallback: <Loading />,
});

export const AdditionalDetails = loadable(() =>
  import('./Forms/Evidence/AdditionalDetails'), {
  fallback: <Loading />,
});

export const Evidence = loadable(() =>
  import('./Forms/Evidence/Evidence'), {
  fallback: <Loading />,
});

export const PersonalAndPpeDetails = loadable(() =>
  import('./Forms/Evidence/PersonalAndPpeDetails'), {
  fallback: <Loading />,
});

// form investigation

export const ActionTaken = loadable(() =>
  import('./Forms/Investigation/ActionTaken'), {
  fallback: <Loading />,
});

export const EventDetails = loadable(() =>
  import('./Forms/Investigation/EventDetails'), {
  fallback: <Loading />,
});

export const InvestigationOverview = loadable(() =>
  import('./Forms/Investigation/InvestigationOverview'), {
  fallback: <Loading />,
});

export const WorkerDetails = loadable(() =>
  import('./Forms/Investigation/WorkerDetails'), {
  fallback: <Loading />,
});

export const SeverityConsequences = loadable(() =>
  import('./Forms/Investigation/Severityconsequences'), {
  fallback: <Loading />,
});


// form root cause analysis

export const BasicCause = loadable(() =>
  import('./Forms/RootCauseAnalysis/BasicCause'), {
  fallback: <Loading />,
});

export const BasicCauseAndAction = loadable(() =>
  import('./Forms/RootCauseAnalysis/BasicCauseAndAction'), {
  fallback: <Loading />,
});

export const CauseAndAction = loadable(() =>
  import('./Forms/RootCauseAnalysis/CauseAndAction'), {
  fallback: <Loading />,
});

export const ManagementControl = loadable(() =>
  import('./Forms/RootCauseAnalysis/CorrectiveActions'), {
  fallback: <Loading />,
});

export const Details = loadable(() =>
  import('./Forms/RootCauseAnalysis/Details'), {
  fallback: <Loading />,
});

export const HazardiousActs = loadable(() =>
  import('./Forms/RootCauseAnalysis/HazardiousActs'), {
  fallback: <Loading />,
});

export const HazardiousCondtions = loadable(() =>
  import('./Forms/RootCauseAnalysis/HazardiousCondtions'), {
  fallback: <Loading />,
});

export const RootCauseAnalysis = loadable(() =>
  import('./Forms/RootCauseAnalysis/RootCauseAnalysis'), {
  fallback: <Loading />,
});

export const PaceManagement = loadable(() =>
  import('./Forms/RootCauseAnalysis/PaceManagement'), {
  fallback: <Loading />,
});

export const WhyAnalysis = loadable(() =>
  import('./Forms/RootCauseAnalysis/WhyAnalysis'), {
  fallback: <Loading />,
});


// form summary

export const Summary = loadable(() =>
  import('./Forms/Summary/Summary'), {
  fallback: <Loading />,
});

// form lession learned

export const LessionLearned = loadable(() =>
  import('./Forms/LessonLearned/LessonLearned'), {
  fallback: <Loading />,
});

// form lession learned

export const CloseOut = loadable(() =>
  import('./Forms/CloseOut/CloseOut'), {
  fallback: <Loading />,
});

// Observations 

export const Observations = loadable(() => import("./Pages/Observations/Observations_main"), {
  fallback: <Loading />,
});

export const ObservationSummary = loadable(() => import("./Pages/Observations/ObservationSummary"), {
  fallback: <Loading />,
});

export const ObservationInitialNotification = loadable(() => import("./Pages/Observations/ObservationInitialNotification"), {
  fallback: <Loading />,
});

export const ObservationInitialNotificationView = loadable(() => import("./Pages/Observations/ObservationInitialNotificationView"), {
  fallback: <Loading />,
});

export const ObservationCorrectiveAction = loadable(() => import("./Pages/Observations/ObservationCorrectiveAction"), {
  fallback: <Loading />,
});



export const ObservationInitialNotificationUpdate = loadable(() => import("./Pages/Observations/ObservationInitialNotificationUpdate"), {
  fallback: <Loading />,
});

export const ObservationBulkupload = loadable(() => import("./Pages/Observations/ObservationBulkupload"), {
  fallback: <Loading />,
});

export const ObservationUploadScreen = loadable(() => import("./Pages/Observations/ObservationUploadScreen"), {
  fallback: <Loading />,
});

// checklist

export const CheckList = loadable(() =>
  import("./Pages/CheckList/CheckList.js"), {
  fallback: <Loading />,
});

export const Groups = loadable(() =>
  import("./Pages/CheckList/Groups.js"), {
  fallback: <Loading />,
});

export const Options = loadable(() =>
  import("./Pages/CheckList/Options.js"), {
  fallback: <Loading />,
});
export const Prints = loadable(() => import("./Print/Prints"), {
  fallback: <Loading />,
});

export const GeneralObservationPrints = loadable(() => import("./SampleApps/GeneralObservationPrints"), {
  fallback: <Loading />,
});

// Aha    
export const AhaMain = loadable(() => import("./Pages/Aha/AhaMain"), {
  fallback: <Loading />,
});

export const AhaSummary = loadable(() => import("./Pages/Aha/AhaSummary"), {
  fallback: <Loading />,
});

export const ProjectDetailsAndHazard = loadable(() => import("./Pages/Aha/Assessments/ProjectDetailsAndHazard"), {
  fallback: <Loading />,
});

export const AhaCloseOut = loadable(() => import("./Pages/Aha/CloseOut/CloseOut"), {
  fallback: <Loading />,
});

export const AssessmentAndNotification = loadable(() => import("./Pages/Aha/Assessments/AssessmentAndNotification"), {
  fallback: <Loading />,
});

export const Approvals = loadable(() => import("./Pages/Aha/Approvals/Approvals"), {
  fallback: <Loading />,
});

export const LessonsLearned = loadable(() => import("./Pages/Aha/LessonsLearned/LessonsLearned"), {
  fallback: <Loading />,
});

export const Setting = loadable(() => import("./Settings/Setting"), {
  fallback: <Loading />,
});

export const Comments = loadable(() => import("./Comments/Comments"), {
  fallback: <Loading />,
});

// Jha

export const JhaMain = loadable(() => import("./Pages/Jha/JhaMain"), {
  fallback: <Loading />,
});

export const JhaSummary = loadable(() => import("./Pages/Jha/JhaSummary"), {
  fallback: <Loading />,
});

export const JhaJobDetailHazard = loadable(() => import("./Pages/Jha/Assessments/JobDetailHazard"), {
  fallback: <Loading />,
});

export const JhaAssessmentAndDocument = loadable(() => import("./Pages/Jha/Assessments/AssessmentAndDocument"), {
  fallback: <Loading />,
});

export const JhaApprovals = loadable(() => import("./Pages/Jha/Approvals/Approvals"), {
  fallback: <Loading />,
});

export const JhaLessonsLearned = loadable(() => import("./Pages/Jha/LessonsLearned/LessonsLearned"), {
  fallback: <Loading />,
});

export const JhaCloseOut = loadable(() => import("./Pages/Jha/CloseOut/CloseOut"), {
  fallback: <Loading />,
});

export const ShowGroup = loadable(() =>
  import("./Pages/CheckList/ShowGroups"), {
  fallback: <Loading />,
});

export const ShowCheckList = loadable(() =>
  import("./Pages/CheckList/ShowCheckList"), {
  fallback: <Loading />,
});

// Picklist

export const Picklist = loadable(() => import("./Pages/Picklist/index "), {
  fallback: <Loading />,
});
export const PicklistValue = loadable(() => import("./Pages/Picklist/values"), {
  fallback: <Loading />,
});


// XFLHA

export const Xflha = loadable(() => import("./Pages/Assesments/Xflha"), {
  fallback: <Loading />,
});

export const FlhaSummary = loadable(() => import("./Pages/Assesments/FlhaSummary"), {
  fallback: <Loading />,
});

export const PreventiveControls = loadable(() => import("./Pages/Assesments/PreventiveControls"), {
  fallback: <Loading />,
});

export const FlhaAdd = loadable(() => import("./Pages/Assesments/FlhaAdd"), {
  fallback: <Loading />,
});

export const FlhaEdit = loadable(() => import("./Pages/Assesments/FlhaEdit"), {
  fallback: <Loading />,
});

export const FlhaActivities = loadable(() => import("./Pages/Assesments/ActivityHistory"), {
  fallback: <Loading />,
});

export const FlhaComments = loadable(() => import("./Pages/Assesments/Comments"), {
  fallback: <Loading />,
});

export const FlhaRevision = loadable(() => import("./Pages/Assesments/FlhaRevision"), {
  fallback: <Loading />,
});

export const IsolationControl = loadable(() => import("./Pages/Assesments/IsolationControl"), {
  fallback: <Loading />,
});

export const EnergyControl = loadable(() => import("./Pages/Assesments/EnergyControl"), {
  fallback: <Loading />,
});

export const AuditCheck = loadable(() => import("./Pages/Assesments/AuditCheck"), {
  fallback: <Loading />,
});

export const AssessmentCloseOut = loadable(() => import("./Pages/Assesments/CloseOut"), {
  fallback: <Loading />,
});

export const PrintFlha = loadable(() => import("./Pages/Assesments/PrintFlha"), {
  fallback: <Loading />,
});

// XFLHA Config
// export const FlhaConfig = loadable(() => import("./pages/assesments/FlhaConfig"), {
//   fallback: <Loading />,
// });

// export const FlhaConfigAdd = loadable(() => import("./pages/assesments/FlhaConfigAdd"), {
//   fallback: <Loading />,
// });

// export const FlhaConfigCriticalTask = loadable(() => import("./pages/assesments/FlhaConfigCriticalTask"), {
//   fallback: <Loading />,
// });

// export const FlhaConfigHazard = loadable(() => import("./pages/assesments/FlhaConfigHazard"), {
//   fallback: <Loading />,
// });

export const ControlTowerIcare = loadable(() => import('./Pages/ControlTower/ControlTowerIcare'), {
  fallback: <Loading />,
});

// Compliance
export const Compliance = loadable(() => import("./Pages/Compliance/Compliance"), {
  fallback: <Loading />,
});

export const ComplianceSummary = loadable(() => import("./Pages/Compliance/ComplianceSummary"), {
  fallback: <Loading />,
});

export const ComplianceDetails = loadable(() => import("./Pages/Compliance/Compliance/ComplianceDetails"), {
  fallback: <Loading />,
});

export const Categories = loadable(() => import("./Pages/Compliance/Compliance/Categories"), {
  fallback: <Loading />,
});

export const PerformanceSummary = loadable(() => import("./Pages/Compliance/Compliance/PerformanceSummary"), {
  fallback: <Loading />,
});

export const ComplianceForm = loadable(() => import("./Pages/Compliance/Compliance/ComplianceForm"), {
  fallback: <Loading />,
});

export const Checks = loadable(() => import("./Pages/Compliance/Compliance/Checks"), {
  fallback: <Loading />,
});

export const ComplianceComment = loadable(() => import("./Pages/Compliance/List/ComplianceComment"), {
  fallback: <Loading />,
});

export const ComplianceActivity = loadable(() => import("./Pages/Compliance/List/ComplianceActivity"), {
  fallback: <Loading />,
});

export const ComplianceConfig = loadable(() => import("./ComplianceConfig/ComplianceConfig"), {
  fallback: <Loading />,
},); 

export const ComplianceConfigNewQ = loadable(() => import("./ComplianceConfig/AuditQuestions/QuestionsForm"), {
  fallback: <Loading />,
});

export const QuestionsGroup = loadable(() => import("./ComplianceConfig/AuditQuestions/QuestionsGroup"), {
  fallback: <Loading />,
});

export const Questions = loadable(() => import("./ComplianceConfig/AuditQuestions/Questions"), {
  fallback: <Loading />,
});

export const ComplianceConfigBulkUploadQ = loadable(() => import("./ComplianceConfig/AuditQuestions/BulkUploadQuestion"), {
  fallback: <Loading />,
});

export const ComplianceConfigEditQ = loadable(() => import("./ComplianceConfig/AuditQuestions/QuestionEdit"), {
  fallback: <Loading />,
});

export const ComplianceConfigViewQ = loadable(() => import("./ComplianceConfig/AuditQuestions/QuestionView"), {
  fallback: <Loading />,
});

export const PerformanceFactorAdd = loadable(() => import("./ComplianceConfig/PerformanceFactor/PerformanceFactorAdd"), {
  fallback: <Loading />,
});

export const PerformanceFactorEdit = loadable(() => import("./ComplianceConfig/PerformanceFactor/PerformanceFactorEdit"), {
  fallback: <Loading />,
});

export const PerformanceFactorView = loadable(() => import("./ComplianceConfig/PerformanceFactor/PerformanceFactorView"), {
  fallback: <Loading />,
});

export const PerformanceMatrixAdd = loadable(() => import("./ComplianceConfig/PerformanceMatrix/PerformanceMatrixAdd"), {
  fallback: <Loading />,
});

export const PerformanceMatrixEdit = loadable(() => import("./ComplianceConfig/PerformanceMatrix/PerformanceMatrixEdit"), {
  fallback: <Loading />,
});

export const PerformanceMatrixView = loadable(() => import("./ComplianceConfig/PerformanceMatrix/PerformanceMatrixView"), {
  fallback: <Loading />,
});

{/*export const Bookmarklist = loadable(() => import("./Bookmark/BookmarkList"), {
  fallback: <Loading />,
});*/}