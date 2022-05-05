import React, { useEffect, useState, Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Grid, Typography, TextField, Button
} from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { useHistory, useParams } from 'react-router';
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

// for view
const PerformanceMatrixView = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <>
        <CustomPapperBlock title="Performances Matrix" icon='customDropdownPageIcon complianceConfigPageIcon' whiteBg>
            <Grid container spacing={3}>
                <Grid
                    item
                    md={12}
                    xs={12}
                >
                    <Grid container spacing={3}>
                        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                            <Typography variant="h6" className="sectionHeading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                    <g id="matrix-32" transform="translate(-229 -1745)">
                                        <rect id="Rectangle_2200" data-name="Rectangle 2200" width="32" height="32" transform="translate(229 1745)" fill="none"/>
                                        <g id="noun-grid-486323" transform="translate(204.604 1720.598)">
                                        <path id="Path_6871" data-name="Path 6871" d="M36.775,25.6H27.485A1.891,1.891,0,0,0,25.6,27.491v9.289a1.892,1.892,0,0,0,1.889,1.889h9.289a1.892,1.892,0,0,0,1.889-1.889V27.491A1.891,1.891,0,0,0,36.775,25.6Z" transform="translate(0 0)" fill="#06425c"/>
                                        <path id="Path_6872" data-name="Path 6872" d="M294.14,25.6h-9.289a1.891,1.891,0,0,0-1.89,1.889v9.289a1.892,1.892,0,0,0,1.89,1.889h9.289a1.892,1.892,0,0,0,1.889-1.889V27.491a1.891,1.891,0,0,0-1.889-1.889Z" transform="translate(-240.834 0)" fill="#06425c"/>
                                        <path id="Path_6873" data-name="Path 6873" d="M36.775,282.96H27.485a1.891,1.891,0,0,0-1.889,1.889v9.289a1.891,1.891,0,0,0,1.889,1.889h9.289a1.892,1.892,0,0,0,1.889-1.889v-9.289A1.892,1.892,0,0,0,36.775,282.96Z" transform="translate(0 -240.826)" fill="#06425c"/>
                                        <path id="Path_6874" data-name="Path 6874" d="M294.14,282.96h-9.289a1.891,1.891,0,0,0-1.89,1.889v9.289a1.892,1.892,0,0,0,1.89,1.889h9.289a1.891,1.891,0,0,0,1.889-1.889v-9.289a1.891,1.891,0,0,0-1.889-1.889Z" transform="translate(-240.834 -240.826)" fill="#06425c"/>
                                        </g>
                                    </g>
                                </svg> Matrix
                            </Typography>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                            <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                    <Grid item md={4} sm={6} xs={12}>
                                        <Typography
                                            variant="label"
                                            gutterBottom
                                            className="viewLabel"
                                        >
                                            Matrix constant
                                        </Typography>
                                        <Typography className="viewLabelValue">
                                            1234
                                        </Typography>
                                    </Grid>

                                    <Grid item md={4} sm={6} xs={12}>
                                        <Typography
                                            variant="label"
                                            gutterBottom
                                            className="viewLabel"
                                        >
                                            Matrix constant name
                                        </Typography>
                                        <Typography className="viewLabelValue">
                                            Matrix
                                        </Typography>
                                    </Grid>

                                    <Grid item md={4} sm={6} xs={12}>
                                        <Typography
                                            variant="label"
                                            gutterBottom
                                            className="viewLabel"
                                        >
                                            Matrix constant color
                                        </Typography>
                                        <Typography className="viewLabelValue colorBox">
                                            2
                                        </Typography>
                                    </Grid>

                                    <Grid item md={4} sm={6} xs={12}>
                                        <Typography
                                            variant="label"
                                            gutterBottom
                                            className="viewLabel"
                                        >
                                            Status
                                        </Typography>
                                        <Typography className="viewLabelValue">
                                            Inactive
                                        </Typography>
                                    </Grid>  
                                </Grid>
                            </Paper>
                        </Grid> 
                    </Grid>
                            
                </Grid>

                <Grid item md={12} sm={12} xs={12} className="buttonActionArea">
                    <Button size="medium" variant="contained" color="secondary" className="buttonStyle custmCancelBtn" onClick={() => history.goBack()}>
                        Cancel
                    </Button>
                </Grid>

            </Grid>
        </CustomPapperBlock>
        </>
    );
};

export default PerformanceMatrixView;