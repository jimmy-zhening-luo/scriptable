// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;
class Jcut {
  static isString(obj) {
    return obj?.constructor === String;
  }
}

class Exception {
  
}

class ErrorException extends Exception {
  
}

class WarnException extends ErrorException {
  
}

module.exports = Jcut;
module.exports.Jcut = Jcut;
module.exports.Exception = Exception;
module.exports.ErrorException = ErrorException;
module.exports.WarnException = WarnException;