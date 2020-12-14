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
import {Grid, Typography} from "@material-ui/core";
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


const FiltersAndReports = ({metabaseResource, assessmentToolEnabled, ...rest}) => {
  const classes = useStyles();

  const handleChangeInProgram = (event) => {
    FiltersAndReportsState.setProgram(componentState, event.target.value);
    update(FiltersAndReportsState.clone(componentState));
  };

  const handleChangeInAssessmentTool = (event) => {
    FiltersAndReportsState.setAssessmentTool(componentState, event.target.value);
    update(FiltersAndReportsState.clone(componentState));
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
        componentState.selectedProgram = componentState.programs[0];

        DataReadService.getAssessmentTools(componentState.state.id, componentState.selectedProgram.id).then((atResponse) => {
          if (ApiResponse.hasError(atResponse))
            return updateStateInError(atResponse);

          componentState.assessmentTools = atResponse.data;
          componentState.selectedAssessmentTool = componentState.assessmentTools[0];
          let params = {"state": componentState.state.name, "program": componentState.selectedProgram.name};
          MetabaseDashboardService.getResourceIframeUrl(params, componentState.resource, searchString).then((metabaseUrlResponse) => {
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

  return <><Grid container spacing={3}>
    <Grid item xs={6} sm={3}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="program">Program</InputLabel>
        <Select
          labelId="program-select"
          id="program-select"
          value={componentState.selectedProgram.id}
          onChange={handleChangeInProgram}
          label="Program"
        >{componentState.programs.map((program) => <MenuItem key={`program-${program.id}`} value={program.id}>{program.name}</MenuItem>)}
        </Select>
      </FormControl>
    </Grid>
    {assessmentToolEnabled &&
    <Grid item xs={6} sm={3}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="assessmentTool">Assessment Tool</InputLabel>
        <Select
          labelId="assessment-tool-select"
          id="assessment-tool-select"
          value={componentState.selectedAssessmentTool.id}
          onChange={handleChangeInAssessmentTool}
          label="Assessment Tool"
        >{componentState.assessmentTools.map((at) => <MenuItem key={`at-${at.id}`} value={at.id}>{at.name}</MenuItem>)}
        </Select>
      </FormControl>
    </Grid>}
  </Grid>
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
  metabaseResource: PropTypes.object.isRequired,
  assessmentToolEnabled: PropTypes.bool.isRequired
};

export default FiltersAndReports;
