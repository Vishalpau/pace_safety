import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { PapperBlock } from "dan-components";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { FormHelperText, withStyles } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { EVIDENCE_FORM } from "../../../utils/constants";
import EvidenceValidate from "../../Validator/EvidenceValidation";
import { useHistory, useParams } from "react-router";
import FormHeader from "../FormHeader";
import Type from "../../../styles/components/Fonts.scss";
// import FormData from "form-data";

import { result } from "lodash";

const useStyles = makeStyles((theme) => ({
  formControl: {
    flexDirection: "row",
    margin: "1rem 0",
  },
  button: {
    margin: theme.spacing(1),
  },
  inlineRadioGroup: {
    flexDirection: "row",
    fontSize: 10,
  },
  evidenceCard: {
    padding: "1rem",
  },
}));

const Evidence = () => {
  // States definations.
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  let [error, setError] = useState({});
  const { id } = useParams();
  const history = useHistory();

  const [evideceData, setEvideceData] = useState([]);
  const classes = useStyles();
  const [incidentDetail, setIncidentDetail] = useState({});
  const [form, setForm] = React.useState([
    {
      evidenceCategory: "Worker statement",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Witness statements",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Supervisor statements",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Pictures",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Applicable policies and procedures",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Time line of incident",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Scope of work, JHQ/TLHQ",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "SME opinions",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Manufacturer recommendations",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Historical similar incidents",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Electronic communication evidence",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Regulatory requirements",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Compentency level",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
  ]);

  const [isLoading, setIsLoading] = React.useState(false);

  const fetchEvidenceList = async () => {
    const res = await api.get(`/api/v1/incidents/${id}/evidences/`);
    const result = res.data.data.results;

    let tempData = [];
    if (result.length) {
      // await setForm(result);
      for (let i = 0; i < result.length; i++) {
        console.log(result[i]);
        tempData.push({
          evidenceCategory: result[i].evidenceCategory,
          evidenceCheck: result[i].evidenceCheck,
          evidenceRemark: result[i].evidenceRemark,
          evidenceDocument: "",
          status: "Active",
          createdBy: 0,
          updatedBy: 0,
          fkIncidentId: localStorage.getItem("fkincidentId"),
          pk: result[i].id,
        });
      }
    }
    await setEvideceData(tempData);
    await setForm(tempData);
    await setIsLoading(true);
  };

  // const fetchEvidenceData = async () => {
  //   console.log("sagar");
  //   const res = await api.get(
  //     `/api/v1/incidents/${localStorage.getItem(
  //       "fkincidentId"
  //     )}/evidences/`
  //   );
  //   const result = res.data.data.results;

  //   console.log(result);
  //   let tempData = []
  //   if(result.length){
  //     // await setForm(result);
  //     for(let i=0; i<result.length; i++){

  //       tempData.push(
  //         {
  //           evidenceCategory: result[i].evidenceCategory,
  //           evidenceCheck: result[i].evidenceCheck,
  //           evidenceRemark: result[i].evidenceRemark,
  //           evidenceDocument: "",
  //           status: "Active",
  //           createdBy: 0,
  //           updatedBy: 0,
  //           fkIncidentId: localStorage.getItem("fkincidentId"),
  //           pk : result[i].id
  //         },
  //       )

  //     }
  //     // await setForm(tempData)
  //     console.log(tempData)
  //     await setEvideceData(tempData);

  //   }

  // await setIsLoading(true);
  // };
  // console.log(evideceData)
  const fetchIncidentDetails = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentDetail(result);
  };

  // On the next button click function call.

  const handleNext = async () => {
    const { error, isValid } = EvidenceValidate(form);

    await setError(error);

    if (!isValid) {
      return "Data is not valid";
    }

    for (let i = 0; i < form.length; i++) {
      console.log([i]);

      let data = new FormData();
      data.append("evidenceCheck", form[i].evidenceCheck);
      data.append("evidenceCategory", form[i].evidenceCategory);
      data.append("evidenceRemark", form[i].evidenceRemark);
      data.append("evidenceDocument", form[i].evidenceDocument);
      data.append("status", "Active");
      data.append("updatedBy", "");

      // If update is the case.
      if (id) {
        console.log("in put");
        console.log("evidence id", evideceData[i].pk);
        data.append("pk", evideceData[i].pk);

        const res = await api.put(
          `/api/v1/incidents/${id}/evidences/${evideceData[i].pk}/`,
          data
        );
        if (res.status === 200) {
          history.push(
            `/app/incident-management/registration/evidence/activity-detail/${id}`
          );
        }
        // If non update case is there.
      } else if (
        localStorage.getItem("fkincidentId") &&
        evideceData.length > 0
      ) {
        console.log("dd put");
        // console.log(evideceData)
        for (let i = 0; i < evideceData.length; i++) {
          let data = new FormData();
          data.append("pk", evideceData[i].pk);
          data.append("evidenceCheck", evideceData[i].evidenceCheck);
          data.append("evidenceNumber", evideceData[i].evidenceNumber);
          data.append("evidenceCategory", evideceData[i].evidenceCategory);
          data.append("evidenceDocument", evideceData[i].evidenceDocument);
          data.append("status", "Active");
          data.append("createdAt", evideceData[i].createdAt);
          data.append("createdBy", evideceData[i].createdBy);
          data.append("updatedAt", evideceData[i].updatedAt);
          data.append("updatedBy", evideceData[i].updatedBy);
          data.append("fkIncidentId", evideceData[i].fkIncidentId);
        }
        console.log(data);
        // const res = await api.put(
        //   `/api/v1/incidents/${localStorage.getItem(
        //     "fkincidentId"
        //   )}/evidences/${evideceData[i].pk}/`,
        //   data
        // );

        history.push(
          `/app/incident-management/registration/evidence/activity-detail/`
        );
      } else {
        data.append("createdAt", form[i].createdAt);
        data.append("createdBy", form[i].createdBy);
        data.append("updatedAt", form[i].updatedAt);
        data.append("updatedBy", form[i].updatedBy);
        data.append("fkIncidentId", form[i].fkIncidentId);

        if (Object.keys(error).length == 0) {
          console.log("in post");
          const res = await api.post(
            `/api/v1/incidents/${localStorage.getItem(
              "fkincidentId"
            )}/evidences/`,
            data
          );

          console.log(res.data.data.results);
          if (res.status === 201) {
            // const queId = res.data.data.results.id;
            // localStorage.setItem("id", queId);
            history.push(
              "/app/incident-management/registration/evidence/activity-detail/"
            );
          }
        }
      }
    }
  };

  const handleChange = async (e, index) => {
    let TempPpeData = [...form];
    TempPpeData[index].evidenceCheck = e.target.value;
    // if (e.target.value !== "Yes"){

    // }
    await setForm(TempPpeData);
  };

  const handleFile = async (e, index) => {
    let TempPpeData = [...form];
    TempPpeData[index].evidenceDocument = e.target.files[0];
    await setForm(TempPpeData);
  };

  const handleComment = async (e, index) => {
    let TempPpeData = [...form];
    TempPpeData[index].evidenceRemark = e.target.value;
    await setForm(TempPpeData);
  };

  // const handleChangeEvidence = async (e ,index) => {
  //   let TempPpeData = [...evideceData];
  //   TempPpeData[index].evidenceCheck = e.target.value;

  //   await setEvideceData(TempPpeData)

  // }

  // const handleFileEvidence = async (e, index) => {
  //   let TempPpeData = [...evideceData];
  //   TempPpeData[index].evidenceDocument = e.target.files[0];

  //   await setEvideceData(TempPpeData)
  //   console.log(evideceData)
  // };

  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No", "N/A"];

  useEffect(() => {
    // fetchEvidenceData();
    fetchIncidentDetails();
    if (id) {
      fetchEvidenceList();
    } else {
      setIsLoading(true);
    }
  }, []);

  return (
    <PapperBlock title="Evidences" icon="ion-md-list-box">
      {console.log(error)}
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item md={9} spacing={3}>
            <Grid item md={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident Number
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentDetail.incidentNumber}
              </Typography>
            </Grid>
            <Grid item md={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident Description
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentDetail.incidentDetails}
              </Typography>
            </Grid>

            <Grid item md={12}>
              <TableContainer>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: 200 }}>
                        Evidence Type
                      </TableCell>
                      <TableCell style={{ width: 260 }}>Yes/No/N/A</TableCell>
                      <TableCell>Remarks</TableCell>
                      <TableCell>Attachments</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(form).map(([index, value]) => (
                      <>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <Typography variant="body2">
                              {value.evidenceCategory || value.evidenceCategory}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <FormControl
                              component="fieldset"
                              required
                              size="small"
                              className={classes.fullWidth}
                              error={error && error[`evidenceCheck${[index]}`]}
                            >
                              <RadioGroup
                                className={classes.inlineRadioGroup}
                                defaultValue={form[index].evidenceCheck}
                                onChange={(e) => {
                                  handleChange(e, index);
                                  // setForm([{ ...form, evidenceCheck: e.target.value }]);
                                }}
                              >
                                {radioDecide.map((value) => (
                                  <FormControlLabel
                                    value={value}
                                    control={<Radio />}
                                    label={value}
                                  />
                                ))}
                              </RadioGroup>
                              {error && error[`evidenceCheck${[index]}`] && (
                                <FormHelperText>
                                  {error[`evidenceCheck${[index]}`]}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              variant="outlined"
                              error={error && error[`evidenceRemark${[index]}`]}
                              helperText={
                                error && error[`evidenceRemark${[index]}`]
                                  ? error[`evidenceRemark${[index]}`]
                                  : ""
                              }
                              defaultValue={form[index].evidenceRemark}
                              onChange={(e) => {
                                handleComment(e, index);
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <input
                              type="file"
                              className={classes.fullWidth}
                              disabled={
                                value.evidenceCheck !== "Yes" ? true : false
                              }
                              name="file"
                              onChange={(e) => {
                                handleFile(e, index);
                                // setForm([{ ...form, evidenceCheck: e.target.value }]);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item md={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNext()}
              >
                Next
              </Button>
            </Grid>
          </Grid>
          <Grid item md={3}>
            <FormSideBar
              deleteForm={[1, 2, 3]}
              listOfItems={EVIDENCE_FORM}
              selectedItem="Evidence"
            />
          </Grid>
        </Grid>
      ) : (
        <h1>Loading...</h1>
      )}
    </PapperBlock>
  );
};
export default Evidence;
