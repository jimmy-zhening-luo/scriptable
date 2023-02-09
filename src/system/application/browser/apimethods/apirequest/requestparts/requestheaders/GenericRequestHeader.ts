const g_RequestHeader: typeof RequestHeader = importModule("requestheader/RequestHeader");

class GenericRequestHeader<T extends Types.primitive> extends g_RequestHeader<T> { }

module.exports = GenericRequestHeader;
