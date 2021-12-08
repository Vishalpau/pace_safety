import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
// Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Icons
import Close from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GetAppIcon from "@material-ui/icons/GetApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Fonts from "dan-styles/Fonts.scss";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "../../styles/custom.css";
import api from "../../utils/axios";
import Attachment from "../Attachment/Attachment";
import Loader from "../Forms/Loader";



const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  fileIcon: {
    background: "#e2e2e2",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 650,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  modalButton: {
    width: "100%",
  },
  table: { minWidth: 900 },
}));

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const EvidenceSummary = () => {
  const [evidence, setEvidence] = useState([]);
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoding] = useState(false);
  const [documentUrl, setDocumentUrl] = useState("");
  const [expanded, setExpanded] = React.useState(false);

  const { id } = useParams();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleOpen = (document) => {
    setDocumentUrl(document);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const downloadFile = () => {
    window.location.href = `${documentUrl}`;
  };

  const download = (image_link) => {
    const onlyImage_url = image_link.replace("https://", "");
    const image_url = "http://cors.digiqt.com/" + onlyImage_url;
    const imageArray = image_url.split("/");
    const image_name = imageArray[imageArray.length - 1];
    saveAs(image_url, image_name);
    handleClose();
  };

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fetchEvidenceData = async () => {
    const allEvidence = await api.get(`/api/v1/incidents/${id}/evidences/`);
    const result = allEvidence.data.data.results;
    const newData = result.filter(
      (item) =>
        item.evidenceCategory !== "Lessons Learned" &&
        item.evidenceCategory !== "Initial Evidence"
    );
    await setEvidence(newData);

  };

  const fetchActivityData = async () => {
    const allEvidence = await api.get(`/api/v1/incidents/${id}/activities/`);
    await setActivity(allEvidence.data.data.results);
  };

  const handelFileName = (value) => {
    const fileNameArray = value.split("/");
    const fileName = fileNameArray[fileNameArray.length - 1];
    return fileName;
  };

  if (id) {
    localStorage.setItem("fkincidentId", id);
  }

  const handelEvidence = (e, value) => {
    if (value == "modify") {
      history.push(
        `/app/incident-management/registration/evidence/evidence/${id}`
      );
    } else if (value == "add") {
      history.push("/app/incident-management/registration/evidence/evidence/");
    }
  };

  const handelCallBack = async () => {
    if (id) {
      await setIsLoding(true);
      await fetchEvidenceData();
      await fetchActivityData();
      await setIsLoding(false);
    }
  }

  useEffect(() => {
    handelCallBack()
  }, []);

  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <>
      {isLoading == false ? (
        <Grid container spacing={3}>
          {!isDesktop && (
            <Grid item xs={12}>
              {evidence.length > 0 ? (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={(e) => handelEvidence(e, "modify")}
                >
                  Modify Evidence
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={(e) => handelEvidence(e, "add")}
                >
                  Add Evidence
                </Button>
              )}
            </Grid>
          )}
          <Grid item xs={12}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleExpand("panel1")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Evidence</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table className={classes.table} size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: 270 }}>
                          Evidence No
                        </TableCell>
                        <TableCell style={{ width: 300 }}>
                          Evidence Check
                        </TableCell>
                        <TableCell style={{ width: 300 }}>
                          Evidence Category
                        </TableCell>
                        <TableCell style={{ width: 400 }}>
                          Evidence Remark
                        </TableCell>
                        <TableCell style={{ width: 300 }}>
                          Evidence Document
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {evidence.length !== 0
                        ? evidence.map((value, index) => (
                          <TableRow key={index}>
                            <TableCell>{value.evidenceNumber}</TableCell>
                            <TableCell>{value.evidenceCheck}</TableCell>
                            <TableCell>{value.evidenceCategory}</TableCell>
                            <TableCell>
                              {value.evidenceRemark
                                ? value.evidenceRemark
                                : "-"}
                            </TableCell>

                            <TableCell>
                              {value.evidenceCheck !== "Yes" ? (
                                "-"
                              ) : value.evidenceDocument ? (

                                <Attachment
                                  value={value.evidenceDocument}
                                />

                              ) : (
                                "-"
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                        : null}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12}>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleExpand("panel2")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Activity Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>

                <Grid container spacing={3}>
                  {activity.length !== 0
                    ? activity.slice(0, 7).map((ad, key) => (
                      <Grid item xs={12} md={6} key={key}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {ad.question}
                        </Typography>
                        <Typography
                          variant="body"
                          className={Fonts.labelValue}
                        >
                          {ad.answer}
                        </Typography>
                      </Grid>
                    ))
                    : null}
                </Grid>

                <Grid container spacing={3}>
                  {activity.length !== 0
                    ? activity.slice(7, 8).map((ad, key) => (
                      <Grid item xs={12} md={6} key={key}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {ad.question}
                        </Typography>
                        <Typography
                          variant="body"
                          className={Fonts.labelValue}
                        >
                          {ad.answer}
                        </Typography>
                      </Grid>
                    ))
                    : null}
                </Grid>

                {activity[7] !== undefined && activity[7]["answer"] === "Yes" ?
                  <Grid container spacing={3}>
                    {activity.length !== 0
                      ? activity.slice(8, 11).map((ad, key) => (
                        <Grid item xs={12} md={6} key={key}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            className={Fonts.labelName}
                          >
                            {ad.question}
                          </Typography>
                          <Typography
                            variant="body"
                            className={Fonts.labelValue}
                          >
                            {ad.answer}
                          </Typography>
                        </Grid>
                      ))
                      : null}
                  </Grid>
                  : null}

                <Grid container spacing={3}>
                  {activity.length !== 0
                    ? activity.slice(11, 16).map((ad, key) => (
                      <Grid item xs={12} md={6} key={key}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {ad.question}
                        </Typography>
                        <Typography
                          variant="body"
                          className={Fonts.labelValue}
                        >
                          {ad.answer}
                        </Typography>
                      </Grid>
                    ))
                    : null}
                </Grid>

                <Grid container spacing={3}>
                  {activity.length !== 0
                    ? activity.slice(16, 17).map((ad, key) => (
                      <Grid item xs={12} md={6} key={key}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {ad.question}
                        </Typography>
                        <Typography
                          variant="body"
                          className={Fonts.labelValue}
                        >
                          {ad.answer}
                        </Typography>
                      </Grid>
                    ))
                    : null}
                </Grid>

                {activity[16] !== undefined && activity[16]["answer"] === "Yes" ?
                  <Grid container spacing={3}>
                    {activity.length !== 0
                      ? activity.slice(17, 20).map((ad, key) => (
                        <Grid item xs={12} md={6} key={key}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            className={Fonts.labelName}
                          >
                            {ad.question}
                          </Typography>
                          <Typography
                            variant="body"
                            className={Fonts.labelValue}
                          >
                            {ad.answer}
                          </Typography>
                        </Grid>
                      ))
                      : null}
                  </Grid>
                  : null}

                <Grid container spacing={3}>
                  {activity.length !== 0
                    ? activity.slice(20, 25).map((ad, key) => (
                      <Grid item xs={12} key={key}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {ad.question}
                        </Typography>
                        <Typography
                          variant="body"
                          className={Fonts.labelValue}
                        >
                          {ad.answer ? ad.answer : "-"}
                        </Typography>
                      </Grid>
                    ))
                    : "-"}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      ) : (
        <Loader />
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          style: {
            width: 700,
          },
        }}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {" Please choose what do you want to?"}
        </DialogTitle>
        <IconButton onClick={handleClose} className={classes.closeButton}>
          <Close />
        </IconButton>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  startIcon={<VisibilityIcon />}
                  variant="contained"
                  color="primary"
                  className={classes.modalButton}
                  disableElevation
                  href={`${documentUrl}`}
                  target="_blank"
                >
                  View Attachment
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  startIcon={<GetAppIcon />}
                  variant="contained"
                  disableElevation
                  className={classes.modalButton}
                  onClick={(e) => download(documentUrl)}
                >
                  Download Attachment
                </Button>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EvidenceSummary;
