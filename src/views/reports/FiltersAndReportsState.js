import _ from "lodash";
import MetabaseResources from "./MetabaseResources";

export default class FiltersAndReportsState {
  static newInstance(searchString) {
    let filtersAndReportsState = new FiltersAndReportsState();
    filtersAndReportsState.resource = _.isEmpty(searchString) ? MetabaseResources.Main : MetabaseResources.AssessmentList;
    return filtersAndReportsState;
  }

  static clone(other) {
    let filtersState = new FiltersAndReportsState();
    filtersState.lastApiResponse = other.lastApiResponse;
    filtersState.metabaseUrl = other.metabaseUrl;
    filtersState.programs = other.programs;
    filtersState.assessmentTools = other.assessmentTools;
    filtersState.state = other.state;
    return filtersState;
  }
}
