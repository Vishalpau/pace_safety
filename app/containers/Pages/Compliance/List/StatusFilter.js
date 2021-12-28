import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import preplanning from 'dan-images/preplanning.png';
import progress from 'dan-images/progress.png';
import completed from 'dan-images/completed.png';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
  },
  statusIconBox: {
    position: 'relative',
    textAlign: 'center',
    padding: '11px 0px !important',
    '& img': {
        width: '40px',
    },
    ['@media (max-width:800px)']: { 
      padding: '0px 0px 24px 0px !important',
    },
    ['@media (max-width:480px)']: { 
      padding: '12px 0px 24px 16px !important',
      textAlign: 'left',
    },
  },
  statusHover: {
   '& img:hover': {
     borderRadius: '50%',
     boxShadow: '0px 0px 2px 2px #f47607',
   },
  },
  pLtenPRten: {margin: '0px 5px 0px 5px'},
}));

export default function StatusFilter() {
    const classes = useStyles();
    const [anchorGrow, setAnchorGrow] = React.useState(null);
    const [status, setStatus] = React.useState("");

    const handleClick = (event, type) => {
        console.log(event);
        setAnchorGrow({ [type]: event.currentTarget });
        console.log(anchorGrow);

    };

    const handleClose = type => {
        console.log(anchorGrow);
        setAnchorGrow(null);

    };

    const handleToggle = type => {
        setAnchorGrow({ [type]: !this.state[type] });
    };

    return (
        <>
        <div className={classes.statusIconBox}>
            <span className={classes.statusHover}>
                <img src={preplanning} onClick={() => setStatus("Draft")} />
                {/* <img src={progress} className={classes.pLtenPRten} /> */}
                <img src={completed} onClick={() => setStatus("Closed")}/>
                {/* <IconButton
                    aria-owns={anchorGrow ? 'grow-menu' : null}
                    aria-haspopup="true"
                    onClick={(e) => handleClick(e, 'anchorGrow')}
                >
                    <MoreVertIcon />
                </IconButton> */}
            </span>

            <div className="statusDropdownIcon">
                <Menu
                id="grow-menu"
                anchorEl={anchorGrow}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                open={Boolean(anchorGrow)}
                onClose={() => handleClose('anchorGrow')}
                TransitionComponent={Grow}
                >
                <MenuItem onClick={() => handleClose('anchorGrow')}><img src={preplanning} /></MenuItem>
                <MenuItem onClick={() => handleClose('anchorGrow')}><img src={progress} /></MenuItem>
                <MenuItem onClick={() => handleClose('anchorGrow')}><img src={completed} /></MenuItem>
                <MenuItem onClick={() => handleClose('anchorGrow')}><img src={preplanning} /></MenuItem>
                <MenuItem onClick={() => handleClose('anchorGrow')}><img src={progress} /></MenuItem>
                <MenuItem onClick={() => handleClose('anchorGrow')}><img src={completed} /></MenuItem>
                </Menu>
            </div>
        </div>
        </>
    );
}