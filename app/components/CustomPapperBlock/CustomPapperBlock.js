import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import styles from "./CustompapperStyle-jss";

function PapperBlock(props) {
  const {
    classes,
    title,
    desc,
    children,
    whiteBg,
    noMargin,
    colorMode,
    overflowX,
    icon,
    h5,
  } = props;
  return (
    <div>
      <Paper
        className={classNames(
          classes.root,
          noMargin && classes.noMargin,
          colorMode && classes.colorMode
        )}
        elevation={0}
      >
        <div className={classes.descBlock}>
          {icon && (
            <span className={classes.iconTitle}>
              <img src={icon} className={icon} />
            </span>
          )}
          <div className={classes.titleText}>
            {title && (
              <Typography variant="h6" component="h2" className={classes.title}>
                {title}
              </Typography>
            )}
            {desc && (
              <Typography component="p" className={classes.description}>
                {desc}
              </Typography>
            )}
          </div>
        </div>
        <section
          className={classNames(
            classes.content,
            whiteBg && classes.whiteBg,
            overflowX && classes.overflowX
          )}
        >
          {children}
        </section>
      </Paper>
    </div>
  );
}

PapperBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  desc: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
  whiteBg: PropTypes.bool,
  colorMode: PropTypes.bool,
  noMargin: PropTypes.bool,
  overflowX: PropTypes.bool,
};

PapperBlock.defaultProps = {
  whiteBg: false,
  noMargin: false,
  colorMode: false,
  overflowX: false,
};

export default withStyles(styles)(PapperBlock);
