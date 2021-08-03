import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { useHistory, useParams } from "react-router";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { PapperBlock } from "dan-components";
import CheckCircle from "@material-ui/icons/CheckCircle";
import AccessTime from "@material-ui/icons/AccessTime";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "@material-ui/core/Modal";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

// List
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

// Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// Icons
import Print from "@material-ui/icons/Print";
import Share from "@material-ui/icons/Share";
import Close from "@material-ui/icons/Close";
import Comment from "@material-ui/icons/Comment";
import History from "@material-ui/icons/History";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import GetAppIcon from "@material-ui/icons/GetApp";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import ImageIcon from "@material-ui/icons/Image";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import DescriptionIcon from "@material-ui/icons/Description";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

// Styles
import Styles from "dan-styles/Summary.scss";
import Type from "dan-styles/Typography.scss";
import Fonts from "dan-styles/Fonts.scss";
import moment from "moment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import api from "../../utils/axios";
import "../../styles/custom.css";
import axios from "axios";
import Link from "@material-ui/core/Link";
import { mdiFilePdf } from '@mdi/js';

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
    // boxShadow: theme.shadows[5],
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
}

const EvidenceSummary = () => {
  const [evidence, setEvidence] = useState([]);
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoding] = useState(false);
  const [documentUrl, setDocumentUrl] = useState("");
  const [expanded, setExpanded] = React.useState(false);

  const { id } = useParams();
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
    let onlyImage_url = image_link.replace("https://", "")
    let image_url = "http://cors.digiqt.com/" + onlyImage_url
    let imageArray = image_url.split("/")
    let image_name = imageArray[imageArray.length - 1]
    saveAs(image_url, image_name)
    handleClose()
  };

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fetchEvidanceData = async () => {
    const allEvidence = await api.get(`/api/v1/incidents/${id}/evidences/`);
    const result = allEvidence.data.data.results
    const newData = result.filter(
      (item) => item.evidenceCategory !== "Lessons Learned" && item.evidenceCategory !== "Initial Evidence"
    )
    await setEvidence(newData);
    await setIsLoding(true);
  };

  const fetchActivityData = async () => {
    const allEvidence = await api.get(`/api/v1/incidents/${id}/activities/`);
    await setActivity(allEvidence.data.data.results);
  };

  const handelFileName = (value) => {
    const fileNameArray = value.split('/')
    const fileName = fileNameArray[fileNameArray.length - 1]
    return fileName
  }

  useEffect(() => {
    if (id) {
      fetchEvidanceData();
      fetchActivityData();
    }
    setIsLoding(true);
  }, []);

  const classes = useStyles();
  return (
    <>
      {isLoading ? (
        <Grid container spacing={3}>
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
                  <Table style={{ minWidth: 900 }} size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: 200 }}>
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
                            <TableCell>{value.evidenceRemark ? value.evidenceRemark : '-'}</TableCell>
                            
                              <TableCell>
                              {value.evidenceDocument ? (
                                <Tooltip title={handelFileName(value.evidenceDocument)}>
                                  <IconButton
                                    onClick={() =>
                                      handleOpen(value.evidenceDocument)
                                    }
                                    className={classes.fileIcon}
                                  >
                                    {value.evidenceDocument.endsWith(
                                       ".PNG"
                                    ) || value.evidenceDocument.endsWith(
                                       ".png"
                                    ) 
                                      ||value.evidenceDocument.endsWith(
                                        ".jpg"
                                    ) ? (
                                      <ImageIcon />
                                    ) : null}
                                    {value.evidenceDocument.endsWith(
                                      ".pdf"
                                    ) ? (
                                      <PictureAsPdfIcon />
                                    ) : null}
                                    {value.evidenceDocument.endsWith(
                                      ".mp4"
                                    ) ||
                                      value.evidenceDocument.endsWith(".mov") ||
                                      value.evidenceDocument.endsWith(".flv") ||
                                      value.evidenceDocument.endsWith(
                                        ".avi"
                                      ) ? (
                                      <VideoCallIcon />
                                    ) : null}
                                    {value.evidenceDocument.endsWith(
                                      ".xls"
                                    ) ||
                                      value.evidenceDocument.endsWith(
                                        ".xlsx"
                                      ) ? (
                                      <DescriptionIcon />
                                    ) : null}
                                    {value.evidenceDocument.endsWith(
                                      ".ppt"
                                    ) ||
                                      value.evidenceDocument.endsWith(
                                        ".pptx"
                                      ) ? (
                                      <DescriptionIcon />
                                    ) : null}
                                    {value.evidenceDocument.endsWith(
                                      ".text"
                                    ) ? (
                                      <TextFieldsIcon />
                                    ) : null}
                                    {value.evidenceDocument.endsWith(
                                      ".docx"
                                    ) ||
                                      value.evidenceDocument.endsWith(
                                        ".doc"
                                      ) ? (
                                      <TextFieldsIcon />
                                    ) : null}
                                  </IconButton>
                                </Tooltip>
                                ) : '-'}
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
                    ? activity.slice(0, 21).map((ad, key) => (
                      <Grid item md={6} key={key}>
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
                    ? activity.slice(21, 25).map((ad, key) => (
                      <Grid item md={12} key={key}>
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
        <h1>Loading...</h1>
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
