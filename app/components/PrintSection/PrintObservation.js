import React, { useReducer , useEffect , useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import PaceLogo from 'dan-images/paceLogoWhite.png';
import moment from 'moment';
import api from "../../utils/axios";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  whitePaper: {
    background: '#FFF',
    color: '#000',
    background: '#FFF url({PaceLogo}) right no-repeat',
  } 

}));

const PrintObservation = React.forwardRef((props, ref) => {

  const [initialData , setInitialData] = useState({})
  const [actionTakenData, setActionTakenData] = useState([])
  const [tagData,setTagData] = useState([])
  const [isLoading , setIsLoading] = useState(false)
  const [catagoryData,setCatagoryData] = useState([])

  const fetchInitialiObservation = async () => {

    const res = await api.get(`/api/v1/observations/${localStorage.getItem('fkobservationId')}/`);
    console.log(res)
    const result = res.data.data.results
    await setInitialData(result)
    // await setIsLoading(true)
    // handelActionTracker()

  }

  const fetchactionTrackerData = async () =>{
    let API_URL_ACTION_TRACKER = "https://dev-actions-api.paceos.io/";
    const api_action = axios.create({
      baseURL: API_URL_ACTION_TRACKER,
    });
    let ActionToCause = {}
    const allActionTrackerData = await api_action.get("/api/v1/actions/")
    const allActionTracker = allActionTrackerData.data.data.results.results
    const newData = allActionTracker.filter(
      (item) => item.enitityReferenceId === localStorage.getItem("fkobservationId") 
      
      )
      let sorting = newData.sort((a, b) => a.id - b.id)
    await setActionTakenData(sorting)
    // await setIsLoading(true);

  }

  const fetchTags = async () => {
    const res = await api.get(`/api/v1/tags/`);
    const result = res.data.data.results.results;
    let sorting = result.sort((a, b) => a.id - b.id);
    await setTagData(sorting);

  };

  const fetchCatagories = async () => {
    const response = await api.get(`/api/v1/observations/${localStorage.getItem("fkobservationId")}/observationtags/`)
    if(response.status === 200) {
      const tags = response.data.data.results.results
    console.log(tags)
    let sorting = tags.sort((a, b) => a.id - b.id);
    await setCatagoryData(sorting);
    await setIsLoading(true);
    }
    

  }
  console.log(tagData[4])
  console.log(catagoryData[4])
  useEffect(() => {
    fetchInitialiObservation()
    fetchactionTrackerData()
    fetchTags()
    fetchCatagories()
},[])

  const classes = useStyles();
  
  return (
    <div className={classes.whitePaper} ref={ref} id="printpagebg">
      <div>
        <p style={{width: '100%', margin: '0px 0', backgroundColor: '#000000', textAlign: 'center', color: 'white', fontSize: '24px', letterSpacing: 'normal', padding: '8px 0px', lineHeight: '38px', textTransform: 'uppercase' }}><span><img src={PaceLogo} /></span></p>

        <div style={{ clear: 'both' }} />
        {isLoading ? (

        <table style={{ minWidth: '1150px', clear: 'both', border: '1px solid #000000', marginTop: '0px' }} >
          <tr>
            <td style={{ padding: '15px', backgroundImage: '' }}>
            <span style={{ textAlign: 'center', display: 'block', fontSize: '22px', color: '#000000', marginTop: '5px', marginBottom: '20px', borderBottom: '3px solid #000000', paddingBottom: '10px' }} class="sec_text_1"><strong>JOB OBSERVATION - CCZJV : </strong>Please write clearly for computer vision read-out</span>
            
            <table style={{minWidth: '1150px', clear: 'both', marginTop: '20px', marginBottom: '20px' }}>
                <tbody>
                    <tr>
                        <td rowspan="3" style={{width: '150px'}}></td>
                        <td  style={{ borderBottom: '1px solid #000', padding: '5px 15px', width: 'calc(100% - 150px)' }}><label style={{ display: 'inline-block', fontSize: '20px', }} > Name: </label><span style={{lineHeight: '30px' }}> {initialData.reportedByName}</span> </td>
                        <td  style={{ borderBottom: '1px solid #000', padding: '5px 15px', width: 'calc(100% - 150px)' }}><label style={{ display: 'inline-block', width: '88px', fontSize: '20px' }} > Badge#:<span style={{fontSize: '11px', color: '#ccc', lineHeight: '20px', display: 'block' }}>(CCZIV Issued)</span></label><span style={{ verticalAlign: 'top', lineHeight: '30px' }}>{initialData["reportedByBadgeId"]}</span> </td>
                        
                    </tr>
                    <tr>
                        <td  style={{ borderBottom: '1px solid #000', padding: '5px 15px', width: 'calc(100% - 150px)'}}><label style={{ display: 'inline-block', fontSize: '20px', }} > Department: </label><span style={{lineHeight: '30px' }}> {initialData.departmentName}</span></td>
                        <td  style={{ borderBottom: '1px solid #000', padding: '5px 15px', width: 'calc(100% - 150px)'}}><label style={{ display: 'inline-block', width: '88px', fontSize: '20px' }} > Date:<span style={{fontSize: '11px', color: '#ccc', lineHeight: '20px', display: 'block' }}>(MM-DD-YY)</span></label><span style={{ verticalAlign: 'top', lineHeight: '30px' }}> {moment(initialData["observedAt"]).format("Do MMMM YYYY")}</span> </td>                      
                    </tr>
                    <tr>
                        <td  style={{ borderBottom: '1px solid #000', padding: '5px 15px', width: 'calc(100% - 150px)'}} ><label style={{ display: 'inline-block', fontSize: '20px', }} > Foreman#:</label><span style={{lineHeight: '30px' }}> {initialData.supervisorName}</span></td>
                        <td  style={{ borderBottom: '1px solid #000', padding: '5px 15px', width: 'calc(100% - 150px)'}} ><label style={{ display: 'inline-block', width: '88px', fontSize: '20px' }} > Time:<span style={{fontSize: '11px', color: '#ccc', lineHeight: '20px', display: 'block' }}>HH:MM (AM/PM)</span></label><span style={{ verticalAlign: 'top', lineHeight: '30px' }}> {moment(initialData["observedAt"]).format("h:mm a")}</span> </td>
                    </tr>
                </tbody>
            </table>


            <table style={{minWidth: '1150px', clear: 'both', marginTop: '20px', marginBottom: '30px' }}>
                <tbody>
                    <tr>
                        <td rowspan="4" style={{width: '150px', border: '1px solid #000', marginRight: '10px', transform: 'rotate(270deg)', textAlign: 'center', writingMode: 'rl', verticalAlign: 'middle', padding: '0px' }}>OBSERVATION <p>Please write clearly.</p></td>
                        <td rowspan="4" style={{ borderBottom: '1px solid #000', padding: '15px 15px', width: 'calc(100% - 150px)', height: '152px', }}> {initialData.observationDetails} </td>
                    </tr>
                    {/* <tr>
                        <td  style={{ borderBottom: '1px solid #000', padding: '20px 15px', width: 'calc(100% - 150px)' }}> </td>
                    </tr>
                    <tr>
                        <td  style={{ borderBottom: '1px solid #000', padding: '20px 15px', width: 'calc(100% - 150px)' }}> </td>
                    </tr>
                    <tr>
                        <td  style={{ borderBottom: '1px solid #000', padding: '20px 15px', width: 'calc(100% - 150px)' }}> </td>
                    </tr> */}
                </tbody>
            </table>

            <table style={{minWidth: '1150px', clear: 'both', marginTop: '15px', marginBottom: '15px' }}>
                <tbody>
                    <tr>
                        <td rowspan="3" style={{width: '150px', border: '1px solid #000', marginRight: '10px', transform: 'rotate(270deg)', textAlign: 'center', writingMode: 'rl', verticalAlign: 'middle', padding: '0px' }}>ACTION TAKEN <p>Write clearly.</p></td>
                    </tr>
                    
                    {actionTakenData ?  actionTakenData.map((action) => (<tr><td  style={{ borderBottom: '1px solid #000', padding: '15px 15px', width: 'calc(100% - 150px)' }}> {action.actionTitle} </td></tr>)) : null}
                </tbody>
            </table>

            <table style={{minWidth: '1150px', clear: 'both', marginTop: '10px', marginBottom: '10px' }}>
                <tbody>
                    <tr>
                        <td style={{ paddingLeft: '0px', paddingTop: '0px', paddingBottom: '0px' }}> 
                          <table>
                            <tbody>
                              <tr>
                                <td rowspan="3" style={{width: '115px', border: '1px solid #000', marginRight: '10px', transform: 'rotate(270deg)', textAlign: 'center', writingMode: 'rl', verticalAlign: 'middle', padding: '0px' }}>TYPE <p>(X) One only</p></td>
                                <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}>Positive observation</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}>{initialData.observationType === "Positive behavior" ? <CheckIcon /> : null} </span></label></td>
                                <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Comment</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}>{initialData.observationType === "Comments" ? <CheckIcon /> : null} </span></label></td>
                              </tr>
                              <tr>
                                <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> At-risk observation</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}>{initialData.observationType === "Risk" ? <CheckIcon /> : null} </span></label></td>
                                <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px' }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> </span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}> </span></label></td>
                              </tr>
                           </tbody>
                          </table>
                        </td>

                        <td style={{ paddingRight: '0px', paddingTop: '0px', paddingBottom: '0px' }}> 
                          <table>
                            <tbody>
                              <tr>
                                <td rowspan="3" style={{width: '122px', border: '1px solid #000', marginRight: '10px', transform: 'rotate(270deg)', textAlign: 'center', writingMode: 'rl', verticalAlign: 'middle', padding: '0px' }}>If Applicable <p>(X)</p></td>
                                <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}>Near Miss</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}>{initialData.nearMiss === "Yes" ? <CheckIcon /> : null} </span></label></td>
                              </tr>
                              <tr>
                                <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Stop work authority</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}>{initialData.stopWork === "Yes" ? <CheckIcon /> : null}</span></label></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                    </tr>
                </tbody>
            </table> 
            
            <table style={{minWidth: '1150px', clear: 'both', marginTop: '15px', marginBottom: '20px' }}>
                <tbody>

                    <tr>
                      <td rowspan="3" style={{width: '122px', border: '1px solid #000', marginRight: '10px', transform: 'rotate(270deg)', textAlign: 'center', writingMode: 'rl', verticalAlign: 'middle', padding: '0px' }}>LOCATION <p>(X) On only</p></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}>1000 - Train 1</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> 4000 - Utility</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> 5000 - Flare</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> 8000 - Marine</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                    </tr>
                    <tr>
                    <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> 2000 - Train 2</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> 5000 - Offsite General</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> 6000 - Brownfield</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Off-site</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                    </tr>
                    <tr>
                    <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> 3000 - Train 3</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> 5000 - Condensate</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> 7000 - Common Buildings</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> </span>  <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}>  </span></label></td>
                    </tr>

                </tbody>
            </table>

            <table style={{minWidth: '1150px', clear: 'both', marginTop: '30px', marginBottom: '30px' }}>
                <tbody>

                    <tr>
                      <td rowspan="4" style={{width: '122px', border: '1px solid #000', marginRight: '10px', transform: 'rotate(270deg)', textAlign: 'center', writingMode: 'rl', verticalAlign: 'middle', padding: '0px' }}>CATEGORIES <p>(X) all that apply.</p></td>
                      {tagData.slice(0,4).map((value, index) => ( <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> {value.tagName}</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}>{value.tagName === catagoryData[index].observationTag ? <CheckIcon /> : null} </span></label></td>
))}
                      {/* <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> {tagData[0].tagName}</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Working at heights</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> PPF</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Equipment</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td> */}
                    </tr>
                    <tr>
                    {tagData.slice(4,8).map((value, index) => ( <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> {tagData[index+4].tagName}</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}>{tagData[index+4].tagName === catagoryData[index+4].observationTag ? <CheckIcon /> : null} </span></label></td>
))}
                    {/* <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Body Positioning</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Health/Hygiene</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Quality</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Vehicles</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td> */}
                    </tr>
                    <tr>
                    {/* {catagoryData.slice(8).map((value, index) => (              */}
                               <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Others : {catagoryData[8].observationTag}</span> </label></td>
{/* ))} */}
                      {/* <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}>{catagoryData[8].observationTag}</span></label></td> */}
                      {/* <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> General safety</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> LOTO</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Security</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}>  </span></label></td> */}
                    </tr>
                    {/* <tr>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Environmental</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Housekeeping</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Walking</span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', width: '245px' }}><label style={{ float: 'right', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> </span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}>  </span></label></td>
                    </tr> */}
                    
                </tbody>
            </table>

            <table style={{ minWidth: '1150px', clear: 'both', marginTop: '30px', marginBottom: '30px' }}>
                <tbody>
                    <tr>
                      <td colspan="2" style={{ border: '1px solid #000', marginRight: '10px' }}></td>
                      <td  style={{ border: '1px solid #000', padding: '1px 1px 1px 28px', maxWidth: 'calc(100% - 150px)', width: '88px' }}><label style={{ float: 'left', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Yes </span> </label></td>
                      <td  style={{ border: '1px solid #000', padding: '1px 1px 1px 28px', maxWidth: 'calc(100% - 150px)', width: '88px' }}><label style={{ float: 'left', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> No </span> </label></td>
                    </tr>
                    <tr>
                      <td rowspan="4" style={{width: '145px', border: '1px solid #000', marginRight: '10px', transform: 'rotate(270deg)', textAlign: 'center', writingMode: 'rl', verticalAlign: 'middle', padding: '0px' }}>CONFIRMATION <p>(X) As Applicable.</p></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)' }}><label style={{ float: 'left', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Confirm if you discussed/intervened on the observation:</span> </label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 15px 5px 15px', maxWidth: 'calc(100% - 150px)', width: '88px' }}><label style={{ float: 'left', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> </span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}><CheckIcon /> </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 15px 5px 15px', maxWidth: 'calc(100% - 150px)', width: '88px' }}><label style={{ float: 'left', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> </span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}> </span></label></td>
                    </tr>
                    <tr>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', }}><label style={{ float: 'left', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Confirm if you need to escalate the issue (Safety/Management)</span> </label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 15px 5px 15px', maxWidth: 'calc(100% - 150px)', width: '88px' }}><label style={{ float: 'left', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> </span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}>{initialData.isNotifiedToSupervisor === "Yes" ? <CheckIcon /> : null} </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 15px 5px 15px', maxWidth: 'calc(100% - 150px)', width: '88px' }}><label style={{ float: 'left', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> </span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}>{initialData.isNotifiedToSupervisor === "No" || initialData.personRecognition === "" ? <CheckIcon /> : null}</span></label></td>
                    </tr>
                    <tr>
                      <td  style={{ border: '1px solid #000', padding: '5px 1px 5px 5px', maxWidth: 'calc(100% - 150px)', }}><label style={{ float: 'left', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> Confirm if you nominate for employee recognition</span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 15px 5px 15px', maxWidth: 'calc(100% - 150px)', width: '88px' }}><label style={{ float: 'left', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> </span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}>{initialData.personRecognition === "Yes" ? <CheckIcon /> : null}  </span></label></td>
                      <td  style={{ border: '1px solid #000', padding: '5px 15px 5px 15px', maxWidth: 'calc(100% - 150px)', width: '88px' }}><label style={{ float: 'left', height: '50px'  }}><span style={{ float: 'left', padding: '16px 3px 16px 0px',}}> </span> <span style={{ padding: '15px', border: '1px solid #000', width: '50px', height: '50px', display: 'inline-block' }}>{initialData.personRecognition === "No" || initialData.personRecognition === ""? <CheckIcon /> : null}  </span></label></td>
                    </tr>
                </tbody>
              </table>

            </td>
          </tr>
        </table> ) : <h1>Loading...</h1>}
      </div>
    </div>
  );
});


export default PrintObservation;
