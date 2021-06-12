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

import FormSideBar from '../FormSideBar'
import { EVIDENCE_FORM } from '../../../utils/constants'
import FormHeader from '../FormHeader'

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    margin: "1rem 0",
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
        <FormHeader selectedHeader = {"Evidence collection"}/>
          <Box padding={3} bgcolor="background.paper">
            <Box marginBottom={4}>
              <Typography variant="h6" gutterBottom>
                Additional Details
              </Typography>
            </Box>
            <Box marginBottom={4} borderBottom={1}>
              <Typography variant="body2" gutterBottom>
                Incident number: nnnnnnnnnn
              </Typography>
            </Box>
            <Box marginBottom={3}>
              <Typography variant="h6" gutterBottom>
                Incident Description
              </Typography>
              <Typography variant="p" gutterBottom>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
                debitis saepe corporis quo inventore similique fugiat voluptatem
                alias et quae temporibus necessitatibus ut, magni ea quisquam
                vel, officiis cupiditate aperiam.
              </Typography>
            </Box>
            <Grid container>
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
            </Grid>
            <Box marginTop={4}>
              <Button
                variant="contained"
                color="primary"
                href="#contained-buttons"
              >
                Next
              </Button>
            </Box>
          </Box>
          <Grid><FormSideBar listOfItems={EVIDENCE_FORM} selectedItem={"Additional detail"} /></Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default AdditionalDetails;
