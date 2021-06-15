import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import api from '../../../utils/axios'
import { object } from 'prop-types';
import Grid from '@material-ui/core/Grid';

function BlankPage() {
  // const title = brand.name + ' - Blank Page';
  // const descriptionp = brand.desc;
  const [incidents,setIncidents] = useState([])
 
  useEffect(async () => {
    const allIncidents = await api.get("api/v1/incidents/");
    await setIncidents(allIncidents.data.data.results);
  }, []);


  return (
    <div>
      {console.log(incidents)}
      {/* <Helmet>
        <title>Incidents</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet> */}
      
      {Object.entries(incidents).map((item) => (
        <PapperBlock  >
          <Grid container spacing={3}>  
              <Grid item lg={3}>
                Incident Number : 
                  {item[1]["incidentNumber"]}
              </Grid>
              <Grid item lg={3}>
              Inciden on : 
                  {item[1]["incidentOccuredOn"]}
              </Grid>
              <Grid item lg={3}>
              Reported on :
                  {item[1]["incidentReportedOn"]}
              </Grid>
          </Grid>
          <Grid container spacing={3}>  
              <Grid item lg={3}>
              Reported by :
                  {item[1]["incidentReportedByName"]}
              </Grid>
              <Grid item lg={3}>
              Incident type :
                  {/* {item[1]["incidentReportedByName"]} */}
                  Not found
              </Grid>
              <Grid item lg={3}>
              Incident title :
                  {item[1]["incidentTitle"]}
              </Grid>
          </Grid>

          <Grid container spacing={3}>  
              <Grid item lg={3}>
              Incident description :
                  {item[1]["incidentDetails"]}
              </Grid>
              <Grid item lg={3}>
              Incident location :
                  {item[1]["incidentLocation"]}
              </Grid>
              <Grid item lg={3}>
              Reviewed by :
                  {item[1]["reviewedBy"]}
              </Grid>
          </Grid>

          <Grid container spacing={3}>  
              <Grid item lg={3}>
              Reviewd on :
                  {item[1]["reviewDate"]}
              </Grid>
              <Grid item lg={3}>
              Closed by :
                  {item[1]["closedBy"]}
              </Grid>
              <Grid item lg={3}>
              Closed date :
                  {item[1]["closeDate"]}
              </Grid>
          </Grid>
          
        </PapperBlock>)
        
                )}
      
    </div>
  );
}

export default BlankPage;
