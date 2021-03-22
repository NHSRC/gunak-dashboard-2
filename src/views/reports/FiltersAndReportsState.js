import _ from "lodash";
import MetabaseResources from "./MetabaseResources";

export default class FiltersAndReportsState {
  constructor() {
    this.filterSelectedValueMap = {};
    this.filterValuesMap = {};
  }

  static newInstance(searchString) {
    let filtersAndReportsState = new FiltersAndReportsState();
    filtersAndReportsState.searchString = searchString;
    return filtersAndReportsState;
  }

  static clone(other) {
    let filtersAndReportsState = new FiltersAndReportsState();
    filtersAndReportsState.searchString = other.searchString;
    filtersAndReportsState.lastApiResponse = other.lastApiResponse;
    filtersAndReportsState.metabaseUrl = other.metabaseUrl;
    filtersAndReportsState.state = other.state;

    filtersAndReportsState.filterValuesMap = {...other.filterValuesMap};
    filtersAndReportsState.filterSelectedValueMap = {...other.filterSelectedValueMap};
    filtersAndReportsState.metabaseResourceId = other.metabaseResourceId;
    return filtersAndReportsState;
  }

  static getSelectedId(state, filter) {
    let value = state.filterSelectedValueMap[filter.param];
    if (_.isNil(value)) return 0;
    return value.id;
  }

  static getValues(state, filter) {
    let filterValues = state.filterValuesMap[filter.param];
    return filterValues || [];
  }

  static setValue(thisObject, filter, entityId, metabaseResource) {
    thisObject.filterSelectedValueMap[filter.param] = _.find(thisObject.filterValuesMap[filter.param], (x) => x.id === entityId);

    let otherFilterParams = _.filter(Object.keys(thisObject.filterSelectedValueMap), (x) => x !== filter.param);
    let dependentFilters = metabaseResource.getDependentFiltersOn(filter);
    dependentFilters.forEach((x) => thisObject.filterSelectedValueMap[x.param] = null);
  }

  static getUserSelectedEntityId(thisObject, filter) {
    return _.isNil(thisObject.filterSelectedValueMap[filter.param]) ? 0 : thisObject.filterSelectedValueMap[filter.param];
  }

  static getCurrentEntity(thisObject, filter) {
    return thisObject.filterSelectedValueMap[filter.param];
  }

  static getSelectedFilterIds(thisObject) {
    return MetabaseResources.getUniqueFilterParams().map((param) => {
      return thisObject.filterSelectedValueMap[param] ? thisObject.filterSelectedValueMap[param].id : 0;
    });
  }
}
