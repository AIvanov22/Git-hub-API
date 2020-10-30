import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    minWidth: '200px',
  },
  errorColor: {
    color: theme.palette.error.main,
  },
}));

export const SelectComponent = ({
  id,
  label,
  values,
  value,
  name,
  onChange,
  loading,
  error,
  helperText
}) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} error={error}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={loading}
      >
        {values.map((val) => (
          <MenuItem key={val.key} value={val.key}>{val.name}</MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}