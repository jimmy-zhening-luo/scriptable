// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: magic;
const File = importModule("File");

class Folder {
  #self = new File();
  constructor (dir = new File()) {
    this.#self = dir;
  }
  
  static ofChild(child = new File()) {
    return new this(child.parentFile);
  }
  
  get children() {
    
  }
  
  get descendants() {
    
  }
  
  get parent() {
    
  }
  
  get self() {
    return this.#self;
  }
  
  get subpath() {
    
  }
  
  get path() {
    
  }
}

module.exports = Folder;
module.exports.Folder = Folder;
module.exports.File = File;