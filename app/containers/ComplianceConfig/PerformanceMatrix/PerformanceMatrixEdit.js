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
import { SketchPicker } from 'react-color';
import Tooltip from '@material-ui/core/Tooltip';
import api from "../../../utils/axios"
import MatrixValidation from './MatrixValidation';
import { error } from 'highcharts';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

const PerformanceMatrixEdit = () => {
    const classes = useStyles();
    const history = useHistory();
    console.log(history)
    const [matrixData, setMatrixData] = useState(history.location.state);
    const [colorPick, setColorPick] = useState('#06425c');
    const [hidden, setHidden] = useState(false);

    const handleStatusChange = (e) => {
        let temp = { ...matrixData }
        if (e.target.checked === true) {
            temp.status = 'Active'
        } else {
            temp.status = 'Inactive'
        }
        setMatrixData(temp)
    }


    const [error, setError] = useState({})
    const handleUpdate = async () => {
        const { error, isValid } = MatrixValidation(matrixData)
        setError(error)
        if (!isValid) {
            return "data not valid"
        }
        const res = await api.put(`/api/v1/configaudits/matrix/${matrixData.id}/?company=${matrixData.fkCompanyId}&project=${matrixData.fkProjectId}&projectStructure=`, matrixData).then(res => {
            localStorage.setItem("configTab", 2)
                , history.goBack()
        }
        ).catch(err => console.log(error))
    }

    return (
        <>
            <CustomPapperBlock title="Edit performance matrix" icon='customDropdownPageIcon compliancePerMatrixPageIcon' whiteBg>
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
                                            <rect id="Rectangle_2200" data-name="Rectangle 2200" width="32" height="32" transform="translate(229 1745)" fill="none" />
                                            <g id="noun-grid-486323" transform="translate(204.604 1720.598)">
                                                <path id="Path_6871" data-name="Path 6871" d="M36.775,25.6H27.485A1.891,1.891,0,0,0,25.6,27.491v9.289a1.892,1.892,0,0,0,1.889,1.889h9.289a1.892,1.892,0,0,0,1.889-1.889V27.491A1.891,1.891,0,0,0,36.775,25.6Z" transform="translate(0 0)" fill="#06425c" />
                                                <path id="Path_6872" data-name="Path 6872" d="M294.14,25.6h-9.289a1.891,1.891,0,0,0-1.89,1.889v9.289a1.892,1.892,0,0,0,1.89,1.889h9.289a1.892,1.892,0,0,0,1.889-1.889V27.491a1.891,1.891,0,0,0-1.889-1.889Z" transform="translate(-240.834 0)" fill="#06425c" />
                                                <path id="Path_6873" data-name="Path 6873" d="M36.775,282.96H27.485a1.891,1.891,0,0,0-1.889,1.889v9.289a1.891,1.891,0,0,0,1.889,1.889h9.289a1.892,1.892,0,0,0,1.889-1.889v-9.289A1.892,1.892,0,0,0,36.775,282.96Z" transform="translate(0 -240.826)" fill="#06425c" />
                                                <path id="Path_6874" data-name="Path 6874" d="M294.14,282.96h-9.289a1.891,1.891,0,0,0-1.89,1.889v9.289a1.892,1.892,0,0,0,1.89,1.889h9.289a1.891,1.891,0,0,0,1.889-1.889v-9.289a1.891,1.891,0,0,0-1.889-1.889Z" transform="translate(-240.834 -240.826)" fill="#06425c" />
                                            </g>
                                        </g>
                                    </svg> Matrix
                                </Typography>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                <Paper elevation={1} className="paperSection">
                                    <Grid container spacing={3}>
                                    {/* {matrixData.matrixConstant} */}
                                        <Grid item md={4} sm={6} xs={12}>
                                            {/* <TextField
                                                type="number"
                                                label="Matrix constant *"
                                                name="matrixconstant"
                                                id="matrixconstant"
                                                error={error.matrixConstant}
                                                helperText={error.matrixConstant ? error.matrixConstant : ""}
                                                value={matrixData.matrixConstant ? matrixData.matrixConstant : ""}
                                                onChange={(e) => { setMatrixData({ ...matrixData, matrixConstant: e.target.value }) }}
                                                fullWidth
                                                variant="outlined"
                                                className="formControl"
                                                inputProps={{
                                                    min: 0,
                                                    max: 5,
                                                    inputMode: 'numeric',
                                                    pattern: '[0-5]*'
                                                }}
                                            /> */}
                                            <TextField
                                                label="Matrix constant name"
                                                name="matrixconstantname"
                                                id="matrixconstantname"
                                                value={matrixData.matrixConstant}
                                                onChange={(e) => { setMatrixData({ ...matrixData, matrixConstant: e.target.value }) }}
                                                fullWidth
                                                variant="outlined"
                                                className="formControl"
                                            />
                                        </Grid>

                                        <Grid item md={4} sm={6} xs={12}>
                                            <TextField
                                                label="Matrix constant name"
                                                name="matrixconstantname"
                                                id="matrixconstantname"
                                                value={matrixData.matrixConstantName ? matrixData.matrixConstantName : ""}
                                                onChange={(e) => { setMatrixData({ ...matrixData, matrixConstantName: e.target.value }) }}
                                                fullWidth
                                                variant="outlined"
                                                className="formControl"
                                            />
                                        </Grid>

                                        <Grid item md={4} sm={6} xs={12} className="positionRelative">
                                            <div className="customColorPickerSection">
                                                <TextField
                                                    label="Matrix constant color *"
                                                    name="matrixconstantcolor"
                                                    id="matrixconstantcolor"
                                                    error={error.matrixConstantColor}
                                                    helperText={error.matrixConstantColor ? error.matrixConstantColor : ""}
                                                    value={matrixData.matrixConstantColor ? matrixData.matrixConstantColor : ""}
                                                    fullWidth
                                                    variant="outlined"
                                                    className="formControl"
                                                    disabled
                                                />
                                                {hidden && (
                                                    <SketchPicker color={matrixData.matrixConstantColor} onChange={updateColor => { setMatrixData({ ...matrixData, matrixConstantColor: updateColor.hex }) }} />
                                                )}
                                                <Tooltip title="Color pick">
                                                    <span className="customColorDisplay" style={{ backgroundColor: matrixData.matrixConstantColor }} onClick={() => setHidden(!hidden)} />
                                                </Tooltip>
                                            </div>
                                        </Grid>

                                        <Grid item md={4} sm={6} xs={12}>
                                            <FormLabel component="legend" className="checkRadioLabel">Status</FormLabel>
                                            <FormControlLabel
                                                control={(
                                                    <Switch
                                                        value="Status"
                                                        color="secondary"
                                                        checked={matrixData.status === "Active" ? true : false}
                                                        onChange={(e) => handleStatusChange(e)}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid item md={12} sm={12} xs={12} className="buttonActionArea">
                        <Button size="medium" variant="contained" color="primary" className="spacerRight buttonStyle" onClick={() => handleUpdate()}>
                            Update
                        </Button>
                        <Button size="medium" variant="contained" color="secondary" className="buttonStyle custmCancelBtn" onClick={() => { localStorage.setItem("configTab", 2), history.goBack() }}>
                            Cancel
                        </Button>
                    </Grid>

                </Grid>
            </CustomPapperBlock>
        </>
    );
};

export default PerformanceMatrixEdit;