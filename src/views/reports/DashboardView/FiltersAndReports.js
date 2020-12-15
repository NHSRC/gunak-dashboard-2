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
import MetabaseResources from "../MetabaseResources";

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
    // let effectiveResource = _.isEmpty(searchString) ? MetabaseResources.Main : MetabaseResources.AssessmentList;

    const handleChangeInProgram = (event) => {
      FiltersAndReportsState.setProgram(componentState, parseInt(event.target.value));
      update(FiltersAndReportsState.clone(componentState));
    };

    const handleChangeInAssessmentTool = (event) => {
      FiltersAndReportsState.setAssessmentTool(componentState, parseInt(event.target.value));
      update(FiltersAndReportsState.clone(componentState));
    };

    const handleChangeInAssessmentType = (event) => {
      FiltersAndReportsState.setAssessmentType(componentState, parseInt(event.target.value));
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
          update(FiltersAndReportsState.clone(componentState));
        });
      });
    }, []);

    useEffect(() => {
      if (componentState.selectedProgram.id === 0) return;

      DataReadService.getAssessmentTools(componentState.state.id, componentState.selectedProgram.id).then((atResponse) => {
        if (ApiResponse.hasError(atResponse))
          return updateStateInError(atResponse);

        componentState.assessmentTools = atResponse.data;
        componentState.selectedAssessmentTool = componentState.assessmentTools[0];
        update(FiltersAndReportsState.clone(componentState));
      });
    }, [componentState.selectedProgram.id, metabaseResource.id]);

    useEffect(() => {
      DataReadService.getAssessmentTypes(componentState.selectedProgram.id).then((aTypeResponse) => {
        if (ApiResponse.hasError(aTypeResponse))
          return updateStateInError(aTypeResponse);

        componentState.assessmentTypes = aTypeResponse.data;
        componentState.selectedAssessmentType = componentState.assessmentTypes[0];
        update(FiltersAndReportsState.clone(componentState));
      });
    }, [componentState.selectedAssessmentTool ? componentState.selectedAssessmentTool.id : 0,
      componentState.selectedProgram.id, metabaseResource.id]);

    useEffect(() => {
      let params = MetabaseResources.createFilterObject(metabaseResource, componentState.state, componentState.selectedProgram, componentState.selectedAssessmentTool, componentState.selectedAssessmentType);
      if (_.isNil(params)) return;

      MetabaseDashboardService.getResourceIframeUrl(params, metabaseResource, searchString).then((metabaseUrlResponse) => {
        if (ApiResponse.hasError(metabaseUrlResponse))
          return updateStateInError(metabaseUrlResponse);

        componentState.metabaseUrl = metabaseUrlResponse.data;
        componentState.lastApiResponse = metabaseUrlResponse;
        update(FiltersAndReportsState.clone(componentState));
      });
    }, [componentState.selectedAssessmentType ? componentState.selectedAssessmentType.id : 0,
      componentState.selectedAssessmentTool ? componentState.selectedAssessmentTool.id : 0,
      componentState.selectedProgram.id, metabaseResource.id]);

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
      {metabaseResource.hasAssessmentTool && componentState.selectedAssessmentTool &&
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
      {metabaseResource.hasAssessmentType && componentState.selectedAssessmentType &&
      <Grid item xs={6} sm={3}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="assessmentType">Assessment Type</InputLabel>
          <Select
            labelId="assessment-type-select"
            id="assessment-type-select"
            value={componentState.selectedAssessmentType.id}
            onChange={handleChangeInAssessmentType}
            label="Assessment Tool"
          >{componentState.assessmentTypes.map((aType) => <MenuItem key={`aType-${aType.id}`} value={aType.id}>{aType.name}</MenuItem>)}
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
  }
;

FiltersAndReports.propTypes = {
  metabaseResource: PropTypes.object.isRequired
};

export default FiltersAndReports;
