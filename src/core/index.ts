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
    inputType: (
      | "single"
      | (
        ShortcutInput extends readonly string[]
          ? "multi"
          : never
      )
    ) = "single",
  ) {
    const { plainTexts } = args;

    super(

      inputType === "multi"
        ? plainTexts.length === 0
          ? null
          : plainTexts as unknown as string[] & ShortcutInput
        : plainTexts[0] as Undef<string & ShortcutInput>,
      config
        .runsWithSiri,
    );
  }

  protected output(
    output: ReturnType<Shortcut<ShortcutInput, ShortcutOutput>["runtime"]>,
  ) {
    Script
      .setShortcutOutput(
        output,
      );
  }
}
