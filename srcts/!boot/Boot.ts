/*
This file must be manually copied from the repository into the boot dir.

When run, it loads the core system files from the repository.
*/

// v1.0.8
const ROOT_BOOKMARK: string = "!ROOT";
const SYSTEM_DIR: string = "system";
const SYSTEM_CONFIG_FILE: string = "system.json";

const REPO_SYSTEM_SRC_BOOKMARK: string = "!REPO_SYSTEM";

class Boot {
  static get ROOT_BOOKMARK(): string {
    return ROOT_BOOKMARK;
  }
  
  static get SYSTEM_DIR(): string {
    return SYSTEM_DIR;
  }
  
  static get SYSTEM_CONFIG_FILE(): string {
    return SYSTEM_CONFIG_FILE;
  }
  
  private static get REPO_SYSTEM_SRC_BOOKMARK(): string {
    return REPO_SYSTEM_SRC_BOOKMARK;
  }
  
  static clean(): void {
    Boot.cleanSystem();
  }
  
  static install(): void {
    Boot.clean();
    Boot.installSystem();
  }
  
  static cleanSystem(): void {
    const fm: FileManager = FileManager.iCloud();
    const prodPath: string = fm.joinPath(
      fm.bookmarkedPath(
        Boot.ROOT_BOOKMARK
      ),
      Boot.SYSTEM_DIR
    );
    if (fm.isDirectory(prodPath))
      fm.remove(prodPath);
  }
  
  static installSystem(): void {
    Boot.cleanSystem();
    const fm: FileManager = FileManager.iCloud();
    const repoPath: string = fm.bookmarkedPath(
        Boot.REPO_SYSTEM_SRC_BOOKMARK
      );
    const prodPath: string = fm.joinPath(
      fm.bookmarkedPath(
        Boot.ROOT_BOOKMARK
      ),
      Boot.SYSTEM_DIR
    );
    fm.copy(repoPath, prodPath);
  }
}

module.exports = Boot;
