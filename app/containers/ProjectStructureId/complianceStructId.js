import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Row, Col } from "react-grid-system";

import { Typography } from "@material-ui/core";

import Type from "../../styles/components/Fonts.scss";
import Axios from 'axios';

import { SSO_URL,HEADER_AUTH} from "../../utils/constants";

function complianceConfig(props) {
  console.log(props.error);

    console.log(props.error.projectStructure0);

    const projectData = JSON.parse(localStorage.getItem('projectName'));

    const tempUrl = projectData.projectName.breakdown[0].structure[0].url.split('1L')[0];
    const ProjURL = tempUrl.slice(0, 46);

    const [factoryDetail, setFactoryDetail] = useState({
      Phase: "",
      Unit: "",
      WorkArea: ""
    })

    const [structures, setStructures] = useState([]);
    const [unitData, setUnitData] = useState([]);
    const [workArea, setWorkArea] = useState([]);

    const handleBreakdown = (event) => { 
        const {name, value} = event.target
        let depthConstant = '2/2L/';
        let unitDepthConstant = '3/3L/';
        let depth;
        if (name === "Phase") {
          depth = `${depthConstant + event.target.value}`;
          setFactoryDetail({
            "Phase": value,
            Unit: "", 
            WorkArea: ""
          });
        }
        else if (name === "Unit") {
          depth = `${unitDepthConstant + event.target.value}`
          setFactoryDetail({
            ...factoryDetail,
            "Unit": value,
            WorkArea: ""
          });
        }
        else {
          setFactoryDetail({
          ...factoryDetail,
          [name]: value
        });
      }
        if (name === "Phase" || name === "Unit") {
          getPhase(depth, value);
        }
    }

    useEffect(() => {
      // if (factoryDetail.Phase !== "" && factoryDetail.Unit !== "" && factoryDetail.WorkArea !== "") {
        let newArr = []
        Object.entries(factoryDetail).forEach(([key, value], index) => {
            if (value !== ""){
              newArr.push(`${index+1}L${value}`)
            }
        });
        const finalString = newArr.join(":");
        // console.log(newArr);
        props.handleStructureSelect(finalString, newArr);
      // }
    },[factoryDetail])

    const getPhase = async (projectId, uniqueId) => {
        // console.log(projectId, uniqueId);
        // console.log(projectData.projectName.breakdown[0].structure[0].url);
        var config = {
            method: "get",
            url: `${SSO_URL}/${ProjURL}/${projectId ? projectId : '1/1L/'}`,
            headers: HEADER_AUTH,
          };
          await Axios(config)
            .then(function (response) {
                console.log(response);
              if (response.status === 200) {
                  if (uniqueId === 3 || uniqueId === 4 || uniqueId === 5) {
                    setWorkArea(response.data.data.results);
                  }
                  else if (uniqueId === 1 || uniqueId === 2) {
                      setUnitData(response.data.data.results);
                      // setFactoryDetail({
                      //   ...factoryDetail,
                      //   Unit: ""
                      // })
                  }
                  else if (!uniqueId) {
                      setStructures(response.data.data.results);
                  }
              }
            })
            .catch(function (error) {

            });
    }

    useEffect(() => {
        getPhase()
    },[])

    return (
        <>  
             <Grid item md={3} sm={3} xs={12}>
             <FormControl
                 key={1}
                 variant="outlined"
                 // error={props.selectDepthAndId[item.index] != undefined ? false: props.error && props.error[`projectStructure${[item.index]}`]}
                 fullWidth={true}
                 className="formControl"
                 required
                 >
 
                 <InputLabel id={1}>
                    Phase
                </InputLabel>
                 <Select
                 labelId="filter3-label"
                 value={`${factoryDetail.Phase}`}
                 onChange={(e) => {handleBreakdown(e)}}
                  name="Phase"
                 label="phase"
                 style={{ width: "100%" }}
                 >
                 {structures.length > 0 && structures.map((item, index) => {
                   return(
                      <MenuItem
                        key={item.id}
                        value={item.id}
                    >
                        {item.name}
                    </MenuItem>
                 )})}
                 </Select>
 
                 {props.error.projectStructure0 && <p style={{ color: "red" }}>{props.error.projectStructure0}</p>}
             </FormControl>
         </Grid>
       

        <Grid item md={3} sm={3} xs={12}>
            <FormControl
              variant="outlined"
            //   error={props.selectDepthAndId[item.index] != undefined ? false: props.error && props.error[`projectStructure${[item.index]}`]}
              fullWidth={true}
              className="formControl"
              required
            >

              <InputLabel id={2}>
                Unit
              </InputLabel>
              <Select
                labelId="filter3-label"
                value={factoryDetail.Unit}
                disabled={factoryDetail.Phase === "" ? true : false}
                onChange={(e) => {handleBreakdown(e)}}
                name="Unit"
                label="Unit"
                style={{ width: "100%" }}
              >
                {unitData.length > 0 && unitData.map((item, index) => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                    >
                        {item.name}
                    </MenuItem>
                 ))}
              </Select>
            </FormControl>
            {props.error.projectStructure1 && <p style={{ color: "red" }}>{props.error.projectStructure1}</p>}
        </Grid>

        <Grid item md={3} sm={3} xs={12}>
            <FormControl
              key={3}
              variant="outlined"
            //   error={props.selectDepthAndId[item.index] != undefined ? false: props.error && props.error[`projectStructure${[item.index]}`]}
              fullWidth={true}
              className="formControl"
              required
            >

              <InputLabel id={3}>
                Work Area
              </InputLabel>
              <Select
                labelId="filter3-label"
                value={factoryDetail.WorkArea}
                disabled={factoryDetail.Unit === "" ? true : false}
                onChange={(e) => handleBreakdown(e)}
                name="WorkArea"
                label="Work Area"
                style={{ width: "100%" }}
              >
                {workArea.length > 0 && workArea.map(item => (
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
              {props.error.projectStructure2 && <p style={{ color: "red" }}>{props.error.projectStructure2}</p>}
              

              {/* {props.error && props.error[`projectStructure${[item.index]}`] && (
                <FormHelperText>
                  {props.error[`projectStructure${[item.index]}`]}
                </FormHelperText>
              )} */}
            </FormControl>
          </Grid>
        </>
        
    )
}

export default complianceConfig
