import React from 'react';
import { checkACL } from '../../utils/helper' 
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import accessDenied from '../../../public/images/access_denied.png';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  errorWrap: {
    width: 600,
    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    margin: `${theme.spacing(3)}px auto`,
    '& h1': {
        marginTop: '38px',
        fontSize: '32px',
        lineHeight: '60px',
        color: '#F28705',
        fontFamily: 'Xolonium-Regular',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.2rem',
        },
    },
    '& span': {
        fontSize: '18px',
        lineHeight: '30px',
        fontFamily: 'Montserrat-Regular',
        color: '#707070',
        textAlign: 'center',
    },
  },
  linkColorOrgn: {
    color: '#F28705',
  },
}));

const Acl = (props) => {
  const classes = useStyles();

  const ButtonMailto = ({ mailto, label }) => (
    <>
      <Link
          to="#"
          onClick={(e) => {
            e.preventDefault()
             console.log(window.location)
             window.open(mailto,'_blank')
          }} 
          className={classes.linkColorOrgn}
      >
          {label}
      </Link> 
      </>
    );

  // console.log(props.module, props.action, checkACL(props.module, props.action))
  return checkACL(props.module, props.action) ? (
  <div>
    {props.html}
  </div>
) : (
  <div className={classes.errorWrap}>
        <img src={accessDenied} alt="Access denied" />
        <Typography variant="h1" gutterBottom >Seems you don't have access! </Typography>
        <Typography variant="body" gutterBottom >
            You do not have permission to view this page. Please contact PACE OS <ButtonMailto label="support" mailto="mailto:helpdesk@teknobuilt.com" />
        </Typography>
    </div>
);}

export default Acl

