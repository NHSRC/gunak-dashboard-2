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
  formControlSelect: {
    marginTop: 6
  },
  formControlButton: {
    marginTop: 48
  }
}));

const FiltersAndReports = ({metabaseResource, ...rest}) => {
    const classes = useStyles();

    const handleChange = (filter, event) => {
      FiltersAndReportsState.setValue(componentState, filter, parseInt(event.target.value));
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

        let independentFilters = metabaseResource.getIndependentFilters();
        independentFilters.forEach((x) => {
          DataReadService.getEntities(x, componentState.filterSelectedValueMap).then((response) => {
            if (ApiResponse.hasError(response))
              return updateStateInError(response);

            componentState.lastApiResponse = response;
            componentState.filterValuesMap[x.param] = response.data;
            componentState.filterSelectedValueMap[x.param] = response.data[0];
            update(FiltersAndReportsState.clone(componentState));
          });
        });
      });
    }, []);

    useEffect(() => {
      metabaseResource.getDependentFilters().forEach((x) => {
        console.log("loading filter values for", x.resourceName);
        if (!x.isParentValueSelected(componentState.filterSelectedValueMap)) return;

        DataReadService.getEntities(x, componentState.filterSelectedValueMap).then((response) => {
          if (ApiResponse.hasError(response))
            return updateStateInError(response);

          componentState.lastApiResponse = response;
          componentState.filterValuesMap[x.param] = response.data;
          update(FiltersAndReportsState.clone(componentState));
        });
      });
    }, [metabaseResource.id]);

    useEffect(() => {
      let params = metabaseResource.createFilterObject(componentState.state, componentState.filterSelectedValueMap);
      if (_.isNil(params)) return;

      MetabaseDashboardService.getResourceIframeUrl(params, metabaseResource, searchString).then((metabaseUrlResponse) => {
        if (ApiResponse.hasError(metabaseUrlResponse))
          return updateStateInError(metabaseUrlResponse);

        componentState.metabaseUrl = metabaseUrlResponse.data;
        componentState.lastApiResponse = metabaseUrlResponse;
        update(FiltersAndReportsState.clone(componentState));
      });
    }, [metabaseResource.id, FiltersAndReportsState.getSelectedFilterEntityIds(componentState)]);

    let view = ApiCallView.handleApiCall(componentState.lastApiResponse);
    if (!_.isNil(view)) return view;

    return <>
      <Grid container spacing={3}>
        {metabaseResource.filters.map((x) => {
          return <Grid item key={x.param}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id={x.param}><b>{x.displayName}</b></InputLabel>
                <Select
                  labelId={`${x.param}-select`}
                  id={`${x.param}-select`}
                  value={FiltersAndReportsState.getSelectedId(componentState, x)}
                  onChange={(event) => handleChange(x, event)}
                  label={x.displayName}
                  className={classes.formControlSelect}
                >{FiltersAndReportsState.getValues(componentState, x).map((y) => <MenuItem key={`program-${y.id}`} value={y.id}>{y.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
        })}
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
