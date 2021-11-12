import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";




const useStyles = makeStyles((theme) => ({
    loaderAlingment: {
        textAlign: 'center',
    },
    loaderIcon: {
        height: '70px !important',
        width: '70px !important',
    }
}));

const Loader = () => {

    const classes = useStyles();

    return (
        <Box m={50} pt={3} className={classes.loaderAlingment}>
            <CircularProgress color="secondary" className={classes.loaderIcon} />
        </Box>

    )
}

export default Loader