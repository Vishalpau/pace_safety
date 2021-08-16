import React, { Component, forwardRef, Fragment } from 'react';
import PropTypes from "prop-types";
import './style.css';
import api from '../../utils/axios';

import {
    ACCOUNT_API_URL,
    HEADER_AUTH,
    LOCAL_LOGIN_URL,
    LOGIN_URL,
    SELF_API,
  } from "../../utils/constants";
class Hexagon extends Component {

  state = {
    subscriptions: [],
    user: [],
    applications: [],
    codes: [],
    modules:[]
  }

  componentDidMount=()=> {
    this.getSubscriptions();

  }

  getSubscriptions = async() => {
    const companyId= this.props.companyId||localStorage.getItem('company') ===null?null: JSON.parse(localStorage.getItem('company')).fkCompanyId
    try{
        let data = await api.get(`${SELF_API}${companyId}/`)
        .then(function(res) {
          console.log({data:  res.data})
          return res.data.data.results.data.companies[0].subscriptions;
        })
        .catch(function(error) {
          console.log(error);
        });
  
        this.setState({ subscriptions: data });
  
        // console.log({applications: data.map(app=>app.appId)})
        const apps = data.map(app=>app.appId)
        this.getModules(apps)
    }catch(error){}
    

  }

  getModules = async(apps) => {

    let data = await api
      .post(`${ACCOUNT_API_URL}api/v1/applications/modules/`,  data = {"fkAppId": apps})
      .then(function(res) {
        // console.log({data:  })
        return res.data.data.results;
      })
      .catch(function(error) {
        console.log(error);
      });

      this.setState({modules: data})
      const codes =  data.map(module=>module.moduleCode)

      this.setState({codes: codes})

      console.log({codes: codes})
  }

  handleClick = (appCode) => {
    console.log(this.state.modules)
    let fkAppId = this.state.modules.map(module=>{
      if(module.moduleCode==appCode){
        return module.fkAppId;
      }
    }).join(' ')
    
    let targetPage = this.state.modules.map(module=>{
      if(module.moduleCode==appCode){
        return module.targetPage;
      }
    }).join(' ')

    let hostings = this.state.subscriptions.map(apps=>{
      if(fkAppId==apps.appId){
        return apps.hostings;
      }
    })[0];
    
    if(hostings != undefined){
      // alert(localStorage.getItem('companyId'))
      const clientId = hostings[0].clientId
      window.open(
        window.location.href = process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id='+clientId+'&response_type=code&targetPage='+targetPage+'&companyId='+localStorage.getItem('companyId')+'&projectId='+localStorage.getItem('ssoProjectId'),
        '_blank' // <- This is what makes it open in a new window.
      );
    }

    // window.open(
    //   window.location.href = process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id='+clientId+'&response_type=code',
    //   '_blank' // <- This is what makes it open in a new window.
    // );

  }

  handleDisableModule = (appcode) => {
    alert(appcode)
    let moduleDisable = this.state.modules.map(module=>{
      if(module.moduleCode==appCode){
        return false;
      }
      else{
        return true
      }
    })[0]

    console.log(moduleDisable)
  }

  render() {

    const { todos } = this.state;
    
    const {modules} =  this.state
    // if(this.state.subscriptions[0] != undefined){
    //   const apps = this.state.subscriptions[0].map(app=>app.appId)
    //   this.getModules(apps)
    // }
    // else{
    //   alert('undefined')
    // }

    // console.log({applications: this.state.subscriptions[0].map(app=>app.appId)})

  return (
    <>
    <div className="seven_hexagon_row">
      <div className="honeycomb">
        <div className="ibws-fix hexagon_row1">

          <div className="hexagon hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div>

          <div className={!(this.state.codes.includes('HSE')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
            <div className="hexagontent hexagon_content_box">
              <a
                className="hse_health_safety_environment_mgmt_new"
                onClick = {() => this.handleClick('HSE')}
              >
                <p>HSE Management</p>
              </a>
            </div>
          </div>

          <div className="hexagon hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div>

          <div className={!(this.state.codes.includes('compliance')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"} >
            <div className="hexagontent hexagon_content_box">
              <a className="hse_compliance_protocols"  onClick = {() => this.handleClick('compliance')}>
                <p>Compliances</p>
              </a>
            </div>
          </div>

          <div className="hexagon hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div>

          <div className={!(this.state.codes.includes('incidents')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
            <div className="hexagontent hexagon_content_box">
              <a
                className="hse_incident_reporting_management"
                onClick = {() => this.handleClick('incidents')}
              >
                <p>Incidents</p>
              </a>
            </div>
          </div>

          <div className="hexagon hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div>
        </div>

        <div className="ibws-fix hexagon_row2">
          <div className={!(this.state.codes.includes('ProjectInfo')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
            <div className="hexagontent hexagon_content_box">
              <a className="project_information_hub"  onClick = {() => this.handleClick('ProjectInfo')}>
                <p>Project Information Hub</p>
              </a>
            </div>
          </div>

          <div className="hexagon hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div>

          <div className={!(this.state.codes.includes('assessments')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
            <div className="hexagontent hexagon_content_box">
              <a className="hse_smart_permit_management"  onClick = {() => this.handleClick('assessments')}>
                <p>Assessments</p>
              </a>
            </div>
          </div>

          <div className={!(this.state.codes.includes('observations')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
            <div className="hexagontent hexagon_content_box">
              <a className="hse_environment_development"  onClick = {() => this.handleClick('observations')}>
                <p>Observations</p>
              </a>
            </div>
          </div>

          <div className={!(this.state.codes.includes('intelligent_permit_management')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
            <div className="hexagontent hexagon_content_box">
              <a
                className="hse_intelligent_permit_management_new"
                onClick = {() => this.handleClick('intelligent_permit_management')}
              >
                <p>Intelligent Permit Management</p>
              </a>
            </div>
          </div>

          {/* <div className="hexagon hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div> */}

          <div className={!(this.state.codes.includes('env_management')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
            <div className="hexagontent hexagon_content_box">
              <a
                 onClick = {() => this.handleClick('env_management')}
              >
                <p>Environment Management</p>
              </a>
            </div>
          </div>

          <div className={!(this.state.codes.includes('collaboration')) ? "hexagon hexagon_fullcontnt inactive_hexagon" : "hexagon hexagon_fullcontnt"}>
            <div className="hexagontent hexagon_content_box">
              <a
                 onClick = {() => this.handleClick('collaboration')}
              >
                <p>Rapid Knowledge &amp; Collaboration</p>
              </a>
            </div>
          </div>
        </div>

        <div className="ibws-fix hexagon_row1">
          <div className="hexagon hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div>

          <div className="hexagon bghide_in_view hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div>

          <div className="hexagon hide_responsiv hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div>

          <div className="hexagon bghide_in_view hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div>

          <div className="hexagon hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div>

          <div className="hexagon bghide_in_view hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div>

          <div className="hexagon hide_responsiv">
            <div className="hexagontent hexagon_content_box" />
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
        }
}

Hexagon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Hexagon;
//export default withStyles(styles)(Hexagon);