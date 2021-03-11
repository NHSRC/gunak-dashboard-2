import _ from "lodash";

export default class FiltersAndReportsState {
  constructor() {
    this.filterSelectedValueMap = {};
    this.filterValuesMap = {};
  }

  static newInstance(searchString) {
    return new FiltersAndReportsState();
  }

  static clone(other) {
    let filtersAndReportsState = new FiltersAndReportsState();
    filtersAndReportsState.lastApiResponse = other.lastApiResponse;
    filtersAndReportsState.metabaseUrl = other.metabaseUrl;
    filtersAndReportsState.state = other.state;

    filtersAndReportsState.filterValuesMap = {...other.filterValuesMap};
    filtersAndReportsState.filterSelectedValueMap = {...other.filterSelectedValueMap};
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

  static setValue(thisObject, filter, entityId) {
    thisObject.filterSelectedValueMap[filter.param] = _.find(thisObject.filterValuesMap[filter.param], (x) => x.id === entityId);
  }

  static getUserSelectedEntityId(thisObject, filter) {
    return _.isNil(thisObject.filterSelectedValueMap[filter.param]) ? 0 : thisObject.filterSelectedValueMap[filter.param];
  }

  static getCurrentEntity(thisObject, filter) {
    return thisObject.filterSelectedValueMap[filter.param];
  }

  static getSelectedFilterEntityIds(thisObject) {
    return Object.keys(thisObject.filterSelectedValueMap).map((key) => thisObject.filterSelectedValueMap[key]);
  }
}
