import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Filters = ({...rest}) => {
  const classes = useStyles();

  const handleChange = (event) => {
  };

  return <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel id="program">Program</InputLabel>
    <Select
      labelId="program-select"
      id="program-select"
      value={10}
      onChange={handleChange}
      label="Age"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  </FormControl>
};

Filters.propTypes = {
};

export default Filters;
