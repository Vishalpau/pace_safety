import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import brand from 'dan-api/dummy/brand';
import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/Print';
import ReactToPrint from 'react-to-print';
import { PapperBlock } from 'dan-components';
import { useHistory, useParams } from "react-router";
//import Print from '@material-ui/icons/Print';
import PrintSection from '../../components/PrintSection/PrintSection';
import PrintObservation from '../../components/PrintSection/PrintObservation';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  btnArea: {
    textAlign: 'center'
  },
  wrapper: {
    width: '100%',
    overflow: 'auto'
  },
  printPageSection: {
    padding: '16px 0px !important',
  },
});

function Prints(props) {
  const { classes } = props;
  const componentRef = useRef(null);
  const history = useHistory();
  const title = brand.name + ' - Dynamic Invoice';
  const description = brand.desc;
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock className={classes.printPageSection} title="Observation Print" icon="ion-md-print">
        <div className={classes.btnArea}>
          <ReactToPrint
            trigger={() => (
              <Button className={classes.button} size="small" variant="contained" color="secondary">
                <PrintIcon className={classes.extendedIcon} />
                Print this out!
              </Button>
            )}
            content={() => componentRef.current}
          />
          <Button className={classes.button} size="small" variant="contained" color="secondary" onClick={history.goBack}>
            <CancelPresentationIcon className={classes.extendedIcon} />
            Cancel
          </Button>
        </div>
        <section className={classes.wrapper}>
          {/* <PrintSection ref={(el) => { componentRef.current = el; }} /> */}
          <PrintObservation ref={(el) => { componentRef.current = el; }} />
        </section>
        <div className={classes.btnArea}>
          <ReactToPrint
            trigger={() => (
              <Button className={classes.button} size="small" variant="contained" color="secondary">
                <PrintIcon className={classes.extendedIcon} />
                Print this out!
              </Button>
            )}
            content={() => componentRef.current}
          />
          <Button className={classes.button} size="small" variant="contained" color="secondary" onClick={history.goBack}>
            <CancelPresentationIcon className={classes.extendedIcon} />
            Cancel
          </Button>
        </div>
      </PapperBlock>
    </div>
  );
}

Prints.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Prints);
