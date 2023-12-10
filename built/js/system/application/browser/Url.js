"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Url {
    constructor(headUrl = "", host, port, path, query, fragment) {
        this._scheme = new Url.Scheme("https");
        this._host = new Url.Host();
        this._port = new Url.Port();
        this._path = new Url.Path();
        this._query = new Url.Query();
        this._fragment = new Url.Fragment();
        try {
            if (typeof headUrl === "string") {
                if (host === undefined
                    && port === undefined
                    && path === undefined
                    && query === undefined
                    && fragment === undefined)
                    this.url = headUrl;
                else {
                    this.scheme = headUrl;
                    this.host = host;
                    this.port = port;
                    this.path = path;
                    this.query = query;
                    this.fragment = fragment;
                }
            }
            else if (headUrl instanceof Url.Scheme) {
                this.scheme = headUrl;
                this.host = host;
                this.port = port;
                this.path = path;
                this.query = query;
                this.fragment = fragment;
            }
            else {
                this.scheme = headUrl.scheme;
                this.host = headUrl.host;
                this.port = headUrl.port;
                this.path = headUrl.path;
                this.query = headUrl.query;
                this.fragment = headUrl.fragment;
                if (host !== undefined) {
                    this.host = host;
                    if (port !== undefined) {
                        this.port = port;
                        if (path !== undefined) {
                            this.path = path;
                            if (query !== undefined) {
                                this.query = query;
                                if (fragment !== undefined) {
                                    this.fragment = fragment;
                                }
                            }
                        }
                    }
                }
            }
        }
        catch (e) {
            throw new Error(`Url: constructor: error creating Url: \n${e}`);
        }
    }
    static get UrlComposites() {
        try {
            return importModule("urlcomposites/UrlComposites");
        }
        catch (e) {
            throw new ReferenceError(`Url: get UrlComposites: error loading UrlComposites module: \n${e}`);
        }
    }
    static get UrlParts() {
        try {
            return Url.UrlComposites.UrlComposite.UrlParts;
        }
        catch (e) {
            throw new ReferenceError(`Url: get UrlParts: error loading UrlParts module: \n${e}`);
        }
    }
    static get UrlPart() {
        try {
            return Url.UrlParts.UrlPart;
        }
        catch (e) {
            throw new ReferenceError(`Url: get UrlPart: error loading UrlPart module: \n${e}`);
        }
    }
    static get Scheme() {
        try {
            return Url.UrlParts.Scheme;
        }
        catch (e) {
            throw new ReferenceError(`Url: get Scheme: error loading Scheme module: \n${e}`);
        }
    }
    static get Host() {
        try {
            return Url.UrlParts.Host;
        }
        catch (e) {
            throw new ReferenceError(`Url: get Host: error loading Host module: \n${e}`);
        }
    }
    static get Port() {
        try {
            return Url.UrlParts.Port;
        }
        catch (e) {
            throw new ReferenceError(`Url: get Port: error loading Port module: \n${e}`);
        }
    }
    static get Path() {
        try {
            return Url.UrlParts.Path;
        }
        catch (e) {
            throw new ReferenceError(`Url: get Path: error loading Path module: \n${e}`);
        }
    }
    static get Query() {
        try {
            return Url.UrlParts.Query;
        }
        catch (e) {
            throw new ReferenceError(`Url: get Query: error loading Query module: \n${e}`);
        }
    }
    static get Fragment() {
        try {
            return Url.UrlParts.Fragment;
        }
        catch (e) {
            throw new ReferenceError(`Url: get Fragment: error loading Fragment module: \n${e}`);
        }
    }
    static get SchemeHostPortPathQueryFragment() {
        try {
            return Url.UrlComposites.SchemeHostPortPathQueryFragment;
        }
        catch (e) {
            throw new ReferenceError(`Url: get SchemeHostPortPathQueryFragment: error loading SchemeHostPortPathQueryFragment module: \n${e}`);
        }
    }
    get isValid() {
        try {
            return this._scheme.isValid;
        }
        catch (e) {
            throw new Error(`Url: isValid: error checking validity: \n${e}`);
        }
    }
    get url() {
        try {
            return this.isValid
                ? new Url.SchemeHostPortPathQueryFragment([
                    this._scheme,
                    this._host,
                    this._port,
                    this._path,
                    this._query,
                    this._fragment,
                ])
                    .toString()
                : "";
        }
        catch (e) {
            throw new Error(`Url: get url: error getting url: \n${e}`);
        }
    }
    get scheme() {
        try {
            return this._scheme.toString();
        }
        catch (e) {
            throw new Error(`Url: get scheme: error getting scheme: \n${e}`);
        }
    }
    get host() {
        try {
            return this._host.toString();
        }
        catch (e) {
            throw new Error(`Url: get host: error getting host: \n${e}`);
        }
    }
    get port() {
        try {
            return this._port.toString();
        }
        catch (e) {
            throw new Error(`Url: get port: error getting port: \n${e}`);
        }
    }
    get path() {
        try {
            return this._path.toString();
        }
        catch (e) {
            throw new Error(`Url: get path: error getting path: \n${e}`);
        }
    }
    get query() {
        try {
            return this.queryString;
        }
        catch (e) {
            throw new Error(`Url: get query: error getting query: \n${e}`);
        }
    }
    get queryString() {
        try {
            return this._query.toString();
        }
        catch (e) {
            throw new Error(`Url: get queryString: error getting queryString: \n${e}`);
        }
    }
    get queryTuples() {
        try {
            return this._query.toTuples();
        }
        catch (e) {
            throw new Error(`Url: get queryTuples: error getting queryTuples: \n${e}`);
        }
    }
    get queryMap() {
        try {
            return this._query.toMap();
        }
        catch (e) {
            throw new Error(`Url: get queryMap: error getting queryMap: \n${e}`);
        }
    }
    get fragment() {
        try {
            return this._fragment.toString();
        }
        catch (e) {
            throw new Error(`Url: get fragment: error getting fragment: \n${e}`);
        }
    }
    set url(url) {
        try {
            const parsedUrl = this._parse(url);
            this.scheme = parsedUrl.scheme;
            this.host = parsedUrl.host;
            this.port = parsedUrl.port;
            this.path = parsedUrl.path;
            this.query = parsedUrl.query;
            this.fragment = parsedUrl.fragment;
        }
        catch (e) {
            throw new Error(`Url: set url: error setting url: \n${e}`);
        }
    }
    set scheme(scheme) {
        try {
            this._scheme = new Url.Scheme(scheme);
            if (this.scheme === "")
                this._scheme = new Url.Scheme("https");
        }
        catch (e) {
            throw new Error(`Url: set scheme: error setting scheme: \n${e}`);
        }
    }
    set host(host) {
        try {
            this._host = new Url.Host(host);
        }
        catch (e) {
            throw new Error(`Url: set host: error setting host: \n${e}`);
        }
    }
    set port(port) {
        try {
            this._port = new Url.Port(port);
        }
        catch (e) {
            throw new Error(`Url: set port: error setting port: \n${e}`);
        }
    }
    set path(path) {
        try {
            this._path = new Url.Path(path);
        }
        catch (e) {
            throw new Error(`Url: set path: error setting path: \n${e}`);
        }
    }
    set query(query) {
        try {
            this._query = new Url.Query(query);
        }
        catch (e) {
            throw new Error(`Url: set query: error setting query: \n${e}`);
        }
    }
    set fragment(fragment) {
        try {
            this._fragment = new Url.Fragment(fragment);
        }
        catch (e) {
            throw new Error(`Url: set fragment: error setting fragment: \n${e}`);
        }
    }
    static encode(url) {
        try {
            return encodeURI(url.trim())
                .trim();
        }
        catch (e) {
            throw new Error(`Url: encode: error encoding url: \n${e}`);
        }
    }
    static decode(url) {
        try {
            return decodeURI(url.trim())
                .trim();
        }
        catch (e) {
            throw new Error(`Url: decode: error decoding url: \n${e}`);
        }
    }
    static encodePart(part) {
        try {
            return encodeURIComponent(part.trim())
                .trim();
        }
        catch (e) {
            throw new Error(`Url: encodePart: error encoding part: \n${e}`);
        }
    }
    static decodePart(part) {
        try {
            return decodeURIComponent(part.trim())
                .trim();
        }
        catch (e) {
            throw new Error(`Url: decodePart: error decoding part: \n${e}`);
        }
    }
    append(...path) {
        try {
            this.path = this._path.append(...path);
            return this;
        }
        catch (e) {
            throw new Error(`Url: append: error appending path: \n${e}`);
        }
    }
    hasParam(...key) {
        try {
            return this._query.hasParam(...key);
        }
        catch (e) {
            throw new Error(`Url: hasParam: error checking if query has param: \n${e}`);
        }
    }
    getParam(...key) {
        try {
            return this._query.getParam(...key);
        }
        catch (e) {
            throw new Error(`Url: getParam: error getting param: \n${e}`);
        }
    }
    addParam(...params) {
        try {
            this.query = this._query.addParam(...params);
            return this;
        }
        catch (e) {
            throw new Error(`Url: addParam: error adding param: \n${e}`);
        }
    }
    deleteParam(...keys) {
        try {
            this.query = this._query.deleteParam(...keys);
            return this;
        }
        catch (e) {
            throw new Error(`Url: deleteParam: error deleting param: \n${e}`);
        }
    }
    open() {
        try {
            Safari.open(this.url);
            return this;
        }
        catch (e) {
            throw new Error(`Url: open: error opening url: \n${e}`);
        }
    }
    webview(fullScreen = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield WebView.loadURL(this.url, undefined, fullScreen);
                return this;
            }
            catch (e) {
                throw new Error(`Url: webview: error opening url: \n${e}`);
            }
        });
    }
    xCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const baseUrl = new Url(this);
                baseUrl.query = "";
                baseUrl.fragment = "";
                const callbackUrl = new CallbackURL(baseUrl.toString());
                Array.from(this._query.queryMap.entries())
                    .forEach(([key, value,]) => {
                    callbackUrl.addParameter(key, value);
                });
                var response = {};
                yield callbackUrl.open()
                    .then(_response => {
                    response = _response;
                });
                return response;
            }
            catch (e) {
                throw new Error(`Url: xCallback: error opening url: \n${e}`);
            }
        });
    }
    toString() {
        try {
            return this.url;
        }
        catch (e) {
            throw new Error(`Url: toString: error getting url: \n${e}`);
        }
    }
    _parse(url) {
        var _a, _b, _c, _d, _e;
        try {
            let urlStringParts = {};
            if (typeof url === "string") {
                const url_fragment = url.trim()
                    .split("#");
                const urlWithoutFragment = (_a = url_fragment.shift()) !== null && _a !== void 0 ? _a : "";
                urlStringParts.fragment = url_fragment.join("#");
                const queryOrSchemehostportpath_query = urlWithoutFragment.split("?");
                const queryOrSchemehostportpath = (_b = queryOrSchemehostportpath_query.shift()) !== null && _b !== void 0 ? _b : "";
                const schemehostportpath = queryOrSchemehostportpath.includes("=")
                    ? ""
                    : queryOrSchemehostportpath;
                urlStringParts.query = queryOrSchemehostportpath.includes("=")
                    ? [
                        queryOrSchemehostportpath,
                        ...queryOrSchemehostportpath_query,
                    ].join("?")
                    : queryOrSchemehostportpath_query.join("?");
                const scheme_hostportpath = schemehostportpath.split("://");
                const schemeOrHostportpath = (_c = scheme_hostportpath.shift()) !== null && _c !== void 0 ? _c : "";
                urlStringParts.scheme
                    = scheme_hostportpath.length > 0
                        ? schemeOrHostportpath
                        : schemeOrHostportpath.includes(".")
                            || schemeOrHostportpath.includes("/")
                            ? ""
                            : schemeOrHostportpath;
                const hostportpath = scheme_hostportpath.length > 0
                    ? scheme_hostportpath.join("://")
                    : urlStringParts.scheme === ""
                        ? schemeOrHostportpath
                        : "";
                const hostport_path = hostportpath.split("/");
                const hostport = (_d = hostport_path.shift()) !== null && _d !== void 0 ? _d : "";
                urlStringParts.path = hostport_path.join("/");
                const host_port = hostport.split(":");
                urlStringParts.host = (_e = host_port.shift()) !== null && _e !== void 0 ? _e : "";
                urlStringParts.port
                    = urlStringParts.host === ""
                        ? ""
                        : host_port.join(":");
            }
            else {
                urlStringParts = {
                    scheme: url.scheme,
                    host: url.host,
                    port: url.port,
                    path: url.path,
                    query: url.query,
                    fragment: url.fragment,
                };
            }
            return urlStringParts;
        }
        catch (e) {
            throw new Error(`Url: parse: error parsing url: \n${e}`);
        }
    }
}
module.exports = Url;
