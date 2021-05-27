import _ from "lodash";
import MetabaseResources, {DashboardFilter, DateFormat} from "./MetabaseResources";
import moment from 'moment';

export default class FiltersAndReportsState {
  constructor() {
    this.filterSelectedValueMap = {};
    this.filterValuesMap = {};
  }

  static newInstance(searchString) {
    let filtersAndReportsState = new FiltersAndReportsState();
    filtersAndReportsState.searchString = searchString;
    filtersAndReportsState.validationResult = {success: true};
    return filtersAndReportsState;
  }

  static clone(other) {
    let filtersAndReportsState = new FiltersAndReportsState();
    filtersAndReportsState.searchString = other.searchString;
    filtersAndReportsState.metabaseUrl = other.metabaseUrl;
    filtersAndReportsState.state = other.state;

    filtersAndReportsState.filterValuesMap = {...other.filterValuesMap};
    filtersAndReportsState.filterSelectedValueMap = {...other.filterSelectedValueMap};
    filtersAndReportsState.metabaseResourceId = other.metabaseResourceId;
    filtersAndReportsState.validationResult = {...other.validationResult};
    return filtersAndReportsState;
  }

  static getSelectedId(state, filter) {
    let value = state.filterSelectedValueMap[filter.param];
    if (_.isNil(value)) return 0;
    return value.id;
  }

  static getSelectedDateValue(state, filter) {
    let value = state.filterSelectedValueMap[filter.param];
    if (_.isNil(value)) {
      localStorage.setItem(filter.param, filter.defaultValue);
      return filter.defaultValue;
    }

    return moment(value).format(DateFormat);
  }

  static getValues(state, filter) {
    let filterValues = state.filterValuesMap[filter.param];
    return filterValues || [];
  }

  static setValue(thisObject, filter, value, metabaseResource) {
    if (DashboardFilter.isDateType(filter)) {
      let validationResult = metabaseResource.customValidation(thisObject.filterSelectedValueMap, filter.param, value);
      thisObject.validationResult = validationResult;
      if (validationResult.success) {
        thisObject.filterSelectedValueMap[filter.param] = value;
        localStorage.setItem(filter.param, value);
      }
    } else {
      thisObject.validationResult = {success: true};
      let entityId = parseInt(value);
      thisObject.filterSelectedValueMap[filter.param] = _.find(thisObject.filterValuesMap[filter.param], (x) => x.id === entityId);

      let otherFilterParams = _.filter(Object.keys(thisObject.filterSelectedValueMap), (x) => x !== filter.param);
      let dependentFilters = metabaseResource.getDependentFiltersOn(filter);
      dependentFilters.forEach((x) => thisObject.filterSelectedValueMap[x.param] = null);
    }
  }

  static getUserSelectedEntityId(thisObject, filter) {
    return _.isNil(thisObject.filterSelectedValueMap[filter.param]) ? 0 : thisObject.filterSelectedValueMap[filter.param];
  }

  static getCurrentEntity(thisObject, filter) {
    return thisObject.filterSelectedValueMap[filter.param];
  }

  static getSelectedFilterIds(metabaseResource, thisObject) {
    return MetabaseResources.getUniqueFilterParams().map((param) => {
      if (thisObject.filterSelectedValueMap[param] && metabaseResource.isParamOfDateType(param)) {
        return thisObject.filterSelectedValueMap[param];
      } else if (!thisObject.filterSelectedValueMap[param] && metabaseResource.isParamOfDateType(param)) {
        return "";
      } else {
        return thisObject.filterSelectedValueMap[param] ? thisObject.filterSelectedValueMap[param].id : 0;
      }
    });
  }
}
