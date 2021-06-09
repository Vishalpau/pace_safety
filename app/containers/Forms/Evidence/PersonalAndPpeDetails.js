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


const PersonalAndPpeDetails = () => {
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
                    <h1>PPE</h1>
                    <Grid container justify="flex-start" >

                        <Grid item md={6}>
                            <p>PPE worn properly</p>
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

                        <Grid item md={6}>
                            <p>PPE in good shape</p>

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

                        <Grid item md={6}>
                            <p>PPE Proper fit</p>
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

                        <Grid item md={6}>
                            <p>PPE appropriate for task</p>

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

                    <h1>Supervision</h1>
                    <Grid container justify="flex-start" >

                        <Grid item md={6}>
                            <p>Employee self supervised</p>
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

                        <Grid item md={6}>
                            <p>Supervisor present at site</p>

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

                        <Grid item md={6}>
                            <p>Supervisor provided clear detail of work</p>
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

                        <Grid item md={6}>
                            <p>Supervisor provided detail work package</p>

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

                        <Grid item md={6}>
                            <p>Did supervisor conducted I-care observation</p>

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

                    <h1>Flag Person</h1>
                    <Grid container justify="flex-start" >

                        <Grid item md={6}>
                            <p>Was flag person required for this job</p>
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

                        <Grid item md={6}>
                            <p>Flag person trained/competent</p>

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

                        <Grid item md={6}>
                            <p>Was flag person present</p>
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

                    <h1>Other</h1>
                    <Grid container justify="flex-start" >

                        <Grid item md={6}>
                            <p>Metal on Metal incident</p>
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

                        <Grid item md={6}>
                            <p>Was person in the line of fire</p>

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

export default PersonalAndPpeDetails