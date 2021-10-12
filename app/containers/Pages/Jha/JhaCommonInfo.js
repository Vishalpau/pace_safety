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
import TextButton from "../../CommonComponents/TextButton";
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from "@material-ui/pickers";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
    access_token,
    ACCOUNT_API_URL,
} from "../../../utils/constants";
import api from "../../../utils/axios";
import Type from "../../../styles/components/Fonts.scss";
import "../../../styles/custom.css";
import { handelJhaId, checkValue } from "./Utils/checkValue"



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

const JhaCommonInfo = () => {

    // const dispatch = useDispatch();
    const [jhaListData, setJhaListdata] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const userId =
        JSON.parse(localStorage.getItem("userDetails")) !== null
            ? JSON.parse(localStorage.getItem("userDetails")).id
            : null;

    // fetch incident data
    const fetchJhaData = async () => {
        const jhaId = handelJhaId()
        const res = await api.get(`/api/v1/jhas/${jhaId}/`)
        const result = res.data.data.results;
        console.log(result)
        setJhaListdata(result)
    };

    useEffect(() => {
        fetchJhaData();
    }, []);
    const isDesktop = useMediaQuery("(min-width:992px)");
    return (

        <Grid container spacing={3}>
            <Grid container item xs={12} md={9} justify="flex-start" spacing={3}>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={Type.labelName} gutterBottom>
                        Jha number
                    </Typography>

                    <Typography varint="body1" className={Type.labelValue}>
                        {jhaListData.jhaNumber}
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={Type.labelName} gutterBottom>
                        Jha assessment data
                    </Typography>
                    <Typography className={Type.labelValue}>
                        {moment(jhaListData.jhaAssessmentDate).format(
                            "Do MMMM YYYY"
                        )}
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={Type.labelName} gutterBottom>
                        Jha description
                    </Typography>
                    <Typography className={Type.labelValue}>
                        {jhaListData.description}
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={Type.labelName} gutterBottom>
                        Jha location
                    </Typography>
                    <Typography className={Type.labelValue}>
                        {jhaListData.location}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default JhaCommonInfo;