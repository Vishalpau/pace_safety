import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { PapperBlock } from "dan-components";
import CheckCircle from "@material-ui/icons/CheckCircle";
import AccessTime from "@material-ui/icons/AccessTime";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import api from "../../utils/axios";

// List
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

// Icons
import Print from "@material-ui/icons/Print";
import Share from "@material-ui/icons/Share";
import Close from "@material-ui/icons/Close";
import Comment from "@material-ui/icons/Comment";
import History from "@material-ui/icons/History";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";

// Styles
import Styles from "dan-styles/Summary.scss";
import Type from "dan-styles/Typography.scss";
import Fonts from "dan-styles/Fonts.scss";
import moment from "moment";



const IncidentDetailsSummary = () => {

    const [incidents, setIncidents] = useState([]);
    const [peopleData, setPeopleData] = useState([]);
    const [propertyData, setPropertyData] = useState([]);
    const [enviornmentData, setEnviornmentData] = useState([]);
    const [equipmentData, setEquipmentData] = useState([]);
    const [reportsData, setReportsData] = useState([]);
    const [fkid,setFkid] = useState(3)

    // useEffect(() => {
    //     setFkid(localStorage.getItem("fkincidentId"))
    //   });

    const fetchIncidentData = async () => {
        const allIncidents = await api.get(
          `api/v1/incidents/${fkid}/`
        );
        await setIncidents(allIncidents.data.data.results);
      };

      const fetchPeopleAffectData = async () => {
        const response = await api.get(
          `api/v1/incidents/${fkid}/people/`
        );
        await setPeopleData(response.data.data.results);
      };

      const fetchPropertyAffectData = async () => {
        const response = await api.get(
          `api/v1/incidents/${fkid}/properties/`
        );
        await setPropertyData(response.data.data.results);
      };

      const fetchEquipmentAffectData = async () => {
        const response = await api.get(
          `api/v1/incidents/${fkid}/equipments/`
        );
        await setEquipmentData(response.data.data.results);
      };

      const fetchEnviornmentAffectData = async () => {
        const response = await api.get(
          `api/v1/incidents/${fkid}/environment/`
        );
        await setEnviornmentData(response.data.data.results);
      };

      const fetchReportsData = async () => {
        const response = await api.get(
          `api/v1/incidents/${fkid}/reports/`
        );
        await setReportsData(response.data.data.results);
      };

      useEffect(() => {
        fetchIncidentData();
        fetchPeopleAffectData();
        fetchPropertyAffectData();
        fetchEquipmentAffectData();
        fetchEnviornmentAffectData();
        fetchReportsData();
      }, []);

  return (
    <div>
        <PapperBlock
          title={`Incident Number:${incidents["incidentNumber"]}`}
          icon="ion-md-list-box"
        >
          <Grid container spacing={5}>
            <Grid container item md={9} spacing={3}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Incident Overview
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">
                  {/* {item[1]["incidentTitle"]} */}
                  {incidents.incidentTitle}
                </Typography>
              </Grid>

              <Grid item md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Incident on
                </Typography>
                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {moment(incidents["incidentOccuredOn"]).format(
                    "Do MMMM YYYY, h:mm:ss a"
                  )}
                </Typography>
              </Grid>

              <Grid item md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Reported on
                </Typography>

                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {moment(incidents["incidentReportedOn"]).format(
                    "Do MMMM YYYY, h:mm:ss a"
                  )}
                </Typography>
              </Grid>

              <Grid item md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Reported by
                </Typography>

                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {incidents["incidentReportedByName"]}
                </Typography>
              </Grid>

              <Grid item md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Incident Type
                </Typography>

                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {incidents["incidentReportedByName"]}
                </Typography>
              </Grid>

              <Grid item md={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Incidnet Description
                </Typography>

                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {incidents["incidentDetails"]}
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Immediate Action Taken
                </Typography>

                
                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {incidents["immediateActionsTaken"]}
                </Typography>
              </Grid>

              <Grid item md={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Incident Location
                </Typography>

                
                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {incidents["incidentLocation"]}
                </Typography>
              </Grid>

              <Grid item md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Contractor
                </Typography>

                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {incidents["contractor"]}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Sub-contractor
                </Typography>

                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {incidents["subContractor"]}
                </Typography>
              </Grid>

              {/* people block       */}
              
              {peopleData.length !== 0
                ? peopleData.map((peopledata, key) => (
                    <Grid container item md={9} spacing={3} key={key}>
                      <Grid item md={12}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {key + 1}: Details of People{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Person Department{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {peopledata.personDepartment}{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Person Name{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {peopledata.personName}{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Person Type{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {peopledata.personType}{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Person Identification Number{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {peopledata.personIdentification}{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Person Department{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {peopledata.personDepartment}{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Location{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {peopledata.locationAssessmentCenter}{" "}
                        </Typography>
                      </Grid>

                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Worker offsite Assesments{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {peopledata.workerOffsiteAssessment}{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
                : null}
                {propertyData.length !== 0
                ?
              <Grid item md={12}>
                <Typography variant={12}>Property Affect</Typography>
              </Grid>:null}
              {propertyData.length !== 0
                ? propertyData.map((propertydata, key) => (
                    <Grid container item md={9} spacing={3} key={key}>
                      <Grid item md={12}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {key + 1}: Details of property{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Property Type{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {propertydata.propertyType}{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Property other type{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {propertydata.propertyOtherType}{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Damage Details{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {propertydata.damageDetails}{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
                : null}
                {equipmentData.length !== 0
                ?
              <Grid md={12}>
                <Typography>Equipment Affected</Typography>
              </Grid>:null}
              {equipmentData.length !== 0
                ? equipmentData.map((equipmentdata, key) => (
                    <Grid container item md={9} spacing={3} key={key}>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Equipment Type{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {equipmentdata.equipmentType}{" "}
                        </Typography>
                      </Grid>
                      <Grid item md={12}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {key + 1}: Details of Equipment{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Equipment Details{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {equipmentdata.equipmentDeatils}{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Equipment Other type{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {equipmentdata.equipmentOtherType}{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
                : null}
                 {enviornmentData.length !== 0
                ?
              <Grid md={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  {" "}
                  Enviroment Affected{" "}
                </Typography>
              </Grid>:null}
              {enviornmentData.length !== 0
                ? enviornmentData.map((envData) => (
                    <>
                      <Grid item md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Where there any release?
                        </Typography>

                        <Typography
                          variant="body"
                          color="textSecondary"
                          className={Fonts.labelValue}
                        >
                          {envData.envQuestion}
                        </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Where there any impact on wildlife?
                        </Typography>

                        <Typography
                          variant="body"
                          color="textSecondary"
                          className={Fonts.labelValue}
                        >
                          {envData.envQuestionOption}
                        </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Where there any waterbody affected?
                        </Typography>

                        <Typography
                          variant="body"
                          color="textSecondary"
                          className={Fonts.labelValue}
                        >
                          {envData.envAnswerDetails}
                        </Typography>
                      </Grid>
                    </>
                  ))
                : null}


              {reportsData.length !== 0 ? (
                <Grid md={12}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={Fonts.labelName}
                  >
                    {" "}
                    Report & Noticefication{" "}
                  </Typography>
                </Grid>
              ) : null}
              {reportsData.length !== 0
                ? reportsData.map((report) => (
                    <>
                      <Grid item md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Reported To
                        </Typography>

                        <Typography
                          variant="body"
                          color="textSecondary"
                          className={Fonts.labelValue}
                        >
                          {report.reportTo}
                        </Typography>
                      </Grid>

                      <Grid item md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Report Description
                        </Typography>

                        <Typography
                          variant="body"
                          color="textSecondary"
                          className={Fonts.labelValue}
                        >
                          {report.reportingNote}
                        </Typography>
                      </Grid>
                    </>
                  ))
                : null}
            
             
            </Grid>

          </Grid>
        </PapperBlock>
    </div>
  );
};
export default IncidentDetailsSummary;
