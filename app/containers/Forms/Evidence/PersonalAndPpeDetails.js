import React , {useState}from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import PersonalAndPpeDetailValidate from "../../Validator/PersonalAndPpeDetailValidation";

import FormSideBar from "../FormSideBar";
import { EVIDENCE_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

const useStyles = makeStyles((theme) => ({
  formControl: {
    flexDirection: "row",
    margin: "1rem 0",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const PersonalAndPpeDetails = () => {
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const [error, setError] = useState({});
  // const { id } = useParams();
  // const history = useHistory();
  // const [activtyList, setActvityList] = useState([])
  // const [ad08, setAd01] = useState({});
  // const [ad09, setAd02] = useState({});
  // const [ad01, setAd03] = useState({});
  // const [ad11, setAd04] = useState({});
  // const [ad12, setAd05] = useState({});
  // const [ad13, setAd06] = useState({});
  // const [ad14, setAd07] = useState({});


  // const handleNext = async () => {
  //   if(id !== undefined && activtyList.length > 0){
  //     history.push("/app/incident-management/registration/evidence/personal-and-ppedetails/");
  //   }
  //   else{
  //   const selectedQuestion = [ad01, ad02, ad03, ad04, ad05, ad06, ad07];
  //   console.log(selectedQuestion)
  //   for (var i = 0; i < selectedQuestion.length; i++) {
  //     const valdation = selectedQuestion[i];
  //     console.log(valdation)
  //     const { isValid, error } = ActivityDetailValidate(valdation);
  //     setError(error);
  //       const res = await api.post(`api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`,
  //         selectedQuestion[i]
  //       );
  //       console.log(res);
      
  //   }
  //   history.push("/app/incident-management/registration/evidence/personal-and-ppedetails/")
  // }
  // };
 
  // const handleUpdateActivityList = async(e,key,fieldname,activityId)=>{
  //   const temp = activtyList;
  //   console.log(temp)
  //   const value = e.target.value;
  //   temp[key][fieldname] = value;
  //   temp[key]["updatedBy"] = 0;
  //   temp[key]["updatedAt"] = moment(new Date()).toISOString();
  //   console.log(temp[key])

  //   const res = await api.put(`api/v1/incidents/${id}/activities/${activityId}/`, temp[key]);
  //   console.log(res);
  // }
  // const fetchActivityList = async()=>{
  //   const res = await api.get(`api/v1/incidents/${id}/activities/`);
  //   const result = res.data.data.results;
  //   await setActvityList(result);
  //   console.log(result)
  // }
  // useEffect(()=>{
  //   fetchActivityList();
  // },[])

  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            {/* <Box marginBottom={5}>
              <FormHeader selectedHeader={"Evidence collection"} />
            </Box> */}

            <Box borderBottom={1} marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Personal and PPE
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid container item md={9} spacing={3}>
                <Grid item md={12}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Incident number: nnnnnnnnnn
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  {/* <p>PPE worn properly</p> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    error = {error.ppeans1}
                  >
                    <FormLabel component="legend">PPE worn properly?</FormLabel>
                    <RadioGroup
                    onChange={(e) =>
                        setForm({ ...form, ppeans1: e.target.value })
                      }
                    >
                    {radioDecide.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                      />
                    ))}
                  </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  {/* <p>PPE in good shape</p> */}

                  {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    error ={error.ppeans2}
                  >
                    <FormLabel component="legend">PPE in good shape?</FormLabel>
                    <RadioGroup 
                    onChange={(e) =>
                        setForm({ ...form, ppeans2: e.target.value })
                      }>
                      {radioDecide.map((value) => (
                        <FormControlLabel
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  {/* <p>PPE Proper fit</p> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    error = {error.ppeans3}
                  >
                    <FormLabel component="legend">PPE Proper fit?</FormLabel>
                    <RadioGroup
                    onChange={(e) =>
                        setForm({ ...form, ppeans3: e.target.value })
                      }>
                      {radioDecide.map((value) => (
                        <FormControlLabel
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  {/* <p>PPE appropriate for task</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    error = {error.ppeans4}
                  >
                    <FormLabel component="legend">
                      PPE appropriate for task?
                    </FormLabel>
                    <RadioGroup
                    onChange={(e) =>
                        setForm({ ...form, ppeans4: e.target.value })
                      }>
                      {radioDecide.map((value) => (
                        <FormControlLabel
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="h6">Supervision</Typography>
                </Grid>

                <Grid item md={6}>
                  {/* <p>Employee self supervised</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    error = {error.supervisionans1}
                  >
                    <FormLabel component="legend">
                      Employee self supervised
                    </FormLabel>
                    <RadioGroup
                    onChange={(e) =>
                        setForm({ ...form, supervisionans1: e.target.value })
                      }>
                      {radioDecide.map((value) => (
                        <FormControlLabel
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  {/* <p>Supervisor present at site</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    error={error.supervisionans2}
                  >
                    <FormLabel component="legend">
                      Supervisor present at site
                    </FormLabel>
                    <RadioGroup
                    onChange={(e) =>
                        setForm({ ...form, supervisionans2: e.target.value })
                      }>
                      {radioDecide.map((value) => (
                        <FormControlLabel
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  {/* <p>Supervisor provided clear detail of work</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    error = {error.supervisionans3}
                  >
                    <FormLabel component="legend">
                      Supervisor provided clear detail of work
                    </FormLabel>
                    <RadioGroup
                    onChange={(e) =>
                        setForm({ ...form, supervisionans3: e.target.value })
                      }>
                      {radioDecide.map((value) => (
                        <FormControlLabel
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  {/* <p>Supervisor provided detail work package</p> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    error = {error.supervisionans4}
                  >
                    <FormLabel component="legend">
                      Supervisor provided detail work package
                    </FormLabel>
                    <RadioGroup
                    onChange={(e) =>
                        setForm({ ...form, supervisionans4: e.target.value })
                      }>
                      {radioDecide.map((value) => (
                        <FormControlLabel
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  {/* <p>Did supervisor conducted I-care observation</p> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    error = {error.supervisionans5}
                  >
                    <FormLabel component="legend">
                      Did supervisor conducted I-care observation
                    </FormLabel>
                    <RadioGroup
                    onChange={(e) =>
                        setForm({ ...form, supervisionans5 : e.target.value })
                      }>
                      {radioDecide.map((value) => (
                        <FormControlLabel
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="h6">Flag Person</Typography>
                </Grid>

                <Grid item md={6}>
                  {/* <p>Was flag person required for this job</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    error = {error.flagans1}
                  >
                    <FormLabel component="legend">
                      Was flag person required for this job
                    </FormLabel>
                    <RadioGroup
                    onChange={(e) =>
                        setForm({ ...form, flagans1: e.target.value })
                      }>
                      {radioDecide.map((value) => (
                        <FormControlLabel
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  {/* <p>Flag person trained/competent</p> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    error = {error.flagans2}
                  >
                    <FormLabel component="legend">
                      Flag person trained/competent
                    </FormLabel>
                    <RadioGroup
                    onChange={(e) =>
                        setForm({ ...form, flagans2: e.target.value })
                      }>
                      {radioDecide.map((value) => (
                        <FormControlLabel
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  {/* <p>Was flag person present</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    error={error.flagans3}
                  >
                    <FormLabel component="legend">
                      Was flag person present
                    </FormLabel>
                    <RadioGroup
                    onChange={(e) =>
                        setForm({ ...form, flagans3: e.target.value })
                      }>
                      {radioDecide.map((value) => (
                        <FormControlLabel
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  <Box marginBottom={3} marginTop={4}>
                    <Typography variant="h6">Other</Typography>
                  </Box>
                </Grid>

                <Grid item md={6}>
                  {/* <p>Metal on Metal incident</p> */}
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    error = {error.otherans1}
                  >
                    <FormLabel component="legend">
                      Metal on Metal incident
                    </FormLabel>
                    <RadioGroup
                    onChange={(e) =>
                        setForm({ ...form, otherans1: e.target.value })
                      }>
                      {radioDecide.map((value) => (
                        <FormControlLabel
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  {/* <p>Was person in the line of fire</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    error = {error.otherans2}
                  >
                    <FormLabel component="legend">
                      Was person in the line of fire
                    </FormLabel>
                    <RadioGroup
                    onChange={(e) =>
                        setForm({ ...form, otherans2 : e.target.value })
                      }>
                      {radioDecide.map((value) => (
                        <FormControlLabel
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href="http://localhost:3000/app/incident-management/registration/evidence/activity-detail/"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => handleNext()}
                    href={Object.keys(error).length == 0 ? "http://localhost:3000/app/incident-management/registration/evidence/additional-details/" : "#"}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={3}>
                <FormSideBar
                  listOfItems={EVIDENCE_FORM}
                  selectedItem={"Personal and Ppedetails"}
                  deleteForm={[1,2,3]}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default PersonalAndPpeDetails;
