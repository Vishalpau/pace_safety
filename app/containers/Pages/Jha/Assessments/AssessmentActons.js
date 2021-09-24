import React, { useEffect, useState, Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Grid, Typography, TextField, Button
} from '@material-ui/core';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    createHazardbox: {
        paddingTop: '0px !important',
        paddingBottom: '0px !important',
        '& button': {
            marginTop: '8px',
        },
    },
}));

const AssessmentActions = (props) => {
    console.log(props)
    useEffect(() => {
        props.handelCheckList()
    }, [props.updatePage]);

    const classes = useStyles();
    return (

        <Grid item xs={12} className={classes.createHazardbox}>
            {console.log(props)}
            <Typography>

                <Link display="block"
                    href={`https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=OM6yGoy2rZX5q6dEvVSUczRHloWnJ5MeusAQmPfq&response_type=code&companyId=${props.companyId}&projectId=${props.projectId}&targetPage=/app/pages/Action-Summary/&targetId=${props.value.id}`}
                >
                    {props.value.number}
                </Link>

            </Typography>
        </Grid>

    )
}

export default AssessmentActions;