// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: magic;
class Branch {
  #repo = String();
  #branch = String();
  constructor (repo = String(), branch = String()) {
    this.#repo = repo;
    this.#branch = branch;
  }
  
  get branch() {
    return this.#branch;
  }
  
  set branch(branch = String()) {
    this.#branch = branch;
  }
  
  get Manager() {
    return FileManager.local();
  }
  
  get repo() {
    return this.#repo;
  }
  
  set repo(repo = String()) {
    this.#repo = repo;
  }
  
  checkout() {
    
  }
  
  push(file = new File(), overwrite = false) {
    this.checkout();
  }
}