import React, { useState, useEffect } from 'react';
import { PapperBlock } from 'dan-components';
import { object } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
import observationsLogoSymbol from 'dan-images/observationsLogoSymbol.png';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    border: '1px solid rgba(0, 0, 0, .13)',
    borderRadius: '4px',
  },
  leftSide: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: theme.palette.primary.dark,
    marginRight: theme.spacing(2),
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    paddingInline: theme.spacing(1),
    // height: "100%",
    top: '50%',
    transform: 'translateY(-50%)',
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
  },
  toggleTitle: {
    marginRight: theme.spacing(1),
  },
  newFormButton: {
    '& svg': {
      // fontSize: '25px',
      // color: '#06425c',
    },
  },
  listingLabelName: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '0.88rem',
  },
  listingLabelValue: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.88rem',
    '& a': {
      paddingLeft: '5px',
      cursor: 'pointer',
      color: 'rgba(0, 0, 0, 0.87)',
      fontWeight: '600',
    },
  },
  cardActions: {
    padding: '1.25rem',
  },
  dateValue: {
    display: 'inline-block',
    marginLeft: '0.5rem',
  },
  labelIcon: {
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.54)',
    verticalAlign: 'text-top',
  },
  bulkBTNTopBox: {
      '& button': {
        marginBottom: '10px',
        marginLeft: '10px',
      },
  },
  errorBTNTable: {
    color: '#06425c',
    textAlign: 'center',
    display: 'block',
    '& span': {
        fontSize: '13px',
        textTransform: 'capitalize',
      },
      '&:hover': {
        color: '#ff8533',
        cursor: 'pointer',
      },
  },
}));

function ObservationBulkupload() {
  const [listToggle, setListToggle] = useState(false);
  const history = useHistory();

  const handleBulkUploadfilePush = async () => {
    history.push(
      '/app/observation-bulkuploadfile'
    );
  };


  const columns = [
    {
      name: 'Number of records',
      options: {
        filter: true,

      }
    },
    {
        name: 'File name',
        options: {
          filter: true,
  
        }
      },
    {
      name: 'Processed records',
      options: {
        filter: true,
      },
    },
    {
      name: 'Processer',
      options: {
        filter: false,
      },
    },
    {
      name: 'Upload status',
      options: {
        filter: true,
      },
    },
    {
      name: 'Uploaded date',
      options: {
        filter: false,
      },
    },
    {
      name: 'Processed date',
      options: {
        filter: false,
      },
    },
    {
       name: 'Failed record',
       options: {
        filter: true,
        customBodyRender: (value) => {
          if (value === 'NA') {
            return (<span label="NA" style={{textAlign: 'center', display: 'block'}}>NA </span>);
          }
          if (value === 'Failed') {
            return (<Link className={classes.errorBTNTable}>Failed 25 </Link>);
          }
          return (<Chip label="Unknown" />);
        }
       },
    },
    
  ];

  const data = [
    ['30', 'filename', '20', 'NA', 'In Queue', '09-Sep-2021', '09-Sep-2021', 'NA'],
    ['30', 'filename', '20', 'NA', 'In Process', '09-Sep-2021', '09-Sep-2021', 'NA'],
    ['30', 'filename', '20', 'NA', 'Completed', '09-Sep-2021', '09-Sep-2021', 'NA'],
    ['30', 'filename', '20', 'NA', 'Failed', '09-Sep-2021', '09-Sep-2021', 'Failed'],
  ];

  const options = {
    // filterType: 'dropdown',
    // responsive: 'vertical',
    // print: true,
    // rowsPerPage: 10,
    // page: 0,

    filterType: 'dropdown',
    responsive: 'vertical',
    print: false,
    filter: false,
    download: false,
    viewColumns: false,
    selectableRowsHideCheckboxes: false,
    selectableRowsHeader: false,
    selectableRowsOnClick: false,
    viewColumns: false,
    selectableRows: false,
    search: false,
  };

  const handlePrintPush = async () => {
    history.push(
      "/app/pages/prints"
    );
  };

  const classes = useStyles();

  return (
    // <PapperBlock title="Observation Upload" icon="ion-md-list-box" desc="">
    //   <Box>
      <CustomPapperBlock title="Observation Upload" icon={observationsLogoSymbol} whiteBg>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <div className="bulkUploadSection">
              <Grid container spacing={3}>
                  <Grid item xs={12} align="right" className={classes.bulkBTNTopBox}>
                      <Button
                          variant="contained"
                          // color="primary"
                          size="small"
                          className={classes.newFormButton}
                          disableElevation
                          startIcon={<CloudUploadIcon />}
                          //onClick={() => handleBulkUploadPush()}
                          style={{marginLeft: '10px'}}
                          onClick={() => handleBulkUploadfilePush()}
                      >
                          Upload
                      </Button>
                  </Grid>
              </Grid>
              <MUIDataTable
                className="dataTableSectionDesign"
                columns={columns}
                data={data}
                options={options}
              />
            </div>
          </Grid>
        </Grid>
      </CustomPapperBlock>
    //   </Box>
    // </PapperBlock>
  );
}

export default ObservationBulkupload;
