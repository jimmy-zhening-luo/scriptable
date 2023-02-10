class ApiResponse {
    constructor(response) {
        this.responseBody = new ApiResponse._ResponseBody(response);
    }
    get response() {
        return this.responseBody.response;
    }
    toObject() {
        try {
            return typeof this.responseBody.response === "string" ?
                JSON.parse(this.responseBody.response)
                : this.responseBody.response;
        }
        catch (_a) {
            return {};
        }
    }
    toString() {
        return typeof this.responseBody.response === "string" ?
            this.responseBody.response
            : JSON.stringify(this.responseBody.response);
    }
}
(function (ApiResponse) {
    ApiResponse._ResponseBody = importModule("responseparts/ResponseBody");
})(ApiResponse || (ApiResponse = {}));
module.exports = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map