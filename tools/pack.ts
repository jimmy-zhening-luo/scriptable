import * as shell from "shelljs";
import rimraf from "rimraf";

namespace _Pack_Tool {

  export function pack() {
    console.log(`${new Date().toTimeString()}: npm run pack: Starting pack job...`);

    try {
      rimraf.sync("dist");
    }
    catch (e) {
      console.error(`npm run pack: Error deleting './dist' folder using npm package 'rimraf': ${e}`);
      throw e;
    }

    try {
      try {
        shell.mkdir("dist");
        if (shell.ls(".").indexOf("dist") === -1)
          throw new ReferenceError(`After executing function to create a './dist' folder, a dist folder should exist. However, could not find './dist' folder.`);
      } catch (e) {
        console.error(`npm run pack: Error creating new './dist' folder: ${e}`);
        throw e;
      }

      let builtFileCounter: number = 0;
      try {
        shell.ls("built").forEach((file) => {
          builtFileCounter++;
          shell.cp("-R", `built/${file}`, "dist");
        });
        if (builtFileCounter === 0)
          throw new ReferenceError(`Pack should execute after Build to move built files to dist. However, no built files were found in './built. Are you sure that you have executed 'npm run build' before 'npm run pack'?`);
      } catch (e) {
        console.error(`npm run pack: Error copying all built files to './dist': ${e}`);
        throw e;
      }

      let distFileCounter: number = 0;
      try {
        shell.ls("-R", "dist").forEach((file) => {
          distFileCounter++;
          if (
            file.endsWith(".d.ts")
            || file.endsWith(".d.ts.map")
            || file.endsWith(".js.map")
            || file.endsWith("tsconfig.tsbuildinfo")
          ) {
            shell.rm("-rf", `dist/${file}`);
          }
        });
        if (
          builtFileCounter !== 0
          && distFileCounter === 0
        )
          throw new ReferenceError(`After copying n=${builtFileCounter} top-level files or directories from './built' to './dist', there should be exactly n=${builtFileCounter} top-level items in './dist'. However, 0 top-level items were found in './dist'`);
      } catch (e) {
        console.error(`npm run pack: Error filtering copied files in './dist': ${e}`);
        throw e;
      }

      console.log(`${new Date().toTimeString()}: npm run pack: Pack job completed successfully`)
    } catch (e) {
      console.error(`npm run pack: Error executing pack job: ${e}`);
      throw e;
    }
  }
}

_Pack_Tool.pack();
