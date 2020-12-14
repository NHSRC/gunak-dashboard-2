import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import DataReadService from "../../../service/DataReadService";
import FiltersAndReportsState from "../FiltersAndReportsState";
import ApiResponse from "../../../model/ApiResponse";
import MetabaseDashboardService from "../../../service/MetabaseDashboardService";
import {useLocation} from "react-router";
import {Typography} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import ApiCallView from "../../ApiCallView";
import _ from "lodash";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const FiltersAndReports = ({metabaseResource, ...rest}) => {
  const classes = useStyles();

  const handleChange = (event) => {
  };

  const updateStateInError = function (apiResponse) {
    componentState.lastApiResponse = apiResponse;
    update(FiltersAndReportsState.clone(componentState));
  };

  let searchString = useLocation().search.substring(1);
  const [componentState, update] = useState(FiltersAndReportsState.newInstance(searchString));

  useEffect(() => {
    DataReadService.getState().then((stateResponse) => {
      if (ApiResponse.hasError(stateResponse))
        return updateStateInError(stateResponse);

      componentState.state = stateResponse.data;
      DataReadService.getPrograms().then((programResponse) => {
        if (ApiResponse.hasError(programResponse))
          return updateStateInError(programResponse);

        componentState.programs = programResponse.data;

        DataReadService.getAssessmentTools(componentState.state.id).then((atResponse) => {
          if (ApiResponse.hasError(atResponse))
            return updateStateInError(atResponse);

          componentState.assessmentTools = atResponse.data;
          MetabaseDashboardService.getResourceIframeUrl(componentState.state, componentState.resource, searchString).then((metabaseUrlResponse) => {
            if (ApiResponse.hasError(metabaseUrlResponse))
              return updateStateInError(metabaseUrlResponse);

            componentState.metabaseUrl = metabaseUrlResponse.data;
            componentState.lastApiResponse = metabaseUrlResponse;
            update(FiltersAndReportsState.clone(componentState));
          });
        });
      });
    });
  }, []);

  console.log(componentState);
  let view = ApiCallView.handleApiCall(componentState.lastApiResponse);
  if (!_.isNil(view)) return view;

  return <>
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="program">Program</InputLabel>
      <Select
        labelId="program-select"
        id="program-select"
        value={10}
        onChange={handleChange}
        label="Program"
      >{componentState.programs.map((program) => <MenuItem value={program.id}>{program.name}</MenuItem>)}
      </Select>
    </FormControl>
    {componentState.metabaseUrl ?
      <iframe src={componentState.metabaseUrl} title='Metabase' style={{border: 'none', width: '100%', height: '1000px'}}/>
      : <div><Typography
        color="textPrimary"
        gutterBottom
        variant="h2"
      >Loading data....</Typography><CircularProgress/></div>}
  </>
};

FiltersAndReports.propTypes = {
  metabaseResource: PropTypes.object.isRequired
};

export default FiltersAndReports;
