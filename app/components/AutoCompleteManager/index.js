import React from 'react';
import Autocomplete, {
    createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: '.5rem 0',
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    fullWidth: {
      width: '100%',
      margin: '.5rem 0',
    },
    spacer: {
      padding: '.75rem 0',
    },
    spacerRight: {
      marginRight: '.75rem',
    },
    mToptewnty: {
      marginTop: '.50rem',
    },
    addButton: {
      '& .MuiButton-root': {
        marginTop: '9px',
        backgroundColor: '#ffffff',
        color: '#06425c',
        border: '1px solid #06425c',
        borderRadius: '4px',
        padding: '11px 12px',
      },
    },
  }));

/**
 * autoCompleteManager
 * auto complete type & search field
 * @param {*} param0 
 * @param setValue function
 * @param data field value
 * @param col column value
 * @param value pre-select value on the field
 * @param label label place holder
 * @since version v2.0.0
 * @author rahul <rahuln@teknobuilt.com>
 * @returns data 
 */


const autoCompleteManager = ({ data, setValue, col,  value='', label='' }) => {
const classes = useStyles();
const [innervalue, setinnerValue] = React.useState(value)
    return data ? (<Autocomplete
        value={innervalue}
        onChange={(event, newValue) => {
            setinnerValue(newValue)
            setValue(col, newValue)
        }}
        className={classes.mT30}
        id="free-solo-with-text-demo"
        options={data}
        getOptionLabel={(option) => option.label}
        freeSolo
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderInput={(params) => (
            <TextField
                {...params}
                label={label=='' ? "Category*": label}
                className={classes.fullWidth}
                variant="outlined"
            />
        )}
    />):''
}
export default autoCompleteManager;