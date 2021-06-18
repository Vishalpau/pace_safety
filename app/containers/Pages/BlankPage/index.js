import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import api from "../../../utils/axios";
import { object } from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Print from "@material-ui/icons/Print";
import Share from "@material-ui/icons/Share";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AttachmentIcon from "@material-ui/icons/Attachment";
import InfoIcon from "@material-ui/icons/Info";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import Fonts from "dan-styles/Fonts.scss";
import Incidents from "dan-styles/IncidentsList.scss";
import Type from "dan-styles/Typography.scss";

function BlankPage() {
  // const title = brand.name + ' - Blank Page';
  // const descriptionp = brand.desc;
  const [incidents, setIncidents] = useState([]);

  useEffect(async () => {
    const allIncidents = await api.get("api/v1/incidents/");
    await setIncidents(allIncidents.data.data.results);
  }, []);

  return (
    <PapperBlock title="Incidents" icon="ion-md-list-box" desc="">
      {console.log(incidents)}
      <Box>
        <Grid container>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddCircleIcon />}
              disableElevation
            >
              New Incident
            </Button>
          </Grid>
        </Grid>
      </Box>

      {Object.entries(incidents).map((item) => (
        <Card variant="outlined" className={Incidents.card}>
          {/* <CardHeader disableTypography title="Incident with No Injury" /> */}
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3} alignItems="flex-start">
                  <Grid item xs={10}>
                    <Typography
                      variant="h6"
                      // display="inline"
                      // color="textSecondary"
                      // className={Fonts.labelValue}
                    >
                      {/* {item[1]["incidentTitle"]} */}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Reprehenderit culpa voluptates iste.
                    </Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <Chip
                      avatar={<Avatar src="/images/pp_boy.svg" />}
                      label="John Doe"
                      // onDelete={handleDelete}
                      // className={classes.chip}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <div className={Incidents.statusRow}>
                  <Typography
                    variant="h6"
                    display="inline"
                    className={Fonts.labelName}
                  >
                    Number{" "}
                    <Link
                      href="#"
                      variant="subtitle"
                      className={Incidents.incidentNumber}
                      style={{ textDecoration: "underline" }}
                    >
                      {item[1]["incidentNumber"]}
                    </Link>
                  </Typography>

                  <Chip
                    variant="outlined"
                    label=" Initial Notification"
                    color="primary"
                    size="small"
                  />

                  <Typography
                    variant="body1"
                    // color="textSecondary"
                    display="inline"
                  >
                    {/* {item[1]["incidentNumber"]} */}
                    <i className="ion-ios-calendar-outline" />
                    <span className={Incidents.dateValue}>
                      {item[1]["incidentOccuredOn"]}
                    </span>
                  </Typography>
                </div>
              </Grid>

              <Grid item lg={3}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Incident Type
                </Typography>

                <Typography
                  variant="body1"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {/* {item[1]["incidentReportedByName"]} */}
                  Not found
                </Typography>
              </Grid>
              <Grid item lg={3}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Incident location
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {item[1]["incidentLocation"]}
                </Typography>
              </Grid>
              {/* <Grid item lg={4}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Incident on
                </Typography>

                <Typography
                  variant="body1"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {item[1]["incidentOccuredOn"]}
                </Typography>
              </Grid> */}
              <Grid item lg={3}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Reported on
                </Typography>

                <Typography
                  variant="body1"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {item[1]["incidentReportedOn"]}
                </Typography>
              </Grid>

              <Grid item lg={3}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Reported By
                </Typography>

                <Typography
                  variant="body1"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {item[1]["incidentReportedByName"]}
                </Typography>
              </Grid>

              {/* <Grid item lg={4}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Incident description
                </Typography>
                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {item[1]["incidentDetails"]}
                </Typography>
              </Grid> */}

              {/* <Grid item lg={4}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Reviewed by
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {item[1]["reviewedBy"]}
                </Typography>
              </Grid> */}

              {/* <Grid item lg={4}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Reviewed on
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {item[1]["reviewDate"]}
                </Typography>
              </Grid> */}
              {/* <Grid item lg={4}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Closed by
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {item[1]["closedBy"]}
                </Typography>
              </Grid> */}
              {/* <Grid item lg={4}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Closed date
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {item[1]["closeDate"]}
                </Typography>
              </Grid> */}
            </Grid>
          </CardContent>
          <Divider />
          <CardActions className={Incidents.cardActions}>
            <Grid container spacing={2} justify="flex-end" alignItems="center">
              <Grid item xs={6} md={3} lg={2}>
                <Typography
                  variant="body2"
                  display="inline"
                  className={Incidents.actionsLabel}
                >
                  <AttachmentIcon /> Comments:
                </Typography>
                <Typography variant="body2" display="inline">
                  <Link href="#">3</Link>
                </Typography>
              </Grid>
              {/* <Grid item xs={6} md={3} lg={2}>
                <Typography
                  variant="body2"
                  display="inline"
                  className={Incidents.actionsLabel}
                >
                  <AttachmentIcon /> Attathments:
                </Typography>
                <Typography variant="body2" display="inline">
                  <Link href="#">3</Link>
                </Typography>
              </Grid> */}
              <Grid item xs={6} md={3} lg={2}>
                <Typography
                  variant="body2"
                  display="inline"
                  className={Incidents.actionsLabel}
                >
                  <AttachmentIcon /> Actions:
                </Typography>
                <Typography variant="body2" display="inline">
                  <Link href="#">3</Link>
                </Typography>
              </Grid>
              <Grid item xs={6} md={3} lg={2}>
                <Typography
                  variant="body2"
                  display="inline"
                  className={Incidents.actionsLabel}
                >
                  <AttachmentIcon /> Evidences:
                </Typography>
                <Typography variant="body2" display="inline">
                  <Link href="#">3</Link>
                </Typography>
              </Grid>
              {/* <Grid item xs={6} md={3} lg={3}>
                <Typography
                  variant="body2"
                  display="inline"
                  className={Incidents.actionsLabel}
                >
                  <InfoIcon /> Status:
                </Typography>
                <Typography
                  variant="body2"
                  display="inline"
                  color="textSecondary"
                  className={Type.statusHighlight}
                >
                  Initial Notification
                </Typography>
              </Grid> */}
              <Grid item xs={6} md={3} lg={2}>
                <Button
                  size="small"
                  color="secondary"
                  startIcon={<Print />}
                  className={Incidents.actionButton}
                >
                  Print
                </Button>
              </Grid>

              <Grid item xs={6} md={3} lg={2}>
                <Button
                  size="small"
                  color="secondary"
                  startIcon={<Share />}
                  className={Incidents.actionButton}
                >
                  Share
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      ))}
    </PapperBlock>
  );
}

export default BlankPage;
