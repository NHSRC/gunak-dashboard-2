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
import _ from "lodash";
import PropTypes from 'prop-types';
import {DashboardFilter} from "../MetabaseResources";
import TextField from '@material-ui/core/TextField';
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
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
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  }
}));

const FiltersAndReports = ({metabaseResource}) => {
    const classes = useStyles();

    const handleChange = (filter, event) => {
      FiltersAndReportsState.setValue(componentState, filter, event.target.value, metabaseResource);
      update(FiltersAndReportsState.clone(componentState));
    };

    let searchString = useLocation().search;
    const [componentState, update] = useState(FiltersAndReportsState.newInstance(searchString));

    const loadMetabaseDashboard = function () {
      console.log("loadMetabaseDashboard");
      let params = metabaseResource.createMetabaseFilterObject(componentState.state, componentState.filterSelectedValueMap, componentState.searchString);
      return MetabaseDashboardService.getIframeResource(params, metabaseResource).then((metabaseUrlResponse) => {
        if (ApiResponse.hasError(metabaseUrlResponse))
          return Promise.reject(`Server returned error with status code: ${metabaseUrlResponse.status}`);

        componentState.metabaseUrl = metabaseUrlResponse.data;
        return Promise.resolve();
      });
    };

    const loadDependentFilters = function () {
      console.log("loadDependentFilters");
      return _.reduce(metabaseResource.getDependentFilters(), (result, filter) => result.then(() => {
        if (!filter.isParentValueSelected(componentState.filterSelectedValueMap)) return Promise.resolve();

        return DataReadService.getEntities(filter, componentState.filterSelectedValueMap, componentState.state.id).then((response) => {
          if (ApiResponse.hasError(response))
            return Promise.reject(`Server returned error with status code: ${response.status}`);

          componentState.filterValuesMap[filter.param] = response.data;
          if (response.data.length > 0 && _.isNil(componentState.filterSelectedValueMap[filter.param])) {
            componentState.filterSelectedValueMap[filter.param] = response.data[0];
          }
          return Promise.resolve();
        });
      }), Promise.resolve());
    };

    const loadIndependentFilters = function () {
      console.log("loadIndependentFilters");
      return _.reduce(metabaseResource.getIndependentFilters(), (result, filter) =>
        result.then(() => {
          return DataReadService.getEntities(filter, componentState.filterSelectedValueMap, componentState.state.id).then((response) => {
            if (ApiResponse.hasError(response))
              return Promise.reject(`Server returned error with status code: ${response.status}`);

            componentState.filterValuesMap[filter.param] = response.data;
            if (response.data.length > 0 && _.isNil(componentState.filterSelectedValueMap[filter.param]))
              componentState.filterSelectedValueMap[filter.param] = response.data[0];
            return Promise.resolve();
          });
        }), Promise.resolve())
    };

    let deps = [metabaseResource.id, ...FiltersAndReportsState.getSelectedFilterIds(metabaseResource, componentState)];
    useEffect(() => {
      console.log("USE EFFECT DEPENDENCIES", deps);
      DataReadService.getState().then((stateResponse) => {
        if (ApiResponse.hasError(stateResponse))
          return Promise.reject(`Server returned error with status code: ${stateResponse.status}`);

        componentState.state = stateResponse.data;
        return loadIndependentFilters().then(() => loadDependentFilters()).then(() => loadMetabaseDashboard());
      }).then(() => {
        update(FiltersAndReportsState.clone(componentState));
      }).catch((error) => {
        console.log(error);
        componentState.error = error;
        update(componentState);
      });
    }, deps);

    return <>
      {componentState.validationResult && !componentState.validationResult.success &&
      <Alert severity="warning">{componentState.validationResult.message}</Alert>
      }
      <Grid container spacing={3}>
        {metabaseResource.topLevel && metabaseResource.filters.map((x) => {
          return <Grid item key={x.param}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id={x.param}><b>{DashboardFilter.getDisplayName(x)}</b></InputLabel>
              {x.dataType ?
                <TextField
                  id={`${x.param}-date-picker`}
                  label=" "
                  type="date"
                  defaultValue={FiltersAndReportsState.getSelectedDateValue(componentState, x)}
                  onChange={(event) => handleChange(x, event)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                :
                <Select
                  labelId={`${x.param}-select`}
                  id={`${x.param}-select`}
                  value={FiltersAndReportsState.getSelectedId(componentState, x)}
                  onChange={(event) => handleChange(x, event)}
                  label={DashboardFilter.getDisplayName(x)}
                  className={classes.formControlSelect}
                >{FiltersAndReportsState.getValues(componentState, x).map((y) => <MenuItem key={`program-${y.id}`} value={y.id}>{y.name}</MenuItem>)}
                </Select>}
            </FormControl>
          </Grid>
        })}
        {!metabaseResource.topLevel && metabaseResource.getDisplayLabels(componentState.searchString).map((label, index) => {
          return <Grid item key={`selected-filters-${index}`}>
            {label}
          </Grid>
        })}
      </Grid>
      {(!_.isNil(componentState.metabaseUrl)) ?
        <Grid container>
          <iframe src={componentState.metabaseUrl} title='Metabase' style={{border: 'none', width: '100%', height: metabaseResource.height}} onLoad={() => {
          }}/>
        </Grid>
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
