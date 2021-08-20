import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import { Switch, Route } from "react-router-dom";
import { ThemeContext } from "./ThemeWrapper";
import Dashboard from "../Templates/Dashboard";
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
  ObservationCloseOut,
  ObservationInitialNotificationUpdate,
  CheckList,
  Groups,
  Options,
  Aha,
  AhaSummary,
  AssessmentsForms,
  ProjectDetails,
  ProjectAreaHazards,
  Assessment,
  DocumentNotification,
  Approvals,
  LessonsLearned,
  Prints,
  Setting,
  Comments,
} from "../pageListAsync";


function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
      //settings
        <Route path="/app/settings/setting" component={Setting} />
        {/* Home */}
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


        {/* form initialNotification */}
        <Route
          exact
          path="/app/incident-management/registration/initial-notification/environment-affected/"
          component={EnvironmentAffected}
        />
        <Route
          exact
          path="/app/incident-management/registration/initial-notification/environment-affected/:id"
          component={EnvironmentAffected}
        />
        <Route
          exact
          path="/app/incident-management/registration/initial-notification/equipment-affected/:id"
          component={EqiptmentAffected}
        />
        <Route
          exact
          path="/app/incident-management/registration/initial-notification/equipment-affected/"
          component={EqiptmentAffected}
        />
        <Route
          exact
          path="/app/incident-management/registration/initial-notification/incident-details/"
          component={IncidentDetails}
        />
        <Route
          exact
          path="/app/incident-management/registration/initial-notification/incident-details/:id"
          component={IncidentDetails}
        />
        <Route
          exact
          path="/app/incident-management/registration/initial-notification/peoples-afftected/"
          component={PeoplesAfftected}
        />
        <Route
          exact
          path="/app/incident-management/registration/initial-notification/peoples-afftected/:id"
          component={PeoplesAfftected}
        />
        <Route
          exact
          path="/app/incident-management/registration/initial-notification/property-affected/"
          component={PropertyAffected}
        />
        <Route
          exact
          path="/app/incident-management/registration/initial-notification/property-affected/:id"
          component={PropertyAffected}
        />
        <Route
          exact
          path="/app/incident-management/registration/initial-notification/reporting-and-notification/"
          component={ReportingAndNotification}
        />
        <Route
          exact
          path="/app/incident-management/registration/initial-notification/reporting-and-notification/:id"
          component={ReportingAndNotification}
        />
        <Route
          path="/app/incident-management/registration/investigation/update-initial-details/:id"
          component={UpdateIncidentDetails}
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
        <Route exact
          path="/app/incident-management/registration/evidence/evidence/:id"
          component={Evidence}
        />
        <Route exact
          path="/app/incident-management/registration/evidence/personal-and-ppedetails/"
          component={PersonalAndPpeDetails}
        /><Route exact
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
        <Route exact
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
        <Route
          path="/app/incident-management/registration/summary/summary/:id"
          component={Summary}
        />
        {/* from leassionlearned */}
        <Route
          exact
          path="/app/incident-management/registration/lession-learned/lession-learned/"
          component={LessionLearned}
        />
        <Route
          exact
          path="/app/incident-management/registration/lession-learned/lession-learned/:id"
          component={LessionLearned}
        />

        {/* checklist */}
        <Route
          path="/app/pages/checklist/"
          component={CheckList}
        />

        <Route
          path="/app/pages/groups/"
          component={Groups}
        />

        <Route
          path="/app/pages/options/"
          component={Options}
        />
        <Route exact path="/app/:entity/comments/:id/" component={Comments} />
        {/* close out */}
        <Route
          exact
          path="/app/incident-management/registration/close-out/:id"
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

        {/* Observation Routes  */}
        {/* <Route path="/app/pages/summary" component={Summary} /> */}
        {/* <Route path="/app/pages/sample" component={SamplePages} /> */}
        <Route path="/app/pages/observations" component={Observations} />
        <Route exact path="/app/pages/observation-corrective-action" component={ObservationCorrectiveAction} />
        <Route exact path="/app/pages/observation-corrective-action/:id" component={ObservationCorrectiveAction} />
        <Route path="/app/pages/observation-close-out" component={ObservationCloseOut} />
        <Route path="/app/pages/observation-Summary/:id" component={ObservationSummary} />
        <Route exact path="/app/pages/observation-initial-notification" component={ObservationInitialNotification} />
        <Route exact path="/app/pages/observation-initial-notification/:id" component={ObservationInitialNotificationUpdate} />
        <Route path="/app/pages/observation-observation-view" component={ObservationInitialNotificationView} />
        <Route path="/app/pages/prints/:id" component={Prints} />

        {/* Aha Routes */}

        <Route path="/app/pages/aha" exact component={Aha} />
        <Route path="/app/pages/aha/aha-summary" exact component={AhaSummary} />
        <Route path="/app/pages/aha/assessments" exact component={AssessmentsForms} />
        <Route path="/app/pages/aha/assessments/project-details" exact component={ProjectDetails} />
        <Route path="/app/pages/aha/assessments/project-area-hazards" exact component={ProjectAreaHazards} />
        <Route path="/app/pages/aha/assessments/assessment" exact component={Assessment} />
        <Route path="/app/pages/aha/assessments/DocumentsNotifications" exact component={DocumentNotification} />
        <Route path="/app/pages/aha/approvals/approvals" exact component={Approvals} />
        <Route path="/app/pages/aha/lessons-learned/lessons-learned" exact component={LessonsLearned} />

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
        <Route path="/app/pages/incident" component={Incident} />
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
        {/* Default */}
        <Route component={NotFound} />
        {/* Administrations */}


      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
