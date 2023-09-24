import * as shell from "shelljs";

namespace _Project_Tool_Pack {
  export function pack(): void {
    console.log(
      `${new Date().toTimeString()}: npm run pack: Starting pack job...`,
    );
    try {
      createPackedFolder();
      removeNonExecutablesFromPacked(copyBuiltToPacked());
      console.log(
        `${new Date().toTimeString()}: npm run pack: Pack job completed successfully`,
      );
    } catch (e) {
      e = new Error(
        `npm run pack: Canceled job due to encountered error: \n${e}`,
      );
      console.error(e);
      throw e;
    }

    function createPackedFolder(): void {
      try {
        shell.mkdir("packed");
        if (!shell.ls(".").includes("packed"))
          throw new ReferenceError(
            `After executing function to create a './packed' folder, a packed folder should exist. However, could not find './packed' folder.`,
          );
      } catch (e) {
        throw new Error(`Error creating new './packed' folder: \n${e}`);
      }
    }

    function copyBuiltToPacked(): number {
      try {
        let builtFileCounter: number = 0;
        shell.ls("built").forEach(file => {
          builtFileCounter++;
          shell.cp("-R", `built/${file}`, "packed");
        });
        if (builtFileCounter === 0)
          throw new ReferenceError(
            `Pack should execute after Build to move built files from './built' to './packed'. However, no built files were found in './built'.`,
          );
        else return builtFileCounter;
      } catch (e) {
        throw new Error(`Error copying all built files from './built' to './packed': \n${e}`);
      }
    }

    function removeNonExecutablesFromPacked(builtFileCounter: number): void {
      try {
        let packedFileCounter: number = 0;
        shell.ls("-R", "packed").forEach(file => {
          packedFileCounter++;
          if (
            file.endsWith(".d.ts") ||
            file.endsWith(".d.ts.map") ||
            file.endsWith(".js.map") ||
            file.endsWith("tsconfig.tsbuildinfo")
          )
            shell.rm("-rf", `packed/${file}`);
        });
        if (builtFileCounter !== 0 && packedFileCounter === 0)
          throw new ReferenceError(
            `After copying n=${builtFileCounter} top-level files or directories from './built' to './packed', there should be exactly n=${builtFileCounter} top-level items in './packed'. However, 0 top-level items were found in './packed'`,
          );
      } catch (e) {
        throw new Error(`Error filtering copied files in './packed': \n${e}`);
      }
    }
  }
}

_Project_Tool_Pack.pack();
