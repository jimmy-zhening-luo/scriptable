/*
This built file (.js, not the .ts source file) must be manually copied from the repository into the boot dir.

When Boot.Installer.install() is run by !bootrun.js from the Scriptable app root, this class loads the core system files from the repository.

The CONST values at the top of namespace Boot are required, project-defined values for the Boot Installer to know from where and to where to install files.
*/
// v2.0.0
const RUNTIME_ROOT_BOOKMARK: string = ">>ROOT";
const REPO_SOURCE_BOOKMARK: string = "@REPO";
const IGNORE_PREFIX: string = "!";


export class Installer {
  static clean(): void {
    this.FM
      .listContents(this.runtimeRootPath)
      .filter(child => !child.startsWith(this.ignorePrefix))
      .forEach(child => {
        const runtimeChild: string = this.FM.joinPath(this.runtimeRootPath, child);
        this.FM.remove(runtimeChild);
      });
  }

  static install(): void {
    this.clean();
    this.FM
      .listContents(this.repoSourcePath)
      .filter(child => !child.startsWith(this.ignorePrefix))
      .forEach(child => {
        const repoChild: string = this.FM.joinPath(this.repoSourcePath, child);
        const runtimeChild: string = this.FM.joinPath(this.runtimeRootPath, child);
        this.FM.copy(repoChild, runtimeChild);
      });
  }

  static get runtimeRootPath(): string {
    return this.FM.bookmarkedPath(RUNTIME_ROOT_BOOKMARK);
  }

  private static get repoSourcePath(): string {
    return this.FM.bookmarkedPath(REPO_SOURCE_BOOKMARK);
  }

  private static get ignorePrefix(): string {
    return IGNORE_PREFIX;
  }

  private static get FM(): FileManager {
    return FileManager.iCloud()
  }
}

module.exports = Installer;
