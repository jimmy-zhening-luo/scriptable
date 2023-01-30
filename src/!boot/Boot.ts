/*
This built file (.js, not the .ts source file) must be manually copied from the repository into the boot dir.

When Boot.Installer.install() is run by !bootrun.js from the Scriptable app root, this class loads the core system files from the repository.

The CONST values at the top of namespace Boot are required, project-defined values for the Boot Installer to know from where and to where to install files.
*/

// v2.0.0
namespace Boot {

  const RUNTIME_ROOT_BOOKMARK: string = ">>ROOT";
  const RUNTIME_SUBPATHS: Installer.BuildMap = {
    SYSTEM: "shortcut",
    CONFIG: "config",
    APPLICATIONS: ""
  };

  const REPO_SOURCE_BOOKMARK: string = "@REPO";
  const REPO_SUBPATHS: Installer.BuildMap = {
    SYSTEM: "shortcut",
    CONFIG: "config",
    APPLICATIONS: ""
  };

  export class Installer {
    static clean(): void {
      this.cleanSystem();
      this.cleanConfig();
      this.cleanApplications();
    }

    static install(): void {
      this.clean();
      this.installSystem();
      this.installConfig();
      this.installApplications();
    }

    private static cleanSystem(): void {
      this.cleanBuildPart("SYSTEM");
    }

    private static cleanConfig(): void {
      this.cleanBuildPart("CONFIG");

    }

    private static cleanApplications(): void {
      this.cleanBuildPart("APPLICATIONS");
    }

    private static installSystem(): void {
      this.cleanSystem();
      this.installBuildPart("SYSTEM");
    }

    private static installConfig(): void {
      this.cleanConfig();
      this.installBuildPart("CONFIG");

    }

    private static installApplications(): void {
      this.cleanApplications();
      this.installBuildPart("APPLICATIONS");
    }

    private static cleanBuildPart(
      buildpart: keyof Installer.BuildMap
    ): void {
      const runtimeSubpath: string = this.getRuntimeSubpath(buildpart);
      const runtimePath: string = this.FM.joinPath(
        this.runtimeRootPath,
        runtimeSubpath
      );

      const cleanInstruction: Installer.BuildInstruction = this.getInstruction(runtimeSubpath);

      if (cleanInstruction.iterateOverContents !== undefined) {
        const filepattern = cleanInstruction.iterateOverContents as { excludePrefix: string, includePostfix: string };
        const children: string[] = !this.FM.fileExists(runtimePath) ?
          []
          : !this.FM.isDirectory(runtimePath) ?
            []
            : this.FM.listContents(runtimePath);
        const eligibleChildren: string[] = children
          .filter(
            (child) => (
              !child.startsWith(filepattern.excludePrefix)
            )
          ).filter(
            (child) => (
              child.endsWith(filepattern.includePostfix)
            )
        );
        eligibleChildren.forEach(
          (child) => {
            const runtimeChild = this.FM.joinPath(
              runtimePath,
              child
            );
            this.FM.remove(runtimeChild);
          }
        )
      }
      else {
        if (this.FM.fileExists(runtimePath))
          this.FM.remove(runtimePath);
      }
    }

    private static installBuildPart(
      buildpart: keyof Installer.BuildMap
    ): void {
      const repoSubpath: string = this.getRepoSubpath(buildpart);
      const repoPath: string = this.FM.joinPath(
        this.repoSourcePath,
        repoSubpath
      );

      const runtimeSubpath: string = this.getRuntimeSubpath(buildpart);
      const runtimePath: string = this.FM.joinPath(
        this.runtimeRootPath,
        runtimeSubpath
      )

      const installInstruction: Installer.BuildInstruction = this.getInstruction(repoSubpath);

      if (installInstruction.iterateOverContents !== undefined) {
        const filepattern = installInstruction.iterateOverContents as { excludePrefix: string, includePostfix: string };
        const children: string[] = !this.FM.fileExists(repoPath) ?
          []
          : !this.FM.isDirectory(repoPath) ?
            []
            : this.FM.listContents(repoPath);
        const eligibleChildren: string[] = children
          .filter(
            (child) => (
              !child.startsWith(filepattern.excludePrefix)
            )
          ).filter(
            (child) => (
              child.endsWith(filepattern.includePostfix)
            )
          );
        eligibleChildren.forEach(
          (child) => {
            const repoChild = this.FM.joinPath(
              repoPath,
              child
            );
            const runtimeChild = this.FM.joinPath(
              runtimePath,
              child
            );
            this.FM.copy(repoChild, runtimeChild);
          }
        )
      }
      else {
        if (this.FM.fileExists(repoPath))
          this.FM.copy(repoPath, runtimePath);
      }
    }

    static getInstruction(subpath: string): Installer.BuildInstruction {
      return subpath === String() ?
        {
          iterateOverContents: {
            excludePrefix: "!",
            includePostfix: ".js"
          }
        }
        : {};
    }

    private static get runtimeRootPath(): string {
      return this.FM.bookmarkedPath(RUNTIME_ROOT_BOOKMARK);
    }

    private static get repoSourcePath(): string {
      return this.FM.bookmarkedPath(REPO_SOURCE_BOOKMARK);
    }

    private static get runtimeSubpaths(): Installer.BuildMap {
      return RUNTIME_SUBPATHS;
    }

    private static get repoSubpaths(): Installer.BuildMap {
      return REPO_SUBPATHS;
    }

    private static getRuntimeSubpath(buildpart: keyof Installer.BuildMap): string {
      return this.runtimeSubpaths[buildpart];
    }

    private static getRepoSubpath(buildpart: keyof Installer.BuildMap): string {
      return this.repoSubpaths[buildpart];
    }

    private static get FM(): FileManager {
      return FileManager.iCloud()
    }
  }

  export namespace Installer {
    export type BuildMap = {
      SYSTEM: string,
      CONFIG: string,
      APPLICATIONS: string,
    };

    export type BuildInstruction = {
      iterateOverContents?: {
        excludePrefix: string,
        includePostfix: string
      }
    }
  }
}

module.exports = Boot.Installer;
