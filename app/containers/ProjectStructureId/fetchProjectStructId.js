import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import moment from "moment";
import { PapperBlock } from "dan-components";
import { useHistory, useParams } from "react-router";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Row, Col } from "react-grid-system";

import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import FormSideBar from "../FormSideBar";
import {
    INITIAL_NOTIFICATION_FORM,
    SSO_URL,
    HEADER_AUTH,
} from "../../../utils/constants";
import validate from "../../Validator/validation";
import api from "../../../utils/axios";
import AlertMessage from "./Alert";
import Type from "../../../styles/components/Fonts.scss";
import Axios from 'axios'


// redux
import { connect } from 'react-redux'
import { breakDownDetails, levelBDownDetails } from "../../../redux/actions/initialDetails";
import ProjectStructureInit from "../../ProjectStructureId/ProjectStructureId";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    fullWidth: {
        width: "100%",
    },
    inlineRadioGroup: {
        flexDirection: "row",
        gap: "1.5rem",
    },
}));

const fetchProjectStructureId = (props) => {
    // Props definations.
    const classes = useStyles();
    const [error, setError] = useState({});
  
    const [fetchSelectBreakDownList, setFetchSelectBreakDownList] = useState([])

    // Initial forms.
    const [form, setForm] = useState({
        incidentType: "",
        incidentOccuredOn: null,
        incidentTitle: "",
        incidentDetails: "",
        immediateActionsTaken: "",
        incidentLocation: "",
        contractor: "",
        subContractor: "",
        isPersonAffected: "",
        isPropertyDamaged: "",
        isEquipmentDamaged: "",
        isEnviromentalImpacted: "",
    });

    const fkCompanyId =
        JSON.parse(localStorage.getItem("company")) !== null
            ? JSON.parse(localStorage.getItem("company")).fkCompanyId
            : null;
    const project =
        JSON.parse(localStorage.getItem("projectName")) !== null
            ? JSON.parse(localStorage.getItem("projectName")).projectName
            : null;
    const userId =
        JSON.parse(localStorage.getItem("userDetails")) !== null
            ? JSON.parse(localStorage.getItem("userDetails")).id
            : null;
    const userName =
        JSON.parse(localStorage.getItem("userDetails")) !== null
            ? JSON.parse(localStorage.getItem("userDetails")).name
            : null;
    const selectBreakdown =
        JSON.parse(localStorage.getItem("selectBreakDown")) !== null
            ? JSON.parse(localStorage.getItem("selectBreakDown"))
            : [];
    let struct = "";
    for (const i in selectBreakdown) {
        struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);



    const fetchBreakDownData = async (projectBreakdown) => {

        const projectData = JSON.parse(localStorage.getItem('projectName'));

        let selectBreakDown = [];
        const breakDown = projectBreakdown.split(':');

        for (var key in breakDown) {
            if (breakDown[key].slice(0, 2) === '1L') {
                var config = {
                    method: "get",
                    url: `${SSO_URL}/${projectData.projectName.breakdown[0].structure[0].url
                        }`,
                    headers: HEADER_AUTH,
                };

                await api(config)
                    .then(async (response) => {
                        const result = response.data.data.results;
                        await setIsLoading(true);
                        result.map((item) => {
                            if (breakDown[key].slice(2) == item.id) {

                                selectBreakDown = [
                                    ...selectBreakDown, {
                                        breakDownLabel: projectData.projectName.breakdown[0].structure[0].name,
                                        selectValue: { depth: item.depth, id: item.id, name: item.name, label: projectData.projectName.breakdown[key].structure[0].name },
                                        breakDownData: result
                                    }

                                ];

                            }
                        });
                        setFetchSelectBreakDownList(selectBreakDown)
                    })
                    .catch((error) => {

                    
                    });
            } else {
                var config = {
                    method: "get",
                    url: `${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
                        }${breakDown[key - 1].substring(2)}`,
                    headers: HEADER_AUTH,
                };

                await api(config)
                    .then(async (response) => {

                        const result = response.data.data.results;

                        const res = result.map((item, index) => {
                            if (parseInt(breakDown[key].slice(2)) == item.id) {

                                selectBreakDown = [
                                    ...selectBreakDown,
                                    {
                                        breakDownLabel: projectData.projectName.breakdown[key].structure[0].name,
                                        selectValue: { depth: item.depth, id: item.id, name: item.name, label: projectData.projectName.breakdown[key].structure[0].name },
                                        breakDownData: result
                                    }
                                ];

                            }
                        });
                        setFetchSelectBreakDownList(selectBreakDown)

                    })
                    .catch((error) => {
                        console.log(error)
                        
                    });
            }
        }
    };
useEffect(()=>{
    fetchBreakDownData();
})

    return (
        <>
            {fetchSelectBreakDownList.map((data, key) => 
                <Grid item xs={12} md={12} key={key}>
                    <FormControl
                        error={error.incidentType}
                        variant="outlined"
                        required
                        className={classes.formControl}
                    >
                        <InputLabel id="demo-simple-select-label">
                            {data.breakDownLabel}
                        </InputLabel>
                        <Select
                            labelId="incident-type-label"
                            id="incident-type"
                            label="Incident type"
                            value={data.selectValue.id || ""}
                            onChange={(e) => {
                                setForm({ ...form, incidentType: e.target.value });
                            }}
                        >
                            {data.breakDownData.length !== 0
                                ? data.breakDownData.map((selectvalues, index) => (
                                    <MenuItem key={index} value={selectvalues.id}>
                                        {selectvalues.structureName}
                                    </MenuItem>
                                ))
                                : null}
                        </Select>
                        {error && error.incidentType && (
                            <FormHelperText>{error.incidentType}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            )}
        </>
    );
};


export default fetchProjectStructureId;