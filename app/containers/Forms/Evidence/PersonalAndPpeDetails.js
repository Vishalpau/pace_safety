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
  const [form , setForm] = useState({
    ppeque1 : "PPE worn properly?",
    ppeans1 : "",
    ppeque2 : "PPE in good shape?",
    ppeans2 : "",
    ppeque3 : "PPE Proper fit?",
    ppeans3 : "",
    ppeque4 : "PPE appropriate for task?",
    ppeans4 : "",

    supervisionque1 : "Employee self supervised",
    supervisionans1 : "",
    supervisionque2 : "Supervisor present at site",
    supervisionans2 : "",
    supervisionque3 : "Supervisor provided clear detail of work", 
    supervisionans3 : "",
    supervisionque4 : "Supervisor provided detail work package",
    supervisionans4 : "",
    supervisionque5 : "Did supervisor conducted I-care observation",
    supervisionans5 : "",

    flagque1 : "Was flag person required for this job",
    flagans1 : "",
    flagque2 : "Flag person trained/competent",
    flagans2 : "",
    flagque3 : "Was flag person present", 
    flagans3 : "",

    otherque1 : "Metal on Metal incident",
    otherans1 : "",
    otherque2 : "Was person in the line of fire",
    otherans2 : "",

  })
  console.log(form.otherans1)
  const handleNext = () => {
    console.log('sagar',form);
    const { error, isValid } = PersonalAndPpeDetailValidate(form);
    setError(error);
    console.log(error, isValid);
    // const nextPath =  JSON.parse(localStorage.getItem("nextPath"));
    // console.log(nextPath)

    
  };

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
