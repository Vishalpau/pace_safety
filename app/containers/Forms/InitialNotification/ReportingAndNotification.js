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




const ReportingAndNotification = () => {
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
                            <p>Reported to</p>

                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" >
                                    {reportedTo.map((value) => (
                                        <FormControlLabel value={value} control={<Radio />} label={value} />
                                    ))}

                                </RadioGroup>
                            </FormControl>

                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Notification to be sent</p>

                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" >
                                    {notificationSent.map((value) => (
                                        <FormControlLabel value={value} control={<Radio />} label={value} />
                                    ))}

                                </RadioGroup>
                            </FormControl>

                        </Grid>
                        <Grid item lg={12} justify="flex-start" >
                            <p>Initial Evidences</p>

                            <FormControl>
                                <Grid item lg={6}>
                                    <input type="file" />
                                    <DeleteForeverIcon />

                                    <TextField id="filled-basic" />
                                    <DeleteForeverIcon />
                                </Grid>
                                <hr />
                                <Grid item lg={6}>
                                    <input type="file" />
                                    <DeleteForeverIcon />

                                    <TextField id="filled-basic" />
                                    <DeleteForeverIcon />
                                </Grid>
                                <hr />
                                <Grid item lg={6}>
                                    <input type="file" />
                                    <DeleteForeverIcon />

                                    <TextField id="filled-basic" />
                                    <DeleteForeverIcon />
                                </Grid>
                                <hr />
                                <Grid item lg={6}>
                                    <input type="file" />
                                    <DeleteForeverIcon />

                                    <TextField id="filled-basic" />
                                    <DeleteForeverIcon />
                                </Grid>
                            </FormControl>


                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Supervisor name</p>
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
                                <p>Others Name</p>
                                <TextField id="filled-basic" />
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
                            <p>Reported by</p>
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
                                <p>Others Name</p>
                                <TextField id="filled-basic" />
                            </FormControl>
                        </Grid>


                        <Grid item lg={12} md={6} sm={6}>
                            <p>Reson for reporting later than 4 hours</p>
                            <TextField id="filled-basic" />
                        </Grid>

                        <Grid item lg={12} md={6} sm={6}>
                            <p>Additional details if any</p>
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

export default ReportingAndNotification