export default class ApiResponse {
  static messageForCode = {
    "500": "Server is down or something went wrong. Please wait and if the issue is still not resolved please send email to: help@gunaksupport.freshdesk.com with a screenshot."
  };

  static clone(other) {
    let apiResponse = new ApiResponse();
    apiResponse.status = other.status;
    apiResponse.statusText = other.statusText;
    apiResponse.textBody = other.textBody;
    apiResponse.data = other.data;
    return apiResponse;
  }

  static hasError(apiResponse) {
    return apiResponse.status < 200 || apiResponse.status >= 300;
  }

  static getErrorResponse(apiResponse) {
    return `${apiResponse.statusText}. ${apiResponse.textBody}`;
  }

  static getHumanError(apiResponse) {
    return this.messageForCode[apiResponse.status];
  }
}
