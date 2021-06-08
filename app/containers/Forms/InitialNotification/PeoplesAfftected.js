import React from 'react';
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper"
import MenuItem from '@material-ui/core/MenuItem';
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

const PeoplesAffected = () => {


    let reportedTo = ["Internal Leadership", "Police", "Environment Officer", "OHS", "Mital Aid", "Other"]
    let notificationSent = ["Manage", "SuperVisor"]
    let selectValues = [1, 2, 3, 4]
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const radioDecide = ["Yes", "No"]
    const radioDecideNew = ["Yes", "No", "N/A"]
    return (
        <div>
            <Container>
                <Paper>
                    <Grid container justify="flex-start" >
                        <Grid item lg={12} md={6} sm={6}>
                            <p>Do you have details of individual effected?</p>

                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" >
                                    {radioDecide.map((value) => (
                                        <FormControlLabel value={value} control={<Radio />} label={value} />
                                    ))}

                                </RadioGroup>
                            </FormControl>

                        </Grid>


                        <h4>Details of people affected</h4>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>person type</p>

                            <FormControl>
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >
                                    {selectValues.map((selectValues) => (
                                        <MenuItem value={selectValues}>{selectValues}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>

                            <p>Department</p>

                            <FormControl>
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >
                                    {selectValues.map((selectValues) => (
                                        <MenuItem value={selectValues}>{selectValues}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>


                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Name of people affected</p>
                            <TextField id="filled-basic" />
                            <p>Identification number of person</p>
                            <TextField id="filled-basic" />
                        </Grid>




                        <Grid item lg={12} md={6} sm={6}>
                            <p>Was that person taken to medical care?</p>

                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" >
                                    {radioDecideNew.map((value) => (
                                        <FormControlLabel value={value} control={<Radio />} label={value} />
                                    ))}

                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Worker taken offisite for further assesment?</p>
                            <TextField id="filled-basic" />

                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Location details of assesment center</p>
                            <TextField id="filled-basic" />

                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <a>Add details of another person affected</a>
                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Comments</p>
                            <TextField id="filled-basic" />

                        </Grid>

                        <Button variant="contained" color="primary" href="#contained-buttons">
                            Next
                        </Button>

                    </Grid>
                </Paper>
            </Container>

        </div>
    )
}

export default PeoplesAffected