import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';

import {
    SSO_URL,
    HEADER_AUTH,
} from "../../utils/constants";
import api from "../../utils/axios";
import Axios from 'axios'

const complianceSt = (props) => {

    console.log(props);

    const [selectBreakDown, setSelectBreakDown] = useState([]);

    const [labelList, setLabelList] = useState([])

    const [lenghtBreaddown, setLengthBreakDown] = useState(0)


    // fetch breakdown Data
    const fetchCallBack = async (select, projectData) => {

        let labellist = projectData.projectName.breakdown.map((item, key) => { return { breakdownLabel: item.structure[0].name, breakdownValue: [], selectValue: "", index: key } })

        let lenghtbreaddown = projectData.projectName.breakdown.length ? projectData.projectName.breakdown.length : 0
        await setLengthBreakDown(lenghtbreaddown)
        let selectDepthId = []
        for (var i in select) {
            let selectId = select[i].id;
            let selectDepth = select[i].depth
            labellist[i].selectValue = select[i].id
            labellist[i].disabled = true
            selectDepthId = [...selectDepthId, `${selectDepth}${selectId}`]
        }

        props.setSelectDepthAndId(selectDepthId)
        if (select.length === 0) {

            var config = {
                method: "get",
                url: `${SSO_URL}/${projectData.projectName.breakdown[0].structure[0].url
                    }`,
                headers: HEADER_AUTH,
            };
            const res = await Axios(config)
            if (res.status === 200) {
                labellist[0].breakdownValue = res.data.data.results;

                setLabelList(labellist)
                // setIsLoading(true)
            }
        } else if (labellist.length === 1) {
            var config = {
                method: "get",
                url: `${SSO_URL}/${projectData.projectName.breakdown[0].structure[0].url
                    }`,
                headers: HEADER_AUTH,
            };
            const res = await Axios(config)
            if (res.status === 200) {
                labellist[0].breakdownValue = res.data.data.results;

                setLabelList(labellist)
                // setIsLoading(true)
            }
        }
        else if (select.length === labellist.length) {

            for (var key in projectData.projectName.breakdown) {

                if (key == select.length - 1) {

                    try {
                        var config = {
                            method: "get",
                            url: `${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
                                }${select[key - 1].id}`,
                            headers: HEADER_AUTH,
                        };

                        await Axios(config)
                            .then(async (response) => {

                                labellist[key].breakdownValue = response.data.data.results;

                                setLabelList(labellist)

                            })
                            .catch(function (error) {
                            });
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        }
        else {
            for (var key in projectData.projectName.breakdown) {

                if (key == select.length) {
                    try {
                        var config = {
                            method: "get",
                            url: `${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
                                }${select[key - 1].id}`,
                            headers: HEADER_AUTH,
                        };

                        await Axios(config)
                            .then(async (response) => {
                                labellist[key].breakdownValue = response.data.data.results;
                                // labellist[key].selectValue= select[key].id;
                                setLabelList(labellist)
                            })
                            .catch(function (error) {
                            });
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        }
    };

    const handleBreakdown = async (e, index, label) => {
        let projectData = JSON.parse(localStorage.getItem('projectName'))
        const value = e.target.value;
        let temp = [...labelList]
        temp[index][`selectValue`] = value;
        // handleDepthId(value,`${index+1}L`)
        let tempdeptid = [...props.selectDepthAndId]
        let depthId = tempdeptid.filter(item => item.slice(0, 2) !== `${index + 1}L`)
        let slicedepthId = depthId.slice(0, index)
        let newDepthId = [...slicedepthId, `${index + 1}L${value}`]
        props.setSelectDepthAndId(newDepthId)
        if (selectBreakDown.filter(filterItem => filterItem.depth === `${index + 1}L`).length > 0) {
            for (var i in temp) {
                if (i > index) {
                    temp[i].breakdownValue = []
                }

            }
            let removeSelectBreakDown = selectBreakDown.slice(0, index)

            let name = temp[index].breakdownValue.map(
                async (item) => {
                    if (item.id === value) {
                        setSelectBreakDown([
                            ...removeSelectBreakDown,
                            { depth: item.depth, id: item.id, name: item.name, label: label },
                        ]);
                        return;
                    }

                }
            );
        }
        else {
            // temp[key].selectValue= e.target.value;
            let name = temp[index].breakdownValue.map(
                async (item) => {
                    if (item.id === value) {
                        await setSelectBreakDown([
                            ...selectBreakDown,
                            { depth: item.depth, id: item.id, name: item.name, label: label },
                        ]);

                        return;
                    }

                }
            );
        }

        if (projectData.projectName.breakdown.length !== index + 1) {
            for (var key in projectData.projectName.breakdown) {
                if (key == index + 1) {
                    var config = {
                        method: "get",
                        url: `${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
                            }${value}`,
                        headers: HEADER_AUTH,
                    };

                    await Axios(config)
                        .then(function (response) {
                            if (response.status === 200) {
                                temp[key].breakdownValue = response.data.data.results;
                                setLabelList(temp)
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        }
    };

    useEffect(() => {
        console.log(labelList, 'labelllllllll');
    }, [labelList])

    useEffect(() => {
        // fetchListData();
        const projectData = JSON.parse(localStorage.getItem('projectName'));
        // const localSelect = JSON.parse(localStorage.getItem('selectBreakDown')) !== null ? JSON.parse(localStorage.getItem('selectBreakDown')) : []
        // console.log(localSelect, 'sfldsj');
        const select = []
        let breakdownLength = projectData.projectName.breakdown.length
        props.setLevelLenght(breakdownLength)
        fetchCallBack(select, projectData);

    }, [props.initialValues]);
    return (
        <>
            {labelList.length > 0 && labelList.map((item, index) => {
                console.log(item.breakdownValue.length, 'ldfs');
                return (
                    <Grid item md={3} sm={3} xs={12}>
                        <FormControl
                            key={index}
                            variant="outlined"
                            error={props.selectDepthAndId[item.index] != undefined ? false : props.error && props.error[`projectStructure${[item.index]}`]}
                            fullWidth={true}
                            className="formControl"
                            required
                        >

                            <InputLabel id={item.breakdownLabel}>
                                {item.breakdownLabel}
                            </InputLabel>
                            <Select
                                labelId="filter3-label"
                                id={item.breakdownLabel}
                                disabled={item.breakdownValue.length > 0 ? false : true}
                                onChange={(e) => {
                                    handleBreakdown(e, (item.index), item.breakdownLabel);
                                }}
                                value={item.selectValue !== "" ? parseInt(item.selectValue) : ""}
                                label={item.breakdownLabel}
                                style={{ width: "100%" }}
                            >
                                {item.breakdownValue.length > 0
                                    ? item.breakdownValue.map(
                                        (selectValue, selectKey) => (
                                            <MenuItem
                                                key={selectKey}
                                                value={selectValue.id}
                                            >
                                                {selectValue.name}
                                            </MenuItem>
                                        )
                                    )
                                    : <MenuItem

                                    >
                                        No Data
                                    </MenuItem>}
                            </Select>
                            {props.selectDepthAndId[item.index] != undefined ? null : <p style={{ color: "red" }}>{props.error[`projectStructure${[item.index]}`]}</p>
                            }
                            {/* {props.error && props.error[`projectStructure${[item.index]}`] && (
            <FormHelperText>
              {props.error[`projectStructure${[item.index]}`]}
            </FormHelperText>
          )} */}
                        </FormControl>
                    </Grid>
                )
            })}
        </>
    )
}

const complianceSts = connect((state) => ({
    initialValues: state.getIn(['InitialDetailsReducer']),
  }))(complianceSt);

export default complianceSts;