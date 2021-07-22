import React, { useEffect, useState, useRef } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, Grid, FormHelperText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Paper from "@material-ui/core/Paper";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";



const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
        marginTop: "20px"
    },
    button: {
        margin: theme.spacing(1),
    }
}));

export default function FormDialog(props) {
    const [form, setForm] = useState({
        "fkCompanyId": 0,
        "fkProjectId": 0,
        "fkProjectStructureIds": "string",
        "parentId": 0,
        "actionContext": props.actionContext,
        "enitityReferenceId": props.enitityReferenceId,
        "actionTitle": "",
        "actionDetail": "string",
        "actionCategory": "string",
        "actionShedule": "string",
        "priority": "string",
        "severity": "string",
        "approver": 0,
        "assignTo": 0,
        "deligateTo": 0,
        "plannedStartDate": "2021-07-21T17:05:39.604Z",
        "actualStartDate": "2021-07-21T17:05:39.604Z",
        "plannedEndDate": "2021-07-21T17:05:39.604Z",
        "actualEndDate": "2021-07-21T17:05:39.604Z",
        "forecaststartDate": "2021-07-21T17:05:39.604Z",
        "forecastEndDate": "2021-07-21T17:05:39.604Z",
        "location": "string",
        "latitude": 0,
        "longitude": 0,
        "supervisorId": 0,
        "contractor": 0,
        "contractorName": "string",
        "contractorCompany": "string",
        "actionStatus": "string",
        "actionStage": "string",
        "status": "Active",
        "createdBy": 0,
        "reviewedBy": 0,
        "reviewDate": "2021-07-21T17:05:39.605Z",
        "closedBy": 0,
        "closeDate": "2021-07-21T17:05:39.605Z",
        "source": "Web",
        "vendor": "string",
        "vendorReferenceId": "string"
    })
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    let user = ["user1", "user2", "user3", "user4"]
    let severity = ["Normal", "Critical", "Blocker"]
    const classes = useStyles();

    return (
        <Paper variant="outlined" >
            {console.log(props)}
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add a new action
            </Button>
            <Dialog
                fullWidth={true}
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Action tracker</DialogTitle>
                <DialogContent>

                    {/* action title */}
                    <Grid item md={12}>
                        <FormControl
                            component="fieldset"
                            required
                        // error={error.supervision}
                        >
                            <TextField
                                className={classes.formControl}
                                id="filled-basic"
                                label="Action title"
                                variant="outlined"
                                required
                                // error={error.others}
                                value=""
                                // helperText={error ? error.others : ""}
                                rows={1}
                                onChange={async (e) => setForm({ ...form, actionTitle: e.target.value })}
                            />
                            {/* {error && error.supervision && (
                                <FormHelperText>{error.supervision}</FormHelperText>
                            )} */}
                        </FormControl>
                    </Grid>

                    {/* assigen */}
                    <Grid item md={12}>
                        <FormControl
                            variant="outlined"
                            required
                            className={classes.formControl}
                        // error={error && error.rcaRecommended}
                        >
                            <InputLabel id="project-name-label">Assignee</InputLabel>
                            <Select
                                id="project-name"
                                labelId="project-name-label"
                                label="RCA recommended"
                            // value={form.rcaRecommended}
                            // disabled={checkPost.current == false ? true : false}
                            >
                                {user.map((selectValues) => (
                                    <MenuItem
                                        value={selectValues}
                                    // onClick={(e) => handelRcaRecommended(e, selectValues)}
                                    >
                                        {selectValues}
                                    </MenuItem>
                                ))}
                            </Select>
                            {/* {error && error.rcaRecommended && (
                                <FormHelperText>{error.rcaRecommended}</FormHelperText>
                            )} */}
                        </FormControl>
                    </Grid>

                    {/* due date */}
                    <Grid item md={12}>
                        <MuiPickersUtilsProvider variant="outlined" utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                required
                                // error={error.incidentOccuredOn}
                                required
                                className={classes.formControl}
                                label="Incident date & time"
                                // error={error.incidentOccuredOn}
                                // helperText={error.incidentOccuredOn ? error.incidentOccuredOn : null}
                                // value={
                                //     form.incidentOccuredOn || null
                                // }
                                onChange={(e) => {
                                    // setForm({
                                    //     ...form,
                                    //     incidentOccuredOn: moment(e).toISOString(),
                                    // });
                                }}
                                format="yyyy/MM/dd"
                                inputVariant="outlined"
                                disableFuture="true"
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>

                    {/* severity */}

                    <Grid item md={12}>
                        <FormControl
                            variant="outlined"
                            required
                            className={classes.formControl}
                        // error={error && error.rcaRecommended}
                        >
                            <InputLabel id="project-name-label">Severity</InputLabel>
                            <Select
                                id="project-name"
                                labelId="project-name-label"
                                label="RCA recommended"
                            // value={form.rcaRecommended}
                            // disabled={checkPost.current == false ? true : false}
                            >
                                {severity.map((selectValues) => (
                                    <MenuItem
                                        value={selectValues}
                                    // onClick={(e) => handelRcaRecommended(e, selectValues)}
                                    >
                                        {selectValues}
                                    </MenuItem>
                                ))}
                            </Select>
                            {/* {error && error.rcaRecommended && (
                                <FormHelperText>{error.rcaRecommended}</FormHelperText>
                            )} */}
                        </FormControl>
                    </Grid>



                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
