import { FormHelperText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MuiAlert from "@material-ui/lab/Alert";
import { PapperBlock } from "dan-components";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-grid-system";
import { useHistory, useParams } from "react-router";
import Type from "../../../styles/components/Fonts.scss";
import api from "../../../utils/axios";
import { EVIDENCE_FORM } from "../../../utils/constants";
import Attachment from "../../Attachment/Attachment";
import EvidenceValidate from "../../Validator/EvidenceValidation";
import FormSideBar from "../FormSideBar";
import Loader from "../Loader";


const useStyles = makeStyles((theme) => ({
  formControl: {
    flexDirection: "row",
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
  table: {
    minWidth: 800,
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
  const [error, setError] = useState({});
  const { id } = useParams();
  const history = useHistory();

  const [evideceData, setEvideceData] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState(false);
  const [incidentDetail, setIncidentDetail] = useState({});
  const [isNext, setIsNext] = useState(true);
  const [form, setForm] = React.useState([
    {
      evidenceCategory: "Worker statement",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: null,
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: id || localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Witness statements",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: null,
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: id || localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Supervisor statements",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: null,
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: id || localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Pictures",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: null,
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: id || localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Applicable policies and procedures",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: null,
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: id || localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Time line of incident",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: null,
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: id || localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Scope of work, JHA/ FLHA",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: null,
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: id || localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "SME opinions",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: null,
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: id || localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Manufacturer recommendations",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: null,
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: id || localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Historical similar incidents",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: null,
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: id || localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Electronic communication evidence",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: null,
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: id || localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Regulatory requirements",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: null,
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: id || localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      evidenceCategory: "Compentency level",
      evidenceCheck: "",
      evidenceRemark: "",
      evidenceDocument: null,
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
      fkIncidentId: id || localStorage.getItem("fkincidentId"),
      error: "",
    },
  ]);

  const [isLoading, setIsLoading] = React.useState(false);

  const fetchEvidenceList = async () => {
    const lastItem = id || localStorage.getItem("fkincidentId");
    const res = await api.get(`/api/v1/incidents/${lastItem}/evidences/`)
      .then((res) => {
        const result = res.data.data.results;
        const newData = result.filter(
          (item) =>
            item.evidenceCategory !== "Lessons Learned" &&
            item.evidenceCategory !== "Initial Evidence"
        );
        const tempData = [];
        if (newData.length > 0) {
          for (let i = 0; i < newData.length; i++) {
            if (newData[i].evidenceCheck !== "Yes") {
              tempData.push({
                evidenceCategory: newData[i].evidenceCategory,
                evidenceCheck: newData[i].evidenceCheck,
                evidenceRemark: newData[i].evidenceRemark,
                evidenceDocument: null,
                status: "Active",
                createdBy: 0,
                updatedBy: 0,
                fkIncidentId: id || localStorage.getItem("fkincidentId"),
                pk: newData[i].id,
              });
            } else {
              tempData.push({
                evidenceCategory: newData[i].evidenceCategory,
                evidenceCheck: newData[i].evidenceCheck,
                evidenceRemark: newData[i].evidenceRemark,
                evidenceDocument: newData[i].evidenceDocument,
                status: "Active",
                createdBy: 0,
                updatedBy: 0,
                fkIncidentId: id || localStorage.getItem("fkincidentId"),
                pk: newData[i].id,
              });
            }
          }

          setForm(tempData);
          setEvideceData(tempData);
        }
        setIsLoading(true);
      })
      .catch(() => { })


  };

  const fetchIncidentDetails = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId") || id}/`
    ).then((res) => {
      const result = res.data.data.results;
      setIncidentDetail(result);
    })
      .catch(() => history.push("/app/pages/error"))

  };

  // On the next button click function call.

  const handleNext = async () => {
    const { error, isValid } = EvidenceValidate(form);
    if (evideceData.length > 0) {

    }
    await setError(error);

    if (!isValid) {
      return "Data is not valid";
    }

    for (let i = 0; i < form.length; i++) {
      const data = new FormData();
      data.append("evidenceCheck", form[i].evidenceCheck);
      data.append("evidenceCategory", form[i].evidenceCategory);
      data.append("evidenceRemark", form[i].evidenceRemark);
      if (
        form[i].evidenceDocument !== null &&
        typeof form[i].evidenceDocument !== "string"
      ) {
        data.append("evidenceDocument", form[i].evidenceDocument);
      }
      if (form[i].evidenceDocument == "") {
        data.append("evidenceDocument", form[i].evidenceDocument);
      }
      data.append("status", "Active");
      data.append("updatedBy", "");

      // If update is the case.
      if (id) {
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
        for (let i = 0; i < evideceData.length; i++) {
          const data = new FormData();
          data.append("pk", evideceData[i].pk);
          data.append("evidenceCheck", evideceData[i].evidenceCheck);
          data.append("evidenceNumber", evideceData[i].evidenceNumber);
          data.append("evidenceCategory", evideceData[i].evidenceCategory);
          data.append("evidenceDocument", evideceData[i].evidenceDocument);
          data.append("status", "");
          data.append("createdAt", evideceData[i].createdAt);
          data.append("createdBy", evideceData[i].createdBy);
          data.append("updatedAt", evideceData[i].updatedAt);
          data.append("updatedBy", evideceData[i].updatedBy);
          data.append("fkIncidentId", evideceData[i].fkIncidentId);
        }
        const res = await api.put(
          `/api/v1/incidents/${localStorage.getItem(
            "fkincidentId"
          )}/evidences/${evideceData[i].pk}/`,
          data
        );
        if (res.status === 200) {
          history.push(
            "/app/incident-management/registration/evidence/activity-detail/"
          );
        }
      } else {



        data.append("createdAt", form[i].createdAt);
        data.append("createdBy", form[i].createdBy);
        data.append("updatedAt", form[i].updatedAt);
        data.append("updatedBy", form[i].updatedBy);
        data.append("fkIncidentId", form[i].fkIncidentId);
        if (Object.keys(error).length == 0) {
          const res = await api.post(
            `/api/v1/incidents/${localStorage.getItem(
              "fkincidentId"
            )}/evidences/`,
            data
          );

          if (res.status === 201) {
            history.push(
              "/app/incident-management/registration/evidence/activity-detail/"
            );
          }
        }
      }
    }
  };

  const handleSubmit = async () => {
    const temp = incidentDetail;
    if (incidentDetail.incidentStage == "Investigation") {
      try {
        temp.updatedAt = new Date().toISOString();
        temp.incidentStage = "Evidence"
        temp.incidentStatus = "pending"
        const res = await api.put(
          `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
          temp
        );
      } catch (error) {
        alert("something went wrong")
      }
    }
    const { error, isValid } = EvidenceValidate(form);
    await setError(error);
    if (isValid === true) {
      setIsNext(false);
      let status = 0;
      if (evideceData.length > 0) {

        for (let i = 0; i < form.length; i++) {
          try {
            const data = new FormData();
            data.append("evidenceCheck", form[i].evidenceCheck);
            data.append("evidenceNumber", form[i].evidenceNumber);
            data.append("evidenceCategory", form[i].evidenceCategory);
            data.append("evidenceRemark", form[i].evidenceRemark);
            if (typeof form[i].evidenceDocument !== "string") {
              if (form[i].evidenceDocument !== null) {
                data.append("evidenceDocument", form[i].evidenceDocument);
              }
            }
            data.append("status", "Active");
            data.append("updatedAt", new Date().toISOString());
            data.append("updatedBy", form[i].updatedBy);
            data.append("fkIncidentId", form[i].fkIncidentId);
            if (form[i].pk) {
              const res = await api.put(
                `/api/v1/incidents/${localStorage.getItem(
                  "fkincidentId"
                )}/evidences/${form[i].pk}/`,
                data
              );
              if (res.status === 200) {
                status = 201;
              }
            } else {
              const res = await api.post(
                `/api/v1/incidents/${localStorage.getItem(
                  "fkincidentId"
                )}/evidences/`,
                data
              );
              status = res.status;
            }
          } catch (error) {
            setIsNext(true);
          }
        }
      } else {

        for (let i = 0; i < form.length; i++) {
          try {
            const data = new FormData();
            data.append("evidenceCheck", form[i].evidenceCheck);
            data.append("evidenceNumber", form[i].evidenceNumber);
            data.append("evidenceCategory", form[i].evidenceCategory);
            data.append("evidenceRemark", form[i].evidenceRemark);
            if (typeof form[i].evidenceDocument !== "string") {
              if (form[i].evidenceDocument !== null) {
                data.append("evidenceDocument", form[i].evidenceDocument);
              }
            }
            data.append("status", "Active");
            data.append("updatedAt", new Date().toISOString());
            data.append("updatedBy", form[i].updatedBy);
            data.append("fkIncidentId", form[i].fkIncidentId);
            data.append("createdAt", new Date().toISOString());
            data.append("createdBy", form[i].createdBy);
            const res = await api.post(
              `/api/v1/incidents/${localStorage.getItem(
                "fkincidentId"
              )}/evidences/`,
              data
            );
            status = res.status;
          } catch (error) {
            setIsNext(true);
          }
        }
      }

      if (status === 201) {
        history.push(
          `/app/incident-management/registration/evidence/activity-detail/${localStorage.getItem(
            "fkincidentId"
          )}`
        );
      }
    } else { setIsNext(true) }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleFileClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFiles(false);
  };

  const handleChange = async (e, index) => {
    const TempPpeData = [...form];
    TempPpeData[index].evidenceCheck = e.target.value;
    if (e.target.value !== "Yes") {
      document.getElementById(`evidenceDocument${index}`).value = "";
      TempPpeData[index].evidenceDocument = null;

      await setForm(TempPpeData);
    } else {
      await setForm(TempPpeData);
    }
  };

  const handleFile = async (e, index) => {
    const file = e.target.files[0].name.toLowerCase().split(".");
    if (
      file[1] == "jpg" ||
      file[1] == "png" ||
      file[1] == "pdf" ||
      file[1] == "xlsx" ||
      file[1] == "xls" ||
      file[1] == "ppt" ||
      file[1] == "pptx" ||
      file[1] == "doc" ||
      file[1] == "docx" ||
      file[1] == "text" ||
      file[1] == "mp4" ||
      file[1] == "mov" ||
      file[1] == "flv" ||
      file[1] == "avi" ||
      file[1] == "mkv"
    ) {
      const TempPpeData = [...form];

      if (
        (TempPpeData[index].evidenceDocument =
          e.target.files[0].size <= 1024 * 1024 * 25)
      ) {
        TempPpeData[index].evidenceDocument = e.target.files[0];
        await setForm(TempPpeData);
      } else {
        document.getElementById(`evidenceDocument${index}`).value = "";
        await setOpen(true);
      }
    } else {
      document.getElementById(`evidenceDocument${index}`).value = "";
      await setFiles(true);
    }
  };

  const handleComment = async (e, index) => {
    const TempPpeData = [...form];
    TempPpeData[index].evidenceRemark = e.target.value;
    await setForm(TempPpeData);
  };

  const handelFileName = (value) => {
    const fileNameArray = value.split("/");
    const fileName = fileNameArray[fileNameArray.length - 1];
    return fileName;
  };

  const radioDecide = ["Yes", "No", "N/A"];

  useEffect(() => {
    fetchIncidentDetails();
    if (localStorage.getItem("fkincidentId")) {
      fetchEvidenceList();
    } else {
      setIsLoading(true);
    }
  }, []);

  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <PapperBlock title="Evidences" icon="ion-md-list-box">
      {isLoading ? (
        <Row>
          <Col md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  className={Type.labelName}
                  gutterBottom
                >
                  Incident number
                </Typography>
                <Typography className={Type.labelValue}>
                  {incidentDetail.incidentNumber}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  className={Type.labelName}
                  gutterBottom
                >
                  Incident description
                </Typography>
                <Typography className={Type.labelValue}>
                  {incidentDetail.incidentDetails}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TableContainer component={Paper}>
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
                      {Object.entries(form).map(([index, value]) => (
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
                                value={
                                  form[index].evidenceRemark === null
                                    ? ""
                                    : form[index].evidenceRemark
                                }
                                onChange={(e) => {
                                  handleComment(e, index);
                                }}
                              />
                            </TableCell>
                            <TableCell style={{ width: "220px" }}>
                              <input
                                type="file"
                                id={`evidenceDocument${index}`}
                                className={classes.fullWidth}
                                accept=".png, .jpg , .xls , .xlsx , .ppt , .pptx, .doc, .docx, .text , .pdf ,  .mp4, .mov, .flv, .avi, .mkv"
                                disabled={value.evidenceCheck !== "Yes"}
                                name="file"
                                onChange={(e) => {
                                  handleFile(e, index);
                                }}
                              />

                              {value.evidenceDocument ===
                                null ? null : typeof value.evidenceDocument ===
                                  "string" ? (
                                <Attachment value={value.evidenceDocument} />
                              ) : null}
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
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
                <Snackbar
                  open={files}
                  autoHideDuration={6000}
                  onClose={handleFileClose}
                >
                  <Alert onClose={handleFileClose} severity="error">
                    This file format is not allow , only
                    (png/jpg/xls/xlsx/ppt/pptx/doc/docx/text/pdf/mp4/mov/flv/avi/mkv)
                    file format is allow here.
                  </Alert>
                </Snackbar>
              </Grid>

              <Grid item md={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit()}
                  disabled={!isNext}
                >
                  Next{isNext ? null : <CircularProgress size={20} />}
                </Button>
              </Grid>
            </Grid>
          </Col>
          {isDesktop && (
            <Col md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={EVIDENCE_FORM}
                selectedItem="Evidences"
              />
            </Col>
          )}
        </Row>
      ) : (
        <Loader />
      )}
    </PapperBlock>
  );
};
export default Evidence;
