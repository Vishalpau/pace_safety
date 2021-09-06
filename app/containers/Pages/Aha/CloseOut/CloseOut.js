import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { PapperBlock } from "dan-components";
import TextField from "@material-ui/core/TextField";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import moment from "moment";
import TextButton from "../../../CommonComponents/TextButton";
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from "@material-ui/pickers";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import FormSideBar from "../../../Forms/FormSideBar";
import {
    LOGIN_URL,
    access_token,
    ACCOUNT_API_URL,
    HEADER_AUTH,
    SUMMERY_FORM
} from "../../../../utils/constants";
import api from "../../../../utils/axios";
import Type from "../../../../styles/components/Fonts.scss";
import "../../../../styles/custom.css";
// import { handelJhaId, checkValue } from "../Utils/checkValue"

// import { CLOSE_OUT_FORM } from "../Utils/constants"


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    fullWidth: {
        width: "100%",
    },
}));

const CloseOut = () => {
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams();
    // const dispatch = useDispatch();
    const [jhaListData, setJhaListdata] = useState({});
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({})
    const [form, setForm] = useState({
        reviewedBy: 0,
        reviewDate: null,
        closedBy: 0,
        closeDate: null
    })

    const userId =
        JSON.parse(localStorage.getItem("userDetails")) !== null
            ? JSON.parse(localStorage.getItem("userDetails")).id
            : null;

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // fetch incident data
    const fetchJhaData = async () => {
        // const jhaId = handelJhaId()
        const res = await api.get(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`)
        const result = res.data.data.results;
        console.log("4444",result)
        setJhaListdata(result)
        console.log(result)

    };
    // handle close snackbar
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleCloseDate = (e) => {
        if (new Date(e) > new Date(form.reviewDate)) {
            setForm({ ...form, closeDate: moment(e).toISOString() });
            error.closeDate = ""
            setError(error);
        }
        else {
            setForm({ ...form, closeDate: null })
            let errorMessage = "Closed date cannot be prior to reviewed date"
            error.closeDate = errorMessage
            setError(error);

        }
    }

    const handleReviewDate = (e) => {
        if (new Date(e) < new Date()) {
            setForm({ ...form, reviewDate: moment(e).toISOString() });
            error.reviewDate = ""
            setError(error)
        }
        else {
            setForm({ ...form, reviewDate: null })
            error.reviewDate = "Invalid date-time selected"
            setError(error);
        }
    }

    //   fetch user data

    const fetchUserList = async () => {
        var config = {
            method: 'get',
            url: `${ACCOUNT_API_URL}api/v1/companies/${JSON.parse(localStorage.getItem('company')).fkCompanyId}/users/`,
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };

        axios(config)
            .then(function (response) {

                if (response.status === 200) {
                    const result = response.data.data.results[0].users
                    setUserList(result)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleNext = async () => {
        const temp = jhaListData;
        temp.reviewedBy = form.reviewedBy || jhaListData.reviewedBy;
        temp.reviewDate = form.reviewDate || jhaListData.reviewDate;
        temp.closedBy = form.closedBy || jhaListData.closedBy;
        temp.closeDate = form.closeDate || jhaListData.closeDate;
        temp.updatedAt = new Date().toISOString();
        temp.updatedBy = parseInt(userId)

        try {
            if (new Date(form.closeDate) > new Date(form.reviewDate)) {
                const res = await api.put(
                    `api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
                    temp
                );
                if (res.status === 200) {
                    let viewMode = {
                        initialNotification: false, investigation: false, evidence: false, rootcauseanalysis: false, lessionlearn: false
                        , closeout: true
                    }
                    // dispatch(tabViewMode(viewMode));
                    history.push(`${SUMMERY_FORM["Summary"]}${id}/`);
                }
            }
            else {
                setForm({ ...form, closeDate: null })
                let errorMessage = "Closed date cannot be prior to reviewed date"
                setError(errorMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUserList();
        fetchJhaData();
    }, []);
    const isDesktop = useMediaQuery("(min-width:992px)");
    return (
        <PapperBlock title="Close out" icon="ion-md-list-box">
            {isLoading ? (
                <Grid container spacing={3}>
                    <Grid container item xs={12} md={9} justify="flex-start" spacing={3}>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" className={Type.labelName} gutterBottom>
                                Aha number
                            </Typography>

                            <Typography varint="body1" className={Type.labelValue}>
                                {jhaListData.ahaNumber}
                            </Typography>
                        </Grid>


                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" className={Type.labelName} gutterBottom>
                                Aha assessment data
                            </Typography>
                            <Typography className={Type.labelValue}>
                                {moment(jhaListData.ahaAssessmentDate).format(
                                    "Do MMMM YYYY"
                                )}
                            </Typography>
                        </Grid>

                       

                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" className={Type.labelName} gutterBottom>
                                Aha description
                            </Typography>
                            <Typography className={Type.labelValue}>
                                {jhaListData.description}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" className={Type.labelName} gutterBottom>
                                Aha location
                            </Typography>
                            <Typography className={Type.labelValue}>
                                {jhaListData.location}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Incident report form review
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl
                                variant="outlined"

                                className={classes.formControl}


                            >
                                <InputLabel id="demo-simple-select-label">
                                    Reviewed by
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Reviewed by"
                                    value={form.reviewedBy || ""}
                                    onChange={(e) => setForm({ ...form, reviewedBy: e.target.value })}

                                >
                                    {userList.map((selectValues, index) => (
                                        <MenuItem
                                            value={selectValues.id}
                                            key={index}
                                        >
                                            {selectValues.name}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </FormControl>
                        </Grid>
                        <Snackbar
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                        >
                            <Alert onClose={handleClose} severity={messageType}>
                                {message}
                            </Alert>
                        </Snackbar>
                        <Grid item xs={12} md={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDateTimePicker
                                    error={error.reviewDate}
                                    helperText={
                                        error.reviewDate ? error.reviewDate : null
                                    }
                                    className={classes.formControl}
                                    id="date-picker-dialog"
                                    format="yyyy/MM/dd HH:mm"
                                    inputVariant="outlined"
                                    label="Reviewed on"
                                    value={form.reviewDate || null}
                                    onChange={(e) => handleReviewDate(e)}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                    disableFuture

                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Action item close out
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl
                                variant="outlined"

                                className={classes.formControl}


                            >
                                <InputLabel id="demo-simple-select-label">
                                    Closed by
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Closed by"
                                    value={form.closedBy || ""}
                                    onChange={(e) => setForm({ ...form, closedBy: e.target.value })}

                                >
                                    {userList.map((selectValues, index) => (
                                        <MenuItem
                                            value={selectValues.id}
                                            key={index}
                                        >
                                            {selectValues.name}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDateTimePicker
                                    className={classes.formControl}
                                    error={error.closeDate}
                                    helperText={
                                        error.closeDate ? error.closeDate : null
                                    }
                                    value={form.closeDate || null}
                                    onChange={(e) => handleCloseDate(e)}
                                    format="yyyy/MM/dd HH:mm"
                                    inputVariant="outlined"
                                    id="date-picker-dialog"
                                    format="yyyy/MM/dd HH:mm"
                                    inputVariant="outlined"
                                    label="Closed on"

                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}

                                    disableFuture
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>




                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleNext()}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                  
                </Grid>
            ) : (
                <h1>Loading...</h1>
            )}
        </PapperBlock>
    );
};

export default CloseOut;
