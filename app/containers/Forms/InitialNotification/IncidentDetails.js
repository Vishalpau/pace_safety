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
import FormLabel from '@material-ui/core/FormLabel';



const IncidentDetails = () => {

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const selectValues = [1, 2, 3, 4]
    const radioDecide = ["Yes", "No", "N/A"]
    return (
        <div>
            <Container>
                <Paper>
                    <Grid container justify="flex-start" >
                        <Grid item lg={12} md={6} sm={6}>
                            <p>Project name</p>

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
                            <p>Unit name</p>

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
                            <p>Incident name</p>

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

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>


                            <TextField id="filled-basic" />

                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Title</p>
                            <TextField id="filled-basic" />
                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Description</p>
                            <TextField id="filled-basic" />
                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Any immediat actions taken</p>
                            <TextField id="filled-basic" />
                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Location</p>
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
                            <p>Contaractor</p>
                            <TextField id="filled-basic" />
                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Sub-Contractor</p>
                            <TextField id="filled-basic" />
                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Were any person affected during incident?</p>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" >
                                    {radioDecide.map((value) => (
                                        <FormControlLabel value={value} control={<Radio />} label={value} />
                                    ))}

                                </RadioGroup>
                            </FormControl>


                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Was any propery damaged during incident?</p>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" >
                                    {radioDecide.map((value) => (
                                        <FormControlLabel value={value} control={<Radio />} label={value} />
                                    ))}

                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Was there any equiptment damaged?</p>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" >
                                    {radioDecide.map((value) => (
                                        <FormControlLabel value={value} control={<Radio />} label={value} />
                                    ))}

                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Was there any environment impact?</p>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" >
                                    {radioDecide.map((value) => (
                                        <FormControlLabel value={value} control={<Radio />} label={value} />
                                    ))}

                                </RadioGroup>
                            </FormControl>
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

export default IncidentDetails

