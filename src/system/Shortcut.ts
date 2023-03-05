const _Application: typeof Application = importModule(
  "application/Application",
);

abstract class Shortcut extends _Application {
  get input(): typeof args {
    try {
      return args;
    } catch (e) {
      throw new Error(
        `Shortcut.js: Error getting shortcut input from Scriptable 'args' object (which by design is loaded with any input parameters passed from Shortcuts when executing a Scriptable script): ${e}`,
      );
    }
  }

  handleOutput(
    output?: null | primitive | File | ShortcutDictionary,
  ): primitive | ShortcutDictionary {
    try {
      if (output === undefined || output === null) output = "";
      else if (
        typeof output === "string" ||
        typeof output === "number" ||
        typeof output === "boolean"
      )
        output = output;
      else if (output instanceof Shortcut.File) output = output.path;
      Script.setShortcutOutput(output);
      return output;
    } catch (e) {
      throw new Error(`Shortcut.js: Error setting shortcut output: ${e}`);
    }
  }

  private get shortcutSubpath(): string {
    try {
      return "Shortcut";
    } catch (e) {
      throw new Error(`Shortcut.js: Error getting shortcut subpath: ${e}`);
    }
  }

  protected override get configSubpath(): string {
    try {
      return super.configSubpath === ""
        ? this.shortcutSubpath
        : [super.configSubpath, this.shortcutSubpath].join("/");
    } catch (e) {
      throw new Error(
        `Shortcut.js: Error getting shortcut config subpath: ${e}`,
      );
    }
  }

  static get Application(): typeof Application {
    try {
      return _Application;
    } catch (e) {
      throw new ReferenceError(
        `Shortcut.js: Error getting shortcut Application class: ${e}`,
      );
    }
  }
}

module.exports = Shortcut;
