import React from "react";
import { Button, Grid, Container } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import RemoveCircleOutlineSharpIcon from '@material-ui/icons/RemoveCircleOutlineSharp';

import AddSharpIcon from '@material-ui/icons/AddSharp';

const WhyAnalysis = () => {
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const radioDecide = ["Yes", "No"];
  return (
    <Container>
      <Paper>
        <Grid container justify="flex-start">
          <Grid item lg={12} md={6} sm={6}>
            <h2> Why Analysis</h2>
            <hr />
          </Grid>
          <Grid item lg={4} md={12} sm={12}>
            <p> incident number: nnnnnnn</p>
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
            <p> Method: Why Analysis</p>
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <h6> Incident Description </h6>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </p>

            <h4> Level of investigation</h4>
            <span>Level 5</span>
          </Grid>
          <Grid item lg={12} md={6} sm={6}>
            <p>Evidence collection</p>
            <TextField id="filled-basic" />
          </Grid>
          <Grid item lg={12} md={6} sm={6}>
            <p>why3</p>
            <TextField id="filled-basic" />
            <RemoveCircleOutlineSharpIcon className="fa fa-plus-circle" style={{ fontSize: 30 }} />
          </Grid>
          <Grid item lg={12} md={6} sm={6}>
            <p>why2</p>
            <TextField id="filled-basic" />
            <RemoveCircleOutlineSharpIcon className="fa fa-plus-circle" style={{ fontSize: 30 }} />
          </Grid>
          <Grid item lg={12} md={6} sm={6}>
            <p>why1</p>
            <TextField id="filled-basic" />
            <RemoveCircleOutlineSharpIcon className="fa fa-plus-circle" style={{ fontSize: 30  }} />
          </Grid>
          <Grid>
          <AddSharpIcon  style={{ fontSize: 30, color:'blue' }} />
          <a href='/'>Add</a>
          </Grid>
          <Grid>
          <Button variant="contained" color="primary">
              Next
        </Button>
            </Grid>
          
        </Grid>
      </Paper>
    </Container>
  );
};

export default WhyAnalysis;
