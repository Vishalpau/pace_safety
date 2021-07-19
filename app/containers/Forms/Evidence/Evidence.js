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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [open, setOpen] = useState(false);
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
      fkIncidentId: id|| localStorage.getItem("fkincidentId"),
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
      fkIncidentId: id||localStorage.getItem("fkincidentId"),
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
      fkIncidentId:id|| localStorage.getItem("fkincidentId"),
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
      fkIncidentId:id|| localStorage.getItem("fkincidentId"),
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
      fkIncidentId:id|| localStorage.getItem("fkincidentId"),
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
      fkIncidentId:id|| localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Scope of work, JHA/ FLHA",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId:id|| localStorage.getItem("fkincidentId"),
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
      fkIncidentId: id||localStorage.getItem("fkincidentId"),
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
      fkIncidentId:id|| localStorage.getItem("fkincidentId"),
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
      fkIncidentId:id|| localStorage.getItem("fkincidentId") ,
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
      fkIncidentId:id|| localStorage.getItem("fkincidentId"),
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
      fkIncidentId:id|| localStorage.getItem("fkincidentId"),
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
      fkIncidentId:id|| localStorage.getItem("fkincidentId"),
      error: "",
    },
  ]);

  const [isLoading, setIsLoading] = React.useState(false);

  const fetchEvidenceList = async () => {
    let lastItem = id ? id : localStorage.getItem("fkincidentId")
    const res = await api.get(`/api/v1/incidents/${lastItem}/evidences/`);
    console.log(res)
    const result = res.data.data.results;

    let tempData = [];
    if (result.length) {
      // await setForm(result);
      for (let i = 0; i < result.length; i++) {
        console.log(result[i].evidenceDocument)
        tempData.push({
          evidenceCategory: result[i].evidenceCategory,
          evidenceCheck: result[i].evidenceCheck,
          evidenceRemark: result[i].evidenceRemark,
          evidenceDocument: result[i].evidenceDocument,
          status: "Active",
          createdBy: 0,
          updatedBy: 0,
          fkIncidentId:id|| localStorage.getItem("fkincidentId"),
          pk: result[i].id,
        });
      }
    }
   
    if(result.length > 1){
      await setForm(tempData);
      await setEvideceData(tempData);
      console.log(form)
      
    }
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
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")||id}/`
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
    if(isValid === true){
      if(evideceData.length > 0){
        // const id = id || localStorage.getItem("fkincidentId")
        alert(id)
        let status =0;
        for(var i =0; i<form.length; i++){
          const res = await api.put(
            `/api/v1/incidents/${id}/evidences/${evideceData[i].pk}/`,
            form[i]
          );
          status = res.status
        }
        if(status === 200){
          history.push(
            `/app/incident-management/registration/evidence/activity-detail/${id}`
          );
        }
      }
      else{
        let status = 0
        for(var i =0; i<form.length; i++){
        const res = await api.post(
          `/api/v1/incidents/${localStorage.getItem(
            "fkincidentId"
          )}/evidences/`,
          form[i]
        );
        }
        if(status === 200){
          history.push(
            `/app/incident-management/registration/evidence/activity-detail/${id}`
          );
        }
      }
    }
   
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      // setOpenError(false)
      return;
    }

    setOpen(false);
  };

  const handleChange = async (e, index) => {
    let TempPpeData = [...form];
    TempPpeData[index].evidenceCheck = e.target.value;
    // if (e.target.value !== "Yes"){

    // }
    await setForm(TempPpeData);
  };

  const handleFile = async (e, index) => {
    console.log(e.target.files[0])
    const formdata = new FormData()
    let TempPpeData = [...form];
    if (
      (TempPpeData[index].evidenceDocument =
        e.target.files[0].size <= 1024 * 1024 * 25)
    ) {
      
      TempPpeData[index].evidenceDocument = formdata.append('evidenceDocument',e.target.files[0]);
      await setForm(TempPpeData);
    } else {
      await setOpen(true);
    }
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
    // fetchEvidenceList();
    fetchIncidentDetails();
    if (id) {
      fetchEvidenceList();
    } else {
      fetchEvidenceList();
      // setIsLoading(true);
    }
  }, []);

  return (
    <PapperBlock title="Evidences" icon="ion-md-list-box">
    {/* {console.log(form)} */}
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
              <TableContainer>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: 200 }}>
                        Evidence type
                      </TableCell>
                      <TableCell style={{ width: 260 }}>
                        Yes / No / N/A
                      </TableCell>
                      <TableCell>Remarks</TableCell>
                      <TableCell>Attachments</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {form.length == 14 ? (
                      <>
                        {Object.entries(form)
                          .slice(1, 14)
                          .map(([index, value]) => (
                            <>
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  <Typography variant="body2">
                                    {value.evidenceCategory ||
                                      value.evidenceCategory}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <FormControl
                                    component="fieldset"
                                    required
                                    size="small"
                                    className={classes.fullWidth}
                                    error={
                                      error && error[`evidenceCheck${[index]}`]
                                    }
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
                                    {error &&
                                      error[`evidenceCheck${[index]}`] && (
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
                                    defaultValue={form[index].evidenceRemark}
                                    onChange={(e) => {
                                      handleComment(e, index);
                                    }}
                                  />
                                </TableCell>
                                <TableCell style={{ width: "220px" }}>
                                {form[index].evidenceDocument ? <a target ="_blank" href={form[index].evidenceDocument}>{form[index].evidenceDocument}</a> :
                                  <input
                                    type="file"
                                    className={classes.fullWidth}
                                    accept="image/png, image/jpeg , excle/xls, excel/xlsx, ppt/ppt,ppt/pptx, word/doc,word/docx, text , pdf ,  video/mp4,video/mov,video/flv,video/avi,video/mkv"
                                    disabled={
                                      value.evidenceCheck !== "Yes"
                                        ? true
                                        : false
                                    }
                                    name="file"
                                    onChange={(e) => {
                                      handleFile(e, index);
                                      // setForm([{ ...form, evidenceCheck: e.target.value }]);
                                    }}
                                  />
                                  }
                                </TableCell>
                              </TableRow>
                            </>
                          ))}
                      </>
                    ) : (
                      <>{console.log("sagar")}
                        {Object.entries(form)
                        .map(([index, value]) => (
                          <>
                            <TableRow>
                              <TableCell component="th" scope="row">
                                <Typography variant="body2">
                                  {value.evidenceCategory ||
                                    value.evidenceCategory}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <FormControl
                                  component="fieldset"
                                  required
                                  size="small"
                                  className={classes.fullWidth}
                                  error={
                                    error && error[`evidenceCheck${[index]}`]
                                  }
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
                                  {error &&
                                    error[`evidenceCheck${[index]}`] && (
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
                                  defaultValue={form[index].evidenceRemark}
                                  onChange={(e) => {
                                    handleComment(e, index);
                                  }}
                                />
                              </TableCell>
                              <TableCell style={{ width: "220px" }}>
                                <input
                                  type="file"
                                  className={classes.fullWidth}
                                  accept="image/png, image/jpeg , excle/xls, excel/xlsx, ppt/ppt,ppt/pptx, word/doc,word/docx, text , pdf ,  video/mp4,video/mov,video/flv,video/avi,video/mkv"
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
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="error">
                  The file you are attaching is bigger than the 25mb.
                </Alert>
              </Snackbar>
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
              selectedItem="Evidences"
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
