import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { ThemeContext } from './ThemeWrapper';
import Dashboard from '../Templates/Dashboard';
{/*import BookmarkList from '../Bookmark/BookmarkList';*/}
import {
  PersonalDashboard,
  CrmDashboard,
  CryptoDashboard,
  Infographics,
  MiniApps,
  Analytics,
  InfoUpdates,
  Status,
  Parent,
  AppLayout,
  Responsive,
  Grid,
  SimpleTable,
  AdvancedTable,
  TablePlayground,
  TreeTable,
  EditableCell,
  ReduxForm,
  DateTimePicker,
  CheckboxRadio,
  Switches,
  Selectbox,
  Rating,
  SliderRange,
  Buttons,
  DialButton,
  ToggleButton,
  Textbox,
  Autocomplete,
  Upload,
  TextEditor,
  Avatars,
  Accordion,
  Badges,
  List,
  PopoverTooltip,
  Snackbar,
  Typography,
  Tabs,
  Cards,
  ImageGrid,
  Progress,
  DialogModal,
  Steppers,
  Paginations,
  DrawerMenu,
  Breadcrumbs,
  Icons,
  IonIcons,
  SliderCarousel,
  Tags,
  Dividers,
  LineCharts,
  BarCharts,
  AreaCharts,
  PieCharts,
  RadarCharts,
  ScatterCharts,
  CompossedCharts,
  DoughnutCharts,
  BarDirection,
  LineScatterChart,
  AreaFilledChart,
  RadarPolarCharts,
  Contact,
  Chat,
  Email,
  Login,
  Register,
  TaskBoard,
  Ecommerce,
  Timeline,
  Calendar,
  ProductPage,
  Invoice,
  Profile,
  BlankPage,
  Incident,
  Photos,
  Pricing,
  CheckoutPage,
  Error,
  Settings,
  HelpSupport,
  MapMarker,
  MapDirection,
  SearchMap,
  TrafficIndicator,
  StreetViewMap,
  NotFound,
  EnvironmentAffected,
  EqiptmentAffected,
  IncidentDetails,
  PeoplesAfftected,
  PropertyAffected,
  ReportingAndNotification,
  ActivityDetail,
  AdditionalDetails,
  Evidence,
  PersonalAndPpeDetails,
  ActionTaken,
  EventDetails,
  InvestigationOverview,
  WorkerDetails,
  SeverityConsequences,
  BasicCause,
  BasicCauseAndAction,
  CauseAndAction,
  ManagementControl,
  Details,
  HazardiousActs,
  HazardiousCondtions,
  RootCauseAnalysis,
  WhyAnalysis,
  Summary,
  LessionLearned,
  UpdateIncidentDetails,
  PaceManagement,
  CloseOut,
  Observations,
  ObservationSummary,
  ObservationInitialNotification,
  ObservationInitialNotificationView,
  ObservationCorrectiveAction,
  ObservationInitialNotificationUpdate,
  ObservationBulkupload,
  ObservationUploadScreen,
  CheckList,
  Groups,
  Options,
  Aha,
  AhaMain,
  AhaSummary,
  AssessmentsForms,
  ProjectDetailsAndHazard,
  AssessmentAndNotification,
  Approvals,
  LessonsLearned,
  AhaCloseOut,
  Prints,
  Setting,
  JhaMain,
  JhaSummary,
  JhaJobDetailHazard,
  JhaLessonsLearned,
  JhaAssessmentAndDocument,
  JhaApprovals,
  Comments,
  JhaCloseOut,
  ShowGroup,
  ShowCheckList,
  Picklist,
  PicklistValue,
  Xflha,
  FlhaSummary,
  FlhaAdd,
  FlhaEdit,
  PreventiveControls,
  IsolationControl,
  EnergyControl,
  AuditCheck,
  AssessmentCloseOut,
  // FlhaConfigHazard,
  // FlhaConfig,
  // FlhaConfigCriticalTask,
  // FlhaConfigAdd,
  SamplePage,
  PrintFlha,
  FlhaActivities,
  FlhaComments,
  GeneralObservationPrints,
  ControlTowerIcare,
  Compliance,
  ComplianceSummary,
  ComplianceDetails,
  Categories,
  Checks,
  PerformanceSummary,
  ComplianceForm,
  ComplianceComment,
  ComplianceActivity,
  ComplianceConfig,
  ComplianceConfigNewQ,
  QuestionsGroup,
  Questions,
  ComplianceConfigBulkUploadQ,
  ComplianceConfigEditQ,
  ComplianceConfigViewQ,
  PerformanceFactorAdd,
  PerformanceFactorEdit,
  PerformanceFactorView,
  PerformanceMatrixAdd,
  PerformanceMatrixEdit,
  PerformanceMatrixView,
} from '../pageListAsync';
// import PrintFlha from '../Pages/Assesments/PrintFlha';

function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        //settings
        <Route path="/app/settings/setting" component={Setting} />
        {/* Home */}
        {/* <Route exact path="/:?code" component={PersonalDashboard} /> */}
        <Route exact path="/" component={PersonalDashboard} />
        <Route path="/app/crm-dashboard" component={CrmDashboard} />
        <Route path="/app/crypto-dashboard" component={CryptoDashboard} />
        {/* Widgets */}
        <Route path="/app/widgets/infographics" component={Infographics} />
        <Route path="/app/widgets/status" component={Status} />
        <Route path="/app/widgets/mini-apps" component={MiniApps} />
        <Route path="/app/widgets/analytics" component={Analytics} />
        <Route path="/app/widgets/info-updates" component={InfoUpdates} />
        {/* Layout */}
        <Route exact path="/app/layouts" component={Parent} />
        <Route path="/app/layouts/grid" component={Grid} />
        <Route path="/app/layouts/app-layout" component={AppLayout} />
        <Route path="/app/layouts/responsive" component={Responsive} />
        {/* Table */}
        <Route exact path="/app/tables" component={Parent} />
        <Route path="/app/tables/basic-table" component={SimpleTable} />
        <Route path="/app/tables/data-table" component={AdvancedTable} />
        <Route
          path="/app/tables/table-playground"
          component={TablePlayground}
        />
        <Route path="/app/tables/tree-table" component={TreeTable} />
        <Route path="/app/tables/editable-cell" component={EditableCell} />
        {/* Form & Button */}
        <Route exact path="/app/forms" component={Parent} />
        <Route path="/app/forms/reduxform" component={ReduxForm} />
        <Route path="/app/forms/date-time-picker" component={DateTimePicker} />
        <Route path="/app/forms/checkbox-radio" component={CheckboxRadio} />
        <Route path="/app/forms/switches" component={Switches} />
        <Route path="/app/forms/selectbox" component={Selectbox} />
        <Route path="/app/forms/ratting" component={Rating} />
        <Route path="/app/forms/slider-range" component={SliderRange} />
        <Route path="/app/forms/buttons" component={Buttons} />
        <Route path="/app/forms/toggle-button" component={ToggleButton} />
        <Route path="/app/forms/dial-button" component={DialButton} />
        <Route path="/app/forms/textfields" component={Textbox} />
        <Route path="/app/forms/autocomplete" component={Autocomplete} />
        <Route path="/app/forms/upload" component={Upload} />
        <Route path="/app/forms/wysiwyg-editor" component={TextEditor} />
        {/* Login And Register */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* https://dev-safety.pace-os.com/?code=UrQhtBJlcqmykCPa7Rl4yI2lCkwIyg&state=%7B%27companyId%27%3A+%271%27%2C+%27projectId%27%3A+%2716%27%2C+%27targetPage%27%3A+%27+++++incidents+%27%2C+%27targetId%27%3A+%27%27%2C+%27redirect_back%27%3A+%27%27%7D */}
        {/* Incident List  */}
        <Route exact path="/incidents/" component={Incident} />
        <Route exact path="/app/incidents" component={Incident} />
        {/* <Route exact path="/?code=/state" component={Incident} /> */}
        {/* form initialNotification */}
        <Route
          exact
          path="/incident/:id/modify/environment-affected/"
          component={EnvironmentAffected}
        />
        <Route
          exact
          path="/incident/:id/modify/equipment-affected/"
          component={EqiptmentAffected}
        />
        <Route exact path="/incident/new/" component={IncidentDetails} />
        <Route exact path="/incident/:id/modify/" component={IncidentDetails} />
        <Route
          exact
          path="/incident/:id/modify/peoples-afftected/"
          component={PeoplesAfftected}
        />
        <Route
          exact
          path="/incident/:id/modify/property-affected/"
          component={PropertyAffected}
        />
        <Route
          exact
          path="/incident/:id/modify/reporting-and-notification/"
          component={ReportingAndNotification}
        />
        {/* form Evidence */}
        <Route
          exact
          path="/app/incident-management/registration/evidence/activity-detail/:id"
          component={ActivityDetail}
        />
        <Route
          exact
          path="/app/incident-management/registration/evidence/activity-detail/"
          component={ActivityDetail}
        />
        <Route
          exact
          path="/app/incident-management/registration/evidence/additional-details/"
          component={AdditionalDetails}
        />
        <Route
          exact
          path="/app/incident-management/registration/evidence/additional-details/:id"
          component={AdditionalDetails}
        />
        <Route
          exact
          path="/app/incident-management/registration/evidence/evidence/"
          component={Evidence}
        />
        <Route
          exact
          path="/app/incident-management/registration/evidence/evidence/:id"
          component={Evidence}
        />
        <Route
          exact
          path="/app/incident-management/registration/evidence/personal-and-ppedetails/"
          component={PersonalAndPpeDetails}
        />
        <Route
          exact
          path="/app/incident-management/registration/evidence/personal-and-ppedetails/:id"
          component={PersonalAndPpeDetails}
        />
        {/* form investigation */}
        <Route
          path="/app/incident-management/registration/investigation/action-taken/"
          component={ActionTaken}
        />
        <Route
          path="/app/incident-management/registration/investigation/severity-consequences/"
          component={SeverityConsequences}
        />
        <Route
          path="/app/incident-management/registration/investigation/event-details/"
          component={EventDetails}
        />
        <Route
          path="/app/incident-management/registration/investigation/investigation-overview/"
          component={InvestigationOverview}
        />
        <Route
          path="/app/incident-management/registration/investigation/worker-details/"
          component={WorkerDetails}
        />
        <Route
          exact
          path="/app/incident-management/registration/investigation/worker-details/:id"
          component={WorkerDetails}
        />
        {/* form root cause analysis */}
        <Route
          path="/app/incident-management/registration/root-cause-analysis/basic-cause/"
          component={BasicCause}
        />
        <Route
          path="/app/incident-management/registration/root-cause-analysis/basic-cause-and-action/"
          component={BasicCauseAndAction}
        />
        <Route
          path="/app/incident-management/registration/root-cause-analysis/cause-and-action/"
          component={CauseAndAction}
        />
        <Route
          path="/app/incident-management/registration/root-cause-analysis/management-control/"
          component={ManagementControl}
        />
        <Route
          path="/app/incident-management/registration/root-cause-analysis/details/"
          component={Details}
        />
        <Route
          path="/app/incident-management/registration/root-cause-analysis/hazardious-acts/"
          component={HazardiousActs}
        />
        <Route
          path="/app/incident-management/registration/root-cause-analysis/hazardious-condtions/"
          component={HazardiousCondtions}
        />
        <Route
          path="/app/incident-management/registration/root-cause-analysis/root-cause-analysis/"
          component={RootCauseAnalysis}
        />
        <Route
          path="/app/incident-management/registration/root-cause-analysis/pace-management/"
          component={PaceManagement}
        />
        <Route
          path="/app/incident-management/registration/root-cause-analysis/why-analysis/"
          component={WhyAnalysis}
        />
        {/* form root cause analysis get and put */}
        <Route
          path="/app/incident-management/registration/root-cause-analysis/basic-cause/:id"
          component={BasicCause}
        />
        {/* <Route
          path="/app/incident-management/registration/root-cause-analysis/basic-cause-and-action/"
          component={BasicCauseAndAction}
        />
        <Route
          path="/app/incident-management/registration/root-cause-analysis/cause-and-action/"
          component={CauseAndAction}
        /> */}
        <Route
          path="/app/incident-management/registration/root-cause-analysis/management-control/:id"
          component={ManagementControl}
        />
        <Route
          path="/app/incident-management/registration/root-cause-analysis/details/:id"
          component={Details}
        />
        <Route
          path="/app/incident-management/registration/root-cause-analysis/hazardious-acts/:id"
          component={HazardiousActs}
        />
        <Route
          path="/app/incident-management/registration/root-cause-analysis/hazardious-condtions/:id"
          component={HazardiousCondtions}
        />
        <Route
          path="/app/incident-management/registration/root-cause-analysis/root-cause-analysis/:id"
          component={RootCauseAnalysis}
        />
        <Route
          path="/app/incident-management/registration/root-cause-analysis/why-analysis/:id"
          component={WhyAnalysis}
        />
        {/* summary */}
        <Route path="/incident/details/:id/" component={Summary} />
        {/* {route for git} */}
        <Route path="/app/incident/details/:id/" component={Summary} />
        {/* from leassionlearned */}
        <Route
          exact
          path="/incident/:id/lesson-learnt/:mode/"
          component={LessionLearned}
        />
        {/* checklist */}
        <Route path="/app/pages/checklist/" component={CheckList} />
        <Route path="/app/pages/groups/" component={Groups} />
        <Route path="/app/pages/options/" component={Options} />
        {/* <Route exact path="/app/:entity/comments/:id/" component={Comments} /> */}
        {/* close out */}
        <Route
          exact
          path="/incident/:id/close-out/:mode/"
          component={CloseOut}
        />
        {/* Ui Components */}
        <Route exact path="/app/ui" component={Parent} />
        <Route path="/app/ui/avatars" component={Avatars} />
        <Route path="/app/ui/accordion" component={Accordion} />
        <Route path="/app/ui/badges" component={Badges} />
        <Route path="/app/ui/list" component={List} />
        <Route path="/app/ui/popover-tooltip" component={PopoverTooltip} />
        <Route path="/app/ui/snackbar" component={Snackbar} />
        <Route path="/app/ui/typography" component={Typography} />
        <Route path="/app/ui/tabs" component={Tabs} />
        <Route path="/app/ui/card-papper" component={Cards} />
        <Route path="/app/ui/image-grid" component={ImageGrid} />
        <Route path="/app/ui/progress" component={Progress} />
        <Route path="/app/ui/dialog-modal" component={DialogModal} />
        <Route path="/app/ui/steppers" component={Steppers} />
        <Route path="/app/ui/paginations" component={Paginations} />
        <Route path="/app/ui/drawer-menu" component={DrawerMenu} />
        <Route path="/app/ui/breadcrumbs" component={Breadcrumbs} />
        <Route path="/app/ui/icons" component={Icons} />
        <Route path="/app/ui/ionicons" component={IonIcons} />
        <Route path="/app/ui/slider-carousel" component={SliderCarousel} />
        <Route path="/app/ui/tags" component={Tags} />
        <Route path="/app/ui/dividers" component={Dividers} />
        {/* Chart */}
        <Route exact path="/app/charts" component={Parent} />
        <Route path="/app/charts/line-charts" component={LineCharts} />
        <Route path="/app/charts/bar-charts" component={BarCharts} />
        <Route path="/app/charts/area-charts" component={AreaCharts} />
        <Route path="/app/charts/pie-charts" component={PieCharts} />
        <Route path="/app/charts/radar-charts" component={RadarCharts} />
        <Route path="/app/charts/scatter-charts" component={ScatterCharts} />
        <Route path="/app/charts/compossed-chart" component={CompossedCharts} />
        <Route
          path="/app/charts/doughnut-pie-charts"
          component={DoughnutCharts}
        />
        <Route
          path="/app/charts/bar-direction-charts"
          component={BarDirection}
        />
        <Route
          path="/app/charts/line-scatter-charts"
          component={LineScatterChart}
        />
        <Route
          path="/app/charts/area-filled-charts"
          component={AreaFilledChart}
        />
        <Route
          path="/app/charts/radar-polar-chart"
          component={RadarPolarCharts}
        />
        {/* Comments */}
        <Route path="/app/comments/:module/:moduleId" component={Comments} />
        {/* Observation Routes  */}
        <Route exact path="/app/icare" component={Observations} />
        <Route exact path="/app/observations" component={Observations} />
        <Route exact path="/icare" component={Observations} />
        <Route path="/app/icare#table" component={Observations} />
        <Route
          exact
          path="/app/icare-corrective-action"
          component={ObservationCorrectiveAction}
        />
        <Route
          exact
          path="/app/icare-corrective-action/:id"
          component={ObservationCorrectiveAction}
        />
        <Route path="/app/icare/details/:id" component={ObservationSummary} />
        <Route
          path="/app/icare/details/:id#action-taking"
          component={ObservationSummary}
        />
        <Route
          path="/app/icare/details/:id#comments"
          component={ObservationSummary}
        />
        <Route
          path="/app/icare/details/:id#activity"
          component={ObservationSummary}
        />
        <Route
          path="/app/icare/details/:id#modify"
          component={ObservationSummary}
        />
        <Route
          exact
          path="/app/icare-initial-notification"
          component={ObservationInitialNotification}
        />
        <Route
          exact
          path="/app/icare-initial-notification/:id"
          component={ObservationInitialNotificationUpdate}
        />
        <Route
          path="/app/icare-view"
          component={ObservationInitialNotificationView}
        />
        <Route path="/app/prints/:id" component={Prints} />
        <Route
          path="/app/pages/general-icare-prints/:id"
          component={GeneralObservationPrints}
        />
        <Route path="/app/icare-bulkupload" component={ObservationBulkupload} />
        <Route
          path="/app/icare-bulkuploadfile"
          component={ObservationUploadScreen}
        />
        {/* Aha Routes */}
        <Route path="/app/pages/aha" exact component={AhaMain} />
        <Route
          path="/app/pages/aha/aha-summary/:id"
          exact
          component={AhaSummary}
        />
        {/* <Route path="/app/pages/aha/assessments" exact component={AssessmentsForms} /> */}
        <Route
          path="/app/pages/aha/assessments/project-details"
          exact
          component={ProjectDetailsAndHazard}
        />
        <Route
          path="/app/pages/aha/assessments/project-details/:id"
          exact
          component={ProjectDetailsAndHazard}
        />
        <Route
          path="/app/pages/aha/assessments/assessment"
          exact
          component={AssessmentAndNotification}
        />
        <Route
          path="/app/pages/aha/assessments/assessment/:id"
          exact
          component={AssessmentAndNotification}
        />
        <Route
          path="/app/pages/aha/approvals/approvals"
          exact
          component={Approvals}
        />
        <Route
          path="/app/pages/aha/lessons-learned/lessons-learned"
          exact
          component={LessonsLearned}
        />
        <Route path="/app/pages/aha/close-out" component={AhaCloseOut} />
        {/*<Route
           path="/BookmarkList" component={Bookmarklist}
        />*/}
        {/* Jha  */}
        <Route path="/app/pages/jha/all_jha" component={JhaMain} />
        <Route path="/app/pages/jha/jha-summary/:id" component={JhaSummary} />
        <Route
          path="/app/pages/jha/assessments/Job-hazards"
          component={JhaJobDetailHazard}
        />
        <Route
          path="/app/pages/jha/assessments/assessment"
          component={JhaAssessmentAndDocument}
        />
        <Route
          path="/app/pages/jha/approvals/approvals"
          component={JhaApprovals}
        />
        <Route
          path="/app/pages/jha/lessons-learned/lessons-learned"
          component={JhaLessonsLearned}
        />
        <Route path="/app/pages/jha/close-out" component={JhaCloseOut} />
        {/* Sample Apps */}
        <Route path="/app/pages/contact" component={Contact} />
        <Route path="/app/pages/chat" component={Chat} />
        <Route path="/app/pages/email" component={Email} />
        <Route path="/app/pages/timeline" component={Timeline} />
        <Route path="/app/pages/ecommerce" component={Ecommerce} />
        <Route path="/app/pages/product-detail" component={ProductPage} />
        <Route path="/app/pages/checkout" component={CheckoutPage} />
        <Route path="/app/pages/calendar" component={Calendar} />
        <Route path="/app/pages/taskboard" component={TaskBoard} />
        <Route path="/app/pages/invoice" component={Invoice} />
        {/* Pages */}
        <Route exact path="/app/pages" component={Parent} />
        <Route path="/app/pages/user-profile" component={Profile} />
        <Route path="/app/pages/blank-page" component={BlankPage} />
        <Route path="/app/pages/photo-gallery" component={Photos} />
        <Route path="/app/pages/pricing" component={Pricing} />
        <Route path="/app/pages/not-found" component={NotFound} />
        <Route path="/app/pages/error" component={Error} />
        <Route path="/app/pages/settings" component={Settings} />
        <Route path="/app/pages/help-support" component={HelpSupport} />
        {/* Map */}
        <Route exact path="/app/maps" component={Parent} />
        <Route path="/app/maps/map-marker" component={MapMarker} />
        <Route path="/app/maps/map-direction" component={MapDirection} />
        <Route path="/app/maps/map-searchbox" component={SearchMap} />
        <Route path="/app/maps/map-traffic" component={TrafficIndicator} />
        <Route path="/app/maps/street-view" component={StreetViewMap} />
        {/* Picklist */}
        <Route exact path="/app/pages/picklist" component={Picklist} />
        <Route
          exact
          path="/app/pages/picklist/value/:id"
          component={PicklistValue}
        />
        {/* Xflha Routes  */}
        <Route path="/app/pages/summary" component={Summary} />
        {/* <Route path="/app/pages/sample" component={SamplePage} /> */}
        <Route path="/app/assesments/" component={Xflha} />
        <Route path="/app/pages/assesments/xflha" component={Xflha} />
        <Route
          path="/app/pages/assesments/flhaSummary/:id"
          component={FlhaSummary}
        />
        <Route
          path="/app/pages/assesments/PreventiveControls"
          component={PreventiveControls}
        />
        <Route
          path="/app/pages/assesments/IsolationControl"
          component={IsolationControl}
        />
        <Route
          path="/app/pages/assesments/EnergyControl"
          component={EnergyControl}
        />
        <Route
          path="/app/pages/assesments/flha/:id/close-out"
          component={AssessmentCloseOut}
        />
        <Route path="/app/pages/assesments/AuditCheck" component={AuditCheck} />
        <Route
          path="/app/pages/assesments/flha/:id/revise"
          component={FlhaEdit}
        />
        <Route path="/app/pages/assesments/flhaadd" component={FlhaAdd} />
        <Route
          path="/app/pages/assesments/flha/:id/print"
          component={PrintFlha}
        />
        <Route
          path="/app/pages/assesments/flha/:id/activities"
          component={FlhaActivities}
        />
        <Route
          path="/app/pages/assesments/flha/:id/comments"
          component={FlhaComments}
        />
        {/* Xflha Config  */}
        {/* <Route path="/app/pages/assesments/FlhaConfig" component={FlhaConfig} />
        <Route path="/app/pages/assesments/FlhaConfigAdd" component={FlhaConfigAdd} />
        <Route path="/app/pages/assesments/FlhaConfigCriticalTask" component={FlhaConfigCriticalTask} />
        <Route path="/app/pages/assesments/FlhaConfigHazard" component={FlhaConfigHazard} /> */}
        {/* Control Tower */}
        <Route
          path="/app/pages/control-tower/controltower-icare"
          component={ControlTowerIcare}
        />
        {/* Compliance Routes */}
        <Route path="/app/pages/compliance" exact component={Compliance} />
        <Route
          path="/app/pages/compliance/compliance-summary/:id"
          exact
          component={ComplianceSummary}
        />
        <Route
          path="/app/pages/compliance/compliance-details"
          exact
          component={ComplianceDetails}
        />
        <Route
          path="/app/pages/compliance/compliance-details/:id"
          exact
          component={ComplianceDetails}
        />
        <Route
          path="/app/pages/compliance/compliance"
          exact
          component={ComplianceForm}
        />
        <Route path="/app/pages/compliance/checks" exact component={Checks} />
        <Route
          path="/app/pages/compliance/categories"
          exact
          component={Categories}
        />
        <Route
          path="/app/pages/compliance/performance-summary"
          exact
          component={PerformanceSummary}
        />
        <Route
          path="/app/pages/compliance-comment"
          component={ComplianceComment}
        />
        <Route
          path="/app/pages/compliance-activity"
          component={ComplianceActivity}
        />
        {/* Administrations */}
        <Route
          path="/app/compliance-config/"
          exact
          component={ComplianceConfig}
        />
        <Route
          path="/app/compliance-config/question-group"
          exact
          component={QuestionsGroup}
        />
        <Route
          path="/app/compliance-config/question"
          exact
          component={Questions}
        />
        <Route
          path="/app/compliance-config/new-question"
          exact
          component={ComplianceConfigNewQ}
        />
        <Route
          path="/app/compliance-config/bulk-upload"
          exact
          component={ComplianceConfigBulkUploadQ}
        />
        <Route
          path="/app/compliance-config/edit/:id"
          exact
          component={ComplianceConfigEditQ}
        />
        <Route
          path="/app/compliance-config/view/:id"
          exact
          component={ComplianceConfigViewQ}
        />
        <Route
          path="/app/compliance-config/performance-factor/add"
          exact
          component={PerformanceFactorAdd}
        />
        <Route
          path="/app/compliance-config/performance-factor/edit"
          exact
          component={PerformanceFactorEdit}
        />
        <Route
          path="/app/compliance-config/performance-factor/view"
          exact
          component={PerformanceFactorView}
        />
        <Route
          path="/app/compliance-config/performance-matrix/add"
          exact
          component={PerformanceMatrixAdd}
        />
        <Route
          path="/app/compliance-config/performance-matrix/edit"
          exact
          component={PerformanceMatrixEdit}
        />
        <Route
          path="/app/compliance-config/performance-matrix/view"
          exact
          component={PerformanceMatrixView}
        />
        {/* Default */}
        <Route component={NotFound} />
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
