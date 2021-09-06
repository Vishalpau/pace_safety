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
  HEADER_AUTH,
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

  const fetchleafNodeData = async (projectData, id, index, selectVal, selectName) => {

    var config = {
      method: "get",
      url: `${SSO_URL}/${projectData.projectName.breakdown[index].structure[0].url
        }${id}`,
      headers: HEADER_AUTH,
    };

    await Axios(config)
      .then(async (response) => {

        await setLeafNode(true)
        await setBreakdown1ListData([
          {
            breakdownLabel:
              projectData.projectName.breakdown[index].structure[0].name,
            breakdownValue: response.data.data.results,
            selectValue: selectVal,
            index: 0
          },
        ]);

      })
      .catch(function (error) {
      });
    props.setWorkArea(selectName)
  }

  // fetch breakdown Data
  const fetchCallBack = async (select, projectData) => {
    let lenghtbreaddown = projectData.projectName.breakdown.length ? projectData.projectName.breakdown.length : 0
    await setLengthBreakDown(lenghtbreaddown)
    let selectDepthId = []
    for (var i in select) {
      let selectId = select[i].id;
      let selectDepth = select[i].depth
      selectDepthId = [...selectDepthId, `${selectDepth}${selectId}`]
    }

    props.setSelectDepthAndId(selectDepthId);

    if (select !== null ? select.length > 0 : false) {

      if (projectData.projectName.breakdown.length === select.length) {
        fetchleafNodeData(projectData, select[select.length - 2].id, select.length - 1, select[select.length - 1].id, select[select.length - 1].name);
      } else {

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

                  await setBreakdown1ListData([
                    {
                      breakdownLabel:
                        projectData.projectName.breakdown[key].structure[0].name,
                      breakdownValue: response.data.data.results,
                      selectValue: "",
                      index: key
                    },
                  ]);

                })
                .catch(function (error) {
                });
            } catch (err) {
              ;
            }
          }
        }
      }
    } else {
      for (var key in projectData.projectName.breakdown) {

        if (key == 0) {
          var config = {
            method: "get",
            url: `${SSO_URL}/${projectData.projectName.breakdown[0].structure[0].url
              }`,
            headers: HEADER_AUTH,
          };
          await Axios(config)
            .then(async (response) => {

              await setBreakdown1ListData([
                {
                  breakdownLabel:
                    projectData.projectName.breakdown[0].structure[0].name,
                  breakdownValue: response.data.data.results,
                  selectValue: "",
                  index: 0
                },
              ]);

            })
            .catch(function (error) {
            });
        }
      }
    }
  };

  const handleBreakdown = async (e, index, label) => {
    await setSelectValue(e.target.value)
    const projectData = JSON.parse(localStorage.getItem('projectName'));
    const value = e.target.value;
    let temp = [...breakdown1ListData]
    setBreakdown1ListData(temp)
    if (props.selectDepthAndId.filter(filterItem => filterItem.slice(0, 2) === `${index}L`).length > 0) {
      let breakDownValue = JSON.parse(localStorage.getItem('selectBreakDown')) !== null ? JSON.parse(localStorage.getItem('selectBreakDown')) : []
      if (breakDownValue.length > 0) {
        const removeBreakDownList = temp.slice(0, index)
        temp = removeBreakDownList
      } else {
        const removeBreakDownList = temp.slice(0, index)
        temp = removeBreakDownList
      }


    }
    if (projectData.projectName.breakdown.length !== index) {
      for (var key in projectData.projectName.breakdown) {
        if (key == index) {
          var config = {
            method: "get",
            url: `${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
              }${value}`,
            headers: HEADER_AUTH,
          };
          await Axios(config)
            .then(function (response) {
              if (response.status === 200) {

                if (
                  temp.filter(
                    (item) =>
                      item.breakdownLabel ===
                      projectData.projectName.breakdown[key].structure[0].name
                  ).length > 0
                ) {
                  return;
                } else {
                  setBreakdown1ListData([
                    ...temp,
                    {
                      breakdownLabel:
                        projectData.projectName.breakdown[index].structure[0]
                          .name,
                      breakdownValue: response.data.data.results,
                      selectValue: value,
                      index: index
                    },
                  ]);
                }
              }
            })
            .catch(function (error) {

            });
        }
      }
    } else {
    }
  };

  const handleDepthAndId = (depth, id) => {
    let newData = [...props.selectDepthAndId, `${depth}${id}`]
    props.setSelectDepthAndId([... new Set(newData)])
  }

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
    {leafNode ? breakdown1ListData.map((item, index) => (
      <Grid item xs={3}>
        <FormControl
          key={index}
          variant="outlined"
          required
          className={classes.formControl}
          error={error && error[`projectStructure`]}
        >
          <InputLabel id="filter3-label">
            {item.breakdownLabel}
          </InputLabel>
          <Select
            labelId="filter3-label"
            id="filter3"
            value={item.selectValue || ""}
            // onChange={(e) => props.setWorkArea(item.selectValue)}
            label="Phases"
            style={{ width: "100%" }}
          >
            {item.breakdownValue.length
              ? item.breakdownValue.map(
                (selectValue, selectKey) => (
                  <MenuItem
                    key={selectKey}
                    value={selectValue.id}
                    onClick={async (e) => {
                      await handleDepthAndId(selectValue.depth, selectValue.id);
                      await props.setWorkArea([selectValue.name])
                    }}
                  >
                    {selectValue.name}
                  </MenuItem>
                )
              )
              : null}
          </Select>
          {error && error.projectStructure && (
            <FormHelperText>{error.projectStructure}</FormHelperText>
          )}
        </FormControl>

      </Grid>
    )) : breakdown1ListData.map((item, index) => (
      <Grid item xs={3}>
        <FormControl
          key={index}
          variant="outlined"
          required
          className={classes.formControl}
          error={error && error[`projectStructure`]}
        >
          <InputLabel id="filter3-label">
            {item.breakdownLabel}
          </InputLabel>
          <Select
            labelId="filter3-label"
            id="filter3"
            onChange={(e) => {
              handleBreakdown(e, parseInt(item.index) + 1, item.breakdownLabel, item.selectValue)
            }}
            label="Phases"
            style={{ width: "100%" }}
          >
            {item.breakdownValue.length
              ? item.breakdownValue.map(
                (selectValue, selectKey) => (
                  <MenuItem
                    key={selectKey}
                    value={selectValue.id}

                    onClick={async (e) => {
                      await handleDepthAndId(selectValue.depth, selectValue.id);
                      await props.setWorkArea(selectValue.name)
                    }}
                  >
                    {selectValue.name}
                  </MenuItem>
                )
              )
              : null}
          </Select>
          {error && error.projectStructure && (
            <FormHelperText>{error.projectStructure}</FormHelperText>
          )}
        </FormControl>

      </Grid>
    ))}
  </>
  );
};

const ProjectStructureInit = connect((state) => ({
  initialValues: state.getIn(["InitialDetailsReducer"]),
}))(ProjectStructure);

export default ProjectStructureInit;