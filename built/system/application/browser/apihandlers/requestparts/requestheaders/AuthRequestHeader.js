const a_RequestHeader = importModule("requestheader/RequestHeader");
class AuthRequestHeader extends a_RequestHeader {
    constructor(authTypeOrAuthStringOrTuple, token) {
        super("Authorization", token === undefined ?
            authTypeOrAuthStringOrTuple
            : [
                authTypeOrAuthStringOrTuple,
                token
            ]
                .join(" "));
    }
    get auth() {
        return this.value;
    }
    set auth(authString) {
        this.value = authString;
    }
    setAuthTypeAndToken(authType, token) {
        this.value = [
            authType,
            token
        ]
            .join(" ");
        return this;
    }
}
module.exports = AuthRequestHeader;
//# sourceMappingURL=AuthRequestHeader.js.map