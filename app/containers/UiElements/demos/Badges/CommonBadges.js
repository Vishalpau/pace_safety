import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import pink from '@material-ui/core/colors/pink';
import teal from '@material-ui/core/colors/teal';

const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
    display: 'block'
  },
  alone: {
    position: 'relative',
    margin: 20
  },
  field: {
    margin: '10px',
    position: 'relative'
  },
  cssRoot: {
    '& span': {
      backgroundColor: pink[700],
      color: theme.palette.getContrastText(pink[500]),
    },
  },
});

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: pink
  },
});

function CommonBadges(props) {
  const { classes } = props;
  return (
    <Fragment>
      <Grid
        container
        alignItems="flex-start"
        justify="flex-start"
        direction="row"
        spacing={2}
      >
        <Grid
          item
          md={6}
        >
          <Typography variant="button" className={classes.divider}>Button Badges</Typography>
          <Grid
            container
            alignItems="flex-start"
            justify="flex-start"
            direction="row"
            spacing={3}
          >
            <div className={classes.field}>
              <Badge color="primary" badgeContent={4} className={classes.margin}>
                <Button variant="contained">Button</Button>
              </Badge>
            </div>
            <div className={classes.field}>
              <Badge color="secondary" badgeContent={4} className={classes.margin}>
                <Button variant="contained" color="primary">Button</Button>
              </Badge>
            </div>
            <div className={classes.field}>
              <Badge color="primary" badgeContent={4} className={classes.margin}>
                <Button variant="contained" color="secondary">Button</Button>
              </Badge>
            </div>
            <div className={classes.field}>
              <MuiThemeProvider theme={theme}>
                <Badge color="primary" badgeContent={4} className={classes.margin}>
                  <Button variant="contained" color="secondary">Button</Button>
                </Badge>
              </MuiThemeProvider>
            </div>
          </Grid>
        </Grid>
        <Grid
          item
          md={6}
        >
          <Typography variant="button" className={classes.divider}>Text Badges</Typography>
          <Grid
            container
            alignItems="flex-start"
            justify="flex-start"
            direction="row"
            spacing={5}
          >
            <div className={classes.field}>
              <Badge color="primary" badgeContent={4} className={classes.margin}>
                <Typography className={classes.padding}>Badge Text</Typography>
              </Badge>
            </div>
            <div className={classes.field}>
              <Badge color="secondary" badgeContent={4} className={classes.margin}>
                <Typography variant="button" className={classes.padding}>Badges Bold Text</Typography>
              </Badge>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}

CommonBadges.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommonBadges);
