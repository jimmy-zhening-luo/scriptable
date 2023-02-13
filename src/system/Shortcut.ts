const _Application: typeof Application = importModule("application/Application");

abstract class Shortcut extends _Application {

  get input(): any {
    return args;
  }

  handleOutput(
    output: any
  ): any {
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
}

module.exports = Shortcut;
