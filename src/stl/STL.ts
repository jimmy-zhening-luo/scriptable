namespace STL {
  
  export const shortcut: typeof Shortcut = importModule("./system/Shortcut");
  
  export const rofile: typeof ReadOnlyFile = importModule("./system/application/appdata/filesystem/ReadOnlyFile");
  
  export const file: typeof File = importModule("./system/application/appdata/filesystem/file/File");
  
  export const url: typeof Url = importModule("./system/application/browser/Url");
  
  export const api: typeof Api = importModule("./system/application/browser/Api");
  
}

module.exports = STL;
