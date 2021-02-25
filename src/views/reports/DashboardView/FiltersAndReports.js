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
  formControlSelect: {
    marginTop: 6
  },
  formControlButton: {
    marginTop: 48
  }
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

          componentState.lastApiResponse = programResponse;
          componentState.programs = programResponse.data;
          update(FiltersAndReportsState.clone(componentState));
        });
      });
    }, []);

    useEffect(() => {
      console.log("loading assessment tools");
      if (!FiltersAndReportsState.getCurrentProgram(componentState)) return;

      DataReadService.getAssessmentTools(componentState.state.id, FiltersAndReportsState.getCurrentProgramId(componentState)).then((atResponse) => {
        if (ApiResponse.hasError(atResponse))
          return updateStateInError(atResponse);

        componentState.assessmentTools = atResponse.data;
        update(FiltersAndReportsState.clone(componentState));
      });
    }, [FiltersAndReportsState.getUserSelectedProgramId(componentState), metabaseResource.id]);

    useEffect(() => {
      console.log("loading assessment types");
      if (!FiltersAndReportsState.getCurrentProgram(componentState)) return;

      DataReadService.getAssessmentTypes(FiltersAndReportsState.getCurrentProgramId(componentState)).then((aTypeResponse) => {
        if (ApiResponse.hasError(aTypeResponse))
          return updateStateInError(aTypeResponse);

        componentState.assessmentTypes = aTypeResponse.data;
        update(FiltersAndReportsState.clone(componentState));
      });
    }, [FiltersAndReportsState.getUserSelectedProgramId(componentState), metabaseResource.id]);

    useEffect(() => {
      let params = MetabaseResources.createFilterObject(metabaseResource, componentState.state, FiltersAndReportsState.getCurrentProgram(componentState), FiltersAndReportsState.getCurrentAssessmentTool(componentState), FiltersAndReportsState.getCurrentAssessmentType(componentState));
      if (_.isNil(params)) return;

      MetabaseDashboardService.getResourceIframeUrl(params, metabaseResource, searchString).then((metabaseUrlResponse) => {
        if (ApiResponse.hasError(metabaseUrlResponse))
          return updateStateInError(metabaseUrlResponse);

        componentState.metabaseUrl = metabaseUrlResponse.data;
        componentState.lastApiResponse = metabaseUrlResponse;
        update(FiltersAndReportsState.clone(componentState));
      });
    }, [FiltersAndReportsState.getUserSelectedAssessmentToolId(componentState), FiltersAndReportsState.getUserSelectedAssessmentTypeId(componentState), FiltersAndReportsState.getUserSelectedProgramId(componentState), metabaseResource.id, MetabaseResources.isAllLoaded(metabaseResource, componentState.programs, componentState.assessmentTools, componentState.assessmentTypes)]);

    let view = ApiCallView.handleApiCall(componentState.lastApiResponse);
    if (!_.isNil(view)) return view;

    return <>
      <Grid container spacing={3}>
        <Grid item>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="program"><b>PROGRAM</b></InputLabel>
            <Select
              labelId="program-select"
              id="program-select"
              value={FiltersAndReportsState.getCurrentProgramId(componentState)}
              onChange={handleChangeInProgram}
              label="Program"
              className={classes.formControlSelect}
            >{componentState.programs.map((program) => <MenuItem key={`program-${program.id}`} value={program.id}>{program.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        {metabaseResource.hasAssessmentTool && componentState.assessmentTools &&
        <Grid item>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="assessmentTool"><b>ASSESSMENT TOOL</b></InputLabel>
            <Select
              labelId="assessment-tool-select"
              id="assessment-tool-select"
              value={FiltersAndReportsState.getCurrentAssessmentToolId(componentState)}
              onChange={handleChangeInAssessmentTool}
              label="Assessment Tool"
              className={classes.formControlSelect}
            >{componentState.assessmentTools.map((at) => <MenuItem key={`at-${at.id}`} value={at.id}>{at.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>}
        {metabaseResource.hasAssessmentType && componentState.assessmentTypes &&
        <Grid item>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="assessmentType"><b>ASSESSMENT TYPE</b></InputLabel>
            <Select
              labelId="assessment-type-select"
              id="assessment-type-select"
              value={FiltersAndReportsState.getCurrentAssessmentTypeId(componentState)}
              onChange={handleChangeInAssessmentType}
              label="Assessment Tool"
              className={classes.formControlSelect}
            >{componentState.assessmentTypes.map((aType) => <MenuItem key={`aType-${aType.id}`} value={aType.id}>{aType.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>}
      </Grid>
      {(!_.isNil(componentState.metabaseUrl)) ?
        <iframe src={componentState.metabaseUrl} title='Metabase' style={{border: 'none', width: '100%', height: metabaseResource.height}} onLoad={() => {
        }}/>
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
