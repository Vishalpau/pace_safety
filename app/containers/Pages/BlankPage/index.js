import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import api from '../../../utils/axios'
import { object } from 'prop-types';

function BlankPage() {
  const title = brand.name + ' - Blank Page';
  const description = brand.desc;
  const [incidents,setIncidents] = useState([])
 
  useEffect(async () => {
    const allIncidents = await api.get("api/v1/incidents/");
    await setIncidents(allIncidents.data.data.results);
  }, []);


  return (
    <div>
      {console.log(incidents)}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock title="Blank Page" desc="Some text description">
      {Object.entries(incidents).map((item) => (
                  <p>{console.log(item)}
                    item</p>)
                )}
      </PapperBlock>
    </div>
  );
}

export default BlankPage;
