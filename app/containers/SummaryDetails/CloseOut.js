import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Fonts from "dan-styles/Fonts.scss";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
// Styles
import "../../styles/custom.css";
import api from "../../utils/axios";
import {
    ACCOUNT_API_URL
} from "../../utils/constants";
import Loader from "../Forms/Loader";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightMedium,
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        position: "absolute",
        width: 650,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(4),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
    modalButton: {
        width: "100%",
    },
}));


const CloseOutSummary = () => {
    const { id } = useParams();

    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [userList, setUserList] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const fetchIncidentData = async () => {
        const allIncidents = await api.get(`api/v1/incidents/${id}/`);
        await setIncidents(allIncidents.data.data.results);
    };
    if (id) {
        localStorage.setItem("fkincidentId", id);
    }
    const handleExpand = (panel) => (event, isExpanded) => {
        console.log(isExpanded)
        setExpanded(isExpanded ? panel : false);
    };

    const handelCloseOut = (e, value) => {
        if (value == "modify") {
            history.push(`/incident/${id}/close-out/:modify/`)
        } else if (value == "add") {
            history.push(`/incident/${id}/close-out/:new/`)
        }
    }

    const fetchUserList = async () => {
        await api.get(`${ACCOUNT_API_URL}api/v1/companies/${JSON.parse(localStorage.getItem('company')).fkCompanyId}/users/`)
            .then(function (response) {
                console.log(response)
                if (response.status === 200) {
                    const result = response.data.data.results[0].users
                    setUserList(result)

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handelCallBack = async () => {
        await setIsLoading(true)
        await fetchIncidentData();
        await fetchUserList();
        await setIsLoading(false)
    }

    useEffect(() => {
        handelCallBack()
    }, []);
    const classes = useStyles();
    const isDesktop = useMediaQuery("(min-width:992px)");
    return (
        <Grid container spacing={3}>
            {!isDesktop && (
                <Grid item xs={12}>
                    {incidents.closeDate ?
                        <Button variant="outlined" startIcon={<EditIcon />} onClick={(e) => handelCloseOut(e, "modify")}>
                            Modify Close out
                        </Button>
                        :
                        <Button variant="outlined" startIcon={<EditIcon />} onClick={(e) => handelCloseOut(e, "add")}>
                            Add Close out
                        </Button>
                    }

                </Grid>
            )}
            {isLoading == false ?
                <Grid item xs={12}>
                    <Accordion
                        expanded={expanded == "panel1"}
                        onChange={handleExpand("panel1")}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>
                                Close out
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container item xs={12} spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        className={Fonts.labelName}
                                    >
                                        Reviewed by
                                    </Typography>
                                    <Typography className={Fonts.labelValue} >
                                        {console.log(incidents.reviewedByName)}
                                        {incidents.reviewedByName === null || incidents.reviewedByName === "0" ? "-" : incidents.reviewedByName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        className={Fonts.labelName}
                                    >

                                        Reviewed on
                                    </Typography>
                                    <Typography className={Fonts.labelValue}>
                                        {incidents.reviewDate ? moment(incidents.reviewDate).format(
                                            "Do MMMM YYYY, h:mm:ss a"
                                        ) : "-"}

                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        className={Fonts.labelName}
                                    >
                                        Closed by
                                    </Typography>
                                    <Typography className={Fonts.labelValue} >
                                        {incidents.closedByName === null || incidents.closedByName === "0" ? "-" : incidents.closedByName}
                                    </Typography>

                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        className={Fonts.labelName}
                                    >
                                        Close Date
                                    </Typography>
                                    <Typography className={Fonts.labelValue}>
                                        {incidents.closeDate ? moment(incidents.closeDate).format(
                                            "Do MMMM YYYY, h:mm:ss a"
                                        ) : "-"}  { }
                                    </Typography>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                :
                <Loader />
            }
        </Grid>
    );
};
export default CloseOutSummary;
