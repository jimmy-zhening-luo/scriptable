var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Url_scheme, _Url_host, _Url_port, _Url_path, _Url_query, _Url_fragment;
;
class Url {
    constructor(head, host, port, path, query, fragment) {
        _Url_scheme.set(this, void 0);
        _Url_host.set(this, void 0);
        _Url_port.set(this, void 0);
        _Url_path.set(this, void 0);
        _Url_query.set(this, void 0);
        _Url_fragment.set(this, void 0);
        if (head === undefined) {
            __classPrivateFieldSet(this, _Url_scheme, new Scheme(), "f");
            __classPrivateFieldSet(this, _Url_host, new Host(), "f");
            __classPrivateFieldSet(this, _Url_port, new Port(), "f");
            __classPrivateFieldSet(this, _Url_path, new Path(), "f");
            __classPrivateFieldSet(this, _Url_query, new Query(), "f");
            __classPrivateFieldSet(this, _Url_fragment, new Fragment(), "f");
        }
        else if (head instanceof Url) {
            __classPrivateFieldSet(this, _Url_scheme, head.scheme, "f");
            __classPrivateFieldSet(this, _Url_host, head.host, "f");
            __classPrivateFieldSet(this, _Url_port, head.port, "f");
            __classPrivateFieldSet(this, _Url_path, head.path, "f");
            __classPrivateFieldSet(this, _Url_query, head.query, "f");
            __classPrivateFieldSet(this, _Url_fragment, head.fragment, "f");
        }
        else if (head instanceof Scheme) {
            __classPrivateFieldSet(this, _Url_scheme, head, "f");
            __classPrivateFieldSet(this, _Url_host, new Host(host), "f");
            __classPrivateFieldSet(this, _Url_port, new Port(port), "f");
            __classPrivateFieldSet(this, _Url_path, new Path(path), "f");
            __classPrivateFieldSet(this, _Url_query, new Query(query), "f");
            __classPrivateFieldSet(this, _Url_fragment, new Fragment(fragment), "f");
        }
        else if (typeof head === "string"
            && host === undefined
            && port === undefined
            && path === undefined
            && query === undefined
            && fragment === undefined) {
            const parsedUrl = this.parse(head);
            __classPrivateFieldSet(this, _Url_scheme, parsedUrl.scheme, "f");
            __classPrivateFieldSet(this, _Url_host, parsedUrl.host, "f");
            __classPrivateFieldSet(this, _Url_port, parsedUrl.port, "f");
            __classPrivateFieldSet(this, _Url_path, parsedUrl.path, "f");
            __classPrivateFieldSet(this, _Url_query, parsedUrl.query, "f");
            __classPrivateFieldSet(this, _Url_fragment, parsedUrl.fragment, "f");
        }
        else if (typeof head === "string") {
            __classPrivateFieldSet(this, _Url_scheme, new Scheme(head), "f");
            __classPrivateFieldSet(this, _Url_host, new Host(host), "f");
            __classPrivateFieldSet(this, _Url_port, new Port(port), "f");
            __classPrivateFieldSet(this, _Url_path, new Path(path), "f");
            __classPrivateFieldSet(this, _Url_query, new Query(query), "f");
            __classPrivateFieldSet(this, _Url_fragment, new Fragment(fragment), "f");
        }
        else {
            __classPrivateFieldSet(this, _Url_scheme, new Scheme(head.scheme), "f");
            __classPrivateFieldSet(this, _Url_host, new Host(head.host), "f");
            __classPrivateFieldSet(this, _Url_port, new Port(head.port), "f");
            __classPrivateFieldSet(this, _Url_path, new Path(head.path), "f");
            __classPrivateFieldSet(this, _Url_query, new Query(head.query), "f");
            __classPrivateFieldSet(this, _Url_fragment, new Fragment(head.fragment), "f");
        }
    }
    parse(url) {
        return new Url(url);
    }
    get scheme() {
        return __classPrivateFieldGet(this, _Url_scheme, "f");
    }
    set scheme(scheme) {
        __classPrivateFieldSet(this, _Url_scheme, new Scheme(scheme), "f");
    }
    get host() {
        return __classPrivateFieldGet(this, _Url_host, "f");
    }
    set host(host) {
        __classPrivateFieldSet(this, _Url_host, new Host(host), "f");
    }
    get port() {
        return __classPrivateFieldGet(this, _Url_port, "f");
    }
    set port(port) {
        __classPrivateFieldSet(this, _Url_port, new Port(port), "f");
    }
    get path() {
        return __classPrivateFieldGet(this, _Url_path, "f");
    }
    set path(path) {
        __classPrivateFieldSet(this, _Url_path, new Path(path), "f");
    }
    get query() {
        return __classPrivateFieldGet(this, _Url_query, "f");
    }
    set query(query) {
        __classPrivateFieldSet(this, _Url_query, new Query(query), "f");
    }
    get fragment() {
        return __classPrivateFieldGet(this, _Url_fragment, "f");
    }
    set fragment(fragment) {
        __classPrivateFieldSet(this, _Url_fragment, new Fragment(fragment), "f");
    }
    get string() {
        return Url.joinUrlParts(this);
    }
    toString() {
        return this.string;
    }
    static joinUrlParts(url) {
        return (Url.appendFragmentToLeft(Url.appendQueryToLeft(Url.appendPathToLeft(Url.appendPortToLeft(Url.appendHostToScheme(url.scheme, url.host), url.port), url.path), url.query), url.fragment)).trim();
    }
    static appendHostToScheme(scheme, host) {
        const left = new Scheme(scheme).string;
        const right = new Host(host).string;
        const delim = left === String() ?
            String()
            : "://";
        return [left, right]
            .join(delim)
            .trim();
    }
    static appendPortToLeft(left, port) {
        left = left.trim();
        const right = left === String() ?
            String()
            : new Port(port).string;
        const delim = (right === String()
            || right === "0") ?
            String()
            : ":";
        return [left, right]
            .join(delim)
            .trim();
    }
    static appendPathToLeft(left, path) {
        left = left.trim();
        const right = new Path(path).string;
        const delim = String();
        return [left, right]
            .join(delim)
            .trim();
    }
    static appendQueryToLeft(left, query) {
        left = left.trim();
        const right = new Query(query).string;
        const delim = right === String() ?
            String()
            : "?";
        return [left, right]
            .join(delim)
            .trim();
    }
    static appendFragmentToLeft(left, fragment) {
        left = left.trim();
        const right = new Fragment(fragment).string;
        const delim = right === String() ?
            String()
            : "#";
        return [left, right]
            .join(delim)
            .trim();
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
//# sourceMappingURL=Url.js.map