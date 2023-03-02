import * as shell from "shelljs";
import rimraf from "rimraf";

namespace _Pack_Tool {
  export function pack(): void {
    console.log(
      `${new Date().toTimeString()}: npm run pack: Starting pack job...`,
    );
    try {
      deletePrevDistFolder();
      createNewDistFolder();
      filterNonJsFilesFromDistFolder(moveBuiltFilesToDistFolder());
      console.log(
        `${new Date().toTimeString()}: npm run pack: Pack job completed successfully`,
      );
    } catch (e) {
      e = new Error(
        `npm run pack: Canceled job due to encountered error: ${e}`,
      );
      console.error(e);
      throw e;
    }

    function deletePrevDistFolder(): void {
      try {
        rimraf.sync("dist");
      } catch (e) {
        throw new Error(
          `Error deleting './dist' folder using npm package 'rimraf': ${e}`,
        );
      }
    }

    function createNewDistFolder(): void {
      try {
        shell.mkdir("dist");
        if (!shell.ls(".").includes("dist"))
          throw new ReferenceError(
            `After executing function to create a './dist' folder, a dist folder should exist. However, could not find './dist' folder.`,
          );
      } catch (e) {
        throw new Error(`Error creating new './dist' folder: ${e}`);
      }
    }

    function moveBuiltFilesToDistFolder(): number {
      try {
        let builtFileCounter: number = 0;
        shell.ls("built").forEach(file => {
          builtFileCounter++;
          shell.cp("-R", `built/${file}`, "dist");
        });
        if (builtFileCounter === 0)
          throw new ReferenceError(
            `Pack should execute after Build to move built files to dist. However, no built files were found in './built. Are you sure that you have executed 'npm run build' before 'npm run pack'?`,
          );
        else return builtFileCounter;
      } catch (e) {
        throw new Error(`Error copying all built files to './dist': ${e}`);
      }
    }

    function filterNonJsFilesFromDistFolder(builtFileCounter: number): void {
      try {
        let distFileCounter: number = 0;
        shell.ls("-R", "dist").forEach(file => {
          distFileCounter++;
          if (
            file.endsWith(".d.ts") ||
            file.endsWith(".d.ts.map") ||
            file.endsWith(".js.map") ||
            file.endsWith("tsconfig.tsbuildinfo")
          )
            shell.rm("-rf", `dist/${file}`);
        });
        if (builtFileCounter !== 0 && distFileCounter === 0)
          throw new ReferenceError(
            `After copying n=${builtFileCounter} top-level files or directories from './built' to './dist', there should be exactly n=${builtFileCounter} top-level items in './dist'. However, 0 top-level items were found in './dist'`,
          );
      } catch (e) {
        throw new Error(`Error filtering copied files in './dist': ${e}`);
      }
    }
  }
}

_Pack_Tool.pack();
