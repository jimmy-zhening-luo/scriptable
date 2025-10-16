import IApp from "../core";

export default abstract class Shortcut<
  ShortcutInput extends Unflat = never,
  ShortcutOutput = null,
  Setting = never,
> extends IApp<
    ShortcutInput,
    Null<ShortcutOutput>,
    Setting
  > {
  constructor(
    multi:
      | false
      | (ShortcutInput extends ArrayN ? true : never)
      = false,
  ) {
    const { plainTexts } = args;

    super(
      multi
        ? plainTexts as unknown as ShortcutInput & readonly string[]
        : plainTexts[0] as Undefined<ShortcutInput & string>,
      config.runsWithSiri,
    );
  }

  protected output(output: ReturnType<Shortcut<ShortcutInput, ShortcutOutput>["runtime"]>) {
    Script.setShortcutOutput(output);
  }
}
