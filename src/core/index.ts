import IApp from "./app";

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
        ShortcutInput extends ArrayN<0>
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
          : plainTexts as unknown as ShortcutInput & ArrayN<0>
        : plainTexts[0] as Undefined<ShortcutInput & string>,
      config.runsWithSiri,
    );
  }

  protected output(output: ReturnType<Shortcut<ShortcutInput, ShortcutOutput>["runtime"]>) {
    Script.setShortcutOutput(output);
  }
}
