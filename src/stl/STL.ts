class STL {}

namespace STL {
  
  export const shortcut: typeof Shortcut = importModule("./system/Shortcut");
  
  export const rofile: typeof ReadOnlyFile = importModule("./system/application/files/ReadOnlyFile");
  
  export const file: typeof File = importModule("./system/application/files/file/File");
  
  export const secret: typeof Secret = importModule("./system/application/Secret");
  
  export const url: typeof Url = importModule("./system/application/browser/Url");
  
  export const api: typeof Api = importModule("./system/application/browser/Api");
  
  export const callback: typeof Callback = importModule("./system/application/browser/Callback");
  
  export const workingcopy: typeof Repository = importModule("./system/application/gitclient/WorkingCopy");
}

module.exports = STL;
