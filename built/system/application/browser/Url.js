var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Url_scheme, _Url_host, _Url_port, _Url_path, _Url_query, _Url_fragment;
class Url {
    constructor(head, host, port, path, query, fragment) {
        _Url_scheme.set(this, new Url._Scheme());
        _Url_host.set(this, new Url._Host());
        _Url_port.set(this, new Url._Port());
        _Url_path.set(this, new Url._Path());
        _Url_query.set(this, new Url._Query());
        _Url_fragment.set(this, new Url._Fragment());
        if (head === undefined) {
            this.scheme = undefined;
            this.host = undefined;
            this.port = undefined;
            this.path = undefined;
            this.query = undefined;
            this.fragment = undefined;
        }
        else if (head instanceof Url) {
            const url = head;
            this.scheme = url.scheme;
            this.host = url.host;
            this.port = url.port;
            this.path = url.path;
            this.query = url.query;
            this.fragment = url.fragment;
        }
        else if (typeof head === "string") {
            if (host === undefined
                && port === undefined
                && path === undefined
                && query === undefined
                && fragment === undefined) {
                const url = head;
                const parsedUrl = parse(url);
                this.scheme = parsedUrl.scheme;
                this.host = parsedUrl.host;
                this.port = parsedUrl.port;
                this.path = parsedUrl.path;
                this.query = parsedUrl.query;
                this.fragment = parsedUrl.fragment;
            }
            else {
                const scheme = head;
                this.scheme = scheme;
                this.host = host;
                this.port = port;
                this.path = path;
                this.query = query;
                this.fragment = fragment;
            }
        }
        else if ("ClassDecorator_UrlPart" in head) {
            const scheme = head;
            this.scheme = scheme;
            this.host = host;
            this.port = port;
            this.path = path;
            this.query = query;
            this.fragment = fragment;
        }
        else {
            const urlParts = head;
            this.scheme = urlParts.scheme;
            this.host = urlParts.host;
            this.port = urlParts.port;
            this.path = urlParts.path;
            this.query = urlParts.query;
            this.fragment = urlParts.fragment;
        }
        function parse(url) {
            var _a, _b, _c, _d, _e;
            let urlStringParts = {};
            const url_fragment = url
                .trim()
                .split("#");
            url = (_a = url_fragment.shift()) !== null && _a !== void 0 ? _a : "";
            urlStringParts.fragment = url_fragment.join("#");
            const queryOrSchemehostportpath_query = url.split("?");
            const queryOrSchemehostportpath = (_b = queryOrSchemehostportpath_query.shift()) !== null && _b !== void 0 ? _b : "";
            const schemehostportpath = queryOrSchemehostportpath.includes("=") ?
                ""
                : queryOrSchemehostportpath;
            urlStringParts.query = queryOrSchemehostportpath.includes("=") ?
                [
                    queryOrSchemehostportpath,
                    ...queryOrSchemehostportpath_query
                ].join("?")
                : queryOrSchemehostportpath_query.join("?");
            const scheme_hostportpath = schemehostportpath.split("://");
            const schemeOrHostportpath = (_c = scheme_hostportpath.shift()) !== null && _c !== void 0 ? _c : "";
            urlStringParts.scheme = scheme_hostportpath.length > 0 ?
                schemeOrHostportpath
                : (schemeOrHostportpath.includes(".")
                    || schemeOrHostportpath.includes("/")) ?
                    ""
                    : schemeOrHostportpath;
            const hostportpath = scheme_hostportpath.length > 0 ?
                scheme_hostportpath.join("://")
                : urlStringParts.scheme === "" ?
                    schemeOrHostportpath
                    : "";
            const hostport_path = Url._File
                .trimPath(hostportpath)
                .split("/");
            const hostport = (_d = hostport_path.shift()) !== null && _d !== void 0 ? _d : "";
            urlStringParts.path = hostport_path.join("/");
            const host_port = hostport.split(":");
            urlStringParts.host = (_e = host_port.shift()) !== null && _e !== void 0 ? _e : "";
            urlStringParts.port = urlStringParts.host === "" ?
                ""
                : host_port.join(":");
            return new Url(urlStringParts);
        }
    }
    get scheme() {
        return __classPrivateFieldGet(this, _Url_scheme, "f").toString();
    }
    set scheme(scheme) {
        __classPrivateFieldSet(this, _Url_scheme, new Url._Scheme(scheme), "f");
    }
    get host() {
        return __classPrivateFieldGet(this, _Url_host, "f").toString();
    }
    set host(host) {
        __classPrivateFieldSet(this, _Url_host, new Url._Host(host), "f");
    }
    get port() {
        return __classPrivateFieldGet(this, _Url_port, "f").toString();
    }
    set port(port) {
        __classPrivateFieldSet(this, _Url_port, new Url._Port(port), "f");
    }
    get path() {
        return __classPrivateFieldGet(this, _Url_path, "f").toString();
    }
    set path(path) {
        __classPrivateFieldSet(this, _Url_path, new Url._Path(path), "f");
    }
    get query() {
        return __classPrivateFieldGet(this, _Url_query, "f").toString();
    }
    set query(query) {
        __classPrivateFieldSet(this, _Url_query, new Url._Query(query), "f");
    }
    addQueryParam(keyOrKeyValue, value) {
        this.query = __classPrivateFieldGet(this, _Url_query, "f").addParam(keyOrKeyValue, value);
    }
    removeQueryParam(key) {
        this.query = __classPrivateFieldGet(this, _Url_query, "f").removeParam(key);
    }
    get fragment() {
        return __classPrivateFieldGet(this, _Url_fragment, "f").toString();
    }
    set fragment(fragment) {
        __classPrivateFieldSet(this, _Url_fragment, new Url._Fragment(fragment), "f");
    }
    get isValid() {
        return __classPrivateFieldGet(this, _Url_scheme, "f").isValid;
    }
    toString() {
        return new Url._SchemeHostPortPathQueryFragment([
            __classPrivateFieldGet(this, _Url_scheme, "f"),
            __classPrivateFieldGet(this, _Url_host, "f"),
            __classPrivateFieldGet(this, _Url_port, "f"),
            __classPrivateFieldGet(this, _Url_path, "f"),
            __classPrivateFieldGet(this, _Url_query, "f"),
            __classPrivateFieldGet(this, _Url_fragment, "f")
        ]).toString();
    }
    static encode(url) {
        var _a, _b;
        return (_b = (_a = encodeURI(url.trim())) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : String();
    }
    static decode(url) {
        var _a, _b;
        return (_b = (_a = decodeURI(url.trim())) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : String();
    }
    static encodePart(part) {
        var _a, _b;
        return (_b = (_a = encodeURIComponent(part.trim())) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : String();
    }
    static decodePart(part) {
        var _a, _b;
        return (_b = (_a = decodeURIComponent(part.trim())) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : String();
    }
}
_Url_scheme = new WeakMap(), _Url_host = new WeakMap(), _Url_port = new WeakMap(), _Url_path = new WeakMap(), _Url_query = new WeakMap(), _Url_fragment = new WeakMap();
(function (Url) {
    ;
    Url._File = importModule("./system/application/appdata/filesystem/file/File");
    Url._Scheme = importModule("urlcomposites/urlparts/Scheme");
    Url._Host = importModule("urlcomposites/urlparts/Host");
    Url._Port = importModule("urlcomposites/urlparts/Port");
    Url._Path = importModule("urlcomposites/urlparts/Path");
    Url._Query = importModule("urlcomposites/urlparts/Query");
    Url._Fragment = importModule("urlcomposites/urlparts/Fragment");
    Url._SchemeHostPortPathQueryFragment = importModule("urlcomposites/SchemeHostPortPathQueryFragment");
})(Url || (Url = {}));
module.exports = Url;
//# sourceMappingURL=Url.js.map