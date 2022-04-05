import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import CloseIcon from "@material-ui/icons/Close";
//import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
import controlTowerIcon from 'dan-images/controlTowerIcon.png';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import styles from "../../../components/Header/header-jss";
import Loader from "../Loader";
import api from "../../../utils/axios";



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  borderTop: {
    marginTop: '5px',
    paddingBottom: '10px',
    '& .MuiTypography-h5': {
      fontSize: '1.5rem !important',
      fontFamily: 'Xolonium',
      fontWeight: '400',
      lineHeight: '1.8',
      color: '#23343e',
    },
    textCenter: {
      textAlign: 'right',
      verticalAlign: 'middle',
      margin: '20px 16px 12px 16px!important',
      float: 'right',
    },
  },
  pLFiveHt40: {
    ['@media (max-width:800px)']: {
      paddingTop: '0px !important',
      paddingBottom: '0px !important',
    },
  },
  attachImg: {
    float: 'left',
    paddingRight: '10px',
  },



  formControl: {
    margin: theme.spacing(1),
    width: 300
  },
  indeterminateColor: {
    color: "#f50057"
  },
  selectAllText: {
    fontWeight: 500
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }
  }

}));

const ControlTowerIcare = () => {

  const [projectOpen, setProjectOpen] = React.useState(false);
  const [config, setConfig] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);  

  const handleProjectOpen = () => {
    setProjectOpen(true);
  };

  const handleProjectClose = () => {
    setProjectOpen(false);
  };

  const load = async () => {
    const comp_id = JSON.parse(localStorage.getItem('company')).fkCompanyId
    const project_id = JSON.parse(localStorage.getItem('projectName')).projectName.projectId
    const res = await api.get(
      `/api/v1/controltowerbi/?company=${comp_id}&project=${project_id}&portfolio=HSE`
    );
    setConfig(res.data.data.results)
    setIsLoading(false)
  }

  useEffect(() => {
    load()
  }, []);

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.projectCloseButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const [openRevision, setOpenRevision] = React.useState(false);

  const handleClickOpenRevision = (scrollType) => () => {
    setOpenRevision(true);
    setScroll(scrollType);
  };
  const handleCloseRevision = () => {
    setOpenRevision(false);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();



  //Check list filter

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    },
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center"
    },
    variant: "menu"
  };

  const categoryOptions = [
    "Barricades",
    "Body Positioning",
    "Crane & Rigging",
    "Environmental",
    "Equipment use",
    "General safety",
    "Health / Hygiene",
    "Housekeeping",
    "LOTO",
    "PPE",
    "Quality",
    "Security",
    "Vehicle use",
    "Walking / Working surfaces",
    "Work Authorization",
    "Working at heights",
  ];

  const typOptions = [
    "Risk",
    "Comment",
    "Positive behaviour"
  ];

  const classifiOptions = [
    "Stop Work",
    "Near Miss",
    "Recognition",
    "Escalation"
  ];

  const compOptions = [
    "CCZJV",
    "BOMAC",
    "CORE MEDICAL",
    "LASCO",
    "LATTIMORE",
    "ALFRED MILLER",
    "CONSTRUCTION",
    "EE REED",
    "LRC",
    "GOLDEN PASS"
  ];

  const [selected, setSelected] = useState([]);
  const [catrySelected, setCatrySelected] = useState([]);
  const [classifSelected, setClassifSelected] = useState([]);
  const [compSelected, setCompSelected] = useState([]);

  const isAllSelected =
    typOptions.length > 0 && selected.length === typOptions.length;
  categoryOptions.length > 0 && catrySelected.length === categoryOptions.length;
  classifiOptions.length > 0 && classifSelected.length === classifiOptions.length;
  compOptions.length > 0 && compSelected.length === compOptions.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === typOptions.length ? [] : typOptions);
      return;
    }
    setSelected(value);
  };
  const handleChangeCategory = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setCatrySelected(catrySelected.length === categoryOptions.length ? [] : categoryOptions);
      return;
    }
    setCatrySelected(value);
  };

  const handleChangeClassifi = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setClassifSelected(classifSelected.length === classifiOptions.length ? [] : classifiOptions);
      return;
    }
    setClassifSelected(value);
  };

  const handleChangeComp = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setCompSelected(compSelected.length === compOptions.length ? [] : compOptions);
      return;
    }
    setCompSelected(value);
  };

  //chart Object 

  const typeChart = {
    chart: {
      type: 'column'
    },
    // title: {
    //   text: 'Combination chart'
    // },
    xAxis: {
      categories: ['Jan 2020', 'Feb 2020', 'March 2020', 'Jan 2021', 'Feb 2021']
    },
    labels: {
      items: [{
        html: 'Total Comments',
        style: {
          left: '50px',
          top: '18px',
          color: ( // theme
            Highcharts.defaultOptions.title.style &&
            Highcharts.defaultOptions.title.style.color
          ) || 'black'
        }
      }]
    },
    colors: [
      '#06425c',
      '#ff8533',
      '#7890A4'
    ],
    series: [{
      type: 'column',
      name: 'Jan',
      data: [3, 2, 1, 3, 4]
    }, {
      type: 'column',
      name: 'Feb',
      data: [2, 3, 5, 7, 6]
    }, {
      type: 'column',
      name: 'March',
      data: [4, 3, 3, 9, 0]
    }, {
      type: 'spline',
      name: 'April',
      data: [3, 2.67, 3, 6.33, 3.33],
      marker: {
        lineWidth: 2,
        lineColor: Highcharts.getOptions().colors[3],
        fillColor: 'white'
      }
    }, {
      type: 'pie',
      name: 'Total consumption',
      data: [{
        name: 'Jan',
        y: 13,
        color: '#06425c',
      }, {
        name: 'Feb',
        y: 23,
        color: '#ff8533',
      }, {
        name: 'March',
        y: 19,
        color: '#7890A4',
      }],
      center: [100, 80],
      size: 100,
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    }]
  }

  const typeChartTow = {
    chart: {
      type: 'column'
    },
    // title: {
    //   text: 'Stacked column chart'
    // },
    xAxis: {
      categories: ['Jan 2020', 'Feb 2020', 'March 2020', 'Jan 2021', 'Feb 2021']
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total Risk'
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: ( // theme
            Highcharts.defaultOptions.title.style &&
            Highcharts.defaultOptions.title.style.color
          ) || 'gray'
        }
      }
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    colors: [
      '#06425c',
      '#ff8533',
      '#7890A4'
    ],
    series: [{
      name: 'Risk',
      data: [5, 3, 4, 7, 2]
    }, {
      name: 'Comment',
      data: [2, 2, 3, 2, 1]
    }, {
      name: 'Positive behaviour',
      data: [3, 4, 4, 2, 5]
    }]
  }

  const trendChart = {
    chart: {
      type: 'column'
    },

    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },

    xAxis: {
      categories: ['Jan 2020', 'Feb 2020', 'Mar 2020'],
      labels: {
        x: -10
      }
    },

    yAxis: {
      allowDecimals: false,
      title: {
        text: '.'
      }
    },
    colors: [
      '#06425c',
      '#ff8533',
      '#7890A4'
    ],

    series: [{
      name: 'Risk',
      data: [1, 4, 3]
    }, {
      name: 'Comment',
      data: [6, 4, 2]
    }, {
      name: 'Positive behaviour',
      data: [8, 4, 3]
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          },
          yAxis: {
            labels: {
              align: 'left',
              x: 0,
              y: -5
            },
            title: {
              text: null
            }
          },
          subtitle: {
            text: null
          },
          credits: {
            enabled: false
          }
        }
      }]
    }
  }

  const pieChart = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    colors: [
      '#06425c',
      '#ff8533',
      '#7890A4'
    ],
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Completed',
        y: 61.41,
        sliced: true,
        selected: true
      }, {
        name: 'Hold',
        y: 11.84
      }, {
        name: 'Slow',
        y: 10.85
      }, {
        name: 'Cancel',
        y: 4.67
      }, {
        name: 'Hold',
        y: 4.18
      }, {
        name: 'Cancel',
        y: 7.05
      }]
    }]
  }

  const areaChart = {
    chart: {
      type: 'area'
    },
    xAxis: {
      allowDecimals: false,
      labels: {
        formatter: function () {
          return this.value;
        }
      },
      accessibility: {
        rangeDescription: 'Range: 1940 to 2017.'
      }
    },
    yAxis: {
      title: {
        text: 'Nuclear weapon states'
      },
      labels: {
        formatter: function () {
          return this.value / 1000 + 'k';
        }
      }
    },
    tooltip: {
      pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
    },
    plotOptions: {
      area: {
        pointStart: 1940,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      }
    },

    colors: [
      '#06425c',
      '#ff8533',
    ],

    series: [{
      name: 'USA',
      data: [
        null, null, null, null, null, 6, 11, 32, 110, 235,
        369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
        20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
        26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
        24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380,
        21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824,
        10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326,
        5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018
      ]
    }, {
      name: 'USSR/Russia',
      data: [null, null, null, null, null, null, null, null, null, null,
        5, 25, 50, 120, 150, 200, 426, 660, 869, 1060,
        1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
        11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935,
        30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000,
        37000, 35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
        21000, 20000, 19000, 18000, 18000, 17000, 16000, 15537, 14162, 12787,
        12600, 11400, 5500, 4512, 4502, 4502, 4500, 4500
      ]
    }]
  }



  // Date rang 
  const [dateRangeOpen, setDateRangeOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState({});

  //const [dateRangeOpen, setDateRangeOpen] = React.useState(true);
  const toggle = () => setDateRangeOpen(!dateRangeOpen);



  return  (
    isLoading ? <Loader /> :
    config.length == 0 ? 'Control Tower is not configured yet.' :
    <>
      <Grid container spacing={1}>
        <Grid item sm={12} xs={12} className={classes.borderTop}>
          <Grid container spacing={1}>
            <Grid item md={5} sm={4} xs={12} className={classes.pLFiveHt40}>
              <img src={controlTowerIcon} className={classes.attachImg} alt="decoration" />
              <Typography variant="h5"> Control Tower</Typography>
            </Grid>
            <Grid item md={7} sm={8} xs={12}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChangeTab}
                  //indicatorColor="primary"
                  textColor="primary"
                  //variant="scrollable"
                  variant="fullWidth"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  {config.map((val, i) =>  <Tab className="customTabLebl" square label={val.contextName} {...a11yProps(i)} />)}
                </Tabs>
              </AppBar>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} sm={12} xs={12} className="marginT10">
          <Paper elevation={1} className="paperSection">
            <Grid container spacing={3}>
              <Grid item md={12} sm={12} xs={12}>
                {config.map((val, i) => 
                  <TabPanel className="tabContentArea" value={value} index={i}>
                    <Grid container spacing={1}>
                      <Grid item md={12} sm={12} xs={12}>
                        <iframe
                          width="1600"
                          height="1000"
                          // src="https://app.powerbi.com/view?r=eyJrIjoiYzRhZTE2NDQtYmEyMS00ZmZmLWExZTctYTYzZjdmOTI3NDU4IiwidCI6Ijc5OTMyYTAzLWYzOTMtNDUwMC05YmUxLTFkNTIwNGZlZGJiZiJ9&pageName=ReportSection2bc500b1b920bdbbdc03"
                          src={val.biToolUrl}
                          frameborder="0"
                          allowFullScreen="true"
                        >
                        </iframe>
                      </Grid>
                      <Grid
                        item
                        md={5}
                        sm={5}
                        xs={5}
                        className="hidLeftBBrand"
                      >
                      </Grid>
                      <Grid
                        item
                        md={5}
                        sm={5}
                        xs={5}
                        className="hidRightBBrand"
                      >
                      </Grid>
                    </Grid>
                  </TabPanel>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(ControlTowerIcare);
// export default ControlTowerIcare;