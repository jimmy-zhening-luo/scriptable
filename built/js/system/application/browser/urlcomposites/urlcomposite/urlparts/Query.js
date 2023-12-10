"use strict";
const qu_UrlPart = importModule("urlpart/UrlPart");
class Query extends qu_UrlPart {
    constructor(query = "") {
        try {
            if (typeof query === "string" || query instanceof Query)
                super(query);
            else if (Array.isArray(query)) {
                if (query.length === 2
                    && typeof query[0] === "string"
                    && typeof query[1] === "string")
                    super(`${query[0]}=${query[1]}`);
                else
                    super(Query.tuplesToQueryString(query));
            }
            else {
                super(Query.mapToQueryString(query));
            }
        }
        catch (e) {
            throw new Error(`Query: constructor: error creating Query: \n${e}`);
        }
    }
    static get QueryRepeater() {
        try {
            return Query.Repeaters.QueryRepeater;
        }
        catch (e) {
            throw new Error(`Query: get QueryRepeater: error loading QueryRepeater module: \n${e}`);
        }
    }
    static get UrlPart() {
        try {
            return qu_UrlPart;
        }
        catch (e) {
            throw new Error(`Query: get UrlPart: error getting UrlPart: \n${e}`);
        }
    }
    get query() {
        try {
            return this.queryString;
        }
        catch (e) {
            throw new Error(`Query: get query: error getting query: \n${e}`);
        }
    }
    get queryString() {
        try {
            return this.toString();
        }
        catch (e) {
            throw new Error(`Query: get queryString: error getting queryString: \n${e}`);
        }
    }
    get queryTuples() {
        try {
            return Query.queryStringToTuples(this.query);
        }
        catch (e) {
            throw new Error(`Query: get queryTuples: error getting queryTuples: \n${e}`);
        }
    }
    get queryMap() {
        try {
            return Query.queryStringToMap(this.query);
        }
        catch (e) {
            throw new Error(`Query: get queryMap: error getting queryMap: \n${e}`);
        }
    }
    static queryStringToTuples(query) {
        try {
            return query
                .split("&")
                .filter(keyValueString => keyValueString !== "")
                .map(keyValueString => keyValueString.split("="))
                .filter(keyValueTuple => keyValueTuple.length >= 2)
                .map(keyValueTuple => [
                keyValueTuple[0],
                keyValueTuple.slice(1)
                    .join("="),
            ]).filter(tuple => tuple[0] !== "" && tuple[1] !== "");
        }
        catch (e) {
            throw new Error(`Query: queryStringToTuples: error converting to tuples: \n${e}`);
        }
    }
    static tuplesToMap(tuples) {
        try {
            return new Map(tuples.filter(tuple => tuple[0] !== "" && tuple[1] !== ""));
        }
        catch (e) {
            throw new Error(`Query: tuplesToMap: error converting to map: \n${e}`);
        }
    }
    static queryStringToMap(query) {
        try {
            return Query.tuplesToMap(Query.queryStringToTuples(query));
        }
        catch (e) {
            throw new Error(`Query: queryStringToMap: error converting to map: \n${e}`);
        }
    }
    static mapToTuples(record) {
        try {
            return Array.from(record instanceof Map
                ? record.entries()
                : Object.entries(record))
                .filter(tuple => tuple[0] !== "" && tuple[1] !== "");
        }
        catch (e) {
            throw new Error(`Query: mapToTuples: error converting to tuples: \n${e}`);
        }
    }
    static tuplesToQueryString(tuples) {
        try {
            return tuples
                .filter(tuple => tuple[0] !== "" && tuple[1] !== "")
                .map(keyValueTuple => keyValueTuple.join("="))
                .join("&");
        }
        catch (e) {
            throw new Error(`Query: tuplesToQueryString: error converting to query string: \n${e}`);
        }
    }
    static mapToQueryString(record) {
        try {
            return Query.tuplesToQueryString(Query.mapToTuples(record));
        }
        catch (e) {
            throw new Error(`Query: mapToQueryString: error converting to query string: \n${e}`);
        }
    }
    hasParam(key) {
        try {
            return this.queryMap.has(key) && this.queryMap.get(key) !== "";
        }
        catch (e) {
            throw new Error(`Query: hasParam: error checking param: \n${e}`);
        }
    }
    getParam(key) {
        var _a;
        try {
            return (_a = this.queryMap.get(key)) !== null && _a !== void 0 ? _a : "";
        }
        catch (e) {
            throw new Error(`Query: getParam: error getting param: \n${e}`);
        }
    }
    addParam(_keyOrKeyValue, _value) {
        try {
            const queryMapCopy = new Map(this.queryMap);
            const newParamTuples = [];
            if (_value !== undefined) {
                if (typeof _keyOrKeyValue === "string")
                    newParamTuples.push([
                        _keyOrKeyValue,
                        _value,
                    ]);
            }
            else
                newParamTuples.push(...new Query(_keyOrKeyValue).queryTuples);
            newParamTuples
                .filter(tuple => tuple[0] !== "")
                .forEach(([key, value,]) => {
                value === ""
                    ? queryMapCopy.delete(key)
                    : queryMapCopy.set(key, value);
            });
            return new Query(queryMapCopy);
        }
        catch (e) {
            throw new Error(`Query: addParam: error adding param: \n${e}`);
        }
    }
    deleteParam(keys) {
        try {
            let newQuery = new Query(this);
            Array.isArray(keys)
                ? keys.forEach(key => {
                    newQuery = newQuery.addParam(key, "");
                })
                : newQuery = newQuery.addParam(keys, "");
            return newQuery;
        }
        catch (e) {
            throw new Error(`Query: deleteParam: error deleting param: \n${e}`);
        }
    }
    toTuples() {
        try {
            return this.queryTuples;
        }
        catch (e) {
            throw new Error(`Query: toTuples: error converting to tuples: \n${e}`);
        }
    }
    toMap() {
        try {
            return this.queryMap;
        }
        catch (e) {
            throw new Error(`Query: toMap: error converting to map: \n${e}`);
        }
    }
    parse(query) {
        try {
            query = query.trim();
            query = query.startsWith("?")
                ? query.slice(1)
                : query;
            return query === ""
                ? null
                : Query.mapToQueryString(Query.queryStringToMap(query))
                    .split("&")
                    .filter(keyValueString => keyValueString !== "")
                    .map(keyValueString => new Query.QueryRepeater(keyValueString))
                    .filter(queryRepeater => queryRepeater.isValid)
                    .map(queryRepeater => queryRepeater.toString())
                    .join("&");
        }
        catch (e) {
            throw new Error(`Query: parse: error parsing Query: \n${e}`);
        }
    }
}
module.exports = Query;
