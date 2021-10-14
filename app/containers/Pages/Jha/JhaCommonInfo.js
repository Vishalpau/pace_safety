import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MuiAlert from "@material-ui/lab/Alert";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Type from "../../../styles/components/Fonts.scss";
import "../../../styles/custom.css";
import api from "../../../utils/axios";
import { handelJhaId } from "./Utils/checkValue";



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