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

  protected override get configSubpathRoot(): string {
    try {
      const SHORTCUT_CONFIG_SUBPATH_ROOT: string = "Shortcut";

      return super.configSubpathRoot === ""
        ? SHORTCUT_CONFIG_SUBPATH_ROOT
        : `${super.configSubpathRoot}/${SHORTCUT_CONFIG_SUBPATH_ROOT}`;
    }
    catch (e) {
      throw new EvalError(
        `Shortcut.js: Error getting shortcut config subpath: \n${e as string}`,
      );
    }
  }

  public handleOutput(
    output: null | primitive | IOFile | ShortcutDictionary = "",
  ): primitive | ShortcutDictionary {
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

module.exports = Shortcut;
