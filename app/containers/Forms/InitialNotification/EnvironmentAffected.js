import React,{useState} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";

import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from "../../../utils/constants";

import FormSideBar from "../FormSideBar";
import FormHeader from "../FormHeader";
import EnvironmentValidate from "../../Validator/EnvironmetValidation"


const useStyles = makeStyles((theme) => ({
  formControl: {
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
    marginTop: "1rem",
  },
  customLabel: {
    marginBottom: 0,
  },
}));

const EnvironmentAffected = () => {

  const [form, setForm] = useState({
    isspills:"",
    spilldetails:"",
    isrelease:"",
    releasedetails:"",
    iswildlifeimpact:"",
    wildlifeimpacedetails:"",
    iswaterbodyaffected:"",
    waterbodyaffecteddetails:"",
    comment:""
  })

  const reportedTo = [
    "Internal Leadership",
    "Police",
    "Environment Officer",
    "OHS",
    "Mital Aid",
    "Other",
  ];
  const notificationSent = ["Manage", "SuperVisor"];
  const selectValues = [1, 2, 3, 4];
  
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const [selectedTime, setSelectedTime] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [error,setError] = useState({})

  function handelNext(e){
    console.log(form)
    const { error, isValid } = EnvironmentValidate(form)
    setError(error)
    console.log(error,isValid)
  }

  const radioDecide = ["Yes", "No", "N/A"];

  const classes = useStyles();

  return (
    <div>
      {/* {console.log(INITIAL_NOTIFICATION_FORM)} */}
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            <Box marginBottom={5}>
              <FormHeader selectedHeader={"Initial notification"} />
            </Box>
            <Box borderBottom={1} marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Environment Affected
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid container item md={9} spacing={3}>
                <Grid item md={6}>
                  <p>Where there any spills</p>
                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          isspills: e.target.value,
                        });
                      }}
                    />
                  ))}
                  {error && error.isspills && <p>{error.isspills}</p> }
                </Grid>

                <Grid item md={12}>
                  <TextField
                    id="spills-details"
                    variant="outlined"
                    label="Details of spills"
                    multiline
                    rows="3"
                    className={classes.fullWidth}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        spilldetails: e.target.value,
                      });
                    }}
                  />
                  {error && error.spilldetails && <p>{error.spilldetails}</p> }
                </Grid>

                <Grid item md={6}>
                  <div className={classes.spacer}>
                    <p className={classes.customLabel}>
                      Where there any release
                    </p>

                    {radioDecide.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            isrelease: e.target.value,
                          });
                        }}
                      />
                    ))}
                  </div>
                  {error && error.isrelease && <p>{error.isrelease}</p> }
                </Grid>

                <Grid item md={12}>
                  <div>
                    {/* <p>Details of release</p> */}
                    <TextField
                      id="release-details"
                      multiline
                      variant="outlined"
                      rows="3"
                      label="Details of release"
                      className={classes.fullWidth}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          releasedetails: e.target.value,
                        });
                      }}
                    />
                  </div>
                  {error && error.releasedetails && <p>{error.releasedetails}</p> }
                </Grid>

                <Grid itemmd={6}>
                  <div className={classes.spacer}>
                    <p className={classes.customLabel}>
                      Where there any impact on wildlife
                    </p>

                    {radioDecide.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            iswildlifeimpact: e.target.value,
                          });
                        }}
                      />
                    ))}
                  </div>
                  {error && error.iswildlifeimpact && <p>{error.iswildlifeimpact}</p> }
                </Grid>

                <Grid item md={12}>
                  <div>
                    {/* <p>Details of spills</p> */}
                    <TextField
                      id="wildlife-details"
                      multiline
                      rows="3"
                      variant="outlined"
                      label="Details of spills"
                      className={classes.fullWidth}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          wildlifeimpacedetails: e.target.value,
                        });
                      }}
                    />
                  </div>
                  {error && error.wildlifeimpacedetails && <p>{error.wildlifeimpacedetails}</p> }
                </Grid>

                <Grid item md={6}>
                  <div className={classes.spacer}>
                    <p className={classes.customLabel}>
                      Where there any waterbody affected
                    </p>

                    {radioDecide.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            iswaterbodyaffected: e.target.value,
                          });
                        }}
                      />
                    ))}
                  </div>
                  {error && error.iswaterbodyaffected && <p>{error.iswaterbodyaffected}</p> }
                </Grid>

                <Grid item md={12}>
                  <div>
                    {/* <p>Details of spills</p> */}
                    <TextField
                      id="waterbody-details"
                      multiline
                      rows="3"
                      variant="outlined"
                      label="Details of spills"
                      className={classes.fullWidth}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          waterbodyaffecteddetails: e.target.value,
                        });
                      }}
                    />
                  </div>
                  {error && error.waterbodyaffecteddetails && <p>{error.waterbodyaffecteddetails}</p> }
                </Grid>

                <Grid item md={12}>
                  <div>
                    {/* <p>Comment if any</p> */}
                    <TextField
                      id="comments"
                      multiline
                      variant="outlined"
                      rows="3"
                      label="Comment if any"
                      className={classes.fullWidth}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          comment: e.target.value,
                        });
                      }}
                    />
                  </div>
                  {error && error.comment && <p>{error.comment}</p> }
                </Grid>

                <Box marginTop={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    href="http://localhost:3000/app/incident-management/registration/initial-notification/eqiptment-affected/"
                  >
                    Previouse
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    href={Object.keys(error).length === 0? 
                      "http://localhost:3000/app/incident-management/registration/initial-notification/reporting-and-notification/" 
                      : "#"}
                    onClick={(e)=>handelNext(e)}
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
              <Grid item md={3}>
                <FormSideBar
                  listOfItems={INITIAL_NOTIFICATION_FORM}
                  selectedItem={"Environment affected"}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default EnvironmentAffected;
