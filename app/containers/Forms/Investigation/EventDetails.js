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
import AddIcon from '@material-ui/icons/Add';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

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

  const [weather, setWeather] = useState([{ weather: "" }])
  const [overAllCost, setOverAllCost] = useState([{ type: "", amount: "", cost: "" }])
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
    console.log(e.target.value)
    const temp = [...weather];
    temp[key]["weather"] = value;
    await setWeather(temp);
  }

  const handelAdd = async (e) => {
    if (weather.length < 3) {
      await setWeather([...weather, { weather: "" }])
    }
  }

  const handelRemove = async (e, index) => {
    if (weather.length > 1) {
      let newData = weather.filter((item, key) => key !== index)
      await setWeather(newData)
    }
  }

  const handelOveallCostAdd = async (e) => {
    if (overAllCost.length < 4) {
      await setOverAllCost([...overAllCost, { type: "", amount: "", cost: "" }])
    }
  }

  const handelOverallCostRemove = async (e, index) => {
    if (overAllCost.length > 1) {
      let newData = overAllCost.filter((item, key) => key !== index)
      await setOverAllCost(newData)
    }
  }


  const classes = useStyles();
  return (
    <PapperBlock title="Events Details" icon="ion-md-list-box">
      {console.log(overAllCost)}
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
              <Grid item md={10}>
                {/* <p> weather</p> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">weather</InputLabel>
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

              {
                weather.length > 1 ?
                  <Grid item md={1}>
                    <RemoveCircleOutlineIcon onClick={(e) => handelRemove(e, index)} fontSize="large" />
                  </Grid> :
                  null
              }
            </>
          ))}

          {weather.length < 3 ?
            <Grid item md={1}>
              <AddIcon onClick={(e) => handelAdd(e)} fontSize="large" />
            </Grid>
            : null}

          <Grid item md={6}>
            {/* <p> Temprature(c</p> */}
            <TextField
              id="title"
              variant="outlined"
              label="Temprature"
              className={classes.formControl}
            />
          </Grid>
          <Grid item md={6}>
            {/* <p>Lighting</p> */}
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
          <Grid item md={12}><h1>Wind</h1></Grid>
          <Grid item md={6}>
            {/* <p> Wind Speed</p> */}
            <TextField
              id="title"
              variant="outlined"
              label="Speed"
              className={classes.formControl}
            />
          </Grid>

          <Grid item md={6}>
            {/* <p> Wind Speed</p> */}
            <TextField
              id="title"
              variant="outlined"
              label="Direction"
              className={classes.formControl}
            />
          </Grid>

          <Grid item md={12}><h1>Spills</h1></Grid>

          <Grid item md={6}>
            <p>Fluid type</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Lighting</InputLabel>
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
            <p>Fluid amount</p>
            <TextField
              id="title"
              variant="outlined"
              label="Fluid amount"
              className={classes.formControl}
            />
          </Grid>

          <Grid item md={6}>
            <p>AEL</p>
            <TextField
              id="title"
              variant="outlined"
              label="AEL"
              className={classes.formControl}
            />
          </Grid>

          <Grid item md={6}>
            <p>PEL</p>
            <TextField
              id="title"
              variant="outlined"
              label="PEL"
              className={classes.formControl}
            />
          </Grid>



          <Grid item md={12}>
            <Typography variant="h6">Property details</Typography>
          </Grid>
          <Grid item md={6}>
            {/* <p>Fluid Amount</p> */}
            <TextField
              id="title"
              variant="outlined"
              label="Impact Information"
              className={classes.formControl}
            />
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6">Overall cost</Typography>
          </Grid>

          {overAllCost.map((value, index) => (
            <>
              <Grid item md={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">Type</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Fluid type"
                    value={overAllCost[index].type}
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem
                        value={selectValues}
                        onClick={async (e) => {
                          const temp = [...overAllCost];
                          temp[index]["type"] = selectValues;
                          await setOverAllCost(temp)
                        }
                        }
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
                    label="Fluid type"
                    value={overAllCost[index].amount}
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem
                        value={selectValues}
                        onClick={async (e) => {
                          const temp = [...overAllCost];
                          temp[index]["amount"] = selectValues;
                          await setOverAllCost(temp)
                        }
                        }
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
                    label="Fluid type"
                    value={overAllCost[index].cost}
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem
                        value={selectValues}
                        onClick={async (e) => {
                          const temp = [...overAllCost];
                          temp[index]["cost"] = selectValues;
                          await setOverAllCost(temp)
                        }
                        }
                      >
                        {selectValues}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {
                overAllCost.length > 1 ?
                  <Grid item md={1}>
                    <RemoveCircleOutlineIcon onClick={(e) => handelOverallCostRemove(e, index)} fontSize="large" />
                  </Grid> :
                  null
              }
            </>
          ))}


          <Grid item md={1}>
            <AddIcon onClick={(e) => handelOveallCostAdd(e)} fontSize="large" />
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
    </PapperBlock >
  );
};

export default EventDetails;
