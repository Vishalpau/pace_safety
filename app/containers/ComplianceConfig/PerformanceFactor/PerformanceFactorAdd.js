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
import FectorValidation from './FectorValidation';
import { FormHelperText } from "@material-ui/core";
import api from "../../../utils/axios"


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

const PerformanceFactorAdd = () => {
    const [error, setError] = useState({});
    const [performError, setPerformError] = useState('');

    const fkCompanyId =
        JSON.parse(localStorage.getItem("company")) !== null
            ? JSON.parse(localStorage.getItem("company")).fkCompanyId
            : null;
    const userId = JSON.parse(localStorage.getItem('userDetails')) !== null
        ? JSON.parse(localStorage.getItem('userDetails')).id
        : null;
    const project =
        JSON.parse(localStorage.getItem("projectName")) !== null
            ? JSON.parse(localStorage.getItem("projectName")).projectName
            : null;
    const selectBreakdown =
        JSON.parse(localStorage.getItem("selectBreakDown")) !== null
            ? JSON.parse(localStorage.getItem("selectBreakDown"))
            : null;

    const [fectorForm, setFectorForm] = useState(
        {
            "fkCompanyId": parseInt(fkCompanyId),
            "fkProjectId": parseInt(project.projectId),
            "factorType": "",
            "factorName": "",
            "factorConstant": "",
            "status": "Active",
            "createdAt": new Date(),
            "createdBy": parseInt(userId),
        })

    const handleStatusChange = (e) => {
        let temp = { ...fectorForm }
        if (e.target.checked === true) {
            temp.status = 'Active'
        } else {
            temp.status = 'Deactive'
        }
        setFectorForm(temp)
    }
    const classes = useStyles();
    const history = useHistory();

    const handleSave = async () => {
        const { error, isValid } = FectorValidation(fectorForm)
        setError(error)
        if (!isValid) {
            return "data not valid"
        }
        const res = await api.post(`/api/v1/configaudits/factors/`, fectorForm).then(res => { localStorage.setItem("configTab", 1), history.goBack() }).catch(err => console.log(error))
        setPerformError('The combination of factor type is already exist in database.')
    }
    useEffect(() => {
    }, []);


    return (
        <>
            <CustomPapperBlock title="New performance factor" icon='customDropdownPageIcon compliancePerFactorPageIcon' whiteBg>
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
                                        <g id="factor-32" transform="translate(-402 -1921)">
                                            <rect id="Rectangle_2201" data-name="Rectangle 2201" width="32" height="32" transform="translate(402 1921)" fill="none" />
                                            <g id="noun-account-setting-3611328" transform="translate(360.042 1913.9)">
                                                <path id="Path_6903" data-name="Path 6903" d="M70.955,17.455l-.061-.318-3.134-.106h0a10.591,10.591,0,0,0-2.427-4.2L66.8,10.067l-.238-.212h0a13.328,13.328,0,0,0-4.588-2.649l-.3-.106L60.013,9.762a10.661,10.661,0,0,0-4.849,0L53.5,7.1l-.3.106A13.348,13.348,0,0,0,48.61,9.855l-.235.212,1.467,2.765a10.543,10.543,0,0,0-2.421,4.2l-3.137.106-.064.318h0a13.5,13.5,0,0,0,0,5.3l.064.315,3.137.109a10.553,10.553,0,0,0,2.421,4.2l.132.141c.905-.421,2-.909,2.877-1.227h0a7.794,7.794,0,1,1,9.475,0c.861.311,1.968.8,2.871,1.223l.135-.135a10.585,10.585,0,0,0,2.427-4.2l3.134-.109.061-.315h0a13.383,13.383,0,0,0,0-5.3Z" transform="translate(0 0)" fill="#06425c" />
                                                <path id="Path_6904" data-name="Path 6904" d="M127.89,141.436c-.789-.382-2.613-1.249-3.833-1.679h0a1.834,1.834,0,0,1-.5-.271l-1.408-1.074v-.591a5.017,5.017,0,0,0,1.5-2.09,1.718,1.718,0,0,0,1.215-1.636v-1.031a1.038,1.038,0,0,0-.619-.944v-1.737a3.345,3.345,0,0,0-1.341-2.7,4.724,4.724,0,0,0-2.908-.929s-.053,0-.15,0h0a4.823,4.823,0,0,0-2.758.934,3.339,3.339,0,0,0-1.336,2.7v1.737a1.033,1.033,0,0,0-.624.944V134.1a1.716,1.716,0,0,0,1.219,1.636,4.952,4.952,0,0,0,1.5,2.09v.591l-1.408,1.074h0a1.833,1.833,0,0,1-.5.271c-1.22.431-3.044,1.3-3.833,1.679h0a.866.866,0,0,0-.465.615l-.987,5.111h0a13.136,13.136,0,0,0,16.391,1.849,12.457,12.457,0,0,0,2.3-1.849l-.987-5.111a.854.854,0,0,0-.465-.614Z" transform="translate(-62.407 -111.962)" fill="#06425c" />
                                            </g>
                                        </g>
                                    </svg> Factor
                                </Typography>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                <Paper elevation={1} className="paperSection">
                                    <Grid container spacing={3}>
                                        <Grid item md={4} sm={6} xs={12}>
                                            <FormControl
                                                //required
                                                variant="outlined"
                                                className="formControl"
                                                error={error.factorType}
                                            >
                                                <InputLabel id="project-name-label">Factor type *</InputLabel>
                                                <Select
                                                    id="project-name"
                                                    labelId="project-unit-label"
                                                    label="Factor type *"
                                                    value={fectorForm.factorType ? fectorForm.factorType : ""}
                                                    onChange={(e) => { setFectorForm({ ...fectorForm, factorType: e.target.value }), setError({ ...error, factorType: "" }) }}
                                                >
                                                    <MenuItem value="Criticality">Criticality</MenuItem>
                                                    <MenuItem value="Status">Status</MenuItem>
                                                </Select>
                                                {error && error[`factorType`] && (
                                                    <FormHelperText>
                                                        {error[`factorType`]}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid item md={4} sm={6} xs={12}>
                                            {fectorForm.factorType === 'Status' ? (
                                                <FormControl
                                                    variant="outlined"
                                                    className="formControl"
                                                    error={error.factorName}
                                                >
                                                    <InputLabel id="project-name-label">Factor name *</InputLabel>
                                                    <Select
                                                        id="project-name"
                                                        labelId="project-unit-label"
                                                        label="Factor name *"
                                                        value={fectorForm.factorName ? fectorForm.factorName : ""}
                                                        onChange={(e) => { setFectorForm({ ...fectorForm, factorName: e.target.value }), setError({ ...error, factorName: "" }) }}
                                                    >
                                                        <MenuItem value="Not in Compliance - Unsafe, Stop Work">Not in Compliance - Unsafe, Stop Work</MenuItem>
                                                        <MenuItem value="Not in Compliance  - Action required">Not in Compliance  - Action required</MenuItem>
                                                        <MenuItem value="Partial Compliance - Not satisfactory">Partial Compliance - Not satisfactory</MenuItem>
                                                        <MenuItem value="Compliant - Needs Improvement">Compliant - Needs Improvement</MenuItem>
                                                        <MenuItem value="Fully compliant">Fully compliant</MenuItem>
                                                        <MenuItem value="Full compliance & excellent">Full compliance & excellent</MenuItem>
                                                    </Select>
                                                    {error && error[`factorName`] && (
                                                        <FormHelperText>
                                                            {error[`factorName`]}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            ) :
                                                (<FormControl
                                                    variant="outlined"
                                                    className="formControl"
                                                    error={error.factorName}
                                                >
                                                    <InputLabel id="project-name-label">Factor name *</InputLabel>

                                                    <Select
                                                        id="project-name"
                                                        labelId="project-unit-label"
                                                        label="Factor name *"
                                                        value={fectorForm.factorName ? fectorForm.factorName : ""}
                                                        onChange={(e) => { setFectorForm({ ...fectorForm, factorName: e.target.value }), setError({ ...error, factorName: "" }) }}
                                                    >
                                                        <MenuItem value="High">High</MenuItem>
                                                        <MenuItem value="Medium">Medium</MenuItem>
                                                        <MenuItem value="Low">Low</MenuItem>
                                                    </Select>
                                                    {error && error[`factorName`] && (
                                                        <FormHelperText>
                                                            {error[`factorName`]}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>)}
                                        </Grid>

                                        <Grid item md={4} sm={6} xs={12}>
                                            {fectorForm.factorType === 'Status' ? (
                                                <FormControl
                                                    //required
                                                    variant="outlined"
                                                    className="formControl"
                                                    error={error.factorConstant}
                                                >
                                                    <InputLabel id="project-name-label">Factor constant *</InputLabel>
                                                    <Select
                                                        id="project-name"
                                                        labelId="project-unit-label"
                                                        label="Factor constant *"
                                                        required
                                                        value={fectorForm.factorConstant ? fectorForm.factorConstant : ""}
                                                        onChange={(e) => { setFectorForm({ ...fectorForm, factorConstant: e.target.value }), setError({ ...error, factorConstant: "" }) }}
                                                    >
                                                        <MenuItem value="0">0</MenuItem>
                                                        <MenuItem value="1">1</MenuItem>
                                                        <MenuItem value="2">2</MenuItem>
                                                        <MenuItem value="3">3</MenuItem>
                                                        <MenuItem value="4">4</MenuItem>
                                                        <MenuItem value="5">5</MenuItem>
                                                    </Select>
                                                    {error && error[`factorConstant`] && (
                                                        <FormHelperText>
                                                            {error[`factorConstant`]}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            ) : (<FormControl
                                                //required
                                                variant="outlined"
                                                className="formControl"
                                                error={error.factorConstant}
                                            >
                                                <InputLabel id="project-name-label">Factor constant *</InputLabel>
                                                <Select
                                                    id="project-name"
                                                    labelId="project-unit-label"
                                                    label="Factor constant *"
                                                    required
                                                    value={fectorForm.factorConstant ? fectorForm.factorConstant : ""}
                                                    onChange={(e) => { setFectorForm({ ...fectorForm, factorConstant: e.target.value }), setError({ ...error, factorConstant: "" }) }}
                                                >
                                                    <MenuItem value="1" selected={fectorForm.factorConstant == 1}>1</MenuItem>
                                                    <MenuItem value="0.3" selected={fectorForm.factorConstant == 0.3}>0.3</MenuItem>
                                                    <MenuItem value="0.6" selected={fectorForm.factorConstant == .60}>0.6</MenuItem>
                                                </Select>
                                                {error && error[`factorConstant`] && (
                                                    <FormHelperText>
                                                        {error[`factorConstant`]}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>)}

                                        </Grid>

                                        <Grid item md={4} sm={6} xs={12}>
                                            <FormLabel component="legend" className="checkRadioLabel">Status</FormLabel>
                                            <FormControlLabel
                                                control={(
                                                    <Switch
                                                        checked={fectorForm.status === "Active" ? true : false}
                                                        onChange={(e) => handleStatusChange(e)}
                                                        //checked={hidden}
                                                        //onChange={handleHiddenChange}
                                                        value="Status"
                                                        color="secondary"
                                                    />
                                                )}
                                            //label="S"
                                            />
                                        </Grid>
                                    </Grid>
                                    <div style={{ color: "red" }}>{performError}</div>
                                </Paper>
                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid item md={12} sm={12} xs={12} className="buttonActionArea">
                        <Button size="medium" variant="contained" color="primary" className="spacerRight buttonStyle" onClick={() => handleSave()}>
                            Save
                        </Button>
                        <Button size="medium" variant="contained" color="secondary" className="buttonStyle custmCancelBtn" onClick={() => { localStorage.setItem("configTab", 1), history.goBack() }}>
                            Cancel
                        </Button>
                    </Grid>

                </Grid>
            </CustomPapperBlock>
        </>
    );
};

export default PerformanceFactorAdd;