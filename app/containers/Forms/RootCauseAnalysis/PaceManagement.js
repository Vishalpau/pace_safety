import React, { useEffect, useState, useRef } from "react";
import { Button, Grid, FormHelperText } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useHistory, useParams } from "react-router";
import { PapperBlock } from "dan-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
    button: {
        margin: theme.spacing(1),
    },
}));


const PaceManagementControl = () => {
    const [form, setForm] = useState({})
    const selevtValues = [1, 2, 3, 4]

    return (
        <PapperBlock
            title="Basic cause - PACE Management control"
            icon="ion-md-list-box"
        >
            <Grid container spacing={3}>
                {/* {console.log(form)} */}
                <Grid container item md={9} spacing={3}>
                    <Grid item md={6}>
                        <Typography variant="h6" className={Type.labelName} gutterBottom>
                            Incident number
                        </Typography>
                        <Typography className={Type.labelValue}>
                            {incidentDetail.incidentNumber}
                        </Typography>
                    </Grid>

                    <Grid item md={6}>
                        <Typography variant="h6" className={Type.labelName} gutterBottom>
                            RCA method
                        </Typography>
                        <Typography className={Type.labelValue}>
                            PACE cause analysis
                        </Typography>
                    </Grid>

                    <Grid item md={12}>
                        <FormControl component="fieldset" error={error.supervision}>
                            <FormLabel component="legend">Group 1</FormLabel>
                            <FormGroup>
                                {selevtValues.map((value) => (
                                    <FormControlLabel
                                        control={<Checkbox name={value} />}
                                        label={value}
                                    // checked={form.supervision.rcaRemark.includes(value)}
                                    // onChange={async (e) => await handelSupervison(e, value)}
                                    />
                                ))}
                            </FormGroup>
                            {/* {error && error.supervision && (
                                <FormHelperText>{error.supervision}</FormHelperText>
                            )} */}
                        </FormControl>
                        <Box borderTop={1} marginTop={2} borderColor="grey.300" />
                    </Grid>

                </Grid>
            </Grid>

        </PapperBlock >
    )
}

export default PaceManagementControl;