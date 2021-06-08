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


const EnvironmentAffected = () => {

    let reportedTo = ["Internal Leadership", "Police", "Environment Officer", "OHS", "Mital Aid", "Other"]
    let notificationSent = ["Manage", "SuperVisor"]
    let selectValues = [1, 2, 3, 4]
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const radioDecide = ["Yes", "No", "N/A"]
    return (
        <div>
            <Container>
                <Paper>
                    <Grid container justify="flex-start" >
                        <Grid item lg={12} md={6} sm={6}>
                            <p>Where there any spills</p>

                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" >
                                    {radioDecide.map((value) => (
                                        <FormControlLabel value={value} control={<Radio />} label={value} />
                                    ))}

                                </RadioGroup>
                            </FormControl>

                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Details of spills</p>
                            <TextField id="filled-basic" />
                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Where there any release</p>

                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" >
                                    {radioDecide.map((value) => (
                                        <FormControlLabel value={value} control={<Radio />} label={value} />
                                    ))}

                                </RadioGroup>
                            </FormControl>

                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Details of release</p>
                            <TextField id="filled-basic" />
                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Where there any impact on wildlife</p>

                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" >
                                    {radioDecide.map((value) => (
                                        <FormControlLabel value={value} control={<Radio />} label={value} />
                                    ))}

                                </RadioGroup>
                            </FormControl>

                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Details of spills</p>
                            <TextField id="filled-basic" />
                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Where there any waterbody affected</p>

                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" >
                                    {radioDecide.map((value) => (
                                        <FormControlLabel value={value} control={<Radio />} label={value} />
                                    ))}

                                </RadioGroup>
                            </FormControl>

                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Details of spills</p>
                            <TextField id="filled-basic" />
                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Comment if any</p>
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

export default EnvironmentAffected