import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
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

import FormSideBar from '../FormSideBar';
import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from '../../../utils/constants';
import FormHeader from '../FormHeader';
import api from '../../../utils/axios';
import EquipmentValidate from '../../Validator/EquipmentValidation';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
    margin: '.5rem 0',
  },
  spacer: {
    marginTop: '1rem',
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

  const notificationSent = ['Manage', 'SuperVisor'];

  const selectValues = [1, 2, 3, 4];

  const radioDecide = ['Yes', 'No'];
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

  // set state for update
  const handleUpdateEquipment = async (e, key, fieldname, equipmentId) => {
    const temp = equipmentListdata;
    const { value } = e.target;
    temp[key][fieldname] = value;
    temp[key].updatedBy = 0;
    setEquipmentListData(temp)

  

  };

  // hablde Remove

  const handleRemove = async(key) => {
    if(equipmentListdata.length>1){
      const temp = equipmentListdata
      const newData = temp.filter(item=> item.id !== key);
      await setPeopleData(newData)
    }
    else{
      const temp = form;
      const newData = temp.filter((item, index) => index !== key);
      await setForm(newData);
    }
    
  };


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
  const handleForm = (e, key, fieldname) => {
    const temp = [...form];
    const { value } = e.target;
    temp[key][fieldname] = value;
    setForm(temp);
  };

  const handleNext = async () => {
    if(id){
      for(var i=0; i<equipmentListdata.length;i++){
        const res = await api.put(
          `api/v1/incidents/${id}/equipments/${equipmentListdata[i].id}/`,
          equipmentListdata[i]
        );
      }
    }

    const nextPath = JSON.parse(localStorage.getItem('nextPath'));

    if (equipmentListdata.length > 0) {
      if (nextPath.environmentAffect === 'Yes') {
        history.push(
          `/app/incident-management/registration/initial-notification/environment-affected/${id}`
        );
      } else {
        history.push(
          `/app/incident-management/registration/initial-notification/reporting-and-notification/${id}`
        );
      }
    } else if (detailsOfEquipmentAffect === 'Yes') {
      const { error, isValid } = EquipmentValidate(form);
      setError(error);
      const status = 0;

      for (let i = 0; i < form.length; i++) {
        const res = await api.post(
          `/api/v1/incidents/${localStorage.getItem(
            'fkincidentId'
          )}/equipments/`,
          form[i]
        );
      }
      const temp = incidentsListData;
      temp.equipmentDamagedComments = equipmentDamagedComments
          || incidentsListData.equipmentDamagedComments;
      temp.isEquipmentDamagedAvailable = detailsOfEquipmentAffect
          || incidentsListData.isEquipmentDamagedAvailable;
      temp.updatedAt = moment(new Date()).toISOString();
      const res = await api.put(
        `/api/v1/incidents/${localStorage.getItem('fkincidentId')}/`,
        temp
      );

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
      }
      // if (status === 201) {
      if (nextPath.environmentAffect === "Yes") {
        history.push(
          "/app/incident-management/registration/initial-notification/environment-affected/"
        );
      } else {
        history.push(
          "/app/incident-management/registration/initial-notification/reporting-and-notification/"
        );
      }
      // if (status === 201) {
     
      // }
    } else {
      const temp = incidentsListData;
      temp.equipmentDamagedComments = equipmentDamagedComments
          || incidentsListData.equipmentDamagedComments;
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
          "/app/incident-management/registration/initial-notification/environment-affected/"
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
    console.log(result.equipmentDamagedComments)
    let envComments =result.equipmentDamagedComments
    setEequipmentDamagedComments(envComments)
    await setIncidentsListdata(result);
    const isavailable = result.isEquipmentDamagedAvailable;
    await setDetailsOfEquipmentAffect(isavailable);
    if(!id){
      await setIsLoading(true);
    }
  };

  // fetch equipment List data
  const fetchEquipmentListData = async () => {
    const res = await api.get(`api/v1/incidents/${id}/equipments/`);
    const result = res.data.data.results;
    setEquipmentListData(result);
    await setIsLoading(true);
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

  
  useEffect(() => {
    
    fetchEquipmentAffectedValue();
    fetchEquipmentTypeValue();
    fetchIncidentsData();
    if(id){
    fetchEquipmentListData();
    }
  }, []);
  return (
    <PapperBlock
      title=" Details of Equipment Affected"
      icon="ion-md-list-box"
    >
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item md={9} spacing={3}>
            <Grid item md={12}>
              <Typography variant="body" component="p" gutterBottom>
                Do you have details to share about the equipment accected?
              </Typography>
              <RadioGroup
                className={classes.inlineRadioGroup}
                aria-label="detailsOfPropertyAffect"
                name="detailsOfPropertyAffect"
                value={detailsOfEquipmentAffect || incidentsListData.isEquipmentDamagedAvailable}
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
                {equipmentListdata.length > 0
                  ? equipmentListdata.map((equipment, key) => (
                    <>
                      <Grid item md={6}>
                        {/* <p>Equiptment type</p> */}
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <InputLabel id="eq-type-label">
                              Equipment type{equipment.equipmentType}
                          </InputLabel>
                          <Select
                            labelId="eq-type-label"
                            id={`equipment-type${key+1}`}
                            label="Equipment type"
                            defaultValue={equipment.equipmentType || ''}
                            onChange={(e) => handleUpdateEquipment(
                              e,
                              key,
                              'equipmentType',
                              equipment.id
                            )
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
                        </FormControl>
                        {/* {error && error[`equipmentType${[key]}`] && (
                            <p>{error[`equipmentType${[key]}`]}</p>
                          )} */}
                      </Grid>

                      <Grid item md={6}>
                        {/* <p>if other describe</p> */}
                        <TextField
                          variant="outlined"
                          id={`If-others-describe-property${key}`}
                          label="If others, describe"
                          className={classes.formControl}
                          defaultValue={equipment.equipmentOtherType}
                          disabled = {equipment.equipmentType === 'Other'?false:true}
                          onChange={(e) => handleUpdateEquipment(
                            e,
                            key,
                            'equipmentOtherType',
                            equipment.id
                          )
                          }
                        />
                        {/* {error && error[`equipmentOtherType${[key]}`] && (
                            <p>{error[`equipmentOtherType${[key]}`]}</p>
                          )} */}
                      </Grid>

                      <Grid item md={12}>
                        {/* <p>Describe the damage</p> */}
                        <TextField
                          id={`describe-damage-equipment${key}`}
                          multiline
                          variant="outlined"
                          rows="3"
                          label="Describe the damage"
                          className={classes.fullWidth}
                          defaultValue={equipment.equipmentDeatils}
                          
                          onChange={(e) => handleUpdateEquipment(
                            e,
                            key,
                            'equipmentDeatils',
                            equipment.id
                          )
                          }
                        />
                        {/* {error && error[`equipmentDeatils${[key]}`] && (
                            <p>{error[`equipmentDeatils${[key]}`]}</p>
                          )} */}
                      </Grid>
                      {/* {equipmentListdata.length > 1 ? (
                          <Grid item md={3}>
                            <Button
                              onClick={() => handleRemove(equipment.id)}
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              Remove
                            </Button>
                          </Grid>
                        ) : null} */}
                    </>
                  ))
                  : form.map((value, key) => (
                    <>
                      <Grid item md={6}>
                        {/* <p>Equiptment type</p> */}
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <InputLabel id="eq-type-label">
                              Equipment type
                          </InputLabel>
                          <Select
                            labelId="eq-type-label"
                            id={`equipment-type${key}`}
                            label="Equipment type"
                            value = {value.equipmentType || ""}
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
                        </FormControl>
                        {error && error[`equipmentType${[key]}`] && (
                          <p>{error[`equipmentType${[key]}`]}</p>
                        )}
                      </Grid>

                      <Grid item md={6}>
                        {/* <p>if other describe</p> */}
                        <TextField
                          variant="outlined"
                          id={`other-equipment${key+1}`}
                          label="If others, describe"
                          className={classes.formControl}
                          value = {value.equipmentOtherType || ""}
                          disabled = {value.equipmentType === 'Other'?false:true}
                          onChange={(e) => handleForm(e, key, 'equipmentOtherType')
                          }
                        />
                        {error && error[`equipmentOtherType${[key]}`] && (
                          <p>{error[`equipmentOtherType${[key]}`]}</p>
                        )}
                      </Grid>
                    {/* {form[key].equipmentType === ''} */}
                      <Grid item md={12}>
                        {/* <p>Describe the damage</p> */}
                        <TextField
                           id={`damage-describe${key+1}`}
                          multiline
                          variant="outlined"
                          rows="3"
                          label="Describe the damage"
                          className={classes.fullWidth}
                          value = {value.equipmentDeatils || ""}
                          onChange={(e) => handleForm(e, key, 'equipmentDeatils')
                          }
                        />
                        {error && error[`equipmentDeatils${[key]}`] && (
                          <p>{error[`equipmentDeatils${[key]}`]}</p>
                        )}
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
                    </>
                  ))}
                {equipmentListdata.length > 0 ? null : (
                  <Grid item lg={12} md={6} sm={6}>
                    <button
                      className={classes.textButton}
                      onClick={() => addNewEquipmentDetails()}
                    >
                      Add details of additional equipment affected?
                    </button>
                  </Grid>
                )}
              </>
            ) : null}
            {detailsOfEquipmentAffect === 'Yes' ? null : (
              <Grid item lg={12} md={6} sm={6}>
                {/* <p>Comment </p> */}
                <TextField
                  id="describe-any-equipment-affect"
                  multiline
                  rows="3"
                  variant="outlined"
                  label="Describe Any Equipment Affect"
                  className={classes.fullWidth}
                 defaultValue={equipmentDamagedComments}
                  onChange={(e) => setEequipmentDamagedComments(e.target.value)
                  }
                />
              </Grid>
            )}
           <Grid item md={6}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => history.goBack()}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                onClick={() => handleNext()}
              >
                Next
              </Button>
            </Grid>
          </Grid>
          <Grid item md={3}>
            <FormSideBar
              listOfItems={INITIAL_NOTIFICATION_FORM}
              selectedItem="Equipment Affected"
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
