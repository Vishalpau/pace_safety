import React from "react";
import PropTypes from "prop-types";
import brand from "dan-api/dummy/brand";
import { Helmet } from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {
  SliderWidget,
  CounterIconsWidget,
  PerformanceChartWidget,
  DateWidget,
  TaskWidget,
  WeatherWidget,
  ContactWidget,
  TimelineWidget,
  FilesWidget,
} from "dan-components";
import styles from "./dashboard-jss";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { PapperBlock } from "dan-components";

import "../../styles/custom/hexagon.css";
import icons from "dan-api/images/icons";

function PersonalDashboard(props) {
  const title = brand.name + " - Personal Dashboard";
  const description = brand.desc;
  const { classes } = props;
  return (
    <PapperBlock title="Dashboard" icon="ion-md-list-box">
      <div class="honeycomb">
        <div class="ibws-fix hexagon_row1">
          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a
                class="hse_health_safety_environment_mgmt_new"
                href="#"
                target="_blank"
              >
                <p>HSE Management</p>
              </a>
            </div>
          </div>

          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a class="hse_compliance_protocols" href="#" target="_blank">
                <p>Compliance Protocols</p>
              </a>
            </div>
          </div>

          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a
                class="hse_incident_reporting_management"
                href="#"
                target="_blank"
              >
                <p>Incident Reporting &amp; Management</p>
              </a>
            </div>
          </div>

          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>
        </div>

        <div class="ibws-fix hexagon_row2">
          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a class="project_information_hub" href="#" target="_blank">
                <p>Project Information Hub</p>
              </a>
            </div>
          </div>

          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a class="hse_smart_permit_management" href="#" target="_blank">
                <p>Assessments</p>
              </a>
            </div>
          </div>

          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a class="hse_environment_development" href="#" target="_blank">
                <p>Environment Management</p>
              </a>
            </div>
          </div>

          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a
                class="hse_intelligent_permit_management_new"
                href="https://ntpc-stage.teknobuilt.com/index.php?do=/permitmanagement/projectid_1/phaseid_1/uid_0/type_2/wctype_iwp/"
                target="_blank"
              >
                <p>Intelligent Permit Management</p>
              </a>
            </div>
          </div>

          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon hexagon_fullcontnt">
            <div class="hexagontent hexagon_content_box">
              <a
                class="hse_rapid_knowledge_collaboration"
                href="javascript:void(0);"
              >
                <p>Rapid Knowledge &amp; Collaboration</p>
              </a>
            </div>
          </div>
        </div>

        <div class="ibws-fix hexagon_row3">
          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon bghide_in_view hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon hide_responsiv hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon bghide_in_view hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon bghide_in_view hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>

          <div class="hexagon hide_responsiv">
            <div class="hexagontent hexagon_content_box" />
          </div>
        </div>
      </div>
    </PapperBlock>
  );
}

PersonalDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalDashboard);
