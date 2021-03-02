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

  static setValue(filtersAndReportsState, filter, entityId) {
    filtersAndReportsState.filterSelectedValueMap[filter.param] = _.find(filtersAndReportsState.filterValuesMap[filter.param], (x) => x.id === entityId);
    filtersAndReportsState.filterUpdated = false;
  }

  static getUserSelectedEntityId(filtersAndReportsState, filter) {
    return _.isNil(filtersAndReportsState.filterSelectedValueMap[filter.param]) ? 0 : filtersAndReportsState.filterSelectedValueMap[filter.param];
  }

  static getCurrentEntity(filtersAndReportsState, filter) {
    return filtersAndReportsState.filterSelectedValueMap[filter.param];
  }
}
