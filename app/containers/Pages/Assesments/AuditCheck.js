import React, { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { PapperBlock } from "dan-components";
import { useHistory } from "react-router-dom";
import CustomPapperBlock from "dan-components/CustomPapperBlock/CustomPapperBlock";
import AuditCheckValidator from "./validation/auditCheckValidator";
// import { api } from "../../../utils/axios";
import api, { appapi, setApiUrl } from "../../../utils/axios";
import apiAction from "../../../utils/axiosActionTracker";
import { SSO_URL } from "../../../utils/constants";
import ActionTracker from "../../Forms/ActionTracker";
import ActionShow from "../../Forms/ActionShow";
import Acl from "../../../components/Error/acl";
import { checkACL } from "../../../utils/helper";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: ".5rem 0",
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
    margin: ".5rem 0",
  },
  spacer: {
    padding: ".75rem 0",
  },
  spacerRight: {
    marginRight: ".75rem",
  },
  mToptewnty: {
    marginTop: ".50rem",
  },
  addButton: {
    "& .MuiButton-root": {
      marginTop: "9px",
      backgroundColor: "#ffffff",
      color: "#06425c",
      border: "1px solid #06425c",
      borderRadius: "4px",
      padding: "11px 12px",
    },
  },
  loadingWrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display: "inline-flex",
  },
  buttonProgress: {
    // color: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },

  radioInline: {
    flexDirection: "row",
  },
  mtTen: {
    marginTop: "7px",
  },
  mrTen: {
    marginRight: "15px",
    width: "98%",
  },
  borderCategory: {
    borderLeft: "2px solid #06425c",
  },
  formBox: {
    "& .dropzone": {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "35px",
      borderWidth: "2px",
      borderRadius: "2px",
      borderColor: "#06425c",
      borderStyle: "dashed",
      backgroundColor: "#fafafa",
      color: "#bdbdbd",
      outline: "none",
      transition: "border .24s ease-in-out",
      marginTop: "10px",
      cursor: "pointer",
    },
  },
  labelValue: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#063d55",
  },
  labelValueName: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#063d55",
    paddingLeft: "10px",
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: ".5rem 0",
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
    margin: ".5rem 0",
  },
  spacerRight: {
    marginRight: ".75rem",
  },
  mToptewnty: {
    marginTop: ".75rem",
  },
  radioInline: {
    flexDirection: "row",
  },
  tableRowColor: {
    backgroundColor: "#ffffff",
  },
  mttopThirty: {
    paddingTop: "30px",
  },
  mttopTen: {
    paddingTop: "20px",
  },
  curserPointer: {
    cursor: "Pointer",
    textDecoration: "underline",
  },
  paddZero: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
  tableHeading: {
    "& tr th": {
      backgroundColor: "#06425c",
      color: "#ffffff",
      //    lineHeight: '0.5rem',
    },
  },
  headerBackground: {
    backgroundColor: "#ffffff",
    color: "#06425c",
  },
  pTopandRight: {
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "13px",
  },
  widthFl: {
    width: "250px",
  },
  formControlTwo: {
    width: "100%",
  },
  inputTab: {
    display: "none",
  },
  widthSelect: {
    width: "150px",
  },
  table: {
    minWidth: 750,
  },
}));

