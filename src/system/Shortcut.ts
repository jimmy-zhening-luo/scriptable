const _Application: typeof Application = importModule(
  "application/Application",
);

abstract class Shortcut extends _Application {
  get input(): typeof args {
    try {
      return args;
    } catch (e) {
      throw new Error(
        `Shortcut.js: Error getting shortcut input from Scriptable 'args' object (which by design is loaded with any input parameters passed from Shortcuts when executing a Scriptable script): \n${e}`,
      );
    }
  }

  handleOutput(
    _output: null | primitive | File | ShortcutDictionary = "",
  ): primitive | ShortcutDictionary {
    try {
      if (_output === null) _output = "";
      else if (
        typeof _output === "string" ||
        typeof _output === "number" ||
        typeof _output === "boolean"
      )
        _output = _output;
      else if (_output instanceof Shortcut.Utilities.Files.File)
        _output = _output.path;
      Script.setShortcutOutput(_output);
      return _output;
    } catch (e) {
      throw new Error(`Shortcut.js: Error setting shortcut output: \n${e}`);
    }
  }

  protected override get configSubpath(): string {
    try {
      const SHORTCUT_CONFIG_ROOT: string = "Shortcut";
      if (super.configSubpath === "") return SHORTCUT_CONFIG_ROOT;
      else return [super.configSubpath, SHORTCUT_CONFIG_ROOT].join("/");
    } catch (e) {
      throw new Error(
        `Shortcut.js: Error getting shortcut config subpath: \n${e}`,
      );
    }
  }

  static get Application(): typeof Application {
    try {
      return _Application;
    } catch (e) {
      throw new ReferenceError(
        `Shortcut.js: Error getting shortcut Application class: \n${e}`,
      );
    }
  }
}

module.exports = Shortcut;
