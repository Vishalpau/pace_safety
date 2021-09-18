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
    const classes = useStyles();
    return (

        <Grid item xs={12} className={classes.createHazardbox}>
            {props.form.map((value, index) => (
                <>
                    {
                        props.form[index]["action"].length > 0
                        &&
                        props.form[index]["action"].map((value) => (
                            <Link display="block"
                                href={`https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=OM6yGoy2rZX5q6dEvVSUczRHloWnJ5MeusAQmPfq&response_type=code&companyId=${props.companyId}&projectId=${props.projectId}&targetPage=/app/pages/Action-Summary/&targetId=${value.trackerId}`}
                            >
                                {value.trackerNumber}
                            </Link>
                        ))
                    }
                </>
            ))}
        </Grid>

    )
}

export default AssessmentActions;