// '''''''''''''''''''''''*
/*
  This is an example app without redux implementation, may little bit messy.
  If your prefer use redux architecture you can change it.
  And We recommend to following this app pattern of redux.
*/
// '''''''''''''''''''''''*
import React, { useReducer, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "dan-styles/vendors/invoice/style.css";
import api from "../../utils/axios";
import axios from "axios";
import apiAction from "../../utils/axiosActionTracker";
import { handelDateTime } from "../../utils/CheckerValue";
import moment from "moment";

import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../utils/constants";
import DateFormat from "../Date/DateFormat";

// const styles = {
//   whitePaper: {
//     background: '#FFF',
//     color: '#000',
//     minWidth: 800,
//     border: '1px solid #dedede'
//   }
// };

const useStyles = makeStyles((theme) => ({
  whitePaper: {
    background: "#FFF",
    color: "#000",
    //minWidth: 860,
    //border: '1px solid #dedede'
  },
}));

const GeneralObservationPrint = React.forwardRef((props, ref) => {
  //function PrintSection() {
  const [initialData, setInitialData] = useState({});
  const [actionTakenData, setActionTakenData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [catagoryData, setCatagoryData] = useState([]);
  const [projectSturcturedData, setProjectSturcturedData] = useState([]);

  const fetchInitialiObservation = async () => {
    const res = await api.get(
      `/api/v1/observations/${localStorage.getItem("fkobservationId")}/`
    );
    console.log(res);
    const result = res.data.data.results;
    await setInitialData(result);
    await fetchBreakDownData(result.fkProjectStructureIds);
    await setIsLoading(true);
    // handelActionTracker()
  };

  const fetchactionTrackerData = async () => {
    let API_URL_ACTION_TRACKER = "https://dev-actions-api.paceos.io/";
    const api_action = axios.create({
      baseURL: API_URL_ACTION_TRACKER,
    });
    let ActionToCause = {};
    const allActionTrackerData = await apiAction.get("/api/v1/actions/");
    console.log(allActionTrackerData, "!!!!");
    const allActionTracker = allActionTrackerData.data.data.results.results;
    const newData = allActionTracker.filter(
      (item) =>
        item.enitityReferenceId === localStorage.getItem("fkobservationId")
    );
    let sorting = newData.sort((a, b) => a.id - b.id);
    await setActionTakenData(sorting);
    // await setIsLoading(true);
  };

  const fetchTags = async () => {
    const res = await api.get(`/api/v1/tags/`);
    const result = res.data.data.results.results;
    let temp = [];
    result.map((value) => {
      if (value.status === "Active") {
        temp.push(value);
      }
    });
    let sorting = temp.sort((a, b) => a.id - b.id);
    await setTagData(sorting);
  };

  const fetchCatagories = async () => {
    const response = await api.get(
      `/api/v1/observations/${localStorage.getItem(
        "fkobservationId"
      )}/observationtags/`
    );
    if (response.status === 200) {
      const tags = response.data.data.results.results;
      console.log(tags);
      let sorting = tags.sort((a, b) => a.id - b.id);
      await setCatagoryData(sorting);
      await setIsLoading(true);
    }
  };

  const fetchBreakDownData = async (projectBreakdown) => {
    const projectData = JSON.parse(localStorage.getItem("projectName"));

    let selectBreakDown = [];
    const breakDown = projectBreakdown.split(":");
    for (var key in breakDown) {
      if (breakDown[key].slice(0, 2) === "1L") {
        var config = {
          method: "get",
          url: `${SSO_URL}/${
            projectData.projectName.breakdown[0].structure[0].url
          }`,
          headers: HEADER_AUTH,
        };

        await api(config)
          .then(async (response) => {
            const result = response.data.data.results;

            result.map((item) => {
              if (breakDown[key].slice(2) == item.id) {
                selectBreakDown = [
                  ...selectBreakDown,
                  { depth: item.depth, id: item.id, name: item.name },
                ];
              }
            });
          })
          .catch((error) => {
            setIsNext(true);
          });
      } else {
        var config = {
          method: "get",
          url: `${SSO_URL}/${
            projectData.projectName.breakdown[key].structure[0].url
          }${breakDown[key - 1].slice(-1)}`,
          headers: HEADER_AUTH,
        };

        await api(config)
          .then(async (response) => {
            const result = response.data.data.results;

            const res = result.map((item, index) => {
              if (parseInt(breakDown[key].slice(2)) == item.id) {
                selectBreakDown = [
                  ...selectBreakDown,
                  { depth: item.depth, id: item.id, name: item.name },
                ];
              }
            });
          })
          .catch((error) => {
            console.log(error);
            // setIsNext(true);
          });
      }
    }
    // dispatch(breakDownDetails(selectBreakDown));
    await setProjectSturcturedData(selectBreakDown);
    // localStorage.setItem('selectBreakDown', JSON.stringify(selectBreakDown));
  };

  const handleProjectName = (projectId) => {
    let pname = "";
    const userName =
      JSON.parse(localStorage.getItem("userDetails")) !== null
        ? JSON.parse(localStorage.getItem("userDetails")).companies
        : null;

    const abc = userName.filter(
      (user) => user.companyId === initialData.fkCompanyId
    );
    if (abc.length > 0) {
      const dd = abc[0].projects.filter((user) => user.projectId === projectId);
      pname = dd[0].projectName;
    }
    return pname;
  };
  console.log(projectSturcturedData);
  console.log(catagoryData[4]);
  useEffect(() => {
    fetchInitialiObservation();
    fetchactionTrackerData();
    // fetchTags()
    fetchCatagories();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.whitePaper} ref={ref}>
      {isLoading ? (
        <div
          style={{
            font: "14px/1.4 sans-serif",
            width: "1000px",
            margin: "0 auto",
            padding: "0 20px",
            position: "relative",
          }}
        >
          {/* <p id="header">Initial Notification</p> */}
          <table style={{ margin: "0px" }}>
            <thead>
              <tr style={{ border: "0px" }}>
                <td style={{ padding: "0px" }}>
                  <div
                    className="header-space"
                    style={{
                      position: "relative",
                      height: "77px",
                      display: "block",
                    }}
                  >
                    <header>
                      <table
                        style={{
                          borderBottom: "1px solid #707070",
                          width: "100%",
                          float: "left",
                        }}
                      >
                        <tbody>
                          <tr style={{ border: "0px" }}>
                            <td
                              style={{
                                width: "480px",
                                textAlign: "left",
                                paddingLeft: "0px",
                                float: "left",
                                margin: "9px 0px",
                                fontSize: "22px",
                              }}
                            >
                              <strong>Project Name: </strong>
                              <span style={{ color: "#707070" }}>
                                {handleProjectName(initialData.fkProjectId)}{" "}
                              </span>
                            </td>
                            <td
                              style={{
                                margin: "5px 0px",
                                width: "480px",
                                paddingRight: "0px",
                                textAlign: "right",
                                float: "right",
                                position: "relative",
                                border: "1px solid #ffffff",
                                maxHeight: "100px",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                id="image"
                                src="/images/logo-client.jpg"
                                style={{ width: "86px" }}
                                alt="logo"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </header>
                  </div>
                </td>
              </tr>
            </thead>

            {/*<div style={{ clear: 'both' }} />
          <header>
            <div >
              <div style={{width: '460px', float: 'left', margin: '22px 0px', fontSize: '22px'}}><strong>Project Name: </strong><span style={{color: '#707070'}}>Initial Notification</span></div>
              <div style={{margin: '15px 0px', textAlign: 'right', float: 'right', position: 'relative', border: '1px solid #ffffff', maxWidth: '540px', maxHeight: '100px', overflow: 'hidden',}}>
                <img id="image" src="/images/logo-client.jpg" style={{width: '86px',}} alt="logo" />
              </div>
            </div>
          </header> */}
            <tbody
              className="content-area"
              style={{ marginTop: "30px", display: "block" }}
            >
              <tr style={{ border: "0px" }}>
                <td style={{ padding: "0px" }}>
                  <div className="content">
                    <div style={{ width: "100%", float: "left" }}>
                      <div
                        style={{
                          width: "460px",
                          float: "left",
                          margin: "15px 0px",
                          fontSize: "22px",
                        }}
                      >
                        <h2
                          style={{
                            fontSize: "24px",
                            margin: "0px",
                            lineHeight: "30px",
                          }}
                        >
                          <strong>Observation </strong>
                        </h2>
                        <p
                          style={{
                            color: "#000000",
                            lineHeight: "30px",
                            fontSize: "18px",
                          }}
                        >
                          Transaction:{" "}
                          <span style={{ color: "#707070" }}>
                            {initialData.observationNumber}
                          </span>
                        </p>
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          float: "right",
                          position: "relative",
                          border: "1px solid #ffffff",
                          maxWidth: "540px",
                          maxHeight: "100px",
                          overflow: "hidden",
                          margin: "15px 0px",
                        }}
                      >
                        <img
                          id="image"
                          src="/images/blog-qr-code-2x.jpg"
                          style={{ width: "107px" }}
                          alt="qrcode"
                        />
                      </div>
                    </div>

                    <div style={{ clear: "both" }} />

                    <table
                      style={{
                        borderTop: "5px solid #343434",
                        borderLeft: "1px solid #707070",
                        borderRight: "1px solid #707070",
                        borderBottom: "0.5px solid #707070",
                        marginBottom: "0px",
                      }}
                    >
                      <tbody style={{ border: "0px" }}>
                        <tr style={{ border: "0px" }}>
                          <td
                            style={{
                              border: "0px",
                              padding: "0px 10px",
                              width: "50%",
                            }}
                          >
                            <table style={{ margin: "10px 0px" }}>
                              <tbody>
                                <tr style={{ border: "0px" }}>
                                  <td
                                    style={{
                                      border: "0px",
                                      padding: "0px 0px",
                                      fontSize: "16px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Phase:{" "}
                                    <span style={{ color: "#707070" }}>
                                      Corporate office
                                    </span>
                                  </td>
                                </tr>
                                <tr style={{ border: "0px" }}>
                                  <td
                                    style={{
                                      border: "0px",
                                      padding: "0px 0px",
                                      fontSize: "16px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Unit:{" "}
                                    <span style={{ color: "#707070" }}>
                                      Unit X
                                    </span>
                                  </td>
                                </tr>
                                <tr style={{ border: "0px" }}>
                                  <td
                                    style={{
                                      border: "0px",
                                      padding: "0px 0px",
                                      fontSize: "16px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Work area:{" "}
                                    <span style={{ color: "#707070" }}>
                                      Delhi
                                    </span>
                                  </td>
                                </tr>
                                <tr style={{ border: "0px" }}>
                                  <td
                                    style={{
                                      border: "0px",
                                      padding: "0px 0px",
                                      fontSize: "16px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Location:{" "}
                                    <span style={{ color: "#707070" }}>
                                      {initialData["location"]
                                        ? initialData["location"]
                                        : "-"}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td
                            style={{
                              border: "0px",
                              padding: "0px 10px",
                              width: "50%",
                            }}
                          >
                            <table style={{ margin: "10px 0px" }}>
                              <tbody>
                                <tr style={{ border: "0px" }}>
                                  <td
                                    style={{
                                      border: "0px",
                                      padding: "0px 0px",
                                      fontSize: "16px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Observed on:{" "}
                                    <span style={{ color: "#707070" }}>
                                      {initialData["observedAt"]
                                        ? DateFormat(initialData["observedAt"])
                                        : "-"}
                                    </span>
                                  </td>
                                </tr>
                                <tr style={{ border: "0px" }}>
                                  <td
                                    style={{
                                      border: "0px",
                                      padding: "0px 0px",
                                      fontSize: "16px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Observed by:{" "}
                                    <span style={{ color: "#707070" }}>
                                      {initialData["reportedByName"]
                                        ? initialData["reportedByName"]
                                        : "-"}
                                    </span>
                                  </td>
                                </tr>
                                <tr style={{ border: "0px" }}>
                                  <td
                                    style={{
                                      border: "0px",
                                      padding: "0px 0px",
                                      fontSize: "16px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Submitted on:{" "}
                                    <span style={{ color: "#707070" }}>
                                      {initialData["createdAt"]
                                        ? moment(
                                            initialData["createdAt"]
                                          ).format("Do MMMM YYYY, h:mm:ss a")
                                        : "-"}
                                    </span>
                                  </td>
                                </tr>
                                <tr style={{ border: "0px" }}>
                                  <td
                                    style={{
                                      border: "0px",
                                      padding: "0px 0px",
                                      fontSize: "16px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Submitted by:{" "}
                                    <span style={{ color: "#707070" }}>
                                      {initialData["createdByName"]
                                        ? initialData["createdByName"]
                                        : "-"}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      style={{
                        borderTop: "0px",
                        borderLeft: "1px solid #707070",
                        borderRight: "1px solid #707070",
                        borderBottom: "1px solid #707070",
                        marginTop: "0px",
                      }}
                    >
                      <tbody style={{ border: "0px" }}>
                        <tr style={{ border: "0px" }}>
                          <td
                            style={{
                              border: "0px",
                              padding: "0px 10px",
                              width: "50%",
                            }}
                          >
                            <table style={{ margin: "10px 0px" }}>
                              <tbody>
                                <tr style={{ border: "0px" }}>
                                  <td
                                    style={{
                                      border: "0px",
                                      padding: "0px 0px",
                                      fontSize: "16px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Reported by:{" "}
                                    <span style={{ color: "#707070" }}>
                                      {initialData["username"]
                                        ? initialData["username"]
                                        : "-"}
                                    </span>
                                  </td>
                                </tr>
                                <tr style={{ border: "0px" }}>
                                  <td
                                    style={{
                                      border: "0px",
                                      padding: "0px 0px",
                                      fontSize: "16px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Contractor:{" "}
                                    <span style={{ color: "#707070" }}>
                                      Worley Parsons
                                    </span>
                                  </td>
                                </tr>
                                <tr style={{ border: "0px" }}>
                                  <td
                                    style={{
                                      border: "0px",
                                      padding: "0px 0px",
                                      fontSize: "16px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Sub contractor:{" "}
                                    <span style={{ color: "#707070" }}>
                                      Bird Construction
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td
                            style={{
                              border: "0px",
                              padding: "0px 10px",
                              width: "50%",
                            }}
                          >
                            <table style={{ margin: "10px 0px" }}>
                              <tbody>
                                <tr style={{ border: "0px" }}>
                                  <td
                                    style={{
                                      border: "0px",
                                      padding: "0px 0px",
                                      fontSize: "16px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Reported on:{" "}
                                    <span style={{ color: "#707070" }}>
                                      {initialData["reportedDate"]
                                        ? DateFormat(
                                            initialData["reportedDate"]
                                          )
                                        : "-"}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div style={{ clear: "both" }} />

                    <table
                      style={{
                        borderTop: "5px solid #343434",
                        borderLeft: "1px solid #707070",
                        borderRight: "1px solid #707070",
                        borderBottom: "1px solid #707070",
                      }}
                    >
                      <tbody
                        style={{
                          border: "0px",
                          margin: "10px 0px 0px 0px",
                          display: "block",
                        }}
                      >
                        <tr style={{ border: "0px" }}>
                          <td
                            style={{
                              border: "0px",
                              padding: "0px 10px",
                              fontSize: "16px",
                              lineHeight: "30px",
                            }}
                          >
                            Observation type:{" "}
                            <span style={{ color: "#707070" }}>
                              {initialData["observationType"]
                                ? initialData["observationType"]
                                : "-"}
                            </span>
                          </td>
                        </tr>
                        <tr style={{ border: "0px" }}>
                          <td
                            style={{
                              border: "0px",
                              padding: "0px 10px",
                              fontSize: "16px",
                              lineHeight: "30px",
                            }}
                          >
                            Incident title:{" "}
                            <span style={{ color: "#707070" }}>
                              {initialData["observationTitle"]
                                ? initialData["observationTitle"]
                                : "-"}
                            </span>
                          </td>
                        </tr>
                        <tr style={{ border: "0px" }}>
                          <td
                            style={{
                              border: "0px",
                              padding: "0px 10px",
                              fontSize: "16px",
                              lineHeight: "30px",
                            }}
                          >
                            Description:{" "}
                            <p style={{ color: "#707070" }}>
                              {initialData["observationDetails"]
                                ? initialData["observationDetails"]
                                : "-"}
                            </p>
                          </td>
                        </tr>
                        <tr style={{ border: "0px" }}>
                          <td
                            style={{
                              border: "0px",
                              padding: "0px 10px",
                              fontSize: "16px",
                              lineHeight: "30px",
                            }}
                          >
                            Immediate actions taken:{" "}
                            <p style={{ color: "#707070" }}>
                              {initialData["actionTaken"]
                                ? initialData["actionTaken"]
                                : "-"}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div style={{ clear: "both" }} />

                    <table
                      style={{
                        borderTop: "5px solid #343434",
                        borderLeft: "1px solid #707070",
                        borderRight: "1px solid #707070",
                        borderBottom: "0.5px solid #707070",
                        marginBottom: "0px",
                      }}
                    >
                      <tbody style={{ border: "0px" }}>
                        <tr style={{ border: "0px" }}>
                          <td
                            style={{
                              border: "0px",
                              padding: "0px 10px",
                              width: "50%",
                            }}
                          >
                            <table style={{ margin: "10px 0px 0px 0px" }}>
                              <tbody>
                                <tr style={{ border: "0px" }}>
                                  <td
                                    style={{
                                      border: "0px",
                                      padding: "0px 0px",
                                      fontSize: "16px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Stop Work:{" "}
                                    <span style={{ color: "#707070" }}>
                                      {initialData["stopWork"]
                                        ? initialData["stopWork"]
                                        : "-"}
                                    </span>
                                  </td>
                                </tr>
                                <tr style={{ border: "0px" }}>
                                  <td
                                    style={{
                                      border: "0px",
                                      padding: "0px 0px",
                                      fontSize: "16px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Escalated the issue (Safety/Management):{" "}
                                    <span style={{ color: "#707070" }}>
                                      {initialData["isNotifiedToSupervisor"]
                                        ? initialData["isNotifiedToSupervisor"]
                                        : "-"}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td
                            style={{
                              border: "0px",
                              padding: "0px 10px",
                              width: "50%",
                            }}
                          >
                            <table style={{ margin: "10px 0px 0px 0px" }}>
                              <tbody>
                                <tr style={{ border: "0px" }}>
                                  <td
                                    style={{
                                      border: "0px",
                                      padding: "0px 0px",
                                      fontSize: "16px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Near Miss:{" "}
                                    <span style={{ color: "#707070" }}>
                                      {initialData["nearMiss"]
                                        ? initialData["nearMiss"]
                                        : "-"}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      style={{
                        borderTop: "0px",
                        borderLeft: "1px solid #707070",
                        borderRight: "1px solid #707070",
                        borderBottom: "1px solid #707070",
                        marginTop: "0px",
                      }}
                    >
                      <tbody
                        style={{
                          border: "0px",
                          margin: "10px 0px",
                          display: "block",
                        }}
                      >
                        <tr style={{ border: "0px" }}>
                          <td
                            style={{
                              border: "0px",
                              padding: "0px 10px",
                              fontSize: "16px",
                              lineHeight: "30px",
                            }}
                          >
                            Notified to:{" "}
                            <span style={{ color: "#707070" }}>
                              Safety manager
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div style={{ clear: "both" }} />

                    {/* <table style={{borderTop: '5px solid #343434', borderLeft: '1px solid #707070', borderRight: '1px solid #707070', borderBottom: '1px solid #707070'}}>
                    <tbody style={{border: '0px', margin: '10px 0px 0px 0px', display: 'block',}}>
                      <tr style={{border: '0px'}}><td style={{border: '0px', padding: '0px 10px', fontSize:'16px', lineHeight: '30px'}}>Reason for reporting late: <p style={{color: '#707070'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the has industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and industry.</p></td></tr>
                    </tbody>
                  </table> */}
                  </div>
                </td>
              </tr>
            </tbody>

            {/* footer section start */}
            <tfoot>
              <tr style={{ border: "0px" }}>
                <td style={{ padding: "0px" }}>
                  <div
                    className="footer-space"
                    style={{
                      position: "relative",
                      height: "77px",
                      display: "block",
                    }}
                  >
                    <footer>
                      <table>
                        <tbody>
                          <tr style={{ border: "0px" }}>
                            <td
                              style={{
                                float: "left",
                                width: "480px",
                                textAlign: "left",
                                padding: "15px 0px",
                              }}
                            >
                              <img
                                id="image"
                                src="/images/teknobuilt-logo-TM.jpg"
                                style={{ width: "181px" }}
                                alt="teknobuiltlogo"
                              />
                            </td>
                            <td
                              style={{
                                float: "right",
                                width: "480px",
                                textAlign: "right",
                                padding: "15px 0px",
                              }}
                            >
                              <img
                                id="image"
                                src="/images/print-paceLogo.jpg"
                                style={{ width: "130px", marginTop: "15px" }}
                                alt="pacelogo"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </footer>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
  //}
});

// PrintSection.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default GeneralObservationPrint;

//export default withStyles(styles)(PrintSection);
