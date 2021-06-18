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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            <Box marginBottom={5}>
              <FormHeader selectedHeader={"Evidence collection"} />
            </Box>

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
                      multiline
                      rows="4"
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
                    href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/details/"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>

              <Grid item md={3}>
                <FormSideBar
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
