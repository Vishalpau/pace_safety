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

    // console.log(props);

    const [selectBreakDown, setSelectBreakDown] = useState([]);
    let tempArr = [];

    const [datas, setDatas] = useState([])

    const [labelList, setLabelList] = useState([])

    const [lenghtBreaddown, setLengthBreakDown] = useState(0)

    // const datas = [];

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

        // props.setSelectDepthAndId(selectDepthId)
        // props.setId(selectDepthId);
        if (select.length === 0) {

            var config = {
                method: "get",
                url: `${SSO_URL}/${projectData.projectName.breakdown[0].structure[0].url
                    }`,
                headers: HEADER_AUTH,
            };
            const res = await Axios(config)
            if (res.status === 200) {
                // console.log(res.data.data.results, 'resultsssss');
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
                                console.log(response.data.data.results);
                                labellist[key].breakdownValue = response.data.data.results;
                                // labellist[key].breakdownValue = 
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

    const handleBreakdown = async (e, index, label, name) => {
        console.log(index);
        console.log(index === labelList.length-1);

        const value = e.target.value;
        // console.log(tempA)
        let projectData = JSON.parse(localStorage.getItem('projectName'));
        let temp = [...labelList];

        temp[index][`selectValue`] = value;
        if (index === labelList.length -1) {
            setLabelList(temp);
        }
        if (selectBreakDown.filter(filterItem => filterItem.depth === `${index + 1}L`).length > 0) {
            for (var i in temp) {
                if (i > index) {
                    temp[i].breakdownValue = []
                }
            }
            let removeSelectBreakDown = selectBreakDown.slice(0, index)
            temp[index].breakdownValue.map(
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
            temp[index].breakdownValue.map(
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
                                if (response.data.data) {
                                    temp[key].breakdownValue = response.data.data.results;
                                }

                                temp.map((a, i) => {
                                    if (value === "All" && i >= index) {
                                        a.selectValue = value;
                                    }
                                    return a
                                })
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
        // let tempdeptid = [...props.selectDepthAndId];
        labelList.forEach((a, i) => {
            if (a.selectValue !== '') {
                if (a.selectValue === 'All') {
                    tempArr.push(a.selectValue);
                }
                else if (a.selectValue !== 'All') {
                    tempArr.push(`${i + 1}L${a.selectValue}`)
                }
            }
        })
        console.log(tempArr);
        props.setId(tempArr)
    }, [labelList])

    // useEffect(() => {
    //     console.log(props.selectDepthAndId);
    // }, [props.selectDepthAndId])

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

    // useEffect(() => {
    //     console.log(datas.length);
    // }, [datas])
    return (
        <>
            {labelList.length > 0 && labelList.map((item, index) => {
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
                                value={datas.length > 1 ? 'All' : item.selectValue !== "" ? item.selectValue : ''}
                                label={item.breakdownLabel}
                                name={item.breakdownLabel}
                                style={{ width: "100%" }}
                            >
                                <MenuItem key="All" value="All">
                                    All
                                </MenuItem>
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
                                    : <MenuItem>
                                        No Data
                                    </MenuItem>
                                }
                                {/* {item.breakdownLabel === "Phase" && */}

                                {/* } */}
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