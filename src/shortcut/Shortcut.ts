abstract class Shortcut extends Application {
  get input(): any {
    return args;
  }

  handleOutput(
    output: any
  ): any {
    Script.setShortcutOutput(output);
    return output;
  }

  protected override get configSubdirectoryPath(): string {
    return [
      super.configSubdirectoryPath,
      "Shortcut"
    ].join("/");
  }
}

module.exports = Shortcut;
