import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import Share from '@material-ui/icons/Share';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import Incidents from 'dan-styles/IncidentsList.scss';
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
import MUIDataTable from 'mui-datatables';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import paceLogoSymbol from 'dan-images/paceLogoSymbol.png';
import completed_small from 'dan-images/completed_small.png';
import in_progress_small from 'dan-images/in_progress_small.png';
import "../../../styles/custom/customheader.css";
import StarsIcon from '@material-ui/icons/Stars';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import api from "../../../utils/axios";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import Pagination from '@material-ui/lab/Pagination';
import { useHistory, useParams } from "react-router";
import SimpleTabs from "./ObservationSearchSection"


const useStyles = makeStyles((theme) => ({
  pagination:{
    padding:"1rem 0",
    display:"flex",
    justifyContent:"flex-end"
  },
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    // border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: '4px',
    fontFamily: 'Montserrat-Medium',
  },
  leftSide: {
    flexGrow: 1,
  },
  rightSide: {
    flexGrow: 8,
    textAlign: 'right',
  },
  newIncidentButton: {
    backgroundColor: theme.palette.primary.dark,
  },
  search: {
    position: 'relative',
    border: '1px solid #ccc',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: theme.palette.primary.dark,
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  filterIcon: {
    color: theme.palette.primary.dark,
    fontSize: '1.8rem',
  },
  toggleTitle: {
    marginRight: theme.spacing(1),
    fontSize: '1rem',
  },
  chipAction: {
    textAlign: 'right',
  },
  dataAction: {
    marginRight: theme.spacing(1),
  },
  actionMargin: {
    marginLeft: '2.5rem',
    lineHeight: '6rem'
  },
  marginLeft: {
    marginLeft: '2px',
    fontSize: '14px'
  },
  mLeft: {
    marginLeft: '2px',
  },
  mLeftR5: {
    marginLeft: '5px',
    marginRight: '15px',
  },
  PLR0: {
    paddingRight: '0px',
    minWidth: '30px',
    paddingLeft: '0px',
  },
  pLeft5: {
    paddingLeft: '5px',
  },
  pt15: {
    paddingTop: '15px !important',
  },
  mLeftfont: {
    marginLeft: '2px',
    fontSize: '14px',
    textDecoration: 'underline',
    color: 'rgba(0, 0, 0, 0.87) !important',
  },
  spacerRight: {
    marginRight: '4px',
  },
  paddZero: {
    padding: '0px',
  },
  listingLabelName: {
    color: '#7692a4',
    fontSize: '0.88rem',
	fontFamily: 'Montserrat-Medium',
  },
  listingLabelValue: {
    color: '#333333',
    fontSize: '0.88rem',
	fontFamily: 'Montserrat-Medium',
    '& a': {
      paddingLeft: '5px',
      cursor: 'pointer',
      color: 'rgba(0, 0, 0, 0.87)',
      fontWeight: '600',
    },
  },
  textPrimary: {
    color: '#06425c',
  }, 
  dataTableNew: {
    minWidth: '1360px !important',
  },
  TableToolbar : {
    display: 'none',
  },
  pLTen : {
    marginLeft: '5px',
  },
  mTtop15 : {
    marginTop: '15px',
  },  
  mTtop20 : {
    marginTop: '20px',
  },  
  mTtop30 : {
    marginTop: '30px',
  },
  marginTopBottom : {
    marginBottom: '16px',
    borderRadius: '8px',
  },
  searchHeaderTop: {
    border: '1px solid #f1f1f1',
    backgroundColor: '#ffffff',
    padding: '0px 16px',
    borderRadius: '5px',
    marginTop: '20px',
  },
  greyBg: {
    backgroundColor: '#f3f3f3',
  },
  AppBarHeader: {
    color: 'inherit',
    backgroundColor: '#f7f7f7',
    border: '1px solid #e4e4e4',
    padding: '0px 16px 0px 10px',
    borderRadius: '8px',
},
buttonsNewChild: {
  borderRadius: '5px',
  backgroundColor: '#23343e',
  color: '#ffffff',
},
padd10:  {
  padding: '10px 10px 10px 10px',
},
sepHeightTen: {
  borderLeft: '3px solid #cccccc',
  height: '8px',
  verticalAlign:'middle',
  margin: '15px 15px 15px 8px',
  fontSize: '10px',
},
sepHeightOne: {
  borderLeft: '3px solid #cccccc',
  height: '8px',
  verticalAlign:'middle',
  margin: '15px',
  fontSize: '10px',
},
mright5: {
  marginRight: '5px',
  color: '#a7a7a7',
},
iconColor: {
  color: '#a7a7a7',
},
floatR: {
  float: 'right',
  textTransform: 'capitalize',
},
iconteal: {
  color: '#06425c',
  fontSize: '28px',
},
listHeadColor: {backgroundColor: '#fafafa',},
marginTopBottom: {
	'& .MuiTypography-h6 .MuiTypography-h5': {
		fontFamily: 'Montserrat-Medium',
	},
},
textRight:{
  textAlign: 'right',
},
userImage: {
  height: '56px',
  width: '58px',
},
mrFifteen: {
  marginRight: '15px',
},
card: {
  boxShadow: '0px 0px 2px #ccc',
  borderRadius: '10px',
  marginBottom: '30px',
},
title:  {
  fontSize: '20px',
  fontFamily: 'Montserrat !important',
  color: '#06425c',
},
pr0: {paddingRight:'0px !important',},
}));

