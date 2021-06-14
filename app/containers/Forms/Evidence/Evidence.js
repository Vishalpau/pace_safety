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

            <Box borderBottom={1} marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Evidences
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
                  <Typography variant="body" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Nobis debitis saepe corporis quo inventore similique fugiat
                    voluptatem alias et quae temporibus necessitatibus ut, magni
                    ea quisquam vel, officiis cupiditate aperiam.
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Box marginBottom={2}>
                    <Typography variant="body">Evidence Type</Typography>
                  </Box>
                  <Typography variant="body2">Evidence Type 1</Typography>
                </Grid>

                <Grid item md={3} justify="center">
                  <Box marginBottom={2}>
                    <Typography variant="body">Available</Typography>
                  </Box>

                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </Grid>
                <Grid item md={4}>
                  <Box marginBottom={2}>
                    <Typography variant="body">Comments</Typography>
                  </Box>

                  <TextField
                    id="filled-basic"
                    variant="outlined"
                    label="Type...."
                  />
                </Grid>
                <Grid item md={3}>
                  <p>Attachments</p>
                  <a>Link</a>
                  <DeleteForeverIcon />
                </Grid>

                <Grid item md={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    href="#contained-buttons"
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={3}>
                <FormSideBar
                  listOfItems={EVIDENCE_FORM}
                  selectedItem={"Evidence"}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Evidence;
