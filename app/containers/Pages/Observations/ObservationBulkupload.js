import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
import appapi from "../../../utils/axios";
import Loading from 'dan-components/Loading';
import { handelDateTime } from '../../../utils/CheckerValue';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Attachment from "../../Attachment/Attachment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4),
    border: '0.063rem solid rgba(0, 0, 0, .13)',
    borderRadius: '4px',
  },
  leftSide: {
    flexGrow: 1,
  },
  pagination: {
    padding: "1rem 0",
    display: "flex",
    justifyContent: "flex-end",
    width: '100%',
    '& span': {
      paddingTop: '5px',
      color: '#333333',
      fontFamily: 'Montserrat-Medium',
    },
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
      // fontSize: '1.563rem',
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
      paddingLeft: '0.313rem',
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
    fontSize: '1rem',
    color: 'rgba(0, 0, 0, 0.54)',
    verticalAlign: 'text-top',
  },
  bulkBTNTopBox: {
    '& button': {
      marginBottom: '0.625rem',
      marginLeft: '0.625rem',
    },
  },
  errorBTNTable: {
    color: '#06425c',
    textAlign: 'center',
    display: 'block',
    '& span': {
      fontSize: '0.813rem',
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
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageData, setPageData] = useState(0)
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1)

  const history = useHistory();

  const handleBulkUploadfilePush = () => {
    history.push(
      '/app/icare-bulkuploadfile'
    );

  };


  const columns = [
    {
      name: 'File name',
      options: {
        filter: true,

      }
    },
    {
      name: 'Number of records',
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
      name: 'Failed record',
      options: {
        filter: true,
        customBodyRender: (value) => {
          if (value === 'NA') {
            return (<span label="NA" style={{ textAlign: 'center', display: 'block' }}>NA </span>);
          }
          if (value === 'Failed') {
            return (<Link className={classes.errorBTNTable}>Failed 25 </Link>);
          }
          return (<Chip label="Unknown" />);
        }
      },
    },
    {
      name: 'Status',
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
  ];
  const [isLoading, setIsLoading] = useState(false)

  const handelShowData = async () => {
    const res = await appapi.get("api/v1/core/bulkuploads/")
    let resData = res.data.data.results.results
    setData(resData)
    let pageCount = Math.ceil(res.data.data.results.count / 25)
    console.log(pageCount)
    await setPageData(res.data.data.results.count / 25)
    await setTotalData(res.data.data.results.count)
    await setPageCount(pageCount)
    setIsLoading(false)
  }

  const handleChange = async (event, value) => {
    //   const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    //   const fkProjectId = props.projectName.projectId || JSON.parse(localStorage.getItem("projectName"))
    //     .projectName.projectId;
    //   const selectBreakdown = props.projectName.breakDown.length > 0 ? props.projectName.breakDown
    //     : JSON.parse(localStorage.getItem("selectBreakDown")) !== null
    //       ? JSON.parse(localStorage.getItem("selectBreakDown"))
    //       : null;
    //  const createdBy = JSON.parse(localStorage.getItem('userDetails')) !== null
    //       ? JSON.parse(localStorage.getItem('userDetails')).id
    //       : null;
    //   let struct = "";

    //   for (const i in selectBreakdown) {
    //     struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    //   }
    //   const fkProjectStructureIds = struct.slice(0, -1);
    // if(props.observation === "My Observations"){
    const res = await appapi.get(`/api/v1/core/bulkuploads/?page=${value}`);
    await setData(res.data.data.results.results);
    await setPage(value)
    // }
  };

  const options = {
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
    pagination: false,
  };

  const handlePrintPush = async () => {
    history.push(
      "/app/pages/prints"
    );
  };

  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true)
    handelShowData()

  }, []);

  return (
    <Acl
      module="safety-observations"
      action="add_observations"
      html={(
        <CustomPapperBlock title="iCare Uploads" icon='customDropdownPageIcon iCarePageIcon' whiteBg>
          {isLoading == false ?
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <div className="bulkUploadSection">
                  <Grid container spacing={3}>
                    <Grid item xs={12} align="right" className={classes.bulkBTNTopBox}>
                      <Button
                        variant="contained"
                        size="small"
                        className={classes.newFormButton}
                        disableElevation
                        startIcon={<CloudUploadIcon />}
                        style={{ marginLeft: '0.625rem' }}
                        onClick={() => handleBulkUploadfilePush()}
                      >
                        New upload
                      </Button>
                    </Grid>
                  </Grid>
                  {/* <MUIDataTable
                  className="dataTableSectionDesign"
                  columns={columns}
                  data={data}
                  options={options}
                /> */}
                  <Table component={Paper} className="simpleTableDesign">
                    <TableHead>
                      <TableRow>
                        <TableCell className="tableHeadCellFirst">File</TableCell>
                        <TableCell className="tableHeadCellSecond">Number of records</TableCell>
                        <TableCell className="tableHeadCellSecond">Processed records</TableCell>
                        <TableCell className="tableHeadCellSecond">Failed record</TableCell>
                        <TableCell className="tableHeadCellSecond">Status</TableCell>
                        <TableCell className="tableHeadCellSecond">Processer</TableCell>
                        <TableCell className="tableHeadCellSecond">Uploaded date</TableCell>
                        <TableCell className="tableHeadCellSecond">Processed date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map(row =>
                        <TableRow>
                          <TableCell align="left">
                            {/* <Link to="#">{row.filename}</Link> */}
                            <Attachment value={row.filename} />
                          </TableCell>
                          <TableCell>
                            {row.numberOfRecords ? row.numberOfRecords : "-"}
                          </TableCell>
                          <TableCell>
                            {row.processedRecords ? row.processedRecords : "-"}
                          </TableCell>
                          <TableCell>
                            {/* <Link to="#"> */}
                            {row.failedRecordFile != null ?
                              <Attachment value={row.failedRecordFile} />
                              : '-'}
                            {/* {row.failedRecordFile} */}
                            {/* </Link> */}
                          </TableCell>
                          <TableCell>
                            {row.uploadStatus ? row.uploadStatus : "-"}
                          </TableCell>
                          <TableCell>
                            {row.processer ? row.processer : "-"}
                          </TableCell>
                          <TableCell>
                            {handelDateTime(row.uploadedDate) ? handelDateTime(row.uploadedDate, false) : "-"}
                          </TableCell>
                          <TableCell>
                            {handelDateTime(row.processedDate) ? handelDateTime(row.processedDate) : '-'}
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </div>
              </Grid>
              <div className={classes.pagination}>
                <span>{totalData != 0 ? Number.isInteger(pageData) !== true ? totalData < 25 * page ? `${page * 25 - 24} - ${totalData} of ${totalData}` : `${page * 25 - 24} - ${25 * page} of ${totalData}` : `${page * 25 - 24} - ${25 * page} of ${totalData}` : null}</span>
                <Pagination count={pageCount} page={page}
                  onChange={handleChange}
                />
              </div>

            </Grid>
            : <Loading />}

        </CustomPapperBlock>
      )} />

    //   </Box>
    // </PapperBlock>
  );
}

export default ObservationBulkupload;
