import _ from "lodash";
import ApiResponse from "../model/ApiResponse";

export function paramsToUrlFragment(params) {
  let paramStringArray = Object.keys(params).map((param) => _.isNil(params[param]) ? '' : `${param}=${params[param]}`);
  return _.join(_.filter(paramStringArray, (x) => !_.isEmpty(x)), '&');
}

export function getJson(url, embeddedObjectName) {
  console.log("Getting Json response from: ", url);
  const getRequest = new Request(url, {
    method: 'GET'
  });
  let apiResponse = new ApiResponse();
  return fetch(url)
    .then(response => {
      apiResponse.status = response.status;
      apiResponse.statusText = response.statusText;
      const contentType = response.headers.get('content-type');
      if (_.isNil(contentType) || contentType === 'application/text') {
        return response.text().then((text) => {
          apiResponse.textBody = text;
        });
      }
      if (response.status < 200 || response.status >= 300) {
        return Promise.resolve(null);
      }
      return response.json();
    })
    .then((obj) => {
      apiResponse.data = obj["_embedded"] ? obj["_embedded"][embeddedObjectName] : obj;
      return Promise.resolve(apiResponse);
    });
}

export function getText(url) {
  new Request(url, {
    method: 'GET'
  });
  let apiResponse = new ApiResponse();
  return fetch(url)
    .then(response => {
      apiResponse.status = response.status;
      apiResponse.statusText = response.statusText;
      const contentType = response.headers.get('content-type');
      if (_.isNil(contentType)) {
        return response.text().then((text) => {
          apiResponse.textBody = text;
        });
      }
      if (response.status < 200 || response.status >= 300) {
        return Promise.resolve(null);
      }
      return response.text();
    })
    .then((text) => {
      apiResponse.data = text;
      return Promise.resolve(apiResponse);
    });
}
