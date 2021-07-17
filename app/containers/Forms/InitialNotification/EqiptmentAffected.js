import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { PapperBlock } from 'dan-components';
import { useHistory, useParams } from 'react-router';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add';
import FormHelperText from '@material-ui/core/FormHelperText';

import FormSideBar from '../FormSideBar';
import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from '../../../utils/constants';
import api from '../../../utils/axios';
import EquipmentValidate from '../../Validator/EquipmentValidation';
import '../../../styles/custom.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
  },
  customLabel: {
    marginBottom: 0,
  },
  textButton: {
    color: '#3498db',
    padding: 0,
    textDecoration: 'underline',
    display: 'inlineBlock',
    marginBlock: '1.5rem',
    backgroundColor: 'transparent',
  },
  button: {
    margin: theme.spacing(1),
  },
  inlineRadioGroup: {
    flexDirection: 'row',
    gap: '1.5rem',
  },
}));

const EqiptmentAffected = () => {
  const reportedTo = [
    'Internal Leadership',
    'Police',
    'Environment Officer',
    'OHS',
    'Mital Aid',
    'Other',
  ];


  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [error, setError] = useState({});
  const [equipmentAffected, setequipmentAffected] = useState([]);
  const [equipmentTypeValue, setEquipmentTypeValue] = useState([]);
  const [detailsOfEquipmentAffect, setDetailsOfEquipmentAffect] = useState('No');
  const [equipmentListdata, setEquipmentListData] = useState([]);
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [equipmentDamagedComments, setEequipmentDamagedComments] = useState('');
  const [form, setForm] = useState([
    {
      equipmentType: '',
      equipmentOtherType: '',
      equipmentDeatils: '',
      createdBy: 1,
      fkIncidentId: localStorage.getItem('fkincidentId'),
    },
  ]);

  // hablde Remove preivous data

  const handleRemove = async (key) => {
    if (equipmentListdata.length > 1) {
      const temp = equipmentListdata;
      const newData = temp.filter((item) => item.id !== key);
      await setPeopleData(newData);
    } else {
      const temp = form;
      const newData = temp.filter((item, index) => index !== key);
      await setForm(newData);
    }
  };

  // Add new equipment details
  const addNewEquipmentDetails = () => {
    setForm([
      ...form,
      {
        equipmentType: '',
        equipmentOtherType: '',
        equipmentDeatils: '',
        createdBy: 1,
        fkIncidentId: localStorage.getItem('fkincidentId'),
      },
    ]);
  };

  // set  state form value 
  const handleForm = (e, key, fieldname) => {
    const temp = [...form];
    const { value } = e.target;
    temp[key][fieldname] = value;
    setForm(temp);
  };

  // hit next button for next page
  const handleNext = async () => {
    const nextPath = JSON.parse(localStorage.getItem('nextPath'));
    //  cheack condition equipment is already filled or new creation
     if (detailsOfEquipmentAffect === 'Yes') {
      if (equipmentListdata.length > 0) {
        // send request for update
  
        for (let i = 0; i < equipmentListdata.length; i++) {
          const res = await api.delete(
            `api/v1/incidents/${id}/equipments/${equipmentListdata[i].id}/`,
          
          );
        }
        // decide for next path
        if (nextPath.environmentAffect === 'Yes') {
          history.push(
            `/app/incident-management/registration/initial-notification/environment-affected/${id}`
          );
        } else {
          history.push(
            `/app/incident-management/registration/initial-notification/reporting-and-notification/${id}`
          );
        }
      }
      const { error, isValid } = EquipmentValidate(form);
      setError(error);
      const status = 0;

      for (let i = 0; i < form.length; i++) {
        const res = await api.post(
          `/api/v1/incidents/${localStorage.getItem(
            'fkincidentId'
          )}/equipments/`,
          {
            equipmentType: form[i].equipmentType,
            equipmentOtherType: form[i].equipmentOtherType,
            equipmentDeatils: form[i].equipmentDeatils,
            createdBy: 1,
            fkIncidentId: localStorage.getItem('fkincidentId'),
          }
        );
      }
      const temp = incidentsListData;
      temp.equipmentDamagedComments = equipmentDamagedComments || incidentsListData.equipmentDamagedComments;
      temp.isEquipmentDamagedAvailable = detailsOfEquipmentAffect
        || incidentsListData.isEquipmentDamagedAvailable;
      temp.updatedAt = moment(new Date()).toISOString();
      const res = await api.put(
        `/api/v1/incidents/${localStorage.getItem('fkincidentId')}/`,
        temp
      );
      // decide path for next
      if (id) {
        if (nextPath.environmentAffect === 'Yes') {
          history.push(
            `/app/incident-management/registration/initial-notification/environment-affected/${id}`
          );
        } else {
          history.push(
            `/app/incident-management/registration/initial-notification/reporting-and-notification/${id}`
          );
        }
      } else if (nextPath.environmentAffect === 'Yes') {
        history.push(
          '/app/incident-management/registration/initial-notification/environment-affected/'
        );
      } else {
        history.push(
          '/app/incident-management/registration/initial-notification/reporting-and-notification/'
        );
      }
    } else {
      const temp = incidentsListData;
      temp.equipmentDamagedComments = equipmentDamagedComments || incidentsListData.equipmentDamagedComments;
      temp.isEquipmentDamagedAvailable = detailsOfEquipmentAffect
        || incidentsListData.isEquipmentDamagedAvailable;
      temp.updatedAt = moment(new Date()).toISOString();
      const res = await api.put(
        `/api/v1/incidents/${localStorage.getItem('fkincidentId')}/`,
        temp
      );
      if (id !== undefined) {
        if (nextPath.environmentAffect === 'Yes') {
          history.push(
            `/app/incident-management/registration/initial-notification/environment-affected/${id}`
          );
        } else {
          history.push(
            `/app/incident-management/registration/initial-notification/reporting-and-notification/${id}`
          );
        }
      } else if (nextPath.environmentAffect === 'Yes') {
        history.push(
          '/app/incident-management/registration/initial-notification/environment-affected/'
        );
      } else {
        history.push(
          '/app/incident-management/registration/initial-notification/reporting-and-notification/'
        );
      }
    }
  };

  // fetch incident details data
  const fetchIncidentsData = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem('fkincidentId')}/`
    );
    const result = res.data.data.results;
    const envComments = result.equipmentDamagedComments;
    setEequipmentDamagedComments(envComments);
    await setIncidentsListdata(result);
    const isavailable = result.isEquipmentDamagedAvailable;
    await setDetailsOfEquipmentAffect(isavailable);
    if (!id) {
      await setIsLoading(true);
    }
  };

  // fetch equipment List data
  const fetchEquipmentListData = async () => {
    const res = await api.get(`api/v1/incidents/${id}/equipments/`);
    const result = res.data.data.results;
    
    if(result.length>0){
      let temp = [...form]
      temp = result
      await setForm(temp)
    }
    setEquipmentListData(result);
    if(res.status === 200){
await setIsLoading(true);
    }
    
  };

  // fetch equipment type value for dropdown
  const fetchEquipmentTypeValue = async () => {
    const res = await api.get('api/v1/lists/15/value');
    const result = res.data.data.results;
    setEquipmentTypeValue(result);
  };

  // fetch equipment afftected radio button value
  const fetchEquipmentAffectedValue = async () => {
    const res = await api.get('api/v1/lists/14/value');
    const result = res.data.data.results;
    await setequipmentAffected(result);
  };

  const handleBack = ()=>{
    const nextPath = JSON.parse(localStorage.getItem('nextPath'))
   if (nextPath.propertyAffect === "Yes") {
      history.push(
        `/app/incident-management/registration/initial-notification/property-affected/${id}`
      );
    }else if (nextPath.personAffect === 'Yes') {
      history.push(
        `/app/incident-management/registration/initial-notification/peoples-afftected/${id}`
      );
      }else{
      history.push(`/app/incident-management/registration/initial-notification/incident-details/${id}`)
    }
  }


  useEffect(() => {
    fetchEquipmentAffectedValue();
    fetchEquipmentTypeValue();
    fetchIncidentsData();
    if (id) {
      fetchEquipmentListData();
    }
  }, []);
  return (
    <PapperBlock title="Details of Equipment Affected" icon="ion-md-list-box">
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item md={9} spacing={3}>
            <Grid item md={12}>
              <Typography variant="body" component="p" gutterBottom>
                Do you have details to share about the equipment affected?
              </Typography>
              <RadioGroup
                className={classes.inlineRadioGroup}
                aria-label="detailsOfPropertyAffect"
                name="detailsOfPropertyAffect"
                value={
                  detailsOfEquipmentAffect
                  || incidentsListData.isEquipmentDamagedAvailable
                }
                onChange={(e) => {
                  setDetailsOfEquipmentAffect(e.target.value);
                }}
              >
                {equipmentAffected.length !== 0
                  ? equipmentAffected.map((value, index) => (
                    <FormControlLabel
                      value={value.inputValue}
                      control={<Radio />}
                      label={value.inputLabel}
                    />
                  ))
                  : null}
              </RadioGroup>
            </Grid>
            {detailsOfEquipmentAffect === 'Yes' ? (
              <>
               { form.map((value, key) => (
                    <Grid
                      container
                      item
                      md={12}
                      spacing={3}
                      className="repeatedGrid"
                    >
                      <Grid item md={6}>
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                          required
                          error={error && error[`equipmentType${[key]}`]}
                        >
                          <InputLabel id="eq-type-label">
                              Equipment type
                          </InputLabel>
                          <Select
                            labelId="eq-type-label"
                            id={`equipment-type${key}`}
                            label="Equipment type"
                            value={value.equipmentType || ''}
                            onChange={(e) => handleForm(e, key, 'equipmentType')
                            }
                          >
                            {equipmentTypeValue.length !== 0
                              ? equipmentTypeValue.map(
                                (selectValues, index) => (
                                  <MenuItem
                                    key={index}
                                    value={selectValues.inputValue}
                                  >
                                    {selectValues.inputLabel}
                                  </MenuItem>
                                )
                              )
                              : null}
                          </Select>
                          {error && error[`equipmentType${[key]}`] && (
                            <FormHelperText>
                              {error[`equipmentType${[key]}`]}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item md={6}>
                        <TextField
                          variant="outlined"
                          id={`other-equipment${key + 1}`}
                          label="If others, describe"
                          className={classes.formControl}
                          value={value.equipmentOtherType || ''}
                          disabled={
                            value.equipmentType !== 'Other'
                          }
                          onChange={(e) => handleForm(e, key, 'equipmentOtherType')
                          }
                        />
                      </Grid>

                      <Grid item md={12}>
                        <TextField
                          id={`damage-describe${key + 1}`}
                          multiline
                          variant="outlined"
                          rows="3"
                          required
                          error={error && error[`equipmentDeatils${[key]}`]}
                          helperText={
                            error && error[`equipmentDeatils${[key]}`]
                              ? error[`equipmentDeatils${[key]}`]
                              : null
                          }
                          label="Describe the damage"
                          className={classes.fullWidth}
                          value={value.equipmentDeatils || ''}
                          onChange={(e) => handleForm(e, key, 'equipmentDeatils')
                          }
                        />
                      </Grid>
                      {form.length > 1 ? (
                        <Grid item md={3}>
                          <Button
                            onClick={() => handleRemove(key)}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                          >
                              Remove
                          </Button>
                        </Grid>
                      ) : null}
                    </Grid>
                  ))}
                  <Grid item lg={12} md={6} sm={6}>
                    <button
                      className={classes.textButton}
                      onClick={() => addNewEquipmentDetails()}
                    >
                      <AddIcon />
                      {' '}
Add details of additional equipment affected?
                    </button>
                  </Grid>
                
              </>
            ) : null}
            {detailsOfEquipmentAffect === 'Yes' ? null : (
              <Grid item lg={12} md={6} sm={6}>
                <TextField
                  id="describe-any-equipment-affect"
                  multiline
                  rows="3"
                  variant="outlined"
                  label="Describe any equipment affect"
                  className={classes.fullWidth}
                  value={equipmentDamagedComments || ""}
                  onChange={(e) => setEequipmentDamagedComments(e.target.value)}
                />
              </Grid>
            )}
            <Grid item md={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => handleBack()}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                
              >
                Next
              </Button>
            </Grid>
          </Grid>
          <Grid item md={3}>
            <FormSideBar
              listOfItems={INITIAL_NOTIFICATION_FORM}
              selectedItem="Equipment affected"
            />
          </Grid>
        </Grid>
      ) : (
        <h1>Loading...</h1>
      )}
    </PapperBlock>
  );
};

export default EqiptmentAffected;
