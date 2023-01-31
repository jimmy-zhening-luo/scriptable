/*
This built file (.js, not the .ts source file) must be manually copied from the repository into the boot dir.

When Boot.Installer.install() is run by !bootrun.js from the Scriptable app root, this class loads the core system files from the repository.

The CONST values at the top of namespace Boot are required, project-defined values for the Boot Installer to know from where and to where to install files.
*/
// v2.0.0
const RUNTIME_ROOT_BOOKMARK_NAME = ">>ROOT";
const REPO_SOURCE_BOOKMARK_NAME = "@REPO";
const EXCLUDE_PREFIX = "!";
const INCLUDE_POSTFIX = ".js";
class Installer {
    static clean() {
        this.FM
            .listContents(this.runtimeRootPath)
            .filter(child => !child.startsWith(this.excludePrefix))
            .forEach(child => {
            const runtimeChild = this.FM.joinPath(this.runtimeRootPath, child);
            this.FM.remove(runtimeChild);
        });
    }
    static install() {
        this.clean();
        this.FM
            .listContents(this.repoSourcePath)
            .filter(child => !child.startsWith(this.excludePrefix))
            .forEach(child => {
            const repoChild = this.FM.joinPath(this.repoSourcePath, child);
            const runtimeChild = this.FM.joinPath(this.runtimeRootPath, child);
            if (this.FM.isDirectory(repoChild) || repoChild.endsWith(this.includePostfix))
                this.FM.copy(repoChild, runtimeChild);
        });
    }
    static get runtimeRootBookmarkName() {
        return RUNTIME_ROOT_BOOKMARK_NAME;
    }
    static get repoSourceBookmarkName() {
        return REPO_SOURCE_BOOKMARK_NAME;
    }
    static get runtimeRootPath() {
        return this.FM.bookmarkedPath(this.runtimeRootBookmarkName);
    }
    static get repoSourcePath() {
        return this.FM.bookmarkedPath(this.repoSourceBookmarkName);
    }
    static get excludePrefix() {
        return EXCLUDE_PREFIX;
    }
    static get includePostfix() {
        return INCLUDE_POSTFIX;
    }
    static get FM() {
        return FileManager.iCloud();
    }
}
module.exports = Installer;
//# sourceMappingURL=Boot.js.map