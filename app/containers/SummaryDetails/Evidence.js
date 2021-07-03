import React, { useEffect, useState  } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import { useHistory, useParams } from "react-router";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { PapperBlock } from 'dan-components';
import CheckCircle from '@material-ui/icons/CheckCircle';
import AccessTime from '@material-ui/icons/AccessTime';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';

// List
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

// Icons
import Print from '@material-ui/icons/Print';
import Share from '@material-ui/icons/Share';
import Close from '@material-ui/icons/Close';
import Comment from '@material-ui/icons/Comment';
import History from '@material-ui/icons/History';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';

// Styles
import Styles from 'dan-styles/Summary.scss';
import Type from 'dan-styles/Typography.scss';
import Fonts from 'dan-styles/Fonts.scss';
import moment from 'moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import api from '../../utils/axios'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const EvidenceSummary = () => {
  const [evidence, setEvidence] = useState({});
  const [activity, setActivity] = useState([]);
  const [ isLoading, setIsLoding] = useState(false);
  const { id }  = useParams();

  // const fkid = localStorage.getItem('fkincidentId');
  console.log(evidence)
  const fetchEvidanceData = async () => {
    const allEvidence = await api.get(`/api/v1/incidents/${id}/evidences/${localStorage.getItem("id")}/`);
    await setEvidence(allEvidence.data.data.results);
    await setIsLoding(true)

  };

  const fetchActivityData = async () => {
    const allEvidence = await api.get(`/api/v1/incidents/${id}/activities/`);
    await setActivity(allEvidence.data.data.results);
  };

  useEffect(() => {
    if(id){
      fetchEvidanceData();
    fetchActivityData();
    
    }
    setIsLoding(true)
    
    
  }, []);
  const classes = useStyles();
  return (
    <PapperBlock title=" Evidences" icon="ion-md-list-box">
    {isLoading ? (
      
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Evidence</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {evidence
              ?  (
                <Grid container item xs={12} spacing={3} >
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
                      color="textSecondary"
                      className={Fonts.labelValue}
                    >
                      {evidence.evidenceNumber}
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
                      color="textSecondary"
                      className={Fonts.labelValue}
                    >
                      {evidence.evidenceCheck}
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
                      color="textSecondary"
                      className={Fonts.labelValue}
                    >
                      {evidence.evidenceCategory}
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
                      color="textSecondary"
                      className={Fonts.labelValue}
                    >
                      {evidence.evidenceRemark}
                    </Typography>
                  </Grid>
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
                      color="textSecondary"
                      className={Fonts.labelValue}
                    >
                      {evidence.evidenceDocument}
                    </Typography>
                  </Grid>
                </Grid>
              )
              : null}
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Activity Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {activity.length !== 0
              ? activity.map((ad, key) => (
                <Grid item xs={12} spacing={3} key={key}>
                  <Grid item lg={12}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {ad.question}
                    </Typography>
                    <Typography
                      variant="body"
                      color="textSecondary"
                      className={Fonts.labelValue}
                    >
                      {ad.answer}
                    </Typography>
                  </Grid>
                </Grid>
              ))
              : null}
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
   ):(<h1>Loading...</h1>)}
    </PapperBlock>
  );
};
export default EvidenceSummary;
