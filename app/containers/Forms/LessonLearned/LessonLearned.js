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



const LessionLearned = () => {
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

                    <Grid container justify="flex-start" >

                        <Grid item md={6}>
                            <p>Incident Number</p>

                            <FormControl component="fieldset">
                                <p>nnnnnnnnn</p>
                            </FormControl>
                        </Grid>

                        <Grid item md={6}>
                            <p>Incident on</p>

                            <FormControl component="fieldset">
                                <p>Date and time</p>
                            </FormControl>
                        </Grid>

                        <Grid item md={6}>
                            <p>Repoted on</p>

                            <FormControl component="fieldset">
                                <p>Date and tiem</p>
                            </FormControl>
                        </Grid>

                        <Grid item md={6}>
                            <p>Reported by</p>

                            <FormControl component="fieldset">
                                <p>Time format</p>
                            </FormControl>
                        </Grid>

                        <Grid item md={12}>
                            <p>Incident Type</p>

                            <FormControl>
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </p>
                            </FormControl>
                        </Grid>

                        <Grid item md={12}>
                            <p>Incidnet Title</p>

                            <FormControl>
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen book. It has survived not only five centuries, but also the leap into
                                    electronic typesetting, remaining essentially unchanged. It was popularised in
                                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                    and more recently with desktop publishing software like Aldus PageMaker including
                                    versions of Lorem Ipsum.
                            </p>
                            </FormControl>
                        </Grid>

                        <Grid item md={12}>
                            <p>Incident Location</p>

                            <FormControl>
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                <p>
                                    Lorem Ipsum is simply dummy text
                            </p>
                            </FormControl>
                        </Grid>





                        <Grid item md={12}>
                            <p>Key learnings</p>
                            <p>Team/Department</p>
                            <FormControl component="fieldset">
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



                        <Grid item md={12}>
                            <p>Team/Department Learnings</p>
                            <FormControl component="fieldset">
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                <TextField id="filled-basic" />
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

export default LessionLearned