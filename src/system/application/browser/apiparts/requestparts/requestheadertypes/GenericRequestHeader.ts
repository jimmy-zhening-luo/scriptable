const g_RequestHeader: typeof RequestHeader = importModule("requestheader/RequestHeader");

class GenericRequestHeader<T extends string | number | boolean> extends g_RequestHeader<T> {

  static get RequestHeader(): typeof RequestHeader {
    return g_RequestHeader;
  }

 }

module.exports = GenericRequestHeader;
