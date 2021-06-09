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


const ActivityDetails = () => {
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const selectValues = [1, 2, 3, 4]
    const radioDecide = ["Yes", "No"]
    return (
        <div>
            <Container>
                <Paper>
                    <p>Incident description</p>
                    <Grid container justify="flex-start" >
                        <Grid item md={12}>
                            <p>Did the job require work permit?</p>

                            <FormControl>
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="gender" >
                                        {radioDecide.map((value) => (
                                            <FormControlLabel value={value} control={<Radio />} label={value} />
                                        ))}

                                    </RadioGroup>
                                </FormControl>
                            </FormControl>
                        </Grid>

                        <Grid item md={12}>
                            <p>If yes ,was a permit complted prior of the job?</p>

                            <FormControl>
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="gender" >
                                        {radioDecide.map((value) => (
                                            <FormControlLabel value={value} control={<Radio />} label={value} />
                                        ))}

                                    </RadioGroup>
                                </FormControl>
                            </FormControl>
                        </Grid>

                        <Grid item md={12}>
                            <p>Was per-job safety discussed head?</p>

                            <FormControl>
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="gender" >
                                        {radioDecide.map((value) => (
                                            <FormControlLabel value={value} control={<Radio />} label={value} />
                                        ))}

                                    </RadioGroup>
                                </FormControl>
                            </FormControl>
                        </Grid>

                        <Grid item md={12}>
                            <p>Was JHA executed for the task?</p>

                            <FormControl>
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="gender" >
                                        {radioDecide.map((value) => (
                                            <FormControlLabel value={value} control={<Radio />} label={value} />
                                        ))}

                                    </RadioGroup>
                                </FormControl>
                            </FormControl>
                        </Grid>

                        <Grid item md={12}>
                            <p>Was FLA executed for the task?</p>

                            <FormControl>
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="gender" >
                                        {radioDecide.map((value) => (
                                            <FormControlLabel value={value} control={<Radio />} label={value} />
                                        ))}

                                    </RadioGroup>
                                </FormControl>
                            </FormControl>
                        </Grid>

                        <Grid item md={12}>
                            <p>Did pre-planning identified the hazard?</p>

                            <FormControl>
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="gender" >
                                        {radioDecide.map((value) => (
                                            <FormControlLabel value={value} control={<Radio />} label={value} />
                                        ))}

                                    </RadioGroup>
                                </FormControl>
                            </FormControl>
                        </Grid>

                        <Grid item md={12}>
                            <p>was per-jon planning enhanced the post-event?</p>

                            <FormControl>
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="gender" >
                                        {radioDecide.map((value) => (
                                            <FormControlLabel value={value} control={<Radio />} label={value} />
                                        ))}

                                    </RadioGroup>
                                </FormControl>
                            </FormControl>
                        </Grid>



                    </Grid>
                    <Button variant="contained" color="primary" href="#contained-buttons">
                        Next
                    </Button>
                </Paper>
            </Container>


        </div>
    )
}

export default ActivityDetails