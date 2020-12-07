import _ from "lodash";

export function paramsToUrlFragment(params) {
  let paramStringArray = Object.keys(params).map((param) => _.isNil(params[param]) ? '' : `${param}=${params[param]}`);
  return _.join(_.filter(paramStringArray, (x) => !_.isEmpty(x)), '&');
}
