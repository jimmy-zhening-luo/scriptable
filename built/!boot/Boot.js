/*
Boot.js

This built file (.js, not the .ts source file) must be manually copied from the repository into the boot dir.

When run, it loads the core system files from the repository.
*/
// v1.0.8
const RUNTIME_ROOT_BOOKMARK = ">>ROOT";
const SYSTEM_RUNTIME_ROOT_SUBPATH = "system";
const SYSTEM_SOURCE_BOOKMARK = "@SYSTEM";
class _Boot {
    static get RUNTIME_ROOT_BOOKMARK() {
        return RUNTIME_ROOT_BOOKMARK;
    }
    static get SYSTEM_RUNTIME_ROOT_SUBPATH() {
        return SYSTEM_RUNTIME_ROOT_SUBPATH;
    }
    static get SYSTEM_SOURCE_BOOKMARK() {
        return SYSTEM_SOURCE_BOOKMARK;
    }
    static clean() {
        _Boot.cleanSystem();
    }
    static install() {
        _Boot.clean();
        _Boot.installSystem();
    }
    static cleanSystem() {
        const fm = FileManager.iCloud();
        const prodPath = fm.joinPath(fm.bookmarkedPath(_Boot.RUNTIME_ROOT_BOOKMARK), _Boot.SYSTEM_RUNTIME_ROOT_SUBPATH);
        if (fm.isDirectory(prodPath))
            fm.remove(prodPath);
    }
    static installSystem() {
        _Boot.cleanSystem();
        const fm = FileManager.iCloud();
        const repoPath = fm.bookmarkedPath(_Boot.SYSTEM_SOURCE_BOOKMARK);
        const prodPath = fm.joinPath(fm.bookmarkedPath(_Boot.RUNTIME_ROOT_BOOKMARK), _Boot.SYSTEM_RUNTIME_ROOT_SUBPATH);
        fm.copy(repoPath, prodPath);
    }
}
module.exports = _Boot;
