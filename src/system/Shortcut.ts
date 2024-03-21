const sh_Application: typeof Application = importModule(
  "application/Application",
) as typeof Application;

abstract class Shortcut extends sh_Application {
  public static get Application(): typeof Application {
    try {
      return sh_Application;
    }
    catch (e) {
      throw new ReferenceError(
        `Shortcut.js: Error getting shortcut Application class: \n${e as string}`,
      );
    }
  }

  public get input(): typeof args {
    try {
      return args;
    }
    catch (e) {
      throw new ReferenceError(
        `Shortcut.js: Error getting shortcut input from Scriptable 'args' object (which by design is loaded with any input parameters passed from Shortcuts when executing a Scriptable script): \n${e as string}`,
      );
    }
  }

  protected override get settingSubpathRoot(): string {
    try {
      const SHORTCUT_SETTING_SUBPATH_ROOT: string = "Shortcut";

      return super.settingSubpathRoot === ""
        ? SHORTCUT_SETTING_SUBPATH_ROOT
        : `${super.settingSubpathRoot}/${SHORTCUT_SETTING_SUBPATH_ROOT}`;
    }
    catch (e) {
      throw new EvalError(
        `Shortcut.js: Error getting shortcut setting subpath: \n${e as string}`,
      );
    }
  }

  public handleOutput(
    output: null | primitive | IOFile | Shortcut.ShortcutDictionary = "",
  ): primitive | Shortcut.ShortcutDictionary {
    try {
      if (output === null) output = "";
      else if (
        typeof output === "string"
        || typeof output === "number"
        || typeof output === "boolean"
      )
        output = output;
      else if (
        output instanceof Shortcut.Filetypes.IOFile
      ) output = output.path;
      Script.setShortcutOutput(output);

      return output;
    }
    catch (e) {
      throw new SyntaxError(
        `Shortcut.js: Error setting shortcut output: \n${e as string}`,
      );
    }
  }
}

namespace Shortcut {
  export interface ShortcutDictionary {
    [key: string]: ListContent | ShortcutDictionary;
  }

  export type ListContent =
    | string
    | number
    | boolean
    | ShortcutDictionary
    | ListContent[];

}

module.exports = Shortcut;
