import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AdditionalDetailValidate from "../../Validator/AdditionalDetailsValidation";

import FormSideBar from "../FormSideBar";
import { EVIDENCE_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    margin: "1rem 0",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const AdditionalDetails = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [error , setError] = React.useState({})

  const [form , setForm] = React.useState({
    que1 : "",
    ans1 : "",
    que2 : "",
    ans2 : "",
    que3 : "",
    ans3 : "",
    que4 : "",
    ans4 : "",
  })

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  

  const handleNext = () => {
    console.log('sagar',form);
    const { error, isValid } = AdditionalDetailValidate(form);
    setError(error);
    console.log(error, isValid);
    // const nextPath =  JSON.parse(localStorage.getItem("nextPath"));
    // console.log(nextPath)

    
  };

  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
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
                Additional Details
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
                <Grid item md={12}>
                  <Typography variant="h6" gutterBottom>
                    Incident Description
                  </Typography>
                  <Typography variant="body">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Nobis debitis saepe corporis quo inventore similique fugiat
                    voluptatem alias et quae temporibus necessitatibus ut, magni
                    ea quisquam vel, officiis cupiditate aperiam.
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="filled-basic"
                      variant="outlined"
                      label="Any Part/Equiptment sent for anlysis"
                      error = {error.ans1}
                      helperText = {error.ans1 ? error.ans1 : ""}
                      multiline
                      rows="4"
                      onChange={(e) => {
                        setForm({ ...form,ans1 : e.target.value})
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  {/* <p>Evidence analysis notes</p> */}

                  <FormControl className={classes.formControl}>
                    <TextField
                      id="filled-basic"
                      variant="outlined"
                      label="Evidence analysis notes"
                      error = {error.ans2}
                      helperText = {error.ans2 ? error.ans2 : ""}
                      onChange={(e) => {
                        setForm({ ...form,ans2 : e.target.value})
                      }}
                      multiline
                      rows="4"
                    />
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  {/* <p>Evidence summary</p> */}

                  <FormControl className={classes.formControl}>
                    <TextField
                      id="filled-basic"
                      variant="outlined"
                      label="Evidence summary"
                      error = {error.ans3}
                      helperText = {error.ans3 ? error.ans3 : ""}
                      onChange={(e) => {
                        setForm({ ...form,ans3 : e.target.value})
                      }}
                      multiline
                      rows="4"
                    />
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  {/* <p>Additional notes if any</p> */}

                  <FormControl className={classes.formControl}>
                    <TextField
                      id="filled-basic"
                      variant="outlined"
                      label="Additional notes if any"
                      error = {error.ans4}
                      helperText = {error.ans4 ? error.ans4 : ""}
                      onChange={(e) => {
                        setForm({ ...form,ans4 : e.target.value})
                      }}
                      multiline
                      rows="4"
                    />
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href="http://localhost:3000/app/incident-management/registration/evidence/personal-and-ppedetails/"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => handleNext()}
                    href={Object.keys(error).length == 0 ? "http://localhost:3000/app/incident-management/registration/root-cause-analysis/details/" : "#"}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>

              <Grid item md={3}>
                <FormSideBar
                deleteForm={[1,2,3]}
                  listOfItems={EVIDENCE_FORM}
                  selectedItem={"Additional detail"}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default AdditionalDetails;