function Actions(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const type = localStorage.getItem("type")

  const userName = JSON.parse(localStorage.getItem('userDetails')) !== null
  ? JSON.parse(localStorage.getItem('userDetails')).name
  : null;

  const [incidents] = useState([]);
  const [listToggle, setListToggle] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const history = useHistory();
  const handelView = (e) => {
    setListToggle(false);
  };
  const handelViewTabel = (e) => {
    setListToggle(true);
  };

  const [value, setValue] = React.useState(2);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  
  //   Data for the table view
  const columns = ['Number', 'Type', 'Schedule', 'Status', 'Requested by', 'Date submitted', 'Date approved', 'Approved by'];

  const data = [
    ['AT-125-256-251', 'Action', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['AT-125-256-251', 'Action', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['AT-125-256-251', 'Action', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
    ['AT-125-256-251', 'Action', 'Planned', 'Assigned', 'Mayank', 'Dec 26, 2020', 'Dec 26, 2020', 'Prakash'],
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: false,
    filter: false,
    search: false,
    download: false,
    viewColumns: false,
    selectableRowsHideCheckboxes: false,
    selectableRowsHeader: false,
    selectableRowsOnClick: false,
    viewColumns: false,
    selectableRows: false,
    rowsPerPage: 10,
    page: 0,
  };
//dialog
const [MyFavopen, setMyFavOpen] = React.useState(false);

const handleMyFavClickOpen = () => {
  setMyFavOpen(true);
};

const handleMyFavClose = () => {
  setMyFavOpen(false);
};  

const handleSummaryPush = async (index) => {
  const id = allInitialData[index].id;
  localStorage.setItem("fkobservationId", id);
  if (allInitialData[index].isCorrectiveActionTaken !== null) {
    localStorage.setItem("action", "Done");
  } else {
    localStorage.removeItem("action");
  }
  history.push(`/app/observation/details/${id}`);
};

const [allInitialData, setAllInitialData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchIncident = props.searchIncident

const fetchInitialiObservation = async () => {
  const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
  const fkProjectId = props.projectName.projectId || JSON.parse(localStorage.getItem("projectName"))
    .projectName.projectId;
 const selectBreakdown = props.projectName.breakDown.length>0? props.projectName.breakDown
  :JSON.parse(localStorage.getItem("selectBreakDown")) !== null
    ? JSON.parse(localStorage.getItem("selectBreakDown"))
    : null;
let struct = "";
for (const i in selectBreakdown) {
  struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
}
const fkProjectStructureIds = struct.slice(0, -1);

  const res = await api.get(`api/v1/observations/?companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}`);
  const result = res.data.data.results.results
  let tempData = []
  let tempUser = []
    let temp = []
  if(props.type == "All" || props.type == "Type"   ){
    await setAllInitialData(result)
    if(props.observation == "My Observations"){
      result.map((value,i) => {
        if(value.username == userName ){
          tempData.push(result[i])
        }
      })
      await setAllInitialData(tempData)
    }else{
      await setAllInitialData(result)
    }


  }else{
    
    result.map((value,i) => {
      if(value.observationType == props.type ){
        tempData.push(result[i])
      }
    })
    await setAllInitialData(tempData)
    if(props.observation == "My Observations"){
      tempData.map((value,i) => {
        if(value.username == userName ){
          tempUser.push(tempData[i])
        }
      })
      await setAllInitialData(tempUser)
    }

  }

  // if(props.observation == "My Observations"){

  //   result.map((value,i) => {
  //     if(value.username == userName ){
  //       tempData.push(result[i])
  //     }
  //   })
  //   await setAllInitialData(tempData)
  // }else{
  //   await setAllInitialData(result)
  // }
  let pageCount  = Math.ceil(res.data.data.results.count/25)
  await setPageCount(pageCount)
//   let value = localStorage.getItem("value")
//   console.log(value)
//   if (value){

  
//   const resPage = await api.get(`api/v1/observations/?companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&page=${value}`);
//   console.log(resPage,"KKKKKKKK")
// const resultPage = resPage.data.data.results.results
//   let tempData1 = []
//   let tempUser1 = []
//     // let temp = []
//   if(props.type == "All" || props.type == "Type"   ){
//     await setAllInitialData(resultPage)
//     console.log(props.observation)
//     if(props.observation == "My Observations"){
//       console.log("My Observations")
//       resultPage.map((value,i) => {
//         if(value.username == userName ){
//           tempData1.push(resultPage[i])
//         }
//       })
//       await setAllInitialData(tempData1)
//     }else{
//       console.log("alllllllllll")
//       await setAllInitialData(resultPage)
//     }


//   }else{
//     console.log(props.type)
//     resultPage.map((value,i) => {
//       // console.log(value.observationType,"formtype")
//       if(value.observationType === props.type ){
//         tempData1.push(resultPage[i])
//         console.log(props.type,"filter type")

//       }
//     })
//     await setAllInitialData(tempData1)
//     if(props.observation == "My Observations"){
//       console.log(":::::::OOOOOO")
//       tempData1.map((value,i) => {
//         if(value.username == userName ){
//           tempUser1.push(tempData1[i])
//         }
//       })
//       await setAllInitialData(tempUser1)
//     }

//   }
//   let pageCount1  = Math.ceil(resPage.data.data.results.count/25)
//   await setPageCount(pageCount1)
//   // await handleChange(0,value)
//   // localStorage.removeItem("value")

//   }
  await setIsLoading(true)

}
  // localStorage.removeItem("value")

const handleSearch = (e) => {
  // console.log(e.target.value)
  setSeacrhIncident(e.target.value);
  // history.push(`/app/observationsearch/#{search-${e.target.value}}`)
};

const handleChange = async(event , value) => {

    let paginationValue = localStorage.setItem("value", value);
  

  // let valueNumber =  value !== undefined ? value : paginationValue;
  const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
  const fkProjectId = props.projectName.projectId || JSON.parse(localStorage.getItem("projectName"))
    .projectName.projectId;
 const selectBreakdown = props.projectName.breakDown.length>0? props.projectName.breakDown
  :JSON.parse(localStorage.getItem("selectBreakDown")) !== null
    ? JSON.parse(localStorage.getItem("selectBreakDown"))
    : null;
let struct = "";

for (const i in selectBreakdown) {
  struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
}
const fkProjectStructureIds = struct.slice(0, -1);
const res = await api.get(`api/v1/observations/?companyId=${fkCompanyId}&projectId=${fkProjectId}&projectStructureIds=${fkProjectStructureIds}&page=${value}`);
const result = res.data.data.results.results
await setAllInitialData(result)
  let tempData = []
  let tempUser = []
    let temp = []
  if(props.type == "All" || props.type == "Type"   ){
    await setAllInitialData(result)
    if(props.observation == "My Observations"){
      result.map((value,i) => {
        if(value.username == userName ){
          tempData.push(result[i])
        }
      })
      await setAllInitialData(tempData)
    }else{
      await setAllInitialData(result)
    }


  }else{
    result.map((value,i) => {
      // console.log(value.observationType,"formtype")
      if(value.observationType == props.type ){
        tempData.push(result[i])
      }
    })
    await setAllInitialData(tempData)
    if(props.observation == "My Observations"){
      tempData.map((value,i) => {
        if(value.username == userName ){
          tempUser.push(tempData[i])
        }
      })
      await setAllInitialData(tempUser)
    }

  }
  let pageCount  = Math.ceil(res.data.data.results.count/25)
  await setPageCount(pageCount)
  // await setAllInitialData(res.data.data.results.results);
};
console.log(allInitialData,"Alllllllll")
  const classes = useStyles();
  useEffect(() => {
    fetchInitialiObservation();
    // handleProjectList();
  }, [props.projectName,props.type,searchIncident]);
  // useEffect(() => {
    
  // })
  return (
    <>
      <Box>
        {isLoading ? (<>
        <Grid className={classes.marginTopBottom}>
        {listToggle == false ? (
          <div>
            <div className="gridView">
            {
                  Object.entries(allInitialData)
                    .filter(
                      (item) => {return (
                         
                        item[1]["observationDetails"]
                          .toLowerCase()
                          .includes(searchIncident.toLowerCase()) ||
                          item[1]["observationNumber"].toLowerCase().includes(
                            searchIncident.toLowerCase()
                          
                        )
                      )}
                        
                    )
                    .map((item, index) => (
              <Card variant="outlined" className={classes.card}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={3} alignItems="flex-start">
                        <Grid item sm={12} xs={12} className={classes.listHeadColor}>
                          <Grid container spacing={3} alignItems="flex-start">
                            <Grid item md={10} sm={8} xs={12} className={classes.pr0}>
                              <Typography
                                 className={classes.title}
                              >
                                    {item[1]["observationDetails"]}
                              </Typography>
                              <Typography
                                display="inline"
                                className={classes.listingLabelName}
                              >
                                Number: <span><Link
                                      onClick={() => handleSummaryPush(index)}
                                  variant="h6"
                                  className={classes.mLeftfont}
                                >
                                <span className={classes.listingLabelValue}>{item[1]["observationNumber"]}</span>
                                </Link></span>
                              </Typography>
                              {/* <Typography
                                variant="body1"
                                gutterBottom
                                display="inline"
                                color="textPrimary"
                                className={classes.listingLabelName}
                              >
                                Category: <span className={classes.listingLabelValue}>HSE incident Action</span>
                              </Typography> */}
                              <span item xs={1} className={classes.sepHeightOne}></span>
                              <Typography
                                variant="body1"
                                gutterBottom
                                display="inline"
                                color="textPrimary"
                                className={classes.listingLabelName}
                              >
                                Assignee: <span className={classes.listingLabelValue}>{item[1]["assigneeName"] ? item[1]["assigneeName"] : "-"}</span>
                                <span item xs={1} className={classes.sepHeightOne}></span>
                                Stage: <span className={classes.listingLabelValue}>{item[1]["observationStage"] ? item[1]["observationStage"] : "-" }  <img src={in_progress_small} className={classes.smallImage} /></span>
								<span item xs={1} className={classes.sepHeightOne}></span>
								Status: <span className={classes.listingLabelValue}>{item[1]["observationStatus"] ? item[1]["observationStatus"] : "-" }  <img src={completed_small} className={classes.smallImage} /></span>
                              </Typography>
                              
                            </Grid>
                            

                            <Grid item md={2} sm={4} xs={12}>
                            <Button  className={classes.floatR}>
                              <img src={paceLogoSymbol} className={classes.userImage} /> {item[1]["username"] ? item[1]["username"] : "-" }
                            </Button>
                              {/* <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                              >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                              </Menu> */}
                            </Grid>
                            </Grid>
                          </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                    <Grid container spacing={3}>  
                    <Grid item md={3} sm={6} xs={12}>
                      <Typography
                        variant="body1"
                        gutterBottom
                        color="textPrimary"
                        className={classes.listingLabelName}
                      >
                        Type:
                      </Typography>

                      <Typography
                        gutterBottom
                        className={classes.listingLabelValue}
                      >
                        {/* {item[1]["incidentReportedByName"]} */}
                        {item[1]["observationType"]}
                      </Typography>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        gutterBottom
                        className={classes.listingLabelName}
                      >
                        Location:
                      </Typography>
                      <Typography
                        
                        className={classes.listingLabelValue}
                      >
                                {item[1]["location"]}
                      </Typography>
                    </Grid>

                    <Grid item md={3} sm={6} xs={12}>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        gutterBottom
                        className={classes.listingLabelName}
                      >
                        Reported on:
                      </Typography>

                      <Typography
                        
                        className={classes.listingLabelValue}
                      >
{moment(item[1]["createdAt"]).format(
                                  "Do MMMM YYYY, h:mm:ss a"
                                )}                      </Typography>
                    </Grid>

                    <Grid item md={3} sm={6} xs={12}>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        gutterBottom
                        className={classes.listingLabelName}
                      >
                        Reported by:
                      </Typography>

                      <Typography
                        
                        className={classes.listingLabelValue}
                      >
                                {item[1]["reportedByName"]?item[1]["reportedByName"]:"Admin"}
                      </Typography>
                    </Grid>
                    </Grid>
                    </Grid>

                    {/* <Grid item sm={2} xs={12}>
                      <Typography
                        variant="h6"
                        color="textPrimary"
                      >
                        <img src={qrcode} />
                      </Typography>

                      <Typography
                        
                        className={classes.listingLabelValue}
                      >
                        29 Dec 2020
                      </Typography>
                    </Grid> */}
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions className={Incidents.cardActions}>
                  <Grid
                    container
                    spacing={2}
                    justify="flex-end"
                    alignItems="left"
                  >
                    <Grid item xs={12} md={5} sm={12} className={classes.pt15}>
                    <Typography
                        variant="body1"
                        display="inline"
                        color="textPrimary"

                      >
                        <AttachmentIcon className={classes.mright5} />
                        Attachments:
                      </Typography>
                      <Typography variant="body2" display="inline">
                        <Link href="#" color="secondary" className={classes.mLeftR5}>{item[1]['attachmentCount']}</Link>
                      </Typography>
                      <span item xs={1} className={classes.sepHeightTen}></span>
                      <Typography
                        variant="body1"
                        display="inline"
                        color="textPrimary"
                        className={classes.mLeft}
                      >
                        <InsertCommentOutlinedIcon className={classes.mright5} />
                      Comments:
                      </Typography>
                      <Typography variant="body2" display="inline" className={classes.mLeft}>
                        <Link href="#" color="secondary" className={classes.mLeft}>{item[1]['commentsCount']}</Link>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={7} md={7} sm={12} className={classes.textRight}>
                      <div className={classes.floatR}>
                      {/* <Typography variant="body1" display="inline">
                      <WifiTetheringIcon className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Network View</Link>
                      </Typography>
                      <span item xs={1} className={classes.sepHeightTen}></span> */}
                      <Typography variant="body1" display="inline">
                        <PrintOutlinedIcon className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Print</Link>
                      </Typography>
                      <span item xs={1} className={classes.sepHeightTen}></span>
                      {/* <Typography variant="body1" display="inline">
                      <Share className={classes.iconColor} /> <Link href="#" className={classes.mLeftR5}>Share</Link>
                      </Typography>
                      <span item xs={1} className={classes.sepHeightTen}></span> */}
                      <Typography variant="body1" display="inline">
                      <Link href="#" className={classes.mLeftR5}><StarsIcon className={classes.iconteal} /></Link>
                      </Typography>
                      <span item xs={1} className={classes.sepHeightTen}></span>
                      <Typography variant="body1" display="inline">
                      <Link href="#" className={classes.mLeftR5}><DeleteForeverOutlinedIcon className={classes.iconteal} /></Link>
                      </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
              ))}

            </div>
            <div>
                    <Dialog
                        open={MyFavopen}
                        onClose={handleMyFavClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">{"My Favorite Package"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            <img src={paceLogoSymbol} className={classes.userImage} /> Prakash
                            
                            <span className={classes.floatR}><BackspaceOutlinedIcon /></span>
                          </DialogContentText>
                          <DialogContentText id="alert-dialog-description">
                            <Typography
                              variant="subtitle1"
                              display="inline"
                            >
                                <a href="#" >Sparing philosophy</a>
                            </Typography>  
                          </DialogContentText>
                          <DialogContentText id="alert-dialog-description">
                            <Typography
                              variant="body1"
                            >
                                Prakash
                            </Typography>  
                          </DialogContentText>
                          <DialogContentText id="alert-dialog-description">
                            <Typography
                              variant="body1"
                            >
                                Sparing philosophy defined
                            </Typography>  
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleMyFavClose}  color="primary" variant="contained" autoFocus>
                            Close
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
            <div className="gridView">
              {Object.entries(incidents).map((item, index) => (
                <Card variant="outlined" className={Incidents.card} key={index}>
                  {/* <CardHeader disableTypography title="Incident with No Injury" /> */}
                  <CardContent>
                    {/* {console.log(item[index].incidentTitle)} */}
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Grid container spacing={3} alignItems="flex-start">
                          <Grid item xs={9} className={classes.chipAction}>
                            <Chip
                              avatar={<Avatar src="/images/pp_boy.svg" />}
                              label="Admin"
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <Typography
                              
                            // display="inline"
                            // color="textPrimary"
                            // className={classes.listingLabelValue}
                            >
                            Work fell down in site
                              {/* {item[index]["incidentTitle"]} */}
                            </Typography>
                          </Grid>


                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <div className={Incidents.statusRow}>
                          <Typography
                            
                            display="inline"
                            className={classes.listingLabelName}
                          >
                          Number
                            {''}
                            <Link
                              href="/app/ActionSummary"
                              variant="subtitle"
                              className={Incidents.incidentNumber}
                              style={{ textDecoration: 'underline' }}
                            >
                            252-525-256
                            </Link>
                          </Typography>

                          <Chip
                            variant="outlined"
                            label="Initial Action"
                            color="primary"
                            size="small"
                          />

                          <Typography
                            variant="body1"
                            // color="textPrimary"
                            display="inline"
                          >

                            <i className="ion-ios-calendar-outline" />
                            <span className={Incidents.dateValue}>
                            24 june 2021
                            </span>
                          </Typography>
                        </div>
                      </Grid>

                      <Grid item md={3} sm={6} xs={12}>
                        <Typography
                          
                          gutterBottom
                          className={classes.listingLabelName}
                        >
                        Type
                        </Typography>

                        <Typography
                          variant="body1"
                          color="textPrimary"
                          className={classes.listingLabelValue}
                        >
                          {/* {item[1]["incidentReportedByName"]} */}
                        Not found
                        </Typography>
                      </Grid>
                      <Grid item md={3} sm={6} xs={12}>
                        <Typography
                          
                          gutterBottom
                          className={classes.listingLabelName}
                        >
                        Location
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          className={classes.listingLabelValue}
                        >
                        Delhi
                        </Typography>
                      </Grid>

                      <Grid item md={3} sm={6} xs={12}>
                        <Typography
                          
                          gutterBottom
                          className={classes.listingLabelName}
                        >
                        Reported on
                        </Typography>

                        <Typography
                          variant="body1"
                          color="textPrimary"
                          className={classes.listingLabelValue}
                        >
                        24 june 2021
                        </Typography>
                      </Grid>

                      <Grid item md={3} sm={6} xs={12}>
                        <Typography
                          
                          gutterBottom
                          className={classes.listingLabelName}
                        >
                        Reported By
                        </Typography>

                        <Typography
                          variant="body1"
                          color="textPrimary"
                          className={classes.listingLabelValue}
                        >
                        Person
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions className={Incidents.cardActions}>
                    <Grid
                      container
                      spacing={2}
                      justify="flex-end"
                      alignItems="center"
                    >
                      <Grid item xs={6} md={3}>
                        <Typography
                          variant="body2"
                          display="inline"
                          className={Incidents.actionsLabel}
                        >
                          <AttachmentIcon />
                          {' '}
                          Comments:
                        </Typography>
                        <Typography variant="body2" display="inline">
                          <Link href="#" className={classes.mLeft}>3</Link>
                        </Typography>
                      </Grid>

                      <Grid item xs={6} md={3}>
                        <Typography
                          variant="body2"
                          display="inline"
                          className={Incidents.actionsLabel}
                        >
                          <AttachmentIcon />
                          {' '}
                          Actions:
                        </Typography>
                        <Typography variant="body2" display="inline">
                          <Link href="#" className={classes.mLeft}>3</Link>
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography
                          variant="body2"
                          display="inline"
                          className={Incidents.actionsLabel}
                        >
                          <AttachmentIcon />
                          {' '}
                        Evidences:
                        </Typography>
                        <Typography variant="body2" display="inline">
                          <Link href="#" className={classes.mLeft}>3</Link>
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={6} md={3} alignItems="right">
                        <Button
                          size="small"
                          color="secondary"
                          startIcon={<Print />}
                          className={Incidents.actionButton}
                        >
                        Print
                        </Button>
                        <Button
                          size="small"
                          color="secondary"
                          startIcon={<Share />}
                          className={Incidents.actionButton}
                        >
                        Share
                        </Button>
                      </Grid>

                    </Grid>
                  </CardActions>
                </Card>
              ))}
            </div>
          </div>
          // listview end

        ) : (
          <TableContainer component={Paper}>
          <Grid component={Paper}>
              <MUIDataTable
                title="Actions List"
                data={data}
                columns={columns}
                options={options}
                className="classes.dataTableNew"
              />
              </Grid>
            </TableContainer>
          )}
        </Grid>  
        <div className={classes.pagination}>
      <Pagination count={pageCount} onChange={handleChange}/>
    </div></> ): "Loading..."}
      </Box>
    </>
  );
}

// export default Actions;
const mapStateToProps = state => {
  return {
    projectName: state.getIn(["InitialDetailsReducer"]),
    todoIncomplete: state

  }
}

export default connect(mapStateToProps,null)(Actions);