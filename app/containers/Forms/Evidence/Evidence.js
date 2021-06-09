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



const Evidence = () => {

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
                    <p>Incident number</p>
                    <p>Incident description</p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the
                        release of Letraset sheets containing Lorem Ipsum passages,
                        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <Grid container justify="flex-start" >
                        <Grid item md={3} >
                            <p>Evidance type</p>
                            <p>Evidance type 1</p>
                        </Grid>

                        <Grid item md={3}>
                            <p>Aviliable</p>

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
                        <Grid item md={3}>
                            <p>Comments</p>

                            <TextField id="filled-basic" />


                        </Grid>
                        <Grid item md={3} >
                            <p>Attachments</p>
                            <a>Link</a>
                            <DeleteForeverIcon />

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

export default Evidence