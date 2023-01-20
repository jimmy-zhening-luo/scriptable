/*
This file must be manually copied from the repository into the boot dir.

When run, it loads the core system files from the repository.
*/

// v1.0.8
"use strict";
const ROOT_BOOKMARK = "!ROOT";
const SYSTEM_DIR = "system";
const SYSTEM_CONFIG_FILE = "system.json";

const REPO_SYSTEM_SRC_BOOKMARK = "!REPO_SYSTEM";

class Boot {
  static get ROOT_BOOKMARK() {
    return ROOT_BOOKMARK;
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
  
  static clean() {
    this.cleanSystem();
  }
  
  static install() {
    this.clean();
    this.installSystem();
  }
  
  static cleanSystem() {
    const fm = FileManager.iCloud();
    const prod = fm.joinPath(
      fm.bookmarkedPath(
        this.ROOT_BOOKMARK
      ),
      this.SYSTEM_DIR
    );
    if (fm.isDirectory(prod))
      fm.remove(prod);
  }
  
  static installSystem() {
    this.cleanSystem();
    const fm = FileManager.iCloud();
    const repo = fm.bookmarkedPath(
      this.#REPO_SYSTEM_SRC_BOOKMARK
      );
    const prod = fm.joinPath(
      fm.bookmarkedPath(
        this.ROOT_BOOKMARK
      ),
      this.SYSTEM_DIR
    );
    fm.copy(repo, prod);
  }
}

module.exports = Boot;
