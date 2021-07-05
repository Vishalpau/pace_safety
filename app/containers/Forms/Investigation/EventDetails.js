import React, { useState } from "react";
import { Button, Grid, Container, Input, Select } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { PapperBlock } from "dan-components";
import AddIcon from "@material-ui/icons/Add";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import IconButton from "@material-ui/core/IconButton";

import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import { useSelector } from "react-redux";
import { ContactlessOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const EventDetails = () => {
  const reportedTo = [
    "Internal Leadership",
    "Police",
    "Environment Officer",
    "OHS",
    "Mital Aid",
    "Other",
  ];

  const [weather, setWeather] = useState([{ weather: "" }]);
  const [overAllCost, setOverAllCost] = useState([
    { type: "", amount: "", cost: "" },
  ]);
  const notificationSent = ["Manage", "SuperVisor"];
  const selectValues = [1, 2, 3, 4];
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const radioDecide = ["Yes", "No"];

  const handelWeather = async (e, key, value) => {
    console.log(e.target.value);
    const temp = [...weather];
    temp[key]["weather"] = value;
    await setWeather(temp);
  };

  const handelAdd = async (e) => {
    if (weather.length < 3) {
      await setWeather([...weather, { weather: "" }]);
    }
  };

  const handelRemove = async (e, index) => {
    if (weather.length > 1) {
      let newData = weather.filter((item, key) => key !== index);
      await setWeather(newData);
    }
  };

  const handelOveallCostAdd = async (e) => {
    if (overAllCost.length < 4) {
      await setOverAllCost([
        ...overAllCost,
        { type: "", amount: "", cost: "" },
      ]);
    }
  };

  const handelOverallCostRemove = async (e, index) => {
    if (overAllCost.length > 1) {
      let newData = overAllCost.filter((item, key) => key !== index);
      await setOverAllCost(newData);
    }
  };

  const classes = useStyles();
  return (
    <PapperBlock title="Events Details" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Activity</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Activity"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Job Task</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Job Task"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            {/* <p>Eqipment Invoked</p> */}
            <TextField
              id="title"
              variant="outlined"
              label="Equipment Involved"
              className={classes.formControl}
            />
          </Grid>

          {weather.map((value, index) => (
            <>
              <Grid item md={11}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">Weather</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Weather"
                    value={weather[index].weather || ""}
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem
                        value={selectValues}
                        onClick={(e) => handelWeather(e, index, selectValues)}
                      >
                        {selectValues}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {weather.length > 1 ? (
                <Grid item md={1}>
                  <IconButton onClick={(e) => handelRemove(e, index)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Grid>
              ) : null}
            </>
          ))}

          {weather.length < 3 ? (
            <Grid item md={1}>
              <IconButton onClick={(e) => handelAdd(e)}>
                <AddIcon />
              </IconButton>
            </Grid>
          ) : null}

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Temprature"
              className={classes.formControl}
            />
          </Grid>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Lighting</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Lighting"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6">Wind</Typography>
          </Grid>

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Speed"
              className={classes.formControl}
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Direction"
              className={classes.formControl}
            />
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6">Spills</Typography>
          </Grid>

          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Fluid Type</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Fluid type"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Fluid Amount"
              className={classes.formControl}
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="AEL"
              className={classes.formControl}
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="PEL"
              className={classes.formControl}
            />
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6">Property Details</Typography>
          </Grid>

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Impact Information"
              className={classes.formControl}
            />
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6">Overall Cost</Typography>
          </Grid>

          {overAllCost.map((value, index) => (
            <>
              <Grid item md={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">Fluid Type</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Fluid Type"
                    value={overAllCost[index].type}
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem
                        value={selectValues}
                        onClick={async (e) => {
                          const temp = [...overAllCost];
                          temp[index]["type"] = selectValues;
                          await setOverAllCost(temp);
                        }}
                      >
                        {selectValues}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">Amount</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Amount"
                    value={overAllCost[index].amount}
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem
                        value={selectValues}
                        onClick={async (e) => {
                          const temp = [...overAllCost];
                          temp[index]["amount"] = selectValues;
                          await setOverAllCost(temp);
                        }}
                      >
                        {selectValues}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={2}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">Cost Factor</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Cost Factor"
                    value={overAllCost[index].cost}
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem
                        value={selectValues}
                        onClick={async (e) => {
                          const temp = [...overAllCost];
                          temp[index]["cost"] = selectValues;
                          await setOverAllCost(temp);
                        }}
                      >
                        {selectValues}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {overAllCost.length > 1 ? (
                <Grid item md={1}>
                  <IconButton
                    onClick={(e) => handelOverallCostRemove(e, index)}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Grid>
              ) : null}
            </>
          ))}

          <Grid item md={1}>
            <IconButton onClick={(e) => handelOveallCostAdd(e)}>
              <AddIcon />
            </IconButton>
          </Grid>

          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="http://localhost:3000/app/incident-management/registration/investigation/Equipment-impact-details/"
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="http://localhost:3000/app/incident-management/registration/investigation/action-taken/"
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            deleteForm={[1, 2, 3]}
            listOfItems={INVESTIGATION_FORM}
            selectedItem="Event Details"
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default EventDetails;
