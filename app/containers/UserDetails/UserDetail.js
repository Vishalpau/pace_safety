import React , {useEffect , useState} from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {
    INITIAL_NOTIFICATION_FORM,
    SSO_URL,
    HEADER_AUTH,ACCOUNT_API_URL,  access_token,

  } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
    pagination: {
      padding: "1rem 0",
      display: "flex",
      justifyContent: "flex-end"
    },
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(4),
      borderRadius: '4px',
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
      ['@media (max-width:480px)']: { 
        marginLeft: '3px',
        marginRight: '3px',
      },
    },
    pLeft5: {
      paddingLeft: '5px',
    },
    mLeftfont: {
      marginLeft: '2px',
      fontSize: '14px',
      textDecoration: 'none',
      color: 'rgba(0, 0, 0, 0.87) !important',
      fontWeight: '500',
      '&:hover':{
        textDecoration: 'none',
      },
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
      fontFamily: 'Montserrat-Regular',
    },
    listingLabelValue: {
      color: '#333333',
      fontSize: '0.88rem',
      fontFamily: 'Montserrat-Regular',
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
  
    title:  {
      fontSize: '1.25rem',
      fontFamily: 'Montserrat-Regular',
      color: 'rgba(0, 0, 0, 0.87)',
      fontWeight: '500',
      lineHeight: '1.6',
    },
    pt30: {
      paddingTop: '30px',
  
    },
  
    mTopThirtybtten: {
      marginTop: '0rem',
      float: 'right',
    },
  
    TableToolbar: {
      display: 'none',
    },
    pLTen: {
      marginLeft: '5px',
    },
    mTtop15: {
      marginTop: '15px',
    },
    mTtop20: {
      marginTop: '20px',
    },
    mTtop30: {
      marginTop: '30px',
    },
    marginTopBottom: {
      marginBottom: '16px',
      borderRadius: '8px',
      ['@media (max-width:800px)']: { 
        paddingTop: '55px',
      },
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
    padd10: {
      padding: '10px 10px 10px 10px',
    },
    sepHeightTen: {
      borderLeft: '3px solid #cccccc',
      height: '8px',
      verticalAlign: 'middle',
      margin: '15px 15px 15px 8px',
      fontSize: '10px',
      ['@media (max-width:480px)']: { 
        margin: '10px 5px 10px 5px',
      },
    },
    floatR: {
      float: 'right',
      textTransform: 'capitalize',
      ['@media (max-width:480px)']: { 
        float: 'left',
      },
    },
    Chip: {
      backgroundColor: '#eaeaea',
      borderRadius: ' 50px',
      paddingRight: '12px',
    },
    sepHeightOne: {
      borderLeft: '3px solid #cccccc',
      height: '8px',
      verticalAlign: 'middle',
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
    iconteal: {
      color: '#06425c',
    },
    listHeadColor: { backgroundColor: '#fafafa', },
    marginTopBottom: {
      '& .MuiTypography-h6 .MuiTypography-h5': {
        fontFamily: 'Montserrat-Regular',
      },
    },
    textRight: {
      textAlign: 'right',
      ['@media (max-width:480px)']: { 
        textAlign: 'left',
        padding: '0px 8px 15px 8px !important',
      },
    },
    userImage: {
      borderRadius: '50px',
      width: '52px',
      height: '50px',
      marginRight: '0px',
  
    },
    mrFifteen: {
      marginRight: '15px',
    },
    card: {
      boxShadow: '0px 0px 2px #ccc',
      borderRadius: '10px',
      marginBottom: '30px',
      '&:hover': {
        backgroundColor: '#f0f0f0',
        webkitBoxShadow: '0 1px 5px 2px #dcdada',
        boxShadow: '0 1px 5px 2px #dcdada',
      },
      '&:hover .MuiGrid-align-items-xs-flex-start': {
        backgroundColor: '#f0f0f0',
      },
    },
  
    cardLinkAction: {
      width: '100%',
      float: 'left',
      padding: '14px',
      cursor: 'pointer',
      textDecoration: 'none !important',
      ['@media (max-width:800px)']: { 
        paddingTop: '85px',
      }
    },
    userPictureBox: {
      position: 'absolute',
      right: '0px',
      ['@media (max-width:800px)']: { 
        right: 'auto',
      }
    },
    cardContentSection: {
      position: 'relative',
    },
    usrProfileListBox: {
      '& ul': {
        paddingTop: '0px',
        '& li': {
          paddingLeft: '0px',
          paddingTop: '0px',
          paddingBottom: '0px',
          '& div': {
            '& span': {
              display: 'inline-block',
              float: 'left',
              paddingRight: '14px',
              fontSize: '15px',
              fontWeight: '600',
            },
            '& p': {
              display: 'inline-block',
              float: 'left',
            },
          },
        },
      },
    },
    cardBottomSection: {
      '& p': {
        ['@media (max-width:480px)']: { 
          fontSize: '12px !important',
        },
      },
      // '& p': {
      //   ['@media (max-width:375px)']: { 
      //     fontSize: '12px !important',
      //   },
      // },
    },
    cardActionBottomBox: {
      ['@media (max-width:480px)']: { 
        padding: '8px !important',
      },
    },
  }));

const UserDetailsView = (props) => {
    console.log(props,"QQQQQQ")
    const [data, setData] = useState({})
    const classes = useStyles();
    const UserDetails =() => {
    const config = {
        method: "get",
        url: `${ACCOUNT_API_URL}api/v1/user/${props.userId}/`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      axios(config)
        .then((response) => {
          if (response.status === 200) {
            let userData = response.data.data.results;
            setData(userData)
          }
        })
        .catch((error) => {
        });}
        useEffect(() => {
            UserDetails()
        },[])
    
    return (<>
      <Grid
                          item md={12} sm={12} xs={12}
                          className={classes.usrProfileListBox}
                        >
                          <h3>Basic Information</h3>
                          <List>
                            <ListItem>
                              {/* <ListItemAvatar>
                                <Avatar>
                                  <ImageIcon />
                                </Avatar>
                              </ListItemAvatar> */}
                              <ListItemText primary="Full Name:" secondary={data.name} />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Organization Type:" secondary="Epc ORGANIZATION" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Organization Role:" secondary="N/A" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Role Title:" secondary="N/A" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Current Location:" secondary="Delhi » NCT » India" />
                            </ListItem>
                          </List>
                        </Grid>
  
                        <Grid
                          item md={12} sm={12} xs={12}
                          className={classes.usrProfileListBox}
                        >
                          <h3>Company Information</h3>
                          <List>
                            <ListItem>
                              <ListItemText primary="Company Name:" secondary="JWIL" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Location:" secondary="Italy" />
                            </ListItem>
                          </List>
                        </Grid></>
    )
  }

export default UserDetailsView;
