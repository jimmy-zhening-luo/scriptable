/*
This file must be manually copied from the repository into the boot dir.

When run, it loads the core system files from the repository.
*/

// v1.0.5

const ROOT_BOOKMARK = "!ROOT";
const BOOT_DIR = "boot";
const SYSTEM_DIR = "system";
const SYSTEM_CONFIG_FILE = "system.json";

const REPO_SYSTEM_SRC_BOOKMARK = "!SYSTEM"

class Boot {
  static get ROOT_BOOKMARK() {
    return ROOT_BOOKMARK;
  }
  
  static get BOOT_DIR() {
    return BOOT_DIR;
  }
  
  static get SYSTEM_DIR() {
    return SYSTEM_DIR;
  }
  
  static get SYSTEM_CONFIG_FILE() {
    return SYSTEM_CONFIG_FILE;
  }
  
  static get #REPO_SYSTEM_SRC_BOOKMARK() {
    return REPO_SYSTEM_SRC_BOOKMARK;
  }
  
  static installSystem() {
    const iFm = FileManager.iCloud();
    const lFm = FileManager.local();
    const here = iFm.joinPath(
      iFm.bookmarkedPath(
        this.ROOT_BOOKMARK
      ),
      this.SYSTEM_DIR
    );
    const destination = here;
      
    const there = lFm.bookmarkedPath(
      this.#REPO_SYSTEM_SRC_BOOKMARK
    );
    const source = there;
    
    if (iFm.isDirectory(destination))
      iFm.remove(destination);
      
    iFm.copy(source, destination);
  }
}

module.exports = Boot;
module.exports.Boot = Boot;
