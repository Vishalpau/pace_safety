import React from 'react';
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper"
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import FormSideBar from '../FormSideBar'
import { ROOT_CAUSE_ANALYSIS_FORM } from '../../../utils/constants'
import FormHeader from '../FormHeader'


const CorrectiveAction = () => {

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const selectValues = [1, 2, 3, 4]
    const radioDecide = ["Yes", "No"]
    const checkBox = ["Inadequate System", "Inadequate standards", "Inadequate compilance and standards"]


    return (
        <div>
            <Container>
                <h4>Corrective Actions</h4>
                <hr />
                <Paper>
                <FormHeader selectedHeader = {"Root cause analysis"}/>
                    <p><b>Incident number:nnnnnnnnn     RCA Method:PACE Cause Analysis</b></p>

                    <Grid container justify="flex-start" >
                        <Grid item md={12}>
                            <p>Management Control</p>

                            <FormControl component="fieldset">
                                {checkBox.map((value) => (
                                    <FormControlLabel control={<Checkbox name={value} />} label={value} />
                                ))}
                            </FormControl>
                        </Grid>


                        <Grid item md={12}>
                            <p>Details the region to support above</p>

                            <FormControl component="fieldset">
                                <TextField id="filled-basic" />
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Button variant="contained" color="primary" href="#contained-buttons">
                        Next
                    </Button>
                    <Grid><FormSideBar listOfItems={ROOT_CAUSE_ANALYSIS_FORM} selectedItem={"Corrective action"} /></Grid>
                </Paper>
            </Container>
        </div>
    )
}

export default CorrectiveAction