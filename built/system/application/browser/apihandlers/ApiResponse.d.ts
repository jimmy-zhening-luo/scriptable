declare class ApiResponse {
    readonly responseBody: ResponseBody;
    constructor(response?: any);
    get response(): any;
    toObject(): any;
    toString(): string;
}
declare namespace ApiResponse {
    const _ResponseBody: typeof ResponseBody;
}
//# sourceMappingURL=ApiResponse.d.ts.map