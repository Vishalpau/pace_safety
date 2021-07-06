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

  const [evideceData, setEvideceData] = useState({
    evidenceCheck: "",
    evidenceDocument: "",
    evidenceRemark: "",
    evidenceCategory: "",
  });
  const classes = useStyles();
  const [incidentDetail, setIncidentDetail] = useState({});
  const [form, setForm] = React.useState({
    evidenceType: "",
    available: "",
    comment: "",
    document: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchEvidenceList = async () => {
    const res = await api.get(
      `/api/v1/incidents/${id}/evidences/${localStorage.getItem("id")}/`
    );
    const result = res.data.data.results;
    console.log(result.evidenceCheck);
    await setForm({
      ...form,
      available: result.evidenceCheck,
      comment: result.evidenceRemark,
      evidenceType: result.evidenceCategory,
      document: result.evidenceDocument,
    });

    await setEvideceData(result);
    await setIsLoading(true);
  };

  const fetchEvidenceData = async () => {
    console.log("sagar");
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem(
        "fkincidentId"
      )}/evidences/${localStorage.getItem("id")}/`
    );
    const result = res.data.data.results;
    console.log(result);
    console.log(result.evidenceCheck);
    await setForm({
      ...form,
      available: result.evidenceCheck,
      comment: result.evidenceRemark,
      evidenceType: result.evidenceCategory,
      document: result.evidenceDocument,
    });

    await setEvideceData(result);
    // await setIsLoading(true);
  };
  console.log(form);
  const fetchIncidentDetails = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentDetail(result);
  };

  // On the next button click function call.
  console.log(form);
  const handleNext = async () => {
    const { error, isValid } = EvidenceValidate(form);
    setError(error);

    if (!isValid) {
      return "Data is not valid";
    }

    let data = new FormData();
    data.append("evidenceCheck", form.available);
    data.append("evidenceCategory", form.evidenceType);
    data.append("evidenceRemark", form.comment);
    data.append("evidenceDocument", form.document);
    data.append("status", "Active");
    data.append("updatedBy", "");

    // If update is the case.
    if (id) {
      const res = await api.put(
        `/api/v1/incidents/${localStorage.getItem(
          "fkincidentId"
        )}/evidences/${localStorage.getItem("id")}/`,
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
      localStorage.getItem("id")
    ) {
      const res = await api.put(
        `/api/v1/incidents/${localStorage.getItem(
          "fkincidentId"
        )}/evidences/${localStorage.getItem("id")}/`,
        data
      );
      if (res.status === 200) {
        history.push(
          `/app/incident-management/registration/evidence/activity-detail/`
        );
      }
    } else {
      data.append("createdAt", "");
      data.append("createdBy", "1");
      data.append("updatedAt", "");
      data.append("updatedBy", "");
      data.append("fkIncidentId", localStorage.getItem("fkincidentId"));

      if (Object.keys(error).length == 0) {
        const res = await api.post(
          `/api/v1/incidents/${localStorage.getItem(
            "fkincidentId"
          )}/evidences/`,
          data
        );

        console.log(res.data.data.result);
        if (res.status === 201) {
          const queId = res.data.data.results.id;
          localStorage.setItem("id", queId);
          history.push(
            "/app/incident-management/registration/evidence/activity-detail/"
          );
        }
      }
    }
  };

  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No", "N/A"];

  useEffect(() => {
    fetchEvidenceData();
    fetchIncidentDetails();
    if (id) {
      fetchEvidenceList();
    } else {
      setIsLoading(true);
    }
  }, []);

  return (
    <PapperBlock title="Evidences" icon="ion-md-list-box">
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item md={9} spacing={3}>
            <Grid item md={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident number
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentDetail.incidentNumber}
              </Typography>
            </Grid>
            <Grid item md={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident description
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentDetail.incidentDetails}
              </Typography>
            </Grid>

            <Grid item md={12}>
              {/* <Card variant="outlined" className={classes.evidenceCard}>
                <CardContent>
                  <Grid container spacing={4} alignItems="center">
                    <Grid item md={6}>
                      <TextField
                        id="filled-basic"
                        variant="outlined"
                        size="small"
                        className={classes.fullWidth}
                        label="Evidence Type"
                        error={error.evidenceType}
                        helperText={
                          error.evidenceType ? error.evidenceType : ""
                        }
                        defaultValue={
                          form.evidenceType || evideceData.evidenceCategory
                        }
                        onChange={(e) => {
                          setForm({ ...form, evidenceType: e.target.value });
                        }}
                      />
                    </Grid>

                    <Grid item md={6} justify="center">
                      <FormControl
                        component="fieldset"
                        required
                        size="small"
                        className={classes.fullWidth}
                        error={error && error.available}
                      >
                        <FormLabel component="legend">Available</FormLabel>
                        <RadioGroup
                          className={classes.inlineRadioGroup}
                          defaultValue={
                            form.available || evideceData.evidenceCheck
                          }
                          onChange={(e) => {
                            setForm({ ...form, available: e.target.value });
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
                        {error && error.available && (
                          <FormHelperText>{error.available}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        id="filled-basic"
                        required
                        size="small"
                        className={classes.fullWidth}
                        variant="outlined"
                        label="Comments"
                        error={error.comment}
                        helperText={error.comment ? error.comment : ""}
                        defaultValue={
                          form.comment || evideceData.evidenceRemark
                        }
                        onChange={(e) => {
                          setForm({ ...form, comment: e.target.value });
                        }}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <input
                        type="file"
                        className={classes.fullWidth}
                        name="file"
                        onChange={(e) =>
                          setForm({ ...form, document: e.target.files[0] })
                        }
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card> */}
              <TableContainer>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: 200 }}>
                        Evidence Type
                      </TableCell>
                      <TableCell style={{ width: 260 }}>Yes/ No/ N/A</TableCell>
                      <TableCell>Comments</TableCell>
                      <TableCell>Attatchments</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Typography variant="body2">
                          Worker Statement
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <FormControl size="small" component="fieldset">
                          <RadioGroup
                            aria-label="availability"
                            name="availability1"
                            className={classes.inlineRadioGroup}
                            value="yes" // Default
                            // onChange={handleChange}
                          >
                            <FormControlLabel
                              value="yes"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio />}
                              label="Male"
                            />
                            <FormControlLabel
                              value="not available"
                              control={<Radio />}
                              label="N/A"
                            />
                          </RadioGroup>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <TextField size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <input type="file" />
                      </TableCell>
                    </TableRow>
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
