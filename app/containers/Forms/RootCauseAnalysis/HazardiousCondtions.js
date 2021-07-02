import React, { useEffect, useState, useRef } from 'react';
import { Button, Grid, Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory, useParams } from 'react-router';

import api from '../../../utils/axios';
import FormHeader from '../FormHeader';
import FormSideBar from '../FormSideBar';
import { ROOT_CAUSE_ANALYSIS_FORM, SAFETYITEMS } from '../../../utils/constants';
import HazardiousConditionsValidation from '../../Validator/RCAValidation/HazardiousConditonsValidation';
import { WARNINGSYSTEM, ENERGIES, TOOLS, CONDITIONSAFETYITEMS } from '../../../utils/constants';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const HazardiousCondition = () => {
  const [commonForm, setCommonForm] = useState({
    rcaNumber: 'string',
    rcaType: 'string',
    status: 'Active',
    createdBy: 0,
    updatedBy: 0,
    fkIncidentId: parseInt(localStorage.getItem('fkincidentId')),
  });

  const [error, setError] = useState({});

  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    warningSystem: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    energyTypes: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    tools: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    safetyitems: { remarkType: "", rcaSubType: "", rcaRemark: [] },
    others: { remarkType: "", rcaSubType: "", rcaRemark: "" },
  });


  const putId = useRef("")
  const [fetchApiData, setFetchApiData] = useState({})
  const { id } = useParams();
  const history = useHistory();
  const updateIds = useRef()


  // get data and set to states
  const handelUpdateCheck = async () => {
    let allrcaSubType = ["warningSystem", "energyTypes", "tools", "safetyitems", "othersconditions"]
    let tempApiData = {}
    let tempApiDataId = []
    let page_url = window.location.href
    const lastItem = parseInt(page_url.substring(page_url.lastIndexOf('/') + 1))

    if (!isNaN(lastItem)) {

      let previousData = await api.get(`/api/v1/incidents/${lastItem}/pacecauses/`)
      putId.current = lastItem
      console.log(putId)
      let allApiData = previousData.data.data.results

      allApiData.map(value => {
        if (allrcaSubType.includes(value.rcaSubType)) {
          let valueQuestion = value.rcaSubType
          let valueAnser = value.rcaRemark
          tempApiData[valueQuestion] = valueAnser
          tempApiDataId.push(value.id)
        }
      })
      updateIds.current = tempApiDataId.reverse()

      setForm({
        ...form,
        warningSystem: {
          remarkType: 'options',
          rcaSubType: 'warningSystem',
          rcaRemark: tempApiData.warningSystem.includes(',') ? tempApiData.warningSystem.split(",") : [tempApiData.warningSystem],
        },
        energyTypes: {
          remarkType: 'options',
          rcaSubType: 'energyTypes',
          rcaRemark: tempApiData.energyTypes.includes(',') ? tempApiData.energyTypes.split(",") : [tempApiData.energyTypes],
        },
        tools: {
          remarkType: 'options',
          rcaSubType: 'tools',
          rcaRemark: tempApiData.tools.includes(',') ? tempApiData.tools.split(",") : [tempApiData.tools],
        },
        safetyitems: {
          remarkType: 'options',
          rcaSubType: 'safetyitems',
          rcaRemark: tempApiData.safetyitems.includes(',') ? tempApiData.safetyitems.split(",") : [tempApiData.safetyitems],
        },
        others: {
          remarkType: 'remark',
          rcaSubType: 'othersconditions',
          rcaRemark: tempApiData.othersconditions,
        }
      });

    }
  }

  const handelWarningSystems = (e, value) => {
    if (e.target.checked == false) {
      const newData = form.warningSystem.rcaRemark.filter(
        (item) => item !== value
      );
      setForm({
        ...form,
        warningSystem: {
          remarkType: 'options',
          rcaSubType: 'warningSystem',
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        warningSystem: {
          remarkType: 'options',
          rcaSubType: 'warningSystem',
          rcaRemark: [...form.warningSystem.rcaRemark, value],
        },
      });
    }
  };

  const handelEnergyTypes = (e, value) => {
    if (e.target.checked == false) {
      const newData = form.energyTypes.rcaRemark.filter((item) => item !== value);
      setForm({
        ...form,
        energyTypes: {
          remarkType: 'options',
          rcaSubType: 'energyTypes',
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        energyTypes: {
          remarkType: 'options',
          rcaSubType: 'energyTypes',
          rcaRemark: [...form.energyTypes.rcaRemark, value],
        },
      });
    }
  };

  const handelTools = (e, value) => {
    if (e.target.checked == false) {
      const newData = form.tools.rcaRemark.filter((item) => item !== value);
      setForm({
        ...form,
        tools: {
          remarkType: 'options',
          rcaSubType: 'tools',
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        tools: {
          remarkType: 'options',
          rcaSubType: 'tools',
          rcaRemark: [...form.tools.rcaRemark, value],
        },
      });
    }
  };

  const handelSafetyItems = (e, value) => {
    if (e.target.checked == false) {
      const newData = form.safetyitems.rcaRemark.filter((item) => item !== value);
      setForm({
        ...form,
        safetyitems: {
          remarkType: 'options',
          rcaSubType: 'safetyitems',
          rcaRemark: newData,
        },
      });
    } else {
      setForm({
        ...form,
        safetyitems: {
          remarkType: 'options',
          rcaSubType: 'safetyitems',
          rcaRemark: [...form.safetyitems.rcaRemark, value],
        },
      });
    }
  };

  const handelOthers = (e) => {
    setForm({
      ...form,
      others: {
        remarkType: 'remark',
        rcaSubType: 'othersconditions',
        rcaRemark: e.target.value,
      },
    });
  };

  const handelNext = async (e) => {

    const { error, isValid } = HazardiousConditionsValidation(form);
    await setError(error);
    let tempData = []

    Object.entries(form).map(async (item, index) => {
      let api_data = item[1]
      // post request object
      if (putId.current == "") {
        let temp = {
          createdBy: "0",
          fkIncidentId: localStorage.getItem("fkincidentId"),
          rcaRemark: api_data["rcaRemark"].toString(),
          rcaSubType: api_data["rcaSubType"],
          rcaType: "Basic",
          remarkType: api_data["remarkType"],
          status: "Active"
        }
        tempData.push(temp)
        // put request object
      } else {
        let temp = {
          createdBy: "0",
          fkIncidentId: localStorage.getItem("fkincidentId"),
          rcaRemark: api_data["rcaRemark"].toString(),
          rcaSubType: api_data["rcaSubType"],
          rcaType: "Basic",
          remarkType: api_data["remarkType"],
          status: "Active",
          pk: updateIds.current[index]
        }
        tempData.push(temp)
      }
    })

    // api call //
    let nextPageLink = 0
    let callObjects = tempData
    for (let key in callObjects) {
      if (Object.keys(error).length == 0) {

        if (putId.current !== "") {
          const res = await api.put(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/pacecauses/${callObjects[key].pk}/`, callObjects[key]);
          if (res.status == 200) {
            console.log("request done")
            nextPageLink = res.status
          }
        } else {
          const res = await api.post(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/pacecauses/`, callObjects[key]);
          if (res.status == 201) {
            console.log("request done")
            nextPageLink = res.status
          }
        }
      }
      if (nextPageLink == 201) {
        history.push("/app/incident-management/registration/root-cause-analysis/cause-and-action/")
      } else {
        history.push(`/app/incident-management/registration/root-cause-analysis/cause-and-action/${putId.current}`)
      }
    }
    // api call //  
  }

  const selectValues = ['Option1', 'Option2', '....'];

  const classes = useStyles();

  useEffect(() => {
    handelUpdateCheck()
    // location.reload()
  }, []);

  return (
    <Container>
      <Paper>
        <Box padding={3} bgcolor="background.paper">
          <Box borderBottom={1} marginBottom={2}>
            <Typography variant="h6" gutterBottom>
              Immediate Causes - Hazardous conditions
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid container item md={9} spacing={3}>
              <Grid item md={4}>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Incident number:
                    {' '}
                    {localStorage.getItem('fkincidentId')}
                  </Typography>
                </Box>
              </Grid>

              <Grid item md={8}>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    RCA Method: PACE Cuase Analysis
                  </Typography>
                </Box>
              </Grid>

              {/* warning system */}
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.warningSystem}>
                    Warning System
                  </FormLabel>
                  <FormGroup>
                    {WARNINGSYSTEM.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={<small>{value}</small>}
                        checked={form.warningSystem.rcaRemark.includes(value)}
                        onChange={async (e) => handelWarningSystems(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.warningSystem && (
                  <p>
                    <small style={{ color: 'red' }}>
                      {error.warningSystem}
                    </small>
                  </p>
                )}
              </Grid>

              {/* energy types */}
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.energyTypes}>
                    {' '}
                    Energy Types
                  </FormLabel>
                  <FormGroup>
                    {ENERGIES.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={<small>{value}</small>}
                        checked={form.energyTypes.rcaRemark.includes(value)}
                        onChange={async (e) => handelEnergyTypes(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.energyTypes && (
                  <p>
                    <small style={{ color: 'red' }}>{error.energyTypes}</small>
                  </p>
                )}
              </Grid>

              {/* tools */}
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.tools}>
                    {' '}
                    Tools
                  </FormLabel>
                  <FormGroup>
                    {TOOLS.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={<small>{value}</small>}
                        checked={form.tools.rcaRemark.includes(value)}
                        onChange={async (e) => handelTools(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.tools && (
                  <p>
                    <small style={{ color: 'red' }}>{error.tools}</small>
                  </p>
                )}
              </Grid>

              {/* safety items */}
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" error={error.safetyitems}>
                    {' '}
                    Saftey Items
                  </FormLabel>
                  <FormGroup>
                    {CONDITIONSAFETYITEMS.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={<small>{value}</small>}
                        checked={form.safetyitems.rcaRemark.includes(value)}
                        onChange={async (e) => handelSafetyItems(e, value)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {error && error.safetyitems && (
                  <p>
                    <small style={{ color: 'red' }}>{error.safetyitems}</small>
                  </p>
                )}
              </Grid>

              {/* others     */}
              <Grid item md={12}>
                {/* <p>others</p> */}
                <TextField
                  variant="outlined"
                  id="filled-basic"
                  label="Others"
                  multiline
                  error={error.others}
                  defaultValue={form.others.rcaRemark}
                  helperText={error ? error.others : ''}
                  rows={3}
                  className={classes.formControl}
                  onChange={async (e) => handelOthers(e)}
                />
                {/* {error && error.others && (
                  <p>{error.others}</p>
                )} */}
              </Grid>

              <Grid item md={12}>
                <Box marginTop={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/hazardious-acts/"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    // href={Object.keys(error).length > 0 ? '#' : "/app/incident-management/registration/root-cause-analysis/cause-and-action/"}
                    onClick={(e) => handelNext(e)}
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                selectedItem="Hazardious conditions"
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default HazardiousCondition;
