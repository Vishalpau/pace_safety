import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { connect } from "react-redux";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";

import api from "../../../utils/axios";



function BarSimple(props) {

  const [tagData, setTagData] = useState([])
  const [loading, setLoading] = useState(false)
  const [charData, setCharData] = useState([])
  const [secondCharData, setSecondChartData] = useState([])
  const [chartSize, setChartSize] = useState({ width: "100%", height: "50px" })
  // const [projectStruct, setProjectStruct] = useState("")

  const handelProjectStruct = () => {
    const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const fkProjectId = props.projectName.projectId || JSON.parse(localStorage.getItem("projectName"))
      .projectName.projectId;
    const selectBreakdown = props.projectName.breakDown.length > 0 ? props.projectName.breakDown
      : JSON.parse(localStorage.getItem("selectBreakDown")) !== null
        ? JSON.parse(localStorage.getItem("selectBreakDown"))
        : null;
    let struct = "";

    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    // setProjectStruct(fkProjectStructureIds)
    return fkProjectStructureIds
  }

  const fetchTags = async () => {
    let allTags = []
    let companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    let projectId = JSON.parse(localStorage.getItem("projectName")).projectName
      .projectId;
    const res = await api.get(
      `/api/v1/tags/?companyId=${companyId}&projectId=${projectId}`
    );
    const result = res.data.data.results.results;
    let temp = [];
    result.map((value) => {
      if (value.status === "Active") {
        temp.push(value);
      }
    });
    let sorting = temp.sort((a, b) => a.id - b.id);

    sorting.map((value) => {
      allTags.push(value.tagName)
    })
    await setTagData(allTags);
    await allTyepCount(allTags)
  };

  const allTyepCount = async (allTags) => {
    let projectStruct = handelProjectStruct()
    let tagsToType = {}
    let allRisks = []
    allTags.map((value) => {
      tagsToType[value] = { "Risk": 0, "Comments": 0, "Positive Behavious": 0 }
    })

    for (let key in allTags) {
      let res = await api.get(`/api/v1/observations/analyticdetails/?company=1&project=1&projectStructure=${projectStruct}&createdDate[Start]=2021-09-01&createdDate[End]=2021-10-29&category=${allTags[key]}`)
      let results = res.data.data.results.results
      results.length > 0 && results.map((value) => {
        if (value["observationType"] == "Risk") {
          value["category"] = allTags[key]
          allRisks.push(value)
          tagsToType[allTags[key]]["Risk"] += 1
        } else if (value["observationType"] == "Comments") {
          tagsToType[allTags[key]]["Comments"] += 1
        } else if (value["observationType"] == "Positive behavior") {
          tagsToType[allTags[key]]["Positive Behavious"] += 1
        }
      })
    }
    graphSeries(tagsToType)
    secondGrpahSeries(allRisks, allTags)
  }



  const graphSeries = (tagsToType) => {
    let datSeries = [{
      name: 'Risk',
      data: []
    }, {
      name: 'Comments',
      data: []
    }, {
      name: 'Positive Behavious',
      data: []
    }]
    Object.entries(tagsToType).map(([key, value]) => {
      Object.entries(value).map(([keys, values]) => {

        if (keys == "Risk") {
          datSeries[0]["data"].push(values)
        } else if (keys == "Comments") {
          datSeries[1]["data"].push(values)
        } else if (keys == "Positive Behavious") {
          datSeries[2]["data"].push(values)
        }
      })
    })
    setCharData(datSeries)
  }

  const secondGrpahSeries = (allRisks, allTags) => {
    let typeToAddressed = {}

    let dataSeries = [{
      name: 'Risk',
      data: []
    }, {
      name: 'Addressed',
      data: []
    }, {
      name: 'Is corrective actions taken',
      data: []
    }]

    allTags.map((value) => {
      typeToAddressed[value] = []
    })

    allRisks.map((value) => {
      if (value["category"] in typeToAddressed) {
        typeToAddressed[value["category"]].push(value)
      }
    })
    Object.entries(typeToAddressed).map(([key, value]) => {
      if (value.length == 0) {
        dataSeries[0]["data"].push(0)
        dataSeries[1]["data"].push(0)
        dataSeries[2]["data"].push(0)
      } else {
        dataSeries[0]["data"].push(value.length)
        let isAddressed = 0
        let isActionTaken = 0
        value.map((riskValue) => {
          if (riskValue["isSituationAddressed"] == "Yes") {
            isAddressed += 1
          }
          if (riskValue["isCorrectiveActionTaken"] == "Yes") {
            isActionTaken += 1
          }
        })
        dataSeries[1]["data"].push(isAddressed)
        dataSeries[2]["data"].push(isActionTaken)
      }
    })
    setSecondChartData(dataSeries)
  }

  const mainChart = {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    xAxis: {
      min: 0,
      max: tagData.length,
      categories: tagData,
      labels: {
        rotation: 65
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
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
    credits: {
      enabled: false
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
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
    series: charData,
  }

  const secondChart = {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: tagData,
      crosshair: true,
      labels: {
        rotation: 65
      },
      min: 0,
      max: tagData.length,
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: secondCharData,
  }

  const handelChartSize = (sizeChangeType) => {
    if (sizeChangeType === "small") {
      setChartSize({ width: "50%", height: "50px" })
    } else if (sizeChangeType === "large") {
      setChartSize({ width: "75%", height: "75px" })
    } else if (sizeChangeType === "auto") {
      setChartSize({ width: "100%", height: "85px" })
    }
  }

  const callBack = async () => {
    await setLoading(true)
    await fetchTags()
    await handelProjectStruct()
    await setLoading(false)
  }

  useEffect(() => {
    callBack()
  }, [])

  return (
    <PapperBlock >
      {loading == false ?
        <Grid container spacing={3}>
          <Grid item md={12} >
            <HighchartsReact highcharts={Highcharts} options={mainChart} />
            <button id="small" onClick={() => handelChartSize("small")}>Small</button>
            <button id="large" onClick={() => handelChartSize("large")}>Large</button>
            <button id="auto" onClick={() => handelChartSize("auto")}>Auto</button>
          </Grid>
          <Grid item md={12} >
            <HighchartsReact highcharts={Highcharts} options={secondChart} />
          </Grid>
        </Grid>
        :
        "Loading..."}
    </PapperBlock>
  );
}

const mapStateToProps = state => {
  return {
    projectName: state.getIn(["InitialDetailsReducer"]),
    todoIncomplete: state

  }
}

export default connect(mapStateToProps, null)(BarSimple);