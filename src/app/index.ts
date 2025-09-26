import * as IApp from "../core";

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
    inputType:
      | "single"
      | (
        ShortcutInput extends ArrayN
          ? "multi"
          : never
      )
      = "single",
  ) {
    const { plainTexts } = args;

    super(
      inputType === "multi"
        ? plainTexts.length === 0
          ? null
          : plainTexts as unknown as ShortcutInput & ArrayN
        : plainTexts[0] as Undefined<ShortcutInput & string>,
      config.runsWithSiri,
    );
  }

  protected output(output: ReturnType<Shortcut<ShortcutInput, ShortcutOutput>["runtime"]>) {
    Script.setShortcutOutput(output);
  }
}
