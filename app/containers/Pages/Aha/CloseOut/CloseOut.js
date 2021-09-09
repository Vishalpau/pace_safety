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
import CloseOutValidator from "../Validator/CloseOutValidation";

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
       await  setJhaListdata(result)

    };
    // handle close snackbar
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleCloseDate = (e) => {
        if (new Date(e) < new Date()) {
            setJhaListdata({ ...jhaListData, closedDate: moment(e).toISOString() });
            error.closedDate = ""
            setError(error);
        }
        else {
            setJhaListdata({ ...jhaListData, closeDate: null })
            let errorMessage = "Closed time should not be ahead of current time"
            error.closedDate = errorMessage
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
        
        const { error, isValid } = CloseOutValidator(jhaListData);
        await setError(error);
        if (!isValid) {
          return "Data is not valid";
        }
     
        delete  jhaListData['ahaAssessmentAttachment']
        const res = await api.put(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/ `,jhaListData)
        if(res.status === 200) {
            history.push(`/app/pages/aha/aha-summary/${localStorage.getItem("fkAHAId")}`);
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
                                Action item close out
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl
                                variant="outlined"

                                className={classes.formControl}
                                error= {error.closedByName}


                            >
                                <InputLabel id="demo-simple-select-label">
                                    Closed by*
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Closed by"
                                    value={jhaListData.closedByName ? jhaListData.closedByName : ""}
                                    

                                >
                                    {userList.map((selectValues, index) => (
                                        <MenuItem
                                            value={selectValues.name}
                                            key={index}
                                            onClick={(e) => setJhaListdata({ ...jhaListData, closedByName: selectValues.name , closedById: selectValues.id})}

                                        >
                                            {selectValues.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                        {error.closedByName ? <FormHelperText>{error.closedByName}</FormHelperText> :""}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDateTimePicker
                                    className={classes.formControl}
                                    error={error.closedDate}
                                    helperText={
                                        error.closedDate ? error.closedDate : null
                                    }
                                    value={jhaListData.closedDate ? jhaListData.closedDate : null}
                                    onChange={(e) => handleCloseDate(e)}
                                    format="yyyy/MM/dd HH:mm"
                                    inputVariant="outlined"
                                    id="date-picker-dialog"
                                    format="yyyy/MM/dd HH:mm"
                                    inputVariant="outlined"
                                    label="Closed on*"
                                    autoComplete = "off"
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                    
                    // console.log(e.target.value)
                  
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
