import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Fonts from "dan-styles/Fonts.scss";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
// Styles
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

const LessionLearnSummary = () => {
  const { id } = useParams();
  const [lessionlearn, setLessionLearn] = useState([]);
  const fkid = localStorage.getItem("fkincidentId");
  const [evidence, setEvidence] = useState([]);

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [documentUrl, setDocumentUrl] = useState("");
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false)

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
    if (allEvidence.status === 200) {
      await setEvidence(allEvidence.data.data.results);
    }
  };
  const download = (image_link) => {
    let onlyImage_url = image_link.replace("https://", "");
    let image_url = "http://cors.digiqt.com/" + onlyImage_url;
    let imageArray = image_url.split("/");
    let image_name = imageArray[imageArray.length - 1];
    saveAs(image_url, image_name);
    handleClose();
  };
  const handelFileName = (value) => {
    const fileNameArray = value.split("/");
    const fileName = fileNameArray[fileNameArray.length - 1];
    return fileName;
  };
  if (id) {
    localStorage.setItem("fkincidentId", id);
  }

  const handelLessionLearnt = (e, value) => {
    if (value == "modify") {
      history.push(`/incident/${id}/lesson-learnt/modify/`)
    } else if (value == "add") {
      history.push(`/incident/${id}/lesson-learnt/new/`)
    }
  }

  const handelCallBack = async () => {
    await setIsLoading(true)
    await fetchLessionLearnData();
    await fetchEvidanceData();
    await setIsLoading(false)
  }

  useEffect(() => {
    handelCallBack()
  }, []);
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <Grid container spacing={3}>
      {!isDesktop && (
        <Grid item xs={12}>
          {lessionlearn.length > 0 ?
            <Button variant="outlined" startIcon={<EditIcon />} onClick={(e) => handelLessionLearnt(e, "modify")}>
              Modify Lessons Learnt
            </Button>
            :
            <Button variant="outlined" startIcon={<EditIcon />} onClick={(e) => handelLessionLearnt(e, "add")}>
              Add Lessons Learnt
            </Button>
          }

        </Grid>
      )}
      {isLoading == false ?
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Lessons Learnt</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {lessionlearn.length !== 0
                ? lessionlearn.map((lession, key) => (
                  <Grid
                    container
                    spacing={3}
                    key={key}
                    className="repeatedGrid"
                  >
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Cause
                      </Typography>
                      <Typography className={Fonts.labelValue}>
                        {lession.teamOrDepartment}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Learnings
                      </Typography>
                      <Typography className={Fonts.labelValue}>
                        {lession.learnings}
                      </Typography>
                    </Grid>
                  </Grid>
                ))
                : null}
              <Grid item md={12}>
                {evidence.length !== 0
                  ? evidence
                    .filter(
                      (item) => item.evidenceCategory === "Lessons Learned"
                    )
                    .map((value, index) => (
                      <Grid
                        key={index}
                        className="repeatedGrid"
                        container
                        item
                        md={12}
                        spacing={3}
                      >
                        <Grid container item xs={12} spacing={3}>
                          {value.evidenceDocument ? (
                            <Grid item lg={6} md={6}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                className={Fonts.labelName}
                              >
                                Document
                              </Typography>
                              <Typography
                                variant="body"
                                className={Fonts.labelValue}
                              >


                                <Attachment value={value.evidenceDocument} />


                              </Typography>
                            </Grid>
                          ) : null}
                        </Grid>
                      </Grid>
                      // </Grid>
                    ))
                  : null}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        :
        <Loader />
      }
    </Grid>
  );
};
export default LessionLearnSummary;
