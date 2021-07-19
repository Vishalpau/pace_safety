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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import api from "../../utils/axios";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "@material-ui/core/Modal";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import VisibilityIcon from "@material-ui/icons/Visibility";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
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
}));


function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
}

const LessionLearnSummary = () => {
  const [lessionlearn, setLessionLearn] = useState([]);
  const fkid = localStorage.getItem("fkincidentId");
  const [evidence,setEvidence] = useState([]);

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [documentUrl, setDocumentUrl] = useState('')
  
  const handleOpen = (document) => {
    setDocumentUrl(document);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchLessionLearnData = async () => {
    const allIncidents = await api.get(`api/v1/incidents/${fkid}/learnings/`);
    await setLessionLearn(allIncidents.data.data.results);
  };

  const fetchEvidanceData = async () => {
    
    const allEvidence = await api.get(`/api/v1/incidents/${fkid}/evidences/`);
    if(allEvidence.status === 200){
      await setEvidence(allEvidence.data.data.results);
    }
    
    // await setIsLoding(true);
  };

  console.log(lessionlearn);
  useEffect(() => {
    fetchLessionLearnData();
    console.log(open)
    fetchEvidanceData();
  }, []);
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Lesson Learn</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {lessionlearn.length !== 0
              ? lessionlearn.map((lession, key) => (
                  <Grid container item md={9} spacing={3} key={key}>
                    <Grid lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Team Or Department
                      </Typography>
                      <Typography
                        variant="p"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        {lession.teamOrDepartment}
                      </Typography>
                    </Grid>
                    <Grid lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Learnings
                      </Typography>
                      <Typography
                        variant="p"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        {lession.learnings}
                      </Typography>
                    </Grid>
                  </Grid>
                ))
              : null}
                <Grid item md={12}>
              {evidence.length !== 0
                  ? evidence.filter(item=> item.evidenceCategory === "Lessons Learned").map((value, index) => (
                      <Grid
                        key={index}
                        className="repeatedGrid"
                        container
                        item
                        md={12}
                        spacing={3}
                      >
                        <Grid container item xs={12} spacing={3}>
                          <Grid item lg={6} md={6}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              className={Fonts.labelName}
                            >
                              Evidence No
                            </Typography>
                            <Typography
                              variant="body"
                              className={Fonts.labelValue}
                            >
                              {value.evidenceNumber}
                            </Typography>
                          </Grid>
                          <Grid item lg={6} md={6}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              className={Fonts.labelName}
                            >
                              Evidence Check
                            </Typography>
                            <Typography
                              variant="body"
                              className={Fonts.labelValue}
                            >
                              {value.evidenceCheck}
                            </Typography>
                          </Grid>
                          <Grid item lg={6} md={6}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              className={Fonts.labelName}
                            >
                              Evidence Category
                            </Typography>
                            <Typography
                              variant="body"
                              className={Fonts.labelValue}
                            >
                              {value.evidenceCategory}
                            </Typography>
                          </Grid>
                          <Grid item lg={6} md={6}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              className={Fonts.labelName}
                            >
                              Evidence Remark
                            </Typography>
                            <Typography
                              variant="body"
                              className={Fonts.labelValue}
                            >
                              {value.evidenceRemark}
                            </Typography>
                          </Grid>
                          {value.evidenceDocument ? (
                            <Grid item lg={6} md={6}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                className={Fonts.labelName}
                              >
                                Evidence Document
                              </Typography>
                              <Typography
                                variant="body"
                                className={Fonts.labelValue}
                              >
                                <Tooltip title="File Name">
                                  <IconButton
                                    onClick={() =>
                                      handleOpen(value.evidenceDocument)
                                    }
                                    className={classes.fileIcon}
                                  >
                                    <PhotoSizeSelectActualIcon />
                                  </IconButton>
                                </Tooltip>
                              </Typography>
                            </Grid>
                          ) : null}
                        </Grid>
                      </Grid>
                    ))
                  : null}
              </Grid>
                  {/* Modal */}
        <Modal className={classes.modal} open={open} onClose={handleClose}>
        <div className={classes.paper}>
        <Typography variant="h6" gutterBottom>
            View Attachment
          </Typography>
          <Typography>Please choose what do you want to?</Typography>
          <Box marginTop={4}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  startIcon={<VisibilityIcon />}
                  style={{ width: "100%" }}
                  variant="contained"
                  disableElevation
                  href={`${documentUrl}`}
                  target="_blank"
                >
                  View Attachment
                </Button>
              </Grid>
              <Grid item xs={6}>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Modal>

          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};
export default LessionLearnSummary;
