/*
This built file (.js, not the .ts source file) must be manually copied from the repository into the boot dir.

When Boot.Installer.install() is run by !bootrun.js from the Scriptable app root, this class loads the core system files from the repository.

The CONST values at the top of namespace Boot are required, project-defined values for the Boot Installer to know from where and to where to install files.
*/
// v2.0.0
const RUNTIME_ROOT_BOOKMARK_NAME: string = ">>ROOT";
const REPO_SOURCE_BOOKMARK_NAME: string = "@REPO";
const EXCLUDE_PREFIX: string = "!";
const INCLUDE_POSTFIX: string = ".js";


class Installer {
  static clean(): void {
    const FM: FileManager = this.FM;
    FM
      .listContents(
        this.runtimeRootPath
      )
      .filter(child => !child.startsWith(
        this.excludePrefix
      ))
      .forEach(child => {
        FM
          .remove(
            FM
              .joinPath(
                this.runtimeRootPath,
                child
              )
          );
      });
  }

  static install(
    subpath: string = ""
  ): void {
    this.clean();
    const FM: FileManager = this.FM;
    const repoSourceSubpath: string = FM.joinPath(
      this.repoSourcePath,
      subpath
    );
    FM
      .listContents(
        repoSourceSubpath
      )
      .filter(child => !child.startsWith(
        this.excludePrefix
      ))
      .forEach(child => {
        const repoChild: string = FM
          .joinPath(
            repoSourceSubpath,
            child
          );
        const runtimeChild: string = FM
          .joinPath(
            this.runtimeRootPath,
            child
          );
        if (
          FM.isDirectory(
            repoChild
          )
          || repoChild.endsWith(
            this.includePostfix
          )
        )
          FM
            .copy(
              repoChild,
              runtimeChild
            );
      });
  }

  static get runtimeRootBookmarkName(): string {
    return RUNTIME_ROOT_BOOKMARK_NAME;
  }

  static get repoSourceBookmarkName(): string {
    return REPO_SOURCE_BOOKMARK_NAME;
  }

  static get runtimeRootPath(): string {
    return this.FM.bookmarkedPath(this.runtimeRootBookmarkName);
  }

  private static get repoSourcePath(): string {
    return this.FM.bookmarkedPath(this.repoSourceBookmarkName);
  }

  private static get excludePrefix(): string {
    return EXCLUDE_PREFIX;
  }

  private static get includePostfix(): string {
    return INCLUDE_POSTFIX;
  }

  private static get FM(): FileManager {
    return FileManager.iCloud()
  }
}

module.exports = Installer;
