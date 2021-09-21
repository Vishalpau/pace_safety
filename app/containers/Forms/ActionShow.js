import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import { defaults } from "chart.js";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";



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


const ActionShow = (props) => {
    const classes = useStyles();
    console.log(props)
    useEffect(() => {
        props.handelShowData()
    }, [props.updatePage]);

    return (
        <Grid container spacing={3}>
            <Typography>
                {
                    props.value.action != undefined
                    &&
                    props.value.action.map((actionId) => (
                        <Link
                            className={classes.actionLink}
                            display="block"
                            href={`https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=OM6yGoy2rZX5q6dEvVSUczRHloWnJ5MeusAQmPfq&response_type=code&companyId=${props.companyId
                                }&projectId=${props.projectId
                                }&targetPage=/app/pages/Action-Summary/&targetId=${actionId.id
                                }`}
                        >
                            {actionId.number}
                        </Link>
                    ))}
            </Typography>
        </Grid>
    )
}

export default ActionShow;
