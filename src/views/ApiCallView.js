import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import ApiResponse from "../model/ApiResponse";
import ErrorView from "./errors/ErrorView";
import React from "react";

export default class ApiCallView {
  static handleApiCall(apiResponse) {
    if (_.isNil(apiResponse)) {
      return <div style={{alignSelf: 'center'}}><CircularProgress/></div>;
    } else if (ApiResponse.hasError(apiResponse)) {
      return <ErrorView pageTitle="Error during profile load" messageTitle={ApiResponse.getHumanError(apiResponse)}
                        message={ApiResponse.getErrorResponse(apiResponse)}/>;
    }
    return null;
  }
}
