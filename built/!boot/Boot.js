"use strict";
/*
This file must be manually copied from the repository into the boot dir.

When run, it loads the core system files from the repository.
*/
// v1.0.8
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
    static get REPO_SYSTEM_SRC_BOOKMARK() {
        return REPO_SYSTEM_SRC_BOOKMARK;
    }
    static clean() {
        Boot.cleanSystem();
    }
    static install() {
        Boot.clean();
        Boot.installSystem();
    }
    static cleanSystem() {
        const fm = FileManager.iCloud();
        const prodPath = fm.joinPath(fm.bookmarkedPath(Boot.ROOT_BOOKMARK), Boot.SYSTEM_DIR);
        if (fm.isDirectory(prodPath))
            fm.remove(prodPath);
    }
    static installSystem() {
        Boot.cleanSystem();
        const fm = FileManager.iCloud();
        const repoPath = fm.bookmarkedPath(Boot.REPO_SYSTEM_SRC_BOOKMARK);
        const prodPath = fm.joinPath(fm.bookmarkedPath(Boot.ROOT_BOOKMARK), Boot.SYSTEM_DIR);
        fm.copy(repoPath, prodPath);
    }
}
module.exports = Boot;
