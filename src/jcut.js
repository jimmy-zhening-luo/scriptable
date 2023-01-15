// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;
class Exception {
  
}

class ErrorException extends Exception {
  
}

class WarnException extends ErrorException {
  
}

module.exports.Exception = Exception;
module.exports.ErrorException = ErrorException;
module.exports.WarnException = WarnException;