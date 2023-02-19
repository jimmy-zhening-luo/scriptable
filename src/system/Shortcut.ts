const _Application: typeof Application = importModule("application/Application");

abstract class Shortcut extends _Application {

  get input(): any {
    return args;
  }

  handleOutput(
    output?:
      | null
      | primitive
      | File
      | ShortcutDictionary
  ): primitive | ShortcutDictionary {
    if (output === undefined || output === null)
      output = "";
    else if (typeof output === "string"
      || typeof output === "number"
      || typeof output === "boolean")
      output = output;
    else if (output instanceof File)
      output = output.path;
    Script.setShortcutOutput(output);
    return output;
  }

  private get shortcutSubpath(): string {
    return "Shortcut";
  }

  protected override get configSubpath(): string {
    return super
      .configSubpath === "" ?
      this.shortcutSubpath
      : [
        super.configSubpath,
        this.shortcutSubpath
      ]
        .join("/");
  }

  static get Application(): typeof Application {
    return _Application;
  }

}

module.exports = Shortcut;
