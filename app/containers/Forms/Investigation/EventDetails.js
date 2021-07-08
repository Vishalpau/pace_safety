import React, { useState, useEffect, useRef } from "react";
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
import PickListData from "../../../utils/Picklist/InvestigationPicklist";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const EventDetails = () => {

  const [form, setFrom] = useState({})

  const handelUpdateCheck = async (e) => {
    let page_url = window.location.href;
    const lastItem = parseInt(page_url.substring(page_url.lastIndexOf("/") + 1));
    let incidentId = !isNaN(lastItem) ? lastItem : localStorage.getItem("fkincidentId");
    putId.current = incidentId;


    let previousData = await api.get(
      `api/v1/incidents/${incidentId}/investigations/`
    );
    let allApiData = previousData.data.data.results[0];
    if (!isNaN(allApiData.id)) {
      await setForm(allApiData);
      investigationId.current = allApiData.id
    }
  };

  const activityListValues = useRef([])
  const jobTaskValues = useRef([])
  const weatherValues = useRef([])
  const lightningValues = useRef([])
  const fluidTypeValues = useRef([])
  const costTypeValues = useRef([])
  const casualFactorTypeValues = useRef([])

  const [weather, setWeather] = useState([{ weather: "" }]);
  const [overAllCost, setOverAllCost] = useState([
    { type: "", amount: "", cost: "" },
  ]);
  const notificationSent = ["Manage", "SuperVisor"];
  const selectValues = [1, 2, 3, 4];
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

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

  useEffect(async () => {
    activityListValues.current = await PickListData(63)
    jobTaskValues.current = await PickListData(64)
    weatherValues.current = await PickListData(65)
    lightningValues.current = await PickListData(66)
    fluidTypeValues.current = await PickListData(67)
    costTypeValues.current = await PickListData(68)
    casualFactorTypeValues.current = await PickListData(69)

  }, []);

  const classes = useStyles();
  return (
    <PapperBlock title="Events Details" icon="ion-md-list-box">
      {console.log(casualFactorTypeValues.current)}
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
                {activityListValues.current.map((selectValues) => (
                  <MenuItem
                    value={selectValues}
                  >
                    {selectValues}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* job task */}
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Job task</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Job task"
              >
                {jobTaskValues.current.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* equiment involved */}
          <Grid item md={6}>
            {/* <p>Eqipment Invoked</p> */}
            <TextField
              id="title"
              variant="outlined"
              label="Equipment involved"
              className={classes.formControl}
            />
          </Grid>

          {/* weather */}
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
                    {weatherValues.current.map((selectValues) => (
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

          {/* lightning */}
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Lighting</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Lighting"
              >
                {lightningValues.current.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* wind         */}
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

          {/* spills */}
          <Grid item md={12}>
            <Typography variant="h6">Spills</Typography>
          </Grid>

          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Fluid type</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Fluid type"
              >
                {fluidTypeValues.current.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Fluid amount"
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

          {/* property details */}
          <Grid item md={12}>
            <Typography variant="h6">Property details</Typography>
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
            <Typography variant="h6">Overall cost</Typography>
          </Grid>

          {/* cost incurred         */}
          {overAllCost.map((value, index) => (
            <Grid container item md={12} spacing={2} alignItems="center">
              <Grid item md={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">Cost type</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Cost type"
                    value={overAllCost[index].type}
                  >
                    {costTypeValues.current.map((selectValues) => (
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
                {/* <p>Eqipment Invoked</p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Cost amount"
                  value={overAllCost[index].amount}
                  className={classes.formControl}
                  onChange={
                    async (e) => {
                      const temp = [...overAllCost];
                      temp[index]["amount"] = e.target.value;
                      await setOverAllCost(temp);
                    }}
                />
              </Grid>

              <Grid item md={2}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">Casual factor</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Casual factor"
                    value={overAllCost[index].cost}
                  >
                    {casualFactorTypeValues.current.map((selectValues) => (
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

              <Grid item md={1}>
                <IconButton onClick={(e) => handelOveallCostAdd(e)}>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}

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
            selectedItem="Event details"
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default EventDetails;
