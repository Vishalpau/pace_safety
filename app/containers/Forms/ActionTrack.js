import React, { useEffect, useState, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import FlashOnIcon from "@material-ui/icons/FlashOn";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
    button: {
        margin: theme.spacing(1),
    },
    dialogCloseButton: {
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(1),
    },
}));

export default function ActionTrack(props) {
    const [form, setForm] = useState({
        fkCompanyId: 0,
        fkProjectId: 0,
        fkProjectStructureIds: "string",
        parentId: 0,
        actionContext: "",
        enitityReferenceId: "",
        actionTitle: "",
        actionDetail: "string",
        actionCategory: "string",
        actionShedule: "string",
        priority: "string",
        severity: "",
        approver: 0,
        assignTo: 0,
        deligateTo: 0,
        plannedStartDate: "2021-07-21T17:05:39.604Z",
        actualStartDate: "2021-07-21T17:05:39.604Z",
        plannedEndDate: null,
        actualEndDate: "2021-07-21T17:05:39.604Z",
        forecaststartDate: "2021-07-21T17:05:39.604Z",
        forecastEndDate: "2021-07-21T17:05:39.604Z",
        location: "string",
        latitude: 0,
        longitude: 0,
        supervisorId: 0,
        contractor: 0,
        contractorName: "string",
        contractorCompany: "string",
        actionStatus: "string",
        actionStage: "string",
        status: "Active",
        createdBy: 0,
        reviewedBy: 0,
        reviewDate: "2021-07-21T17:05:39.605Z",
        closedBy: 0,
        closeDate: "2021-07-21T17:05:39.605Z",
        source: "Web",
        vendor: "string",
        vendorReferenceId: "string",
    });


    let API_URL_ACTION_TRACKER = "https://dev-actions-api.paceos.io/";
    const api = axios.create({
        baseURL: API_URL_ACTION_TRACKER,
    });

    const handelUpdate = async () => {
        const res = await api.get(`/api/v1/actions/?actionNumber=${props.actionID}`)
        let actionApiData = res.data.data.results.results[0]
        setForm(actionApiData)
    }

    const [open, setOpen] = useState(false);
    const [error, setError] = useState({ actionTitle: "" });

    const handleClickOpen = () => {
        setOpen(true);
        handelUpdate()
    };

    const handleClose = async () => {
        await setError({ actionTitle: "" });
        await setForm({ ...form, plannedEndDate: null, actionTitle: "" });
        await setOpen(false);
        // await props.setUpdatePage(!props.updatePage)
    };

    const handelSubmit = async () => {
        if (form.actionTitle == "") {
            setError({ actionTitle: "Please enter action title" });
        } else {
            let res = await api.put(`api/v1/actions/${props.actionID}/`, form);
            if (res.status == 200) {
                await setError({ actionTitle: "" });
                await setForm({ ...form, plannedEndDate: null, actionTitle: "" });
                await setOpen(false);
                // await props.setUpdatePage(!props.updatePage)
            }
        }
    };

    let user = ["user1", "user2", "user3", "user4"];
    let severity = ["Normal", "Critical", "Blocker"];
    const classes = useStyles();

    useEffect(() => {
        handelUpdate()
    }, [])

    return (
        <>
            <a
                size="small"
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                {props.actionID}
            </a>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle id="form-dialog-title">Action tracker</DialogTitle>
                <IconButton
                    className={classes.dialogCloseButton}
                    onClick={(e) => {
                        handleClose();
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <div style={{ padding: 20 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.formControl}
                                id="action title"
                                label="Action title"
                                variant="outlined"
                                required
                                value={form.actionTitle}
                                error={error.actionTitle}
                                helperText={error ? error.actionTitle : null}
                                onChange={(e) =>
                                    setForm({ ...form, actionTitle: e.target.value })
                                }
                            />
                        </Grid>

                        {/* assigen */}
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="assigneLabel">Assignee</InputLabel>
                                <Select
                                    id="assigne"
                                    labelId="assigne"
                                    label="assigne"
                                    value={form.assignTo == "0" ? "user1" : ""}
                                >
                                    {user.map((selectValues) => (
                                        <MenuItem
                                            value={selectValues}
                                            onClick={(e) => setForm({ ...form, assignTo: 0 })}
                                        >
                                            {selectValues}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* due date */}
                        <Grid item xs={12}>
                            <MuiPickersUtilsProvider variant="outlined" utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className={classes.formControl}
                                    label="Due date"
                                    format="dd/MM/yyyy"
                                    inputVariant="outlined"
                                    value={form.plannedEndDate}
                                    disablePast={true}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            plannedEndDate: moment(e).toISOString(),
                                        });
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>

                        {/* severity */}
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="severityLabel">Severity</InputLabel>
                                <Select
                                    id="severity"
                                    labelId="severity"
                                    label="severity"
                                    value={form.severity || ""}
                                >
                                    {severity.map((selectValues) => (
                                        <MenuItem
                                            value={selectValues}
                                            onClick={(e) =>
                                                setForm({ ...form, severity: selectValues })
                                            }
                                        >
                                            {selectValues}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
                <DialogActions>
                    {/* <Button onClick={(e) => handelSubmit()} color="primary">
                        Update action
                    </Button> */}
                </DialogActions>
            </Dialog>
        </>
    );
}