const FlhaDetails = (props) => {
  const history = useHistory();

  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [updatePage, setUpdatePage] = React.useState(false);
  const [actionData, setActionData] = React.useState([]);

  const [projectStr, setProjectStr] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [step1, setStep1] = React.useState("");
  const [step2, setStep2] = React.useState("");
  const [step3, setStep3] = React.useState("");
  const [step4, setStep4] = React.useState("");
  const [step5, setStep5] = React.useState("");
  const [step6, setStep6] = React.useState("");
  const [step7, setStep7] = React.useState("");
  const [step8, setStep8] = React.useState("");
  const [step9, setStep9] = React.useState("");

  const [id1, setId1] = React.useState("1");
  const [id2, setId2] = React.useState("2");
  const [id3, setId3] = React.useState("3");
  const [id4, setId4] = React.useState("4");
  const [id5, setId5] = React.useState("5");
  const [id6, setId6] = React.useState("6");
  const [id7, setId7] = React.useState("7");
  const [id8, setId8] = React.useState("8");
  const [id9, setId9] = React.useState("9");

  const objId = {
    id1: 1,
    id2: 2,
    id3: 3,
    id4: 4,
    id5: 5,
    id6: 6,
    id7: 7,
    id8: 8,
    id9: 9,
  };

  const [idd1, setIdd1] = React.useState([]);
  const [idd2, setIdd2] = React.useState([]);
  const [idd3, setIdd3] = React.useState([]);
  const [idd4, setIdd4] = React.useState([]);
  const [idd5, setIdd5] = React.useState([]);
  const [idd6, setIdd6] = React.useState([]);
  const [idd7, setIdd7] = React.useState([]);
  const [idd8, setIdd8] = React.useState([]);
  const [idd9, setIdd9] = React.useState([]);

  const [remark1, setRemark1] = React.useState("");
  const [remark2, setRemark2] = React.useState("");
  const [remark3, setRemark3] = React.useState("");
  const [remark4, setRemark4] = React.useState("");
  const [remark5, setRemark5] = React.useState("");
  const [remark6, setRemark6] = React.useState("");
  const [remark7, setRemark7] = React.useState("");
  const [remark8, setRemark8] = React.useState("");
  const [remark9, setRemark9] = React.useState("");

  const [error, setError] = React.useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const projectId =
    JSON.parse(localStorage.getItem("projectName")) !== null
      ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
      : null;

  const createdBy = JSON.parse(localStorage.getItem("userDetails")).id;

  const { fkCompanyId } = JSON.parse(localStorage.getItem("company"));
  const fkProjectId = JSON.parse(localStorage.getItem("projectName"))
    .projectName.projectId;

  const fkUserId = JSON.parse(localStorage.getItem("userDetails")).id;

  const parts = history.location.pathname.split("/");
  const last_part = parts[parts.length - 2].replace("-", " ") * 1;
  // alert(last_part)
  const selectBreakdown =
    JSON.parse(localStorage.getItem("selectBreakDown")) !== null
      ? JSON.parse(localStorage.getItem("selectBreakDown"))
      : [];
  let struct = "";
  for (const i in selectBreakdown) {
    struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
  }
  const fkProjectStructureIds = struct.slice(0, -1);

  const [auditName, setAuditName] = React.useState("");

  const [isLock, setIsLock] = React.useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [showRadioUnplanned, setRadioUnplanned] = React.useState(false);
  const onClick = () => setRadioUnplanned(true);

  const [checked, setChecked] = React.useState(true);
  const [pageloading, setPageLoading] = useState(false);

  const [users, setUser] = React.useState([]);

  const [auditForm, setAuditForm] = React.useState({
    auditor: "",
    auditType: "",
    auditCheck: "",
    auditRemarks: "",
    fkActionNumber: "",
    status: "",
    createdBy: "",
    fkFlhaId: "",
  });

  const auditUserList = () => {
    api
      .get(
        `${SSO_URL}/api/v1/companies/` +
          JSON.parse(localStorage.getItem("company")).fkCompanyId +
          "/company-users/"
      )
      .then((response) => {
        setUser(
          response.data.data.results.users.map((user) => ({ title: user.name }))
        );
      });
  };

  const AuditCheckSubmit = () => {
    const { error, isValid } = AuditCheckValidator(auditForm);
    setError(error);
    if (!isValid) {
      return " data not valid";
    }
    ninetimeCall("Identification information complete", remark1, step1);
    ninetimeCall("Job described accurately", remark2, step2);
    ninetimeCall("Critical tasks identified", remark3, step3);
    ninetimeCall("Applicable hazards identified", remark4, step4);
    ninetimeCall("Controlled developed for hazards identified", remark5, step5);
    ninetimeCall(
      "All present earnings identified at the job site",
      remark6,
      step6
    );
    ninetimeCall("Energies isolated or controlled", remark7, step7);
    ninetimeCall(
      "Re-assessment of hazards completed after pause and restart",
      remark8,
      step8
    );
    ninetimeCall("Agreement signed", remark9, step9);
    api.put(`/api/v1/flhas/${last_part}/`, {
      fkCompanyId: fkCompanyId,
      fkProjectId: fkProjectId,
      fkProjectStructureIds: projectStr,
      flhaStage: "Open",
      flhaStatus: "Close",
      createdBy: createdBy,
    });
  };

  const ninetimeCall = async (auditType, auditRemarks, auditCheck) => {
    // let error =validate(error)
    // setError(error)
    const parts = history.location.pathname.split("/");
    const last_part = parts[parts.length - 2].replace("-", " ") * 1;
    const ProjectStructureId = parts[parts.length - 1];
    const formData = new FormData(); // formdata object
    formData.append(
      "createdBy",
      JSON.parse(localStorage.getItem("userDetails")).id
    );
    formData.append("auditor", auditForm.auditor);
    formData.append("auditType", auditType);
    formData.append("auditRemarks", auditRemarks);
    formData.append("fkFlhaId", last_part);
    formData.append("auditCheck", auditCheck);

    const res = await api.post(
      `/api/v1/flhas/${last_part}/auditchecks/`,
      formData
    );
    setLoading(true);
    if (auditType == "Agreement signed") {
      history.push(
        "/app/pages/assesments/flhasummary/" + last_part
        // "/app/pages/flha/FlhaSummary"
      );
    }
  };

  const auditData = () => {
    const parts = history.location.pathname.split("/");
    const last_part = parts[parts.length - 2].replace("-", " ") * 1;
    const ProjectStructureId = parts[parts.length - 1];
    setProjectStr(ProjectStructureId);
    const res = api
      .get(`/api/v1/flhas/${last_part}/auditchecks/`)
      .then((response) => {
        if (response.data.data.results.length) {
          setAuditName(response.data.data.results[0].auditor);
          setStep1(
            response.data.data.results.filter(
              (data) => data.auditType == "Identification information complete"
            )[0].auditCheck
          );
          setStep2(
            response.data.data.results.filter(
              (data) => data.auditType == "Job described accurately"
            )[0].auditCheck
          );
          setStep3(
            response.data.data.results.filter(
              (data) => data.auditType == "Critical tasks identified"
            )[0].auditCheck
          );
          setStep4(
            response.data.data.results.filter(
              (data) => data.auditType == "Applicable hazards identified"
            )[0].auditCheck
          );
          setStep5(
            response.data.data.results.filter(
              (data) =>
                data.auditType == "Controlled developed for hazards identified"
            )[0].auditCheck
          );
          setStep6(
            response.data.data.results.filter(
              (data) =>
                data.auditType ==
                "All present earnings identified at the job site"
            )[0].auditCheck
          );
          setStep7(
            response.data.data.results.filter(
              (data) => data.auditType == "Energies isolated or controlled"
            )[0].auditCheck
          );
          setStep8(
            response.data.data.results.filter(
              (data) =>
                data.auditType ==
                "Re-assessment of hazards completed after pause and restart"
            )[0].auditCheck
          );
          setStep9(
            response.data.data.results.filter(
              (data) => data.auditType == "Agreement signed"
            )[0].auditCheck
          );

          setId1(
            response.data.data.results.filter(
              (data) => data.auditType == "Identification information complete"
            )[0].id
          );
          setId2(
            response.data.data.results.filter(
              (data) => data.auditType == "Job described accurately"
            )[0].id
          );
          setId3(
            response.data.data.results.filter(
              (data) => data.auditType == "Critical tasks identified"
            )[0].id
          );
          setId4(
            response.data.data.results.filter(
              (data) => data.auditType == "Applicable hazards identified"
            )[0].id
          );
          setId5(
            response.data.data.results.filter(
              (data) =>
                data.auditType == "Controlled developed for hazards identified"
            )[0].id
          );
          setId6(
            response.data.data.results.filter(
              (data) =>
                data.auditType ==
                "All present earnings identified at the job site"
            )[0].id
          );
          setId7(
            response.data.data.results.filter(
              (data) => data.auditType == "Energies isolated or controlled"
            )[0].id
          );
          setId8(
            response.data.data.results.filter(
              (data) =>
                data.auditType ==
                "Re-assessment of hazards completed after pause and restart"
            )[0].id
          );
          setId9(
            response.data.data.results.filter(
              (data) => data.auditType == "Agreement signed"
            )[0].id
          );

          setRemark1(
            response.data.data.results.filter(
              (data) => data.auditType == "Identification information complete"
            )[0].auditRemarks
          );
          setRemark2(
            response.data.data.results.filter(
              (data) => data.auditType == "Job described accurately"
            )[0].auditRemarks
          );
          setRemark3(
            response.data.data.results.filter(
              (data) => data.auditType == "Critical tasks identified"
            )[0].auditRemarks
          );
          setRemark4(
            response.data.data.results.filter(
              (data) => data.auditType == "Applicable hazards identified"
            )[0].auditRemarks
          );
          setRemark5(
            response.data.data.results.filter(
              (data) =>
                data.auditType == "Controlled developed for hazards identified"
            )[0].auditRemarks
          );
          setRemark6(
            response.data.data.results.filter(
              (data) =>
                data.auditType ==
                "All present earnings identified at the job site"
            )[0].auditRemarks
          );
          setRemark7(
            response.data.data.results.filter(
              (data) => data.auditType == "Energies isolated or controlled"
            )[0].auditRemarks
          );
          setRemark8(
            response.data.data.results.filter(
              (data) =>
                data.auditType ==
                "Re-assessment of hazards completed after pause and restart"
            )[0].auditRemarks
          );
          setRemark9(
            response.data.data.results.filter(
              (data) => data.auditType == "Agreement signed"
            )[0].auditRemarks
          );
          setIsLock(true);
        }
      });
  };

  const setActions = () => {
    appapi
      .get(
        setApiUrl() +
          "api/v1/actions/?enitityReferenceId=" +
          localStorage.getItem("flhaId") +
          ":" +
          1
      )
      .then((res) => {
        setIdd1(res.data.data.results.results);
      });
    appapi
      .get(
        setApiUrl() +
          "api/v1/actions/?enitityReferenceId=" +
          localStorage.getItem("flhaId") +
          ":" +
          2
      )
      .then((res) => {
        setIdd2(res.data.data.results.results);
      });
    appapi
      .get(
        setApiUrl() +
          "api/v1/actions/?enitityReferenceId=" +
          localStorage.getItem("flhaId") +
          ":" +
          3
      )
      .then((res) => {
        setIdd3(res.data.data.results.results);
      });
    appapi
      .get(
        setApiUrl() +
          "api/v1/actions/?enitityReferenceId=" +
          localStorage.getItem("flhaId") +
          ":" +
          4
      )
      .then((res) => {
        setIdd4(res.data.data.results.results);
      });
    appapi
      .get(
        setApiUrl() +
          "api/v1/actions/?enitityReferenceId=" +
          localStorage.getItem("flhaId") +
          ":" +
          5
      )
      .then((res) => {
        setIdd5(res.data.data.results.results);
      });
    appapi
      .get(
        setApiUrl() +
          "api/v1/actions/?enitityReferenceId=" +
          localStorage.getItem("flhaId") +
          ":" +
          6
      )
      .then((res) => {
        setIdd6(res.data.data.results.results);
      });
    appapi
      .get(
        setApiUrl() +
          "api/v1/actions/?enitityReferenceId=" +
          localStorage.getItem("flhaId") +
          ":" +
          7
      )
      .then((res) => {
        setIdd7(res.data.data.results.results);
      });
    appapi
      .get(
        setApiUrl() +
          "api/v1/actions/?enitityReferenceId=" +
          localStorage.getItem("flhaId") +
          ":" +
          8
      )
      .then((res) => {
        setIdd8(res.data.data.results.results);
      });
    appapi
      .get(
        setApiUrl() +
          "api/v1/actions/?enitityReferenceId=" +
          localStorage.getItem("flhaId") +
          ":" +
          9
      )
      .then((res) => {
        setIdd9(res.data.data.results.results);
      });
  };
  const select = async () => {
    await apiAction.get(`api/v1/core/companies/select/${fkCompanyId}/`);
  };

  const handelCallBack = async () => {
    await select();
    auditUserList();
    auditData();
    setActions();
    setPageLoading(true);
  };

  React.useEffect(() => {
    handelCallBack();
  }, [updatePage]);

  return (
    <Acl
      module="safety-flha"
      action="change_flha"
      html={
        <div>
          <CustomPapperBlock
            title="FLHA - Initial Assessment"
            icon="customDropdownPageIcon flhaPageIcon"
            whiteBg
          >
            <Grid container spacing={3}>
              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Typography variant="h6" className="sectionHeading">
                  <svg
                    id="baseline-assignment-24px"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_152"
                      data-name="Path 152"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <path
                      id="Path_153"
                      data-name="Path 153"
                      d="M19,3H14.82A2.988,2.988,0,0,0,9.18,3H5A2.006,2.006,0,0,0,3,5V19a2.006,2.006,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5A2.006,2.006,0,0,0,19,3ZM12,3a1,1,0,1,1-1,1A1,1,0,0,1,12,3Zm2,14H7V15h7Zm3-4H7V11H17Zm0-4H7V7H17Z"
                      fill="#06425c"
                    />
                  </svg>{" "}
                  Audit check
                </Typography>
              </Grid>
              {pageloading == true ? (
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Paper elevation={1} className="paperSection">
                    <Grid container spacing={3}>
                      <Grid item md={6} sm={6} xs={12}>
                        {!isLock ? (
                          <Autocomplete
                            id="combo-box-demo"
                            className={classes.mtTen}
                            options={users}
                            defaultValue={auditName || ""}
                            getOptionLabel={(option) => option.title}
                            onChange={(e) =>
                              setAuditForm({
                                ...auditForm,
                                auditor: e.currentTarget.innerHTML,
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Auditor"
                                variant="outlined"
                              />
                            )}
                          />
                        ) : (
                          "Auditor Name: " + auditName
                        )}
                        <div style={{ color: "red" }}>{error.auditor}</div>

                        {/* <div style={{ color: "red" }}>{jobForm.accessToJobProcedure ? '' : error.accessToJobProcedure}</div> */}
                      </Grid>
                      <Grid item xs={12}>
                        <TableContainer>
                          <Table
                            className={classes.table}
                            aria-label="simple table"
                          >
                            <TableHead className={classes.tableHeading}>
                              <TableRow>
                                <TableCell align="left">Check</TableCell>
                                <TableCell align="left">
                                  Control and isolation method
                                </TableCell>
                                <TableCell align="left">Yes</TableCell>
                                <TableCell align="left">No</TableCell>
                                <TableCell align="left">Action</TableCell>
                                <TableCell align="left">
                                  Needs improvements (Specify)
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell align="left">1</TableCell>
                                <TableCell align="left">
                                  Identification information complete
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step1 == "Yes"}
                                    onClick={() => setStep1("Yes")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step1 == "No"}
                                    onClick={() => setStep1("No")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <ActionTracker
                                    actionContext="flha:audit"
                                    enitityReferenceId={`${localStorage.getItem(
                                      "flhaId"
                                    )}:${objId.id1}`}
                                    setUpdatePage={setUpdatePage}
                                    updatePage={updatePage}
                                    fkCompanyId={fkCompanyId}
                                    fkProjectId={
                                      JSON.parse(
                                        localStorage.getItem("projectName")
                                      ).projectName.projectId
                                    }
                                    fkProjectStructureIds={projectStr}
                                    createdBy={
                                      JSON.parse(
                                        localStorage.getItem("userDetails")
                                      ).id
                                    }
                                    handelShowData={setActions}
                                  />
                                  {checkACL(
                                    "action_tracker-actions",
                                    "view_actions"
                                  ) &&
                                    idd1.map((i1) => (
                                      <Typography
                                        className={classes.labelValueName}
                                      >
                                        <ActionShow
                                          action={{
                                            id: i1.id,
                                            number: i1.actionNumber,
                                          }}
                                          companyId={
                                            JSON.parse(
                                              localStorage.getItem("company")
                                            ).fkCompanyId
                                          }
                                          projectId={
                                            JSON.parse(
                                              localStorage.getItem(
                                                "projectName"
                                              )
                                            ).projectName.projectId
                                          }
                                          updatePage={updatePage}
                                          projectStructure={localStorage.getItem("selectBreakDown")}
                                        />
                                      </Typography>
                                    ))}
                                </TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    onChange={(e) =>
                                      setRemark1(e.currentTarget.value)
                                    }
                                    value={remark1}
                                    disabled={!!isLock}
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="left">2</TableCell>
                                <TableCell align="left">
                                  Job described accurately
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step2 == "Yes"}
                                    onClick={() => setStep2("Yes")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step2 == "No"}
                                    onClick={() => setStep2("No")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <ActionTracker
                                    actionContext="flha:audit"
                                    enitityReferenceId={`${localStorage.getItem(
                                      "flhaId"
                                    )}:${objId.id2}`}
                                    setUpdatePage={setUpdatePage}
                                    updatePage={updatePage}
                                    fkCompanyId={fkCompanyId}
                                    fkProjectId={
                                      JSON.parse(
                                        localStorage.getItem("projectName")
                                      ).projectName.projectId
                                    }
                                    fkProjectStructureIds={projectStr}
                                    createdBy={
                                      JSON.parse(
                                        localStorage.getItem("userDetails")
                                      ).id
                                    }
                                    handelShowData={setActions}
                                  />
                                  {idd2.map((i1) => (
                                    <Typography
                                      className={classes.labelValueName}
                                    >
                                      <ActionShow
                                        action={{
                                          id: i1.id,
                                          number: i1.actionNumber,
                                        }}
                                        companyId={
                                          JSON.parse(
                                            localStorage.getItem("company")
                                          ).fkCompanyId
                                        }
                                        projectId={
                                          JSON.parse(
                                            localStorage.getItem("projectName")
                                          ).projectName.projectId
                                        }
                                        updatePage={updatePage}
                                        projectStructure={localStorage.getItem("selectBreakDown")}
                                      />
                                    </Typography>
                                  ))}
                                </TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    value={remark2}
                                    disabled={!!isLock}
                                    onChange={(e) =>
                                      setRemark2(e.currentTarget.value)
                                    }
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="left">3</TableCell>
                                <TableCell align="left">
                                  Critical tasks identified
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step3 == "Yes"}
                                    onClick={() => setStep3("Yes")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step3 == "No"}
                                    onClick={() => setStep3("No")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <ActionTracker
                                    actionContext="flha:audit"
                                    enitityReferenceId={`${localStorage.getItem(
                                      "flhaId"
                                    )}:${objId.id3}`}
                                    setUpdatePage={setUpdatePage}
                                    updatePage={updatePage}
                                    fkCompanyId={fkCompanyId}
                                    fkProjectId={
                                      JSON.parse(
                                        localStorage.getItem("projectName")
                                      ).projectName.projectId
                                    }
                                    fkProjectStructureIds={projectStr}
                                    createdBy={
                                      JSON.parse(
                                        localStorage.getItem("userDetails")
                                      ).id
                                    }
                                    handelShowData={setActions}
                                  />
                                  {idd3.map((i1) => (
                                    <Typography
                                      className={classes.labelValueName}
                                    >
                                      <ActionShow
                                        action={{
                                          id: i1.id,
                                          number: i1.actionNumber,
                                        }}
                                        companyId={
                                          JSON.parse(
                                            localStorage.getItem("company")
                                          ).fkCompanyId
                                        }
                                        projectId={
                                          JSON.parse(
                                            localStorage.getItem("projectName")
                                          ).projectName.projectId
                                        }
                                        updatePage={updatePage}
                                        projectStructure={localStorage.getItem("selectBreakDown")}
                                      />
                                    </Typography>
                                  ))}
                                </TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    value={remark3}
                                    disabled={!!isLock}
                                    onChange={(e) =>
                                      setRemark3(e.currentTarget.value)
                                    }
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="left">4</TableCell>
                                <TableCell align="left">
                                  Applicable hazards identified
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step4 == "Yes"}
                                    onClick={() => setStep4("Yes")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step4 == "No"}
                                    onClick={() => setStep4("No")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <ActionTracker
                                    actionContext="flha:audit"
                                    enitityReferenceId={`${localStorage.getItem(
                                      "flhaId"
                                    )}:${objId.id4}`}
                                    setUpdatePage={setUpdatePage}
                                    updatePage={updatePage}
                                    fkCompanyId={fkCompanyId}
                                    fkProjectId={
                                      JSON.parse(
                                        localStorage.getItem("projectName")
                                      ).projectName.projectId
                                    }
                                    fkProjectStructureIds={projectStr}
                                    createdBy={
                                      JSON.parse(
                                        localStorage.getItem("userDetails")
                                      ).id
                                    }
                                    handelShowData={setActions}
                                  />
                                  {idd4.map((i1) => (
                                    <Typography
                                      className={classes.labelValueName}
                                    >
                                      <ActionShow
                                        action={{
                                          id: i1.id,
                                          number: i1.actionNumber,
                                        }}
                                        companyId={
                                          JSON.parse(
                                            localStorage.getItem("company")
                                          ).fkCompanyId
                                        }
                                        projectId={
                                          JSON.parse(
                                            localStorage.getItem("projectName")
                                          ).projectName.projectId
                                        }
                                        updatePage={updatePage}
                                        projectStructure={localStorage.getItem("selectBreakDown")}
                                      />
                                    </Typography>
                                  ))}
                                </TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    value={remark4}
                                    disabled={!!isLock}
                                    onChange={(e) =>
                                      setRemark4(e.currentTarget.value)
                                    }
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="left">5</TableCell>
                                <TableCell align="left">
                                  Controlled developed for hazards identified
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step5 == "Yes"}
                                    onClick={() => setStep5("Yes")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step5 == "No"}
                                    onClick={() => setStep5("No")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <ActionTracker
                                    actionContext="flha:audit"
                                    enitityReferenceId={`${localStorage.getItem(
                                      "flhaId"
                                    )}:${objId.id5}`}
                                    setUpdatePage={setUpdatePage}
                                    updatePage={updatePage}
                                    fkCompanyId={fkCompanyId}
                                    fkProjectId={
                                      JSON.parse(
                                        localStorage.getItem("projectName")
                                      ).projectName.projectId
                                    }
                                    fkProjectStructureIds={projectStr}
                                    createdBy={
                                      JSON.parse(
                                        localStorage.getItem("userDetails")
                                      ).id
                                    }
                                    handelShowData={setActions}
                                  />
                                  {idd5.map((i1) => (
                                    <Typography
                                      className={classes.labelValueName}
                                    >
                                      <ActionShow
                                        action={{
                                          id: i1.id,
                                          number: i1.actionNumber,
                                        }}
                                        companyId={
                                          JSON.parse(
                                            localStorage.getItem("company")
                                          ).fkCompanyId
                                        }
                                        projectId={
                                          JSON.parse(
                                            localStorage.getItem("projectName")
                                          ).projectName.projectId
                                        }
                                        updatePage={updatePage}
                                        projectStructure={localStorage.getItem("selectBreakDown")}
                                      />
                                    </Typography>
                                  ))}
                                </TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    value={remark5}
                                    disabled={!!isLock}
                                    onChange={(e) =>
                                      setRemark5(e.currentTarget.value)
                                    }
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="left">6</TableCell>
                                <TableCell align="left">
                                  All present energies identified at the job
                                  site
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step6 == "Yes"}
                                    onClick={() => setStep6("Yes")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step6 == "No"}
                                    onClick={() => setStep6("No")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <ActionTracker
                                    actionContext="flha:audit"
                                    enitityReferenceId={`${localStorage.getItem(
                                      "flhaId"
                                    )}:${objId.id6}`}
                                    setUpdatePage={setUpdatePage}
                                    updatePage={updatePage}
                                    fkCompanyId={fkCompanyId}
                                    fkProjectId={
                                      JSON.parse(
                                        localStorage.getItem("projectName")
                                      ).projectName.projectId
                                    }
                                    fkProjectStructureIds={projectStr}
                                    createdBy={
                                      JSON.parse(
                                        localStorage.getItem("userDetails")
                                      ).id
                                    }
                                    handelShowData={setActions}
                                  />
                                  {idd6.map((i1) => (
                                    <Typography
                                      className={classes.labelValueName}
                                    >
                                      <ActionShow
                                        action={{
                                          id: i1.id,
                                          number: i1.actionNumber,
                                        }}
                                        companyId={
                                          JSON.parse(
                                            localStorage.getItem("company")
                                          ).fkCompanyId
                                        }
                                        projectId={
                                          JSON.parse(
                                            localStorage.getItem("projectName")
                                          ).projectName.projectId
                                        }
                                        updatePage={updatePage}
                                        projectStructure={localStorage.getItem("selectBreakDown")}
                                      />
                                    </Typography>
                                  ))}
                                </TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    value={remark6}
                                    disabled={!!isLock}
                                    onChange={(e) =>
                                      setRemark6(e.currentTarget.value)
                                    }
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="left">7</TableCell>
                                <TableCell align="left">
                                  Energies isolated or controlled
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step7 == "Yes"}
                                    onClick={() => setStep7("Yes")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step7 == "No"}
                                    onClick={() => setStep7("No")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <ActionTracker
                                    actionContext="flha:audit"
                                    enitityReferenceId={`${localStorage.getItem(
                                      "flhaId"
                                    )}:${objId.id7}`}
                                    setUpdatePage={setUpdatePage}
                                    updatePage={updatePage}
                                    fkCompanyId={fkCompanyId}
                                    fkProjectId={
                                      JSON.parse(
                                        localStorage.getItem("projectName")
                                      ).projectName.projectId
                                    }
                                    fkProjectStructureIds={projectStr}
                                    createdBy={
                                      JSON.parse(
                                        localStorage.getItem("userDetails")
                                      ).id
                                    }
                                    handelShowData={setActions}
                                  />
                                  {idd7.map((i1) => (
                                    <Typography
                                      className={classes.labelValueName}
                                    >
                                      <ActionShow
                                        action={{
                                          id: i1.id,
                                          number: i1.actionNumber,
                                        }}
                                        companyId={
                                          JSON.parse(
                                            localStorage.getItem("company")
                                          ).fkCompanyId
                                        }
                                        projectId={
                                          JSON.parse(
                                            localStorage.getItem("projectName")
                                          ).projectName.projectId
                                        }
                                        updatePage={updatePage}
                                        projectStructure={localStorage.getItem("selectBreakDown")}
                                      />
                                    </Typography>
                                  ))}
                                </TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    value={remark7}
                                    disabled={!!isLock}
                                    onChange={(e) =>
                                      setRemark7(e.currentTarget.value)
                                    }
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="left">8</TableCell>
                                <TableCell align="left">
                                  Re-assessment of hazards completed after pause
                                  and restart
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step8 == "Yes"}
                                    onClick={() => setStep8("Yes")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step8 == "No"}
                                    onClick={() => setStep8("No")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <ActionTracker
                                    actionContext="flha:audit"
                                    enitityReferenceId={`${localStorage.getItem(
                                      "flhaId"
                                    )}:${objId.id8}`}
                                    setUpdatePage={setUpdatePage}
                                    updatePage={updatePage}
                                    fkCompanyId={fkCompanyId}
                                    fkProjectId={
                                      JSON.parse(
                                        localStorage.getItem("projectName")
                                      ).projectName.projectId
                                    }
                                    fkProjectStructureIds={projectStr}
                                    createdBy={
                                      JSON.parse(
                                        localStorage.getItem("userDetails")
                                      ).id
                                    }
                                    handelShowData={setActions}
                                  />
                                  {idd8.map((i1) => (
                                    <Typography
                                      className={classes.labelValueName}
                                    >
                                      <ActionShow
                                        action={{
                                          id: i1.id,
                                          number: i1.actionNumber,
                                        }}
                                        companyId={
                                          JSON.parse(
                                            localStorage.getItem("company")
                                          ).fkCompanyId
                                        }
                                        projectId={
                                          JSON.parse(
                                            localStorage.getItem("projectName")
                                          ).projectName.projectId
                                        }
                                        updatePage={updatePage}
                                        projectStructure={localStorage.getItem("selectBreakDown")}
                                      />
                                    </Typography>
                                  ))}
                                </TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    value={remark8}
                                    disabled={!!isLock}
                                    onChange={(e) =>
                                      setRemark8(e.currentTarget.value)
                                    }
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell align="left">9</TableCell>
                                <TableCell align="left">
                                  Agreement signed
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step9 == "Yes"}
                                    onClick={() => setStep9("Yes")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    inputProps={{
                                      "aria-label": "uncontrolled-checkbox",
                                    }}
                                    disabled={!!isLock}
                                    checked={step9 == "No"}
                                    onClick={() => setStep9("No")}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <ActionTracker
                                    actionContext="flha:audit"
                                    enitityReferenceId={`${localStorage.getItem(
                                      "flhaId"
                                    )}:${objId.id9}`}
                                    setUpdatePage={setUpdatePage}
                                    updatePage={updatePage}
                                    fkCompanyId={fkCompanyId}
                                    fkProjectId={
                                      JSON.parse(
                                        localStorage.getItem("projectName")
                                      ).projectName.projectId
                                    }
                                    fkProjectStructureIds={projectStr}
                                    createdBy={
                                      JSON.parse(
                                        localStorage.getItem("userDetails")
                                      ).id
                                    }
                                    handelShowData={setActions}
                                  />
                                  {idd9.map((i1) => (
                                    <Typography
                                      className={classes.labelValueName}
                                    >
                                      <ActionShow
                                        action={{
                                          id: i1.id,
                                          number: i1.actionNumber,
                                        }}
                                        companyId={
                                          JSON.parse(
                                            localStorage.getItem("company")
                                          ).fkCompanyId
                                        }
                                        projectId={
                                          JSON.parse(
                                            localStorage.getItem("projectName")
                                          ).projectName.projectId
                                        }
                                        updatePage={updatePage}
                                        projectStructure={localStorage.getItem("selectBreakDown")}
                                      />
                                    </Typography>
                                  ))}
                                </TableCell>
                                <TableCell align="left">
                                  <TextField
                                    variant="outlined"
                                    id="immediate-actions"
                                    multiline
                                    rows="1"
                                    label=""
                                    value={remark9}
                                    disabled={!!isLock}
                                    onChange={(e) =>
                                      setRemark9(e.currentTarget.value)
                                    }
                                    className={classes.fullWidth}
                                  />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </Paper>
                  <Grid item md={12} xs={12}>
                    <Grid
                      item
                      md={12}
                      sm={12}
                      xs={12}
                      className="buttonActionArea"
                    >
                      <div className={classes.loadingWrapper}>
                        {isLock ? (
                          ""
                        ) : (
                          <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            className="spacerRight buttonStyle"
                            onClick={() => AuditCheckSubmit()}
                            disabled={loading}
                          >
                            Submit
                          </Button>
                        )}
                        {loading && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                      <Button
                        size="medium"
                        variant="contained"
                        color="secondary"
                        className="buttonStyle custmCancelBtn"
                        onClick={() => {
                          history.push(
                            "/app/pages/assesments/flhasummary/" + last_part
                          );
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                "Loading..."
              )}
            </Grid>
          </CustomPapperBlock>
        </div>
      }
    />
  );
};

export default FlhaDetails;
