import Paper from '@material-ui/core/Paper';
import { createTheme, withStyles } from '@material-ui/core/styles';
import ThemePallete from 'dan-api/palette/themePalette';
import { PapperBlock } from 'dan-components';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Bar, BarChart, CartesianAxis, CartesianGrid, Legend, Tooltip, XAxis,
  YAxis
} from 'recharts';
import "../../../styles/custom/customheader.css";
import styles from './demos/fluidChart-jss';
import { data1 } from './demos/sampleData';

const theme = createTheme(ThemePallete.greyTheme);
const color = ({
  primary: theme.palette.primary.main,
  primaryDark: theme.palette.primary.dark,
  secondary: theme.palette.secondary.main,
  secondaryDark: theme.palette.secondary.dark,
});

function BarSimple(props) {
  const { classes } = props;
  return (
    <div className={classes.chartFluid}>
      <PapperBlock whiteBg noMargin title="Trend" icon="ion-ios-analytics-outline" desc="">
        <Paper elevation={3}>
          <BarChart
            width={1200}
            height={450}
            data={data1}
            margin={{
              top: 25,
              right: 30,
              left: 20,
              bottom: 15
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color.primary} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color.primaryDark} stopOpacity={1} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color.secondary} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color.secondaryDark} stopOpacity={1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tickLine={false} />
            <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <CartesianAxis vertical={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="PlannedStartDate" fillOpacity="1" fill="url(#colorUv)" />
            <Bar dataKey="PlannedFinishDate" fillOpacity="0.8" fill="url(#colorPv)" />
          </BarChart>


        </Paper>

      </PapperBlock>
    </div>
  );
}

BarSimple.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BarSimple);
