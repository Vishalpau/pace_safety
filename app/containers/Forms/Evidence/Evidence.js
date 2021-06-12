import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import FormSideBar from "../FormSideBar";
import { EVIDENCE_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

const Evidence = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No", "N/A"];
  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            <Box marginBottom={5}>
              <FormHeader selectedHeader={"Evidence collection"} />
            </Box>
            <Box marginBottom={4}>
              <Typography variant="h6" gutterBottom>
                Evidences
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
            <Grid container justify="flex-start">
              <Grid item md={3}>
                <p>Evidance type</p>
                <p>Evidance type 1</p>
              </Grid>

              <Grid item md={3}>
                <p>Aviliable</p>

                <FormControl>
                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </FormControl>
              </Grid>
              <Grid item md={3}>
                <p>Comments</p>

                <TextField id="filled-basic" />
              </Grid>
              <Grid item md={3}>
                <p>Attachments</p>
                <a>Link</a>
                <DeleteForeverIcon />
              </Grid>

              <Button
                variant="contained"
                color="primary"
                href="#contained-buttons"
              >
                Next
              </Button>
            </Grid>
          </Box>
          <Grid>
            <FormSideBar
              listOfItems={EVIDENCE_FORM}
              selectedItem={"Evidence"}
            />
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default Evidence;
