/*
This file must be manually copied from the repository into the boot dir.

When run, it loads the core system files from the repository.
*/

// v1.0.8
const RUNTIME_ROOT_BOOKMARK: string = ">>ROOT";
const SYSTEM_RUNTIME_ROOT_SUBPATH: string = "system";

const SYSTEM_SOURCE_BOOKMARK: string = "@SYSTEM";

class _Boot {
  static get RUNTIME_ROOT_BOOKMARK(): string {
    return RUNTIME_ROOT_BOOKMARK;
  }

  static get SYSTEM_RUNTIME_ROOT_SUBPATH(): string {
    return SYSTEM_RUNTIME_ROOT_SUBPATH;
  }

  private static get SYSTEM_SOURCE_BOOKMARK(): string {
    return SYSTEM_SOURCE_BOOKMARK;
  }

  static clean(): void {
    _Boot.cleanSystem();
  }

  static install(): void {
    _Boot.clean();
    _Boot.installSystem();
  }

  static cleanSystem(): void {
    const fm: FileManager = FileManager.iCloud();
    const prodPath: string = fm.joinPath(
      fm.bookmarkedPath(
        _Boot.RUNTIME_ROOT_BOOKMARK
      ),
      _Boot.SYSTEM_RUNTIME_ROOT_SUBPATH
    );
    if (fm.isDirectory(prodPath))
      fm.remove(prodPath);
  }

  static installSystem(): void {
    _Boot.cleanSystem();
    const fm: FileManager = FileManager.iCloud();
    const repoPath: string = fm.bookmarkedPath(
        _Boot.SYSTEM_SOURCE_BOOKMARK
      );
    const prodPath: string = fm.joinPath(
      fm.bookmarkedPath(
        _Boot.RUNTIME_ROOT_BOOKMARK
      ),
      _Boot.SYSTEM_RUNTIME_ROOT_SUBPATH
    );
    fm.copy(repoPath, prodPath);
  }
}

module.exports = _Boot;
