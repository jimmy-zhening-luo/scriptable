class ApiRequest {

}

namespace ApiRequest {
  export const _RequestHeaders: typeof RequestHeaders = importModule("requestparts/RequestHeaders");

  export const _RequestBody: typeof RequestBody = importModule("requestparts/requestbody/RequestBody");
}

module.exports = ApiRequest;
