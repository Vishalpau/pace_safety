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
    actionLink: {
        fontSize: "14px",
        lineHeight: "1.7",
    },
}));


const ActionShow = (props) => {
    const classes = useStyles();
    console.log(props)
    useEffect(() => {
        props.handelShowData()
    }, [props.updatePage]);

    return (
        <Link
            className={classes.actionLink}
            display="block"
            href={`https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=OM6yGoy2rZX5q6dEvVSUczRHloWnJ5MeusAQmPfq&response_type=code&companyId=${props.companyId
                }&projectId=${props.projectId
                }&targetPage=/app/pages/Action-Summary/&targetId=${props.action.id
                }`}
            target="_blank"
        >
            {props.action.number}
        </Link>
    )
}

export default ActionShow;
