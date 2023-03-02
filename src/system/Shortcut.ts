const _Application: typeof Application = importModule(
  "application/Application",
);

abstract class Shortcut extends _Application {
  get input(): typeof args {
    try {
      return args;
    } catch (e) {
      console.error(
        `Shortcut.js: Error getting shortcut input from Scriptable 'args' object (which by design is loaded with any input parameters passed from Shortcuts when executing a Scriptable script): ${e}`,
      );
      throw e;
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
      else if (output instanceof File) output = output.path;
      Script.setShortcutOutput(output);
      return output;
    } catch (e) {
      console.error(`Shortcut.js: Error setting shortcut output: ${e}`);
      throw e;
    }
  }

  private get shortcutSubpath(): string {
    return "Shortcut";
  }

  protected override get configSubpath(): string {
    try {
      return super.configSubpath === ""
        ? this.shortcutSubpath
        : [super.configSubpath, this.shortcutSubpath].join("/");
    } catch (e) {
      console.error(`Shortcut.js: Error getting shortcut config subpath: ${e}`);
      throw e;
    }
  }

  static get Application(): typeof Application {
    return _Application;
  }
}

module.exports = Shortcut;
