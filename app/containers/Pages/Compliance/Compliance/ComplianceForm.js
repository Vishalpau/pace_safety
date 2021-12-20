import React, { useState } from 'react';
//import { CustomPapperBlock } from 'dan-components';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ComplianceDetails from '../Compliance/ComplianceDetails';
import Categories from '../Compliance/Categories';
import Checks from '../Compliance/checks';
import PerformanceSummary from '../Compliance/PerformanceSummary';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import classNames from "classnames";
import complianceLogoSymbol from 'dan-images/complianceLogoSymbol.png';
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';

// style
const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  inlineControls: {
    flexDirection: 'row',
    gap: '1rem',
  },
  icon: {
    minWidth: 0,
  },
  activeList: {
    color: theme.palette.primary.main,
    borderLeft: `5px solid ${theme.palette.secondary.main}`,
  },
  notActiveList: {
    borderLeft: `5px solid ${theme.palette.primary.main}`,
  },
  rightMainLink: {
    paddingLeft: '45px',
  },
  subLink: {
    display: 'inline-block',
  },
  subLinkIcon: {
    verticalAlign: 'middle',
  },
  subSubLink: {
    display: 'block',
      width: '100%',
      float: 'left',
    '& span a': {
      color: '#000',
      fontSize: '14px',
    }
  },
}));

function ComplianceForm() {
  const [complianceDetails, setComplianceDetails] = useState(false);
  const [categories, setCategories] = useState(false);
  const [checks, setChecks] = useState(false);
  const [performanceSummary, setPerformanceSummary] = useState(false);

  //const history = useHistory();

  // Assigning useStyles() to 'classes' variable
  const classes = useStyles();

  return (
    <CustomPapperBlock title="Compliance" icon='customDropdownPageIcon compliancePageIcon' whiteBg>
      {/* ion-md-list-box */}
      <Grid container spacing={2}>
        <Grid container item xs={12} md={9}>
        <>
                {(() => {
                  if (
                    complianceDetails == true
                      || (categories === false
                        && checks === false
                        && performanceSummary === false)
                  ) {
                    return (<ComplianceDetails />);
                  }
                  if (categories == true) {
                    return (<Categories />);
                  }
                  if (checks == true) {
                    return (<Checks />);
                  }
                  if (performanceSummary == true) {
                    return (<PerformanceSummary />);
                  }
                })()}
              </>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper elevation={1}>
            <List dense>
              <ListItem 
                className={classes.activeList}
                onClick={(e) => {
                    setComplianceDetails(true);
                    setCategories(false);
                    setChecks(false);
                    setPerformanceSummary(false);
                }}
                >
                <ListItemIcon className={classes.icon}>
                  <DoubleArrowIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  primary={<Link href="#">Compliance Details </Link>}
                />
              </ListItem>

              <ListItem
               className={classes.notActiveList}
               onClick={(e) => {
                setComplianceDetails(false);
                setCategories(true);
                setChecks(false);
                setPerformanceSummary(false);
                }}
               >
                <ListItemIcon className={classes.icon}>
                  <RemoveCircleOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  primary="Categories"
                />
              </ListItem>
              <ListItem
                className={classes.notActiveList}
                onClick={(e) => {
                    setComplianceDetails(false);
                    setCategories(false);
                    setChecks(true);
                    setPerformanceSummary(false);
                }}>
                <ListItemIcon className={classNames(classes.icon, classes.subLinkIcon)}>
                  <RemoveCircleOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  className={classes.subLink}
                  primary="Checks"
                />
              </ListItem>
              <ListItem
                className={classNames(classes.rightMainLink, classes.notActiveList)}
              >
                <ListItemIcon className={classNames(classes.icon, classes.subLinkIcon1)}>
                  <DoubleArrowIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle3' }}
                  className={classes.subSubLink}
                  primary={<Link href="#">Environment</Link>}
                />
              </ListItem>
              <ListItem
                className={classNames(classes.rightMainLink, classes.notActiveList)}
              >
                <ListItemIcon className={classNames(classes.icon, classes.subLinkIcon1)}>
                  <DoubleArrowIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle4' }}
                  className={classes.subSubLink}
                  primary={<Link href="#">Housekeeping</Link>}
                />
              </ListItem>
              <ListItem
                className={classes.notActiveList}
                onClick={(e) => {
                    setComplianceDetails(false);
                    setCategories(false);
                    setChecks(false);
                    setPerformanceSummary(true);
                }}>
                <ListItemIcon className={classes.icon}>
                  <RemoveCircleOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  primary="Performance summary"
                />
              </ListItem>
            </List>
          </Paper>
          {/* <FormSidebar /> */}
        </Grid>
      </Grid>
    </CustomPapperBlock>
  );
}

export default ComplianceForm;
