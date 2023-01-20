"use strict";
const Scheme = importModule(
  "scheme/Scheme"
);
const Host = importModule(
  "host/Host"
);
const Port = importModule(
  "port/Port"
);
const Path = importModule(
  "path/Path"
);
const Query = importModule(
  "query/Query"
);
const Fragment = importModule(
  "fragment/Fragment"
);

class Url {
  #scheme = new Scheme();
  #host = new Host();
  #port = new Port();
  #path = new Path();
  #query = new Query();
  #fragment = new Fragment();
  constructor (
    scheme = String()
      ?? new Scheme(),
    host = String()
      ?? new Host(),
    port = Number()
      ?? String()
      ?? new Port(),
    path = String()
      ?? new Path(),
    query = String()
      ?? new Query(),
    fragment = String()
      ?? new Fragment()
  ) {
    this.scheme = scheme;
    this.host = host;
    this.port = port;
    this.path = path;
    this.query = query;
    this.fragment = fragment;
  }
  
  static fromStringParts (
    scheme = String(),
    host = String(),
    port = String(),
    path = String(),
    query = String(),
    fragment = String()
  ) {
    return new this(
      (scheme?.constructor === String)?
        scheme
        :null,
      (host?.constructor === String)?
        host
        :null,
      (port?.constructor === String)?
        port
        :null,
      (path?.constructor === String)?
        path
        :null,
      (query?.constructor === String)?
        query
        :null,
      (fragment?.constructor === String)?
        fragment
        :null
    ) ?? new this();
  }
  
  static fromParts (
    scheme = new Scheme(),
    host = new Host(),
    port = new Port(),
    path = new Path(),
    query = new Query(),
    fragment = new Fragment()
  ) {
    return new this(
      scheme,
      host,
      port,
      path,
      query,
      fragment
    ) ?? new this();
  }
  
  static fromUrl (
    url = new this()
  ) {
    return this.fromParts(
      url?.scheme ?? new Scheme(),
      url?.host ?? new Host(),
      url?.port ?? new Port(),
      url?.path ?? new Path(),
      url?.query ?? new Query(),
      url?.fragment ?? new Fragment()
    ) ?? new this();
  }
  
  static fromString (
    url = String()
  ) {
    return this.parseUrl(
      (url?.constructor === String)?
      url
      :String()
    ) ?? new this();
  }
  
  get scheme() {
    return this.#scheme ?? new Scheme();
  }
  
  set scheme(
    scheme = String()
      ?? new Scheme()
  ) {
    this.#scheme = new Scheme(scheme)
      ?? new Scheme();
  }
  
  get host() {
    return this.#host ?? new Host();
  }
  
  set host(
    host = String()
      ?? new Host()
  ) {
    this.#host = new Host(host)
    ?? new Host();
  }
  
  get port() {
    return this.#port ?? new Port();
  }
  
  set port(
    port = Number()
      ?? new Port()
      ?? String()
  ) {
    this.#port = new Port(port)
    ?? new Port();
  }
  
  get path() {
    return this.#path ?? new Path();
  }
  
  set path(
    path = String()
      ?? new Path()
  ) {
    this.#path = new Path(path)
    ?? new Path();
  }
  
  get query() {
    return this.#query ?? new Query();
  }
  
  set query(
    query = String()
      ?? new Query()
  ) {
    this.#query = new Query(query)
    ?? new Query();
  }
  
  get fragment() {
    return this.#fragment
      ?? new Fragment();
  }
  
  set fragment(
    fragment = String()
      ?? new Fragment()
  ) {
    this.#fragment = new Fragment(
      fragment
    )
    ?? new Fragment();
  }
  
  get string() {
    return this
    .constructor
    .joinUrlParts(
      this ?? new this.constructor()
    )
    ?.trim()
    ?? String();
  }
  
  toString() {
    return this.string
      ?.trim()
      ?? String();
  }
  
  static joinUrlParts(
    parts = new this()
      ?? new Object()
      ?? new Array(),
    ..._parts
  ) {
    parts = (_parts.length > 0)?
      [parts, ..._parts]
      :parts;
    const isArray "0= Array.isArray(parts);
    const scheme = (
      (isArray === true)?
      parts?.[0]
      :parts?.scheme
    ) ?? new Scheme();
    const host = (
      (isArray === true)?
      parts?.[1]
      :parts?.host
    ) ?? new Host();
    const port = (
      (isArray === true)?
      parts?.[2]
      :parts?.port
    ) ?? new Port();
    const path = (
      (isArray === true)?
      parts?.[3]
      :parts?.path
    ) ?? new Path();
    const query = (
      (isArray === true)?
      parts?.[4]
      :parts?.query
    ) ?? new Query();
    const fragment = (
      (isArray === true)?
      parts?.[5]
      :parts?.fragment
    ) ?? new Fragment();
    return (
      this.appendFragmentToLeft(
        this.appendQueryToLeft(
          this.appendPathToLeft(
            this.appendPortToLeft(
              this.appendHostToScheme(
                scheme ?? new Scheme(),
                host ?? new Host()
              ),
              port ?? new Port()
            ),
            path ?? new Path()
          ),
          query ?? new Query()
        ),
        fragment ?? new Fragment()
      )
    )
    ?.trim()
    ?? String();
  }
  
  static appendHostToScheme(
    scheme = new Scheme()
      ?? String(),
    host = new Host()
      ?? String()
  ) {
    scheme = scheme
      ?.toString()
      ?.trim()
      ?? String();
    host = host
      ?.toString()
      ?.trim()
      ?? String();
    const separator = (
      scheme === String()
    )?
      String()
      :String("://");
    return [
      scheme ?? String(),
      host ?? String()
    ].join(
      separator ?? String()
    )
    ?.trim()
    ?? String();  
  }
  
  static appendPortToLeft(
    left = String(),
    port = new Port()
      ?? String()
      ?? Number()
  ) {
    left = (left?.constructor === String)?
      left.trim()
      :String();
    port = (left === String())?
      String()
      :new Port(port)
        ?.toString()
        ?.trim()
        ?? String();
    const separator = (
      port === String()
    )?
      String()
      :String(":");
    return [
      left ?? String(),
      port ?? String()
    ].join(
      separator ?? String()
    )
    ?.trim()
    ?? String();
  }
  
  static appendPathToLeft(
    left = String(),
    path = new Path()
      ?? String()
  ) {
    left = (left?.constructor === String)?
      left.trim()
      :String();
    path = path
      ?.toString()
      ?.trim()
      ?? String();
    const separator = String();
    return [
      left ?? String(),
      path ?? String()
    ].join(
      separator ?? String()
    )
    ?.trim()
    ?? String();
  }
  
  static appendQueryToLeft(
    left = String(),
    query = new Query()
      ?? String()
  ) {
    left = (left?.constructor === String)?
      left.trim()
      :String();
    query = query
      ?.toString()
      ?.trim()
      ?? String();
    const separator = (
      query === String()
    )?
      String()
      :String("?");
    return [
      left ?? String(),
      query ?? String()
    ].join(
      separator ?? String()
    )
    ?.trim()
    ?? String();
  }
  
  static appendFragmentToLeft(
    left = String(),
    fragment = new Fragment()
      ?? String()
  ) {
    left = (left?.constructor === String)?
      left.trim()
      :String();
    fragment = fragment
      ?.toString()
      ?.trim()
      ?? String();
    const separator = (
      fragment === String()
    )?
      String()
      :String("#");
    return [
      left ?? String(),
      fragment ?? String()
    ].join(
      separator ?? String()
    )
    ?.trim()
    ?? String();
  }
  
  static parseUrl(
    url = String()
  ) {
    // WIP
    url = (url?.constructor === String)?
      url
      :String();
    /*
    first, parse the query.
      split by ?
        if one part:
          possible:
            url without q
            q without prepended ?
          split by 
    */
    const parsedUrl = new this();
    return (
      parsedUrl
    )
    ?? new this();
  }
  
  static encode(
    url = String()
  ) {
    return encodeURI(
      (url?.constructor === String)?
      url.trim()
      :String()
    )
    ?.trim()
    ?? String();
  }
  
  static decode(
    url = String()
  ) {
    return decodeURI(
      (url?.constructor === String)?
      url.trim()
      :String()
    )
    ?.trim()
    ?? String();
  }
  
  static encodePart(
    part = String()
  ) {
    return encodeURIComponent(
      (url?.constructor === String)?
      url.trim()
      :String()
    )
    ?.trim()
    ?? String();
  }
  
  static decodePart(
    part = String()
  ) {
    return decodeURIComponent(
      (url?.constructor === String)?
      url.trim()
      :String()
    )
    ?.trim()
    ?? String();
  }
}

module.exports = Url;
module.exports.Scheme = Scheme;
module.exports.Host = Host;
module.exports.Port = Port;
module.exports.Path = Path;
module.exports.Query = Query;
module.exports.Fragment = Fragment;
