import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Row, Col } from "react-grid-system";

import { Typography } from "@material-ui/core";

import {
  INITIAL_NOTIFICATION_FORM,
  SSO_URL,
  HEADER_AUTH,ACCOUNT_API_URL,
} from "../../utils/constants";
import api from "../../utils/axios";
import Type from "../../styles/components/Fonts.scss";
import Axios from 'axios'


// redux
import { connect } from 'react-redux'


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

const ProjectStructure = (props) => {
  // Props definations.
  const classes = useStyles();
  const [error, setError] = useState({});

  const [breakdown1ListData, setBreakdown1ListData] = useState([]);
  const [selectValue, setSelectValue] = useState([]);

  const [leafNode, setLeafNode] = useState(false)

  const [selectBreakDown, setSelectBreakDown] = useState([]);
  const [fetchSelectBreakDownList, setFetchSelectBreakDownList] = useState([])

  const [selectDepth, setSelectDepth] = useState("")
  const [labelList, setLabelList] = useState([])

  // const [selectDepthAndId, setSelectDepthAndId] = useState([])
  const [lenghtBreaddown, setLengthBreakDown] = useState(0)
  const [label, setLabel] = useState([])
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

  const selectBreakdown =
    JSON.parse(localStorage.getItem("selectBreakDown")) !== null
      ? JSON.parse(localStorage.getItem("selectBreakDown"))
      : [];
  let struct = "";
  for (const i in selectBreakdown) {
    struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
  }
  const fkProjectStructureIds = struct.slice(0, -1);

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
                // labellist[key].selectValue= select[key].id;


                setLabelList(labellist)

              })
              .catch(function (error) {
              });
          } catch (err) {
            ;
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
    } else {
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
                // temp[key].selectValue= e.target.value;

                setLabelList(temp)
              }
            })
            .catch(function (error) {

            });
        }
      }
    }
  };

  const setStateBreakDown = async (select, projectData) => {

    await setLeafNode(false)

    let tempBreakDownList = [...breakdown1ListData]
    tempBreakDownList = []

    await setBreakdown1ListData(tempBreakDownList)
    let tempDepthAndId = [...props.selectDepthAndId];
    tempDepthAndId = []
    props.setSelectDepthAndId(tempDepthAndId)

    await fetchCallBack(select, projectData);

  }

  useEffect(() => {
    // fetchListData();
    const projectData = JSON.parse(localStorage.getItem('projectName'));
    const localSelect = JSON.parse(localStorage.getItem('selectBreakDown')) !== null ? JSON.parse(localStorage.getItem('selectBreakDown')) : []
    const select = props.initialValues.breakDown.length > 0 ? props.initialValues.breakDown : localSelect
    let breakdownLength = projectData.projectName.breakdown.length
    props.setLevelLenght(breakdownLength)
    if (select.length === 0 ? true : false) {

      setStateBreakDown(select, projectData)
    } else {
      fetchCallBack(select, projectData);
    }

  }, [props.initialValues.breakDown]);
  return (<>
    {selectBreakdown && selectBreakdown.slice(0, lenghtBreaddown - 1).map((selectBreakdow, key) =>
      <Grid item xs={3} key={key}>
        <Typography
          variant="h6"
          className={Type.labelName}
          gutterBottom
          id="project-name-label"
        >
          {selectBreakdow.label}
        </Typography>
        <Typography className={Type.labelValue}>
          {selectBreakdow.name}
        </Typography>
      </Grid>)}

    {labelList.length === 1 ? labelList.map((item, index) => {
      console.log(item.breakdownLabel);
      return(
      <Grid item md={3} sm={3} xs={12}>
        <FormControl
          key={index}
          variant="outlined"
          error={props.selectDepthAndId[item.index] != undefined ? false: props.error && props.error[`projectStructure${[item.index]}`]}
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
            // value={item.selectValue}
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
          {props.selectDepthAndId[item.index] != undefined ? null :<p style={{ color: "red" }}>{props.error[`projectStructure${[item.index]}`] }</p>
              }
          {/* {props.error && props.error[`projectStructure${[item.index]}`] && (
            <FormHelperText>
              {props.error[`projectStructure${[item.index]}`]}
            </FormHelperText>
          )} */}
        </FormControl>
      </Grid>
    )})
      : labelList.length === selectBreakdown.length ?
        labelList.slice(selectBreakdown.length - 1).map((item, index) => (
          <Grid item md={3} sm={3} xs={12}>
            <FormControl
              key={index}
              variant="outlined"
              error={props.selectDepthAndId[item.index] != undefined ? false: props.error && props.error[`projectStructure${[item.index]}`]}
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
                // value={item.selectValue}
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

 {props.selectDepthAndId[item.index] != undefined ? null :<p style={{ color: "red" }}>{props.error[`projectStructure${[item.index]}`] }</p>
              }
              {/* {props.error && props.error[`projectStructure${[item.index]}`] && (
                <FormHelperText>
                  {props.error[`projectStructure${[item.index]}`]}
                </FormHelperText>
              )} */}
            </FormControl>
          </Grid>
        )) :
        labelList.length > 0 ? labelList.slice(selectBreakdown.length).map((item, index) => (
          <Grid item md={3} sm={3} xs={12}>
            <FormControl
              key={index}
              variant="outlined"
              error={props.selectDepthAndId[item.index] != undefined ? false: props.error && props.error[`projectStructure${[item.index]}`]}
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
                // value={item.selectValue}
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
              {props.selectDepthAndId[item.index] != undefined ? null :<p style={{ color: "red" }}>{props.error[`projectStructure${[item.index]}`] }</p>
              }
              

              {/* {props.error && props.error[`projectStructure${[item.index]}`] && (
                <FormHelperText>
                  {props.error[`projectStructure${[item.index]}`]}
                </FormHelperText>
              )} */}
            </FormControl>
          </Grid>
        ))
          : null}
  </>
  );
};

const ProjectStructureInit = connect((state) => ({
  initialValues: state.getIn(["InitialDetailsReducer"]),
}))(ProjectStructure);

export default ProjectStructureInit;