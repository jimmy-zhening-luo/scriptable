import IApp from "../core";

export default abstract class Shortcut<
  ShortcutInput = never,
  ShortcutOutput = null,
  Setting = never,
> extends IApp<
    ShortcutInput,
    Null<ShortcutOutput>,
    Setting
  > {
  constructor() {
    super(
      args.shortcutParameter as unknown as Null<ShortcutInput>,
      config.runsWithSiri,
    );
  }

  protected output(output: ReturnType<Shortcut<ShortcutInput, ShortcutOutput>["runtime"]>) {
    Script.setShortcutOutput(output);
  }
}
