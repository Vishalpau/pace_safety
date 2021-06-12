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

import FormSideBar from '../FormSideBar'
import { ROOT_CAUSE_ANALYSIS_FORM } from '../../../utils/constants'
import FormHeader from '../FormHeader'



const BasicCause = () => {

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const selectValues = [1, 2, 3, 4]
    const radioDecide = ["Yes", "No"]

    return (
        <div>
            <Container>
                <h4>Basic Cause</h4>
                <hr />
                <Paper>
                <FormHeader selectedHeader = {"Root cause analysis"}/>
                    <p>Basic Cause</p>
                    <p><b>Human Factors</b></p>
                    <Grid container justify="flex-start" >
                        <Grid item md={6}>
                            <p>Personal</p>

                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" >
                                    {radioDecide.map((value) => (
                                        <FormControlLabel value={value} control={<Radio />} label={value} />
                                    ))}

                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item md={6}>
                            <p>Wellness Factor</p>

                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" >
                                    {radioDecide.map((value) => (
                                        <FormControlLabel value={value} control={<Radio />} label={value} />
                                    ))}

                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item md={12}>
                            <p>Other Human Factors</p>

                            <FormControl>
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                <FormControl component="fieldset">
                                    <TextField id="filled-basic" />
                                </FormControl>
                            </FormControl>
                        </Grid>

                        <div><p>Job Factors</p></div>
                        <Grid item md={6}>
                            <p>Leadership</p>

                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" >
                                    {radioDecide.map((value) => (
                                        <FormControlLabel value={value} control={<Radio />} label={value} />
                                    ))}

                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item md={6}>
                            <p>Process</p>

                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" >
                                    {radioDecide.map((value) => (
                                        <FormControlLabel value={value} control={<Radio />} label={value} />
                                    ))}

                                </RadioGroup>
                            </FormControl>
                        </Grid>


                        <Grid item md={12}>
                            <p>Other job factors</p>

                            <FormControl>
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                <FormControl component="fieldset">
                                    <TextField id="filled-basic" />
                                </FormControl>
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Button variant="contained" color="primary" href="#contained-buttons">
                        Next
                </Button>
                <Grid><FormSideBar listOfItems={ROOT_CAUSE_ANALYSIS_FORM} selectedItem={"Basic cause"} /></Grid>
                </Paper>
            </Container>
        </div>
    )
}

export default BasicCause